module.exports = {
  getDirection: function (con, id) {
    return con
      .query(
        `SELECT DI_ID, DI_PRIMARY_LINE, DI_SECONDARY_LINE, DI_CITY, DI_STATE, DI_COUNTRY, DI_ZIP_CODE
          FROM MP_DIRECTION
          WHERE DI_ID = $1`,
        [id]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
