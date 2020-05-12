module.exports = {
  createUser: function (con, body) {
      return con
        .query(
          "INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_SECOND_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            body.identification,
            body.first_name,
            body.second_name,
            body.last_name,
            body.second_last_name,
            body.birthday,
            body.email,
            body.password,
            body.phone_number,
            body.charge,
            body.id_language,
            body.id_status,
          ]
        )
        .catch((error) => {
          return new Error(error);
        });
    },
     validateUser: function (con, body) {
    return con
      .query("SELECT * FROM MP_USER WHERE us_email=$1 and us_password=$2", [
        body.email,
        body.password,
      ])
      .catch((error) => {
        return new Error(error);
      });
   },
    BO_validateUser: function (con, body) {
    return con
      .query("SELECT * FROM MP_USER WHERE us_email=$1 and us_password=$2", [
        body.email,
        body.password,
      ])
      .catch((error) => {
        return new Error(error);
      });
  },
};
