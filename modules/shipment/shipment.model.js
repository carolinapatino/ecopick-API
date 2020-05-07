module.exports = {
  getShipment: function (con, id) {
    return con
      .query(
        `SELECT sh_tracking_id as TrackingID ,sh_shipment_date as Delivered, sh_estimated_date_of_arrival as Arrival ,sh_total as Amount ,
        o.of_name as Office, 
        CONCAT(d.di_primary_line, CONCAT(', ', CONCAT (d.di_secondary_line, CONCAT ( ', ', CONCAT (d.di_city, CONCAT (', ', CONCAT (d.di_state,CONCAT (', ', CONCAT (d.di_country,  CONCAT(', ',d.di_zip_code)))))))))) AS Direction,
        CONCAT (u.us_first_name, CONCAT (' ' , u.us_last_name))  AS User,
        CONCAT (r.re_first_name, CONCAT (' ', r.re_last_name)) AS Receiver
        FROM mp_shipment, mp_office o, mp_direction d, mp_user u, mp_receiver r 
        WHERE sh_tracking_id=$1 and sh_fk_office_origin = o.of_id and sh_fk_direction_destination = d.di_id and sh_fk_user = u.us_id and sh_fk_receiver = r.re_id`,
        [id]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  createShipment: function (con, body, receiver) {
    return con
      .query(
        "INSERT INTO MP_SHIPMENT (SH_TRACKING_ID,SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning SH_ID",
        [
          body.trackingID,
          body.date,
          body.arrivaldate,
          body.total,
          body.office,
          body.direction,
          body.user,
          receiver[0].re_id,
        ]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getShipmentRoute: function (con, trackingId) {
    return con
      .query(
        `SELECT STO.ST_date, STA.ST_name as status, STA.ST_description as status_description, CONCAT(d.di_primary_line, CONCAT(', ', CONCAT (d.di_secondary_line, CONCAT ( ', ', CONCAT (d.di_city, CONCAT (', ', CONCAT (d.di_state,CONCAT (', ', CONCAT (d.di_country,  CONCAT(', ',d.di_zip_code)))))))))) AS Direction
          FROM MP_STOP STO, MP_DIRECTION D, MP_STATUS STA, MP_SHIPMENT S
          WHERE STO.ST_FK_status = STA.ST_id AND STO.ST_FK_direction = D.DI_id AND STO.ST_FK_SHIPMENT = S.SH_id AND S.SH_tracking_id = $1;`,
        [trackingId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
