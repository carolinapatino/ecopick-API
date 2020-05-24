module.exports = {
  getDeliveryStart: function (con) {
    return con
      .query(
        `SELECT CO_VALUE FROM MP_CONFIGURATION WHERE CO_NAME = 'Delivery start'`
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getBaseCost: function (con) {
    return con
      .query(
        `SELECT CO_VALUE FROM MP_CONFIGURATION WHERE CO_NAME = 'Shipping price'` 
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
