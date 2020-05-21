module.exports = {
  JoinOptionShipment: function (con, body, shipment, i) {
    return con
      .query(
        `INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES ($1,$2)`,
        [shipment[0].sh_id, body.options[i].option]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getAllOptions: function (con) {
    return con.query(`Select * from mp_option`).catch((error) => {
      return new Error(error);
    });
  },
};
