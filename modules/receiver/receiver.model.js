module.exports = {
  createReceiver: function (con, body) {
    return con
      .query(
        `insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) 
            values ($1,$2,$3,$4,$5,$6,$7) returning re_id`,
        [
          body.identification,
          body.firstName,
          body.second_name,
          body.lastName,
          body.second_last_name,
          body.phoneNumber,
          body.email,
        ]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
