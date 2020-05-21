module.exports = {
  getShipment: function (con, trackingId) {
    return con
      .query(
        `SELECT sh_tracking_id as TrackingID ,sh_shipment_date as Delivered, sh_estimated_date_of_arrival as Arrival , sh_purpose as purpose,sh_total as Amount ,
        o.of_name as Office, 
        CONCAT(d.di_primary_line, CONCAT(', ', CONCAT (d.di_secondary_line, CONCAT ( ', ', CONCAT (d.di_city, CONCAT (', ', CONCAT (d.di_state,CONCAT (', ', CONCAT (d.di_country,  CONCAT(', ',d.di_zip_code)))))))))) AS Direction,
        CONCAT (u.us_first_name, CONCAT (' ' , u.us_last_name))  AS User, US_ID AS userID,
        CONCAT (r.re_first_name, CONCAT (' ', r.re_last_name)) AS Receiver
        FROM mp_shipment, mp_office o, mp_direction d, mp_user u, mp_receiver r 
        WHERE sh_tracking_id=$1 and sh_fk_office_origin = o.of_id and sh_fk_direction_destination = d.di_id and sh_fk_user = u.us_id and sh_fk_receiver = r.re_id`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  //Obtener envios dado un usuario
  getShipmentbyUser: function (con, userId) {
    return con
      .query(
        `WITH LAST_STOP AS
        (SELECT ST_FK_SHIPMENT AS SHIPMENT, MAX(ST_DATE) AS STOP_DATE
        FROM MP_STOP
        GROUP BY SHIPMENT)
        SELECT SH.SH_TRACKING_ID AS trackingID, SH.SH_SHIPMENT_DATE AS shipmentDate,
        SH.SH_PURPOSE AS purpose, SH.SH_TOTAL AS total, LS.STOP_DATE AS stopDate, ST.ST_NAME AS status
        FROM MP_SHIPMENT SH LEFT OUTER JOIN LAST_STOP AS LS ON SH.SH_ID = LS.SHIPMENT
        LEFT OUTER JOIN MP_STOP AS SP ON LS.STOP_DATE = SP.ST_DATE AND LS.SHIPMENT = SP.ST_FK_SHIPMENT
        LEFT OUTER JOIN MP_STATUS AS ST ON SP.ST_FK_STATUS = ST.ST_ID
        WHERE SH.SH_FK_USER =$1
        ORDER BY stopDate DESC;`,
        [userId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  // Insertar envio

  createShipment: function (con, body, receiver) {
    return con
      .query(
        "INSERT INTO MP_SHIPMENT (SH_TRACKING_ID,SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER, SH_PURPOSE) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning SH_ID",
        [
          body.trackingID,
          body.date,
          body.arrivaldate,
          body.total,
          body.office,
          body.direction,
          body.user,
          receiver[0].re_id,
          body.purpose,
        ]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  getShipmentRoute: function (con, trackingId) {
    return con
      .query(
        `SELECT STO.ST_date AS DATE, STA.ST_name as status, STA.ST_description as statusDescription,
          DI_PRIMARY_LINE AS primaryLine, DI_SECONDARY_LINE AS secondaryLine, DI_ZIP_CODE AS zipCode,
          DI_CITY AS CITY, DI_STATE AS STATE, DI_COUNTRY AS COUNTRY
          FROM MP_STOP STO, MP_DIRECTION D, MP_STATUS STA, MP_SHIPMENT S
          WHERE STO.ST_FK_status = STA.ST_id AND STO.ST_FK_direction = D.DI_id AND STO.ST_FK_SHIPMENT = S.SH_id AND S.SH_tracking_id = $1
          ORDER BY STO.ST_date;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  getShipmentOrigin: function (con, trackingId) {
    return con
      .query(
        `SELECT O.of_name, D.di_primary_line, D.di_secondary_line, D.di_city, D.di_state, D.di_country, D.di_zip_code
          FROM MP_SHIPMENT S, MP_DIRECTION D, MP_OFFICE O
          WHERE S.SH_FK_office_origin = O.OF_id AND O.OF_FK_direction = D.DI_id AND S.SH_tracking_id = $1;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  getShipmentDestination: function (con, trackingId) {
    return con
      .query(
        `SELECT D.di_primary_line, D.di_secondary_line, D.di_city, D.di_state, D.di_country, D.di_zip_code
          FROM MP_SHIPMENT S, MP_DIRECTION D
          WHERE S.SH_FK_direction_destination = D.DI_id AND S.SH_tracking_id = $1;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  getShipmentReceiver: function (con, trackingId) {
    return con
      .query(
        `SELECT R.RE_identification, R.RE_first_name, R.RE_second_name,
            R.RE_last_name, R.RE_second_last_name, R.RE_phone_number, R.RE_email
          FROM MP_SHIPMENT S, MP_RECEIVER R
          WHERE S.SH_FK_receiver = R.RE_id AND S.SH_tracking_id = $1;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  getShipmentPackages: function (con, trackingId) {
    return con
      .query(
        `SELECT P.PA_id, P.PA_width, P.PA_height, P.PA_length, P.PA_weight, PA_description, P.PA_cost, P.PA_FK_characteristic
          FROM MP_SHIPMENT S, MP_PACKAGE P
          WHERE S.SH_id = P.PA_FK_shipment AND S.SH_tracking_id = $1;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  getShipmentOptions: function (con, trackingId) {
    return con
      .query(
        `SELECT O.OP_name, O.OP_charge, O.OP_charge_parameter
          FROM MP_SHI_OPT SO, MP_OPTION O, MP_SHIPMENT S
          WHERE O.OP_id = SO.SHOP_FK_option AND SO.SHOP_FK_shipment = S.SH_ID AND S.SH_tracking_id = $1;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },

  getShipmentDiscounts: function (con, trackingId) {
    return con
      .query(
        `SELECT D.DI_name, D.DI_percentage
          FROM MP_DIS_USE DU, MP_DISCOUNT D, MP_SHIPMENT S
          WHERE DU.DIUS_FK_shipment = S.SH_id AND DU.DIUS_FK_discount = D.DI_id AND S.SH_tracking_id = $1;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getAllShipments: function (con, trackingId) {
    return con
      .query(
        `WITH LAST_STOP AS
          (SELECT ST_FK_SHIPMENT AS SHIPMENT, MAX(ST_DATE) AS STOP_DATE
          FROM MP_STOP
          GROUP BY SHIPMENT),
        PACKAGES AS
          (SELECT PA_FK_SHIPMENT AS SHIPMENT, COUNT(*) AS TOTAL
          FROM MP_PACKAGE
          GROUP BY PA_FK_SHIPMENT)
        SELECT SH.SH_ID AS ID, SH.SH_TRACKING_ID AS trackingID, SH.SH_SHIPMENT_DATE AS date,
          SH.SH_PURPOSE AS purpose, SH.SH_TOTAL AS total, LS.STOP_DATE AS stop, ST.ST_NAME AS status,
          O.OF_NAME as Office, CONCAT (u.us_first_name, CONCAT (' ' , u.us_last_name)) AS User,
          P.TOTAL AS PACKAGES
        FROM MP_OFFICE AS O, MP_USER AS U, PACKAGES AS P RIGHT OUTER JOIN MP_SHIPMENT SH ON SH.SH_ID = P.SHIPMENT
          LEFT OUTER JOIN LAST_STOP AS LS ON SH.SH_ID = LS.SHIPMENT
          LEFT OUTER JOIN MP_STOP AS SP ON LS.STOP_DATE = SP.ST_DATE AND LS.SHIPMENT = SP.ST_FK_SHIPMENT
          LEFT OUTER JOIN MP_STATUS AS ST ON SP.ST_FK_STATUS = ST.ST_ID
          WHERE O.OF_ID = SH.SH_FK_OFFICE_ORIGIN AND U.US_ID = SH.SH_FK_USER
        ORDER BY stop DESC;`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
