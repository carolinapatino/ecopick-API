module.exports = {
  createReceiver: function (con, body) {
    return con
      .query(
        `insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) 
            values ($1,$2,$3,$4,$5,$6,$7) returning re_id`,
        [
          body.identification,
          body.first_name,
          body.second_name,
          body.last_name,
          body.second_last_name,
          body.phone_number,
          body.email,
        ]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
