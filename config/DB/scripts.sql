----- CREATE -----

-------------------- CREATE DB --------------------
-- CREATE DATABASE "MrPostel"
--    WITH 
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    CONNECTION LIMIT = -1;

SET DATESTYLE TO "ISO, MDY";

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
  DI_secondary_line VARCHAR,
  DI_city VARCHAR NOT NULL,
  DI_state VARCHAR NOT NULL,
  DI_country VARCHAR NOT NULL,
  DI_zip_code INTEGER
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
  US_identification VARCHAR,
  US_first_name VARCHAR NOT NULL,
  US_second_name VARCHAR,
  US_last_name VARCHAR NOT NULL,
  US_second_last_name VARCHAR,
  US_birthday DATE,
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
  OF_FK_direction INTEGER NOT NULL,
  OF_FK_status INTEGER NOT NULL
);

CREATE TABLE MP_SHIPMENT (
  SH_id SERIAL PRIMARY KEY,
  SH_tracking_id SERIAL,
  SH_shipment_date TIMESTAMP NOT NULL,
  SH_estimated_date_of_arrival TIMESTAMP,
  SH_purpose VARCHAR,
  SH_total FLOAT NOT NULL,
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
  ST_date TIMESTAMP NOT NULL,
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
  PA_description VARCHAR,
  PA_cost FLOAT NOT NULL,
  PA_FK_shipment INTEGER NOT NULL,
  PA_FK_characteristic INTEGER
);


CREATE TABLE MP_SHI_OPT (
  SHOP_id SERIAL PRIMARY KEY,
  SHOP_FK_shipment INTEGER NOT NULL,
  SHOP_FK_option INTEGER NOT NULL
);

----- ALTER -----

ALTER TABLE MP_LANGUAGE ADD CONSTRAINT unique_language_iso_code UNIQUE(LA_iso_code);

ALTER TABLE MP_CHARACTERISTIC ADD CONSTRAINT check_characteristic_charge_parameter CHECK(CH_charge_parameter IN ('$', '%'));

ALTER TABLE MP_OPTION ADD CONSTRAINT check_option_charge_parameter CHECK(OP_charge_parameter IN ('$', '%'));

ALTER TABLE MP_USER ADD CONSTRAINT unique_user_identification UNIQUE(US_identification);
ALTER TABLE MP_USER ADD CONSTRAINT unique_user_email UNIQUE(US_email);
ALTER TABLE MP_USER ADD CONSTRAINT check_user_charge CHECK(US_charge IN ('Admin', 'Client'));
ALTER TABLE MP_USER ADD CONSTRAINT fk_user_language FOREIGN KEY(US_FK_language) REFERENCES MP_LANGUAGE(LA_id);
ALTER TABLE MP_USER ADD CONSTRAINT fk_user_status FOREIGN KEY(US_FK_status) REFERENCES MP_STATUS(ST_id);

ALTER TABLE MP_SHIPMENT ADD CONSTRAINT unique_shipment_tracking_id UNIQUE(SH_tracking_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_office_origin FOREIGN KEY(SH_FK_office_origin) REFERENCES MP_OFFICE(OF_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_direction_destination FOREIGN KEY(SH_FK_direction_destination) REFERENCES MP_DIRECTION(DI_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_user FOREIGN KEY(SH_FK_user) REFERENCES MP_USER(US_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_receiver FOREIGN KEY(SH_FK_receiver) REFERENCES MP_RECEIVER(RE_id);
SELECT setval('mp_shipment_sh_tracking_id_seq', 9999);

ALTER TABLE MP_OFFICE ADD CONSTRAINT fk_office_direction FOREIGN KEY(OF_FK_direction) REFERENCES MP_DIRECTION(DI_id);
ALTER TABLE MP_OFFICE ADD CONSTRAINT fk_office_status FOREIGN KEY(OF_FK_status) REFERENCES MP_STATUS(ST_id);

ALTER TABLE MP_DIS_USE ADD CONSTRAINT check_dis_use_validity CHECK(DIUS_validity IN ('Available', 'Used'));
ALTER TABLE MP_DIS_USE ADD CONSTRAINT fk_dis_use_discount FOREIGN KEY(DIUS_FK_discount) REFERENCES MP_DISCOUNT(DI_id);
ALTER TABLE MP_DIS_USE ADD CONSTRAINT fk_dis_use_user FOREIGN KEY(DIUS_FK_user) REFERENCES MP_USER(US_id);
ALTER TABLE MP_DIS_USE ADD CONSTRAINT fk_dis_use_shipment FOREIGN KEY(DIUS_FK_shipment) REFERENCES MP_SHIPMENT(SH_id);

ALTER TABLE MP_STOP ADD CONSTRAINT fk_stop_status FOREIGN KEY(ST_FK_status) REFERENCES MP_STATUS(ST_id);
ALTER TABLE MP_STOP ADD CONSTRAINT fk_stop_direction FOREIGN KEY(ST_FK_direction) REFERENCES MP_DIRECTION(DI_id);
ALTER TABLE MP_STOP ADD CONSTRAINT fk_stop_shipment FOREIGN KEY(ST_FK_shipment) REFERENCES MP_SHIPMENT(SH_id);

ALTER TABLE MP_PACKAGE ADD CONSTRAINT fk_package_shipment FOREIGN KEY(PA_FK_shipment) REFERENCES MP_SHIPMENT(SH_id);
ALTER TABLE MP_PACKAGE ADD CONSTRAINT fk_package_characteristic FOREIGN KEY(PA_FK_characteristic) REFERENCES MP_CHARACTERISTIC(CH_id);


ALTER TABLE MP_SHI_OPT ADD CONSTRAINT fk_shi_opc_shipment FOREIGN KEY(SHOP_FK_shipment) REFERENCES MP_SHIPMENT(SH_id);
ALTER TABLE MP_SHI_OPT ADD CONSTRAINT fk_shi_opc_option FOREIGN KEY(SHOP_FK_option) REFERENCES MP_OPTION(OP_id);

----- INSERT -----

INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Welcome', 0.10);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('COVID-19', 0.30);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Black Friday', 0.50);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('10-Shipments', 0.10);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Mother`s day', 0.15);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Mr.Postel', 0.10);

insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('English','EN');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Espanol','ES');

insert into MP_STATUS (ST_name, ST_description) values ('Out For Delivery', 'Left the office');
insert into MP_STATUS (ST_name, ST_description) values ('In Transit', 'The package is on the way');
insert into MP_STATUS (ST_name, ST_description) values ('Delivered', 'The package arrived at its destination');
insert into MP_STATUS (ST_name, ST_description) values ('Enabled', 'This account has full access to all the functionalities of the system');
insert into MP_STATUS (ST_name, ST_description) values ('Disabled', 'This account has limited access to all the functionalities of the system.');

insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('417 West 145th Street', 'Harlem, SUITE 5A-1204','New York','New York','United States',10031);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('605 Euclid Ave ', 'Apartment #206','Florida','Miami Beach','United States', 33139);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('1440 Pennsylvania Ave', 'SUITE D-04','Florida','Miami Beach','United States', 33139);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('255 West 24th Street', 'Apartment 3C-04','Florida','Miami Beach','United States', 33140);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('12780 Maple Rd', '#303','Florida','North Miami','United States', 33181);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('1241 14th St', '#5','Florida','Miami Beach','United States', 33139);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('Midtown West', '#102','New York','New York','United States', 10003);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('North Milwaukee Avenue', '2958',' Illinois','Chicago','United States', 60618);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('100 West Monroe Street', 'Chicago Loop',' Illinois','Chicago','United States', 60618);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('5952 North Lincoln Avenue', '#022','Illinois','Chicago','United States', 60618);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('1212 S Michigan Ave', 'Apartment 201','Illinois','Chicago','United States', 60605);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('710 W Grand Ave', '#102','Illinois','Chicago','United States', 60654);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('220 W Illinois St', 'Apartment C58',' Illinois','Chicago','United States', 60654);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('225 N Columbus Dr', 'Apartment D14',' Illinois','Chicago','United States', 60601);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('504 N Green St,', '#022','Illinois','Chicago','United States', 60642);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('1330 Pennsylvania Ave', '#111','Florida','Miami Beach','United States', 33139);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('800 West Marietta St NW', '#142','Atlanta','Georgia','United States', 30318);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('North Milwaukee Avenue', 'Apartment 28','Atlanta','Georgia','United States', 30329);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('100 Windmont Dr NE', 'Apartment 220','Atlanta','Georgia','United States', 30329);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('3610 Buford Hwy NE', '#052','Atlanta','Georgia','United States', 30329);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('7227 Peachtree Dunwoody Rd', '#404','Atlanta','Georgia','United States', 30328);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('210 Pryor St SW', '#102','Atlanta','Georgia','United States', 30303);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('710 Peachtree St NE', 'Apartment 88','Atlanta','Georgia','United States', 30308);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('782 Peachtree St NE', 'Apartment M38','Atlanta','Georgia','United States', 30308);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('2822 Buford Hwy NE', '#022','Atlanta','Georgia','United States', 30329);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('125 W Dyna Dr,', '#555','Houston','Texas','United States', 77060);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('1755 Wyndale St', '#802','Houston','Texas','United States', 77030);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('9911 Whitehurst Dr', '2958','Dallas','Texas','United States', 75243);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('303 Memorial City Way, Houston, TX 77024', 'Apartment 159','Laredo','Texas','United States', 77024);
insert into MP_DIRECTION (DI_primary_line, DI_secondary_line, DI_city, DI_state, DI_country, DI_zip_code) values ('101 N Brookside Dr', 'Apartment 98','Dallas','Texas','United States', 75214);

insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Fragile',10.00,'$');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Flammable',15.00,'$');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Living animal',20.00,'$');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Food',5.00,'$');

INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('No Saturday delivery', 0.27, '$');
INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('Delivery Express', 5.22, '$');
INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('Sunday-Holiday', 2.50, '$');
INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('10:30 AM Delivery Requiered',1.45, '$');

insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Atlanta Pryor', 22, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Atlanta Peachtree', 24, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Texas Dyna', 26, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Texas Whitehurst', 28, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Texas Brookside', 30, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Michigan', 11, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Pennsylvania', 16, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel North Lincoln', 10, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel North Milwaukee', 8, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Midtown West', 7, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel 14th', 6, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Maple', 5, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Grand', 12, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Illinois', 13, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Columbus', 14, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Green', 15, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel West Marietta',17, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Milwaukee', 18, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Buford', 25, 4);
insert into MP_OFFICE (OF_name, OF_FK_DIRECTION, OF_FK_STATUS) values ('Mr.Postel Wyndale', 27, 4);

insert into MP_CONFIGURATION (CO_name, CO_value) values ('Service price', 2.00);
insert into MP_CONFIGURATION (CO_name, CO_value) values ('Shipping price', 2.50);
insert into MP_CONFIGURATION (CO_name, CO_value) values ('Delivery start', 5);