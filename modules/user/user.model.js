module.exports = {
  // Registro / Inicio de sesión / Cambio de contraseña
  createUser: function (con, body) {
    return con
      .query(
        "INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_SECOND_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING US_ID",
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
  updatePassword: function (con, email, password) {
    return con
      .query(
        "UPDATE MP_USER SET US_password = $1 WHERE US_email=$2 RETURNING US_first_name, US_fk_language",
        [password, email]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  // Manipulación de datos del usuario
  getUsers: function (con, body) {
    return con
      .query(
        `SELECT U.*,
          S.ST_ID AS STATUS_ID, S.ST_NAME AS STATUS_NAME
        FROM MP_USER U, MP_STATUS S
        WHERE U.US_FK_STATUS = S.ST_ID AND US_CHARGE = $1;`,
        [body.charge]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getUser: function (con, id) {
    return con
      .query(
        `SELECT US_FIRST_NAME, US_SECOND_NAME, US_LAST_NAME,
          US_SECOND_LAST_NAME, US_IDENTIFICATION, US_EMAIL, US_PHONE_NUMBER
        FROM MP_USER
        WHERE US_ID = $1;`,
        [id]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
