-------------------- CREATE DB --------------------
-- CREATE DATABASE "MrPostel"
--    WITH 
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    CONNECTION LIMIT = -1;

CREATE TABLE MP_DISCOUNT (
	DI_id SERIAL PRIMARY KEY,
	DI_name VARCHAR NOT NULL,
	DI_percentage FLOAT NOT NULL
);

CREATE TABLE MP_LANGUAGE (
	LA_id SERIAL PRIMARY KEY,
  LA_name VARCHAR NOT NULL,
  LA_iso_code VARCHAR NOT NULL
);

CREATE TABLE MP_STATUS (
  ST_id SERIAL PRIMARY KEY,
  ST_name VARCHAR NOT NULL,
  ST_description VARCHAR NOT NULL
);

CREATE TABLE MP_DIRECTION (
  DI_id SERIAL PRIMARY KEY,
  DI_primary_line VARCHAR NOT NULL,
  DI_secondary_line VARCHAR NOT NULL,
  DI_city VARCHAR NOT NULL,
  DI_state VARCHAR NOT NULL,
  DI_country VARCHAR NOT NULL,
  DI_zip_code INTEGER NOT NULL
);

CREATE TABLE MP_RECEIVER (
  RE_id SERIAL PRIMARY KEY,
  RE_identification VARCHAR NOT NULL,
  RE_first_name VARCHAR NOT NULL,
  RE_second_name VARCHAR,
  RE_last_name VARCHAR NOT NULL,
  RE_second_last_name VARCHAR,
  RE_phone_number VARCHAR,
  RE_email VARCHAR NOT NULL
);

CREATE TABLE MP_CHARACTERISTIC (
  CH_id SERIAL PRIMARY KEY,
  CH_name VARCHAR NOT NULL,
  CH_charge FLOAT NOT NULL,
  CH_charge_parameter CHAR(1) NOT NULL
);

CREATE TABLE MP_OPTION (
  OP_id SERIAL PRIMARY KEY,
  OP_name VARCHAR NOT NULL,
  OP_charge FLOAT NOT NULL,
  OP_charge_parameter CHAR(1) NOT NULL
);

CREATE TABLE MP_CONFIGURATION (
  CO_id SERIAL PRIMARY KEY,
  CO_name VARCHAR NOT NULL,
  CO_value FLOAT NOT NULL
);

CREATE TABLE MP_USER (
  US_id SERIAL PRIMARY KEY,
  US_identification VARCHAR NOT NULL,
  US_first_name VARCHAR NOT NULL,
  US_second_name VARCHAR,
  US_last_name VARCHAR NOT NULL,
  US_second_last_name VARCHAR,
  US_birthday DATE NOT NULL,
  US_photo VARCHAR,
  US_email VARCHAR NOT NULL,
  US_password VARCHAR,
  US_phone_number VARCHAR,
  US_charge VARCHAR NOT NULL,
  US_FK_language INTEGER NOT NULL,
  US_FK_status INTEGER NOT NULL
);

CREATE TABLE MP_OFFICE (
  OF_id SERIAL PRIMARY KEY,
  OF_name VARCHAR NOT NULL,
  OF_FK_direction INTEGER NOT NULL
);

CREATE TABLE MP_SHIPMENT (
  SH_id SERIAL PRIMARY KEY,
  SH_tracking_id INTEGER NOT NULL,
  SH_shipment_date DATE NOT NULL,
  SH_estimated_date_of_arrival DATE,
  SH_total FLOAT NOT NULL,
  SH_qr_code VARCHAR,
  SH_FK_office_origin INTEGER NOT NULL,
  SH_FK_direction_destination INTEGER NOT NULL,
  SH_FK_user INTEGER NOT NULL,
  SH_FK_receiver INTEGER NOT NULL
);

CREATE TABLE MP_DIS_USE (
  DIUS_id SERIAL PRIMARY KEY,
  DIUS_validity VARCHAR NOT NULL,
  DIUS_FK_discount INTEGER NOT NULL,
  DIUS_FK_user INTEGER NOT NULL,
  DIUS_FK_shipment INTEGER
);

CREATE TABLE MP_STOP (
  ST_id SERIAL PRIMARY KEY,
  ST_date DATE NOT NULL,
  ST_FK_status INTEGER NOT NULL,
  ST_FK_direction INTEGER NOT NULL,
  ST_FK_shipment INTEGER NOT NULL
);

CREATE TABLE MP_PACKAGE (
  PA_id SERIAL PRIMARY KEY,
  PA_width FLOAT NOT NULL,
  PA_height FLOAT NOT NULL,
  PA_length FLOAT NOT NULL,
  PA_weight FLOAT NOT NULL,
  PA_cost FLOAT NOT NULL,
  PA_FK_shipment INTEGER NOT NULL,
  PA_FK_characteristic INTEGER
);


CREATE TABLE MP_SHI_OPT (
  SHOP_id SERIAL PRIMARY KEY,
  SHOP_FK_shipment INTEGER NOT NULL,
  SHOP_FK_option INTEGER NOT NULL
);