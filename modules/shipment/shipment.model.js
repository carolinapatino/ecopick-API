module.exports = {
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
