module.exports = {
  getDiscount: function (con, userId) {
    return con
      .query(
        `Select d.di_name, d.di_percentage, d.di_id from mp_dis_use du, mp_discount d, mp_user u
        where du.dius_fk_user = u.us_id and du.dius_fk_discount = d.di_id and du.dius_validity = 'Available' and u.us_id = $1`,
        [userId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getDiscountByName: function (con, name) {
    return con
      .query(
        `Select d.di_percentage, d.di_id from mp_discount d
        where d.di_name = $1`,
        [name]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  useDiscount: function (con, body, shipment) {
    return con
      .query(
        `Update mp_dis_use set dius_validity = 'Used', dius_fk_shipment = $1 
        where dius_fk_user = $2 and dius_fk_discount = $3 RETURNING dius_id`,
        [shipment, body.shipment.user, body.discount]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  assignDiscount: function (con, userId, discountId) {
    return con
      .query(
        `INSERT INTO MP_DIS_USE (DIUS_FK_USER, DIUS_FK_DISCOUNT, DIUS_VALIDITY) VALUES ($1, $2, 'Available')`,
        [userId, discountId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
