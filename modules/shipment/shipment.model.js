module.exports = {
  createShipment: function (con, body) {
    return con
      .query(
        "INSERT INTO MP_SHIPMENT (SH_TRACKING_ID,SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [
          body.trackingID,
          body.date,
          body.arrivaldate,
          body.total,
          body.office,
          body.direction,
          body.user,
          body.receiver,
        ]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
