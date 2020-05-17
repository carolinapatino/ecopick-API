module.exports = {
  getOfficeDirection: function (con, id) {
    return con
      .query(
        `SELECT OF_ID, DI_ID, DI_PRIMARY_LINE, DI_SECONDARY_LINE, DI_CITY, DI_STATE, DI_COUNTRY, DI_ZIP_CODE
          FROM MP_OFFICE, MP_DIRECTION
          WHERE OF_FK_DIRECTION = DI_ID AND OF_ID = $1`,
        [id]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
