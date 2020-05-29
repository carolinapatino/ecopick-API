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
  getAllOffices: function (con) {
    return con
      .query(
        `select o.of_id, o.of_name, CONCAT(d.di_primary_line, CONCAT(', ', CONCAT (d.di_secondary_line, CONCAT ( ', ', CONCAT (d.di_city, 
          CONCAT (', ', CONCAT (d.di_state,CONCAT (', ', CONCAT (d.di_country,  CONCAT(', ',d.di_zip_code)))))))))) AS Direction
          from mp_office o, mp_direction d
          where o.of_fk_status = 4 and o.of_fk_direction = d.di_id
          `
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
