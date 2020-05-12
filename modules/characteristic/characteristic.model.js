module.exports = {
  getCharacteristic: function (con, characteristicId) {
    return con
      .query(
        `SELECT C.CH_name, C.CH_charge, C.CH_charge_parameter
          FROM MP_CHARACTERISTIC C
          WHERE C.CH_id = $1;`,
        [characteristicId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
