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
  createDirection: function (con, direction) {
    return con
      .query(
        `INSERT INTO MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING DI_ID;`,
        [
          direction.primaryLine,
          direction.secondaryLine,
          direction.city,
          direction.state,
          direction.country,
          direction.zipCode,
        ]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
