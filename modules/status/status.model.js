module.exports = {
  getStatusByName: function (con, name) {
    return con
      .query(`SELECT * FROM MP_STATUS WHERE ST_NAME = $1;`, [name])
      .catch((error) => {
        return new Error(error);
      });
  },
};
