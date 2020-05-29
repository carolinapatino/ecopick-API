module.exports = {
  createStop: function (con, date, shipment, status, direction) {
    return con
      .query(
        `INSERT INTO MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) 
        VALUES ($1, $2, $3, $4);`,
        [date, shipment, status, direction]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
