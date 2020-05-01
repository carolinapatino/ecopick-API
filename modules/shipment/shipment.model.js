module.exports = {
  // Funciones necesarias para llenar los datos de una factura
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
};
