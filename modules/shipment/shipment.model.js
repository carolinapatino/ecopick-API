module.exports = {
  getShipment: function (con, id) {
    return con
      .query(
        `SELECT sh_tracking_id as TrackingID ,sh_shipment_date as Delivered, sh_estimated_date_of_arrival as Arrival ,sh_total as Amount ,
        o.of_name as Office, 
        CONCAT(d.di_primary_line, CONCAT(', ', CONCAT (d.di_secondary_line, CONCAT ( ', ', CONCAT (d.di_city, CONCAT (', ', CONCAT (d.di_state,CONCAT (', ', CONCAT (d.di_country,  CONCAT(', ',d.di_zip_code)))))))))) AS Direction,
        CONCAT (u.us_first_name, CONCAT (' ' , u.us_last_name))  AS User,
        CONCAT (r.re_first_name, CONCAT (' ', r.re_last_name)) AS Receiver
        FROM mp_shipment, mp_office o, mp_direction d, mp_user u, mp_receiver r 
        WHERE sh_tracking_id=$1 and sh_fk_office_origin = o.of_id and sh_fk_direction_destination = d.di_id and sh_fk_user = u.us_id and sh_fk_receiver = r.re_id`,
        [id]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
