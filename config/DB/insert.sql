

--------------- DISCOUNT WITHOUT DESCRIPTION  ------------------------
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Welcome', 0.10);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('COVID-19', 0.30);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Black Friday', 0.50);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('10-Shipments', 0.10);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Mother`s day', 0.15);
INSERT INTO MP_DISCOUNT (DI_NAME, DI_PERCENTAGE) VALUES ('Mr.Postel', 0.10);


/* MP_LANGUAGE */ 

insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('English','EN');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Espanol','ES');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Francais','FR');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Deutsch','DE');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Italiano','IT');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Portugues','PT');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Catala','CA');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Galego','GL');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Dansk','DA');
insert into MP_LANGUAGE (LA_name, LA_iso_code) values ('Afrikaans','AF');

/* MP_STATUS */ 

insert into MP_STATUS (ST_name, ST_description) values ('Out For Delivery', 'Left the office');
insert into MP_STATUS (ST_name, ST_description) values ('In Transit', 'The package is on the way');
insert into MP_STATUS (ST_name, ST_description) values ('Delivered', 'The package arrived at its destination');
insert into MP_STATUS (ST_name, ST_description) values ('Enabled', 'This account has full access to all the functionalities of the system');
insert into MP_STATUS (ST_name, ST_description) values ('Disabled', 'This account has limited access to all the functionalities of the system.');

/* MP_DIRECTION */

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

/* MP_RECEIVER */ 

insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-654-65-724-0', 'Camila','Mercedes','Escalante','Ramos','+1 (954) 452 1235','camrc56@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-18-511-0', 'Pedro','Alonzo','Ortega','Blanco','+1 (954) 611 1955','arm1998@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-254-65-711-0', 'Jose','Armando','Villegas','Melo','+1 (954) 630 2235','josevill55@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-18-520-0', 'Luis','Ramon','Godoy','Garcia','+1 (954) 212 1200','luisgodoy1988@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-65-552-0', 'Natalia','Valentina','Ramirez','Lodato','+1 (954) 984 2035','natvalen12@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-654-18-714-0', 'Rosa','Isabel','Chirinos','Hernandez','+1 (954) 138 9626','rosaisa55@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-65-412-0', 'Thomas','Javier','Contreras','Nunes','+1 (954) 942 1266','Thomas5665@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-18-169-0', 'Maria','Daniela','Fernandez','Oropeza','+1 (954) 124 2035','Mariafernan888@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-654-33-112-0', 'Raul','Mario','Duran','Romero','+1 (954) 402 1211','rau888@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-33-203-0', 'Jessica','Maria','Carvajales','Lopez','+1 (954) 626 0235','jessmari522@gmail.com');

/* insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('V-15.652.562', 'Camila','Mercedes','Escalante','Ramos','+58 424 958 9665','camrc56@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('V-9.565.563', 'Pedro','Alonzo','Ortega','Blanco','+58 424 653 9895','arm1998@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('V-3.541.542', 'Jose','Armando','Villegas','Melo','+58 416 956 2262','josevill55@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('V-5.541.132', 'Luis','Ramon','Godoy','Garcia','+58 412 985 4652','luisgodoy1988@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('V-22.466.512', 'Natalia','Valentina','Ramirez','Lodato','+58 416 565 2623','natvalen12@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-65-552-0', 'Rosa','Isabel','Chirinos','Hernandez','+1 (954) 365 9546','rosaisa55@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('15.562.269-0', 'Thomas','Javier','Contreras','Nunes','+56 9 2258 5623','Thomas5665@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('22.567.545-0', 'Maria','Daniela','Fernandez','Oropeza','+56 9 1858 5462','Mariafernan888@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('S-514-172-65-112-0', 'Raul','Mario','Duran','Romero','+1 (954) 452 1235','rau888@gmail.com');
insert into MP_RECEIVER (RE_identification, RE_first_name, RE_second_name, RE_last_name, RE_second_last_name, RE_phone_number, RE_email) values ('62588420-A', 'Jessica','Maria','Carvajales','Lopez','+34 565 56 45 26','jessmari522@gmail.com'); */

/* MP_CHARACTERISTIC */ 

insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Fragile',10.00,'$');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Flammable',15.00,'$');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Living animal',20.00,'$');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('Food',5.00,'$');
/* insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('', ,'');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('', ,'');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('', ,'');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('', ,'');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('', ,'');
insert into MP_CHARACTERISTIC (CH_name, CH_charge, CH_charge_parameter) values ('', ,''); */

------------------------ OPTION ----------------------------------------------

INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('No Saturday delivery', 0.27, '$');
INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('Delivery Express', 5.22, '$');
INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('Sunday-Holiday', 2.50, '$');
INSERT INTO MP_OPTION (OP_NAME,OP_CHARGE,OP_CHARGE_PARAMETER) VALUES ('10:30 AM Delivery Requiered',1.45, '$');

/* MP_OFFICE */ 

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

/* MP_CONFIGURATION */

insert into MP_CONFIGURATION (CO_name, CO_value) values ('Service price', 50.00);
insert into MP_CONFIGURATION (CO_name, CO_value) values ('Shipping price', 20.00);
insert into MP_CONFIGURATION (CO_name, CO_value) values ('Delivery start', 5);
/*insert into MP_CONFIGURATION (CO_name, CO_value) values ('', )
insert into MP_CONFIGURATION (CO_name, CO_value) values ('', )
insert into MP_CONFIGURATION (CO_name, CO_value) values ('', )
insert into MP_CONFIGURATION (CO_name, CO_value) values ('', )
insert into MP_CONFIGURATION (CO_name, CO_value) values ('', )
insert into MP_CONFIGURATION (CO_name, CO_value) values ('', )
insert into MP_CONFIGURATION (CO_name, CO_value) values ('', ) */

--------------------- USER -------------------------------
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('E0434129394','Elliott','Pennington','Moran','03/08/03','test@gmail.com','test','1-854-854-3666','Client',1,4);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('M1675380957','Clark','Le','Madden','12/01/46','a@gmail.com','test','1-824-942-7188','Client',2,5);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('T1696884047','Suki','Berry','House','02/06/98','magna@metus.com','test','1-535-356-8713','Client',1,4);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('C5438881928','Ferdinand','Villarreal','Cooke','05/06/61','iaculis@risusInmi.net','IRU34XTC2RS','1-536-668-3535','Client',2,5);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('T7384269256','Gannon','Mays','Forbes','01/10/46','nunc.est@ligulaeu.com','YBO31ZLW2YS','1-482-842-5599','Client',2,4);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('M5733354249','Joshua','Mccarthy','Graham','06/03/99','sit.amet.risus@felis.ca','QXS77VNL2JG','1-985-395-6062','Client',2,4);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('Q9819149190','Kennedy','Pace','Henderson','11/05/85','Duis.elementum@iaculis.org','IEA76LSK7HP','1-648-546-5573','Client',2,4);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('P1641218225','Kelsie','Strong','Hill','09/07/73','enim.sit@Cum.net','AUI94RAD8XE','1-846-211-9400','Client',1,5);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('A7224664271','Denise','Swanson','Stark','04/06/40','fermentum.convallis@lacusMaurisnon.edu','HLA73VNA1UF','1-292-640-2276','Client',1,4);
INSERT INTO MP_USER (US_IDENTIFICATION,US_FIRST_NAME,US_LAST_NAME,US_SECOND_LAST_NAME,US_BIRTHDAY,US_EMAIL,US_PASSWORD,US_PHONE_NUMBER,US_CHARGE,US_FK_LANGUAGE,US_FK_STATUS) VALUES ('Y8247799341','Nissim','Harris','David','08/06/61','convallis@eros.ca','PBC31UGJ6ES','1-918-863-9657','Admin',1,4);

----------------------------SHIPMENT-----------------------------------------------

INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('01/22/20','01/25/20','Business',360,2,5,9,2);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('01/02/20','01/15/20','Business',36,2,5,9,2);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('01/08/20','01/10/20','Shopping',149,3,2,8,3);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('04/05/20','06/05/20','Shopping',72,4,5,7,8);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('03/04/20','03/10/20','Gift',95,5,4,6,5);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('05/11/20','05/20/20','Travel',27,6,5,5,4);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('04/04/20','04/13/20','Gift',176,7,2,4,7);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('05/28/20','05/31/20','Gift',220,5,5,3,1);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('05/24/20','05/26/20','Gift',140,2,8,2,10);
INSERT INTO MP_SHIPMENT (SH_SHIPMENT_DATE,SH_estimated_date_of_arrival,SH_PURPOSE,SH_TOTAL,SH_FK_OFFICE_ORIGIN,SH_FK_DIRECTION_DESTINATION,SH_FK_USER,SH_FK_RECEIVER) VALUES ('01/24/20','01/30/20','Travel',123,8,8,1,9);

-------- DISCOUNT - USER ----------------------
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER,DIUS_FK_SHIPMENT) VALUES ('Used',3,1,5);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER,DIUS_FK_SHIPMENT) VALUES ('Used',4,6,2);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER,DIUS_FK_SHIPMENT) VALUES ('Used',6,7,9);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER,DIUS_FK_SHIPMENT) VALUES ('Used',5,6,7);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER,DIUS_FK_SHIPMENT) VALUES ('Used',6,9,2);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER) VALUES ('Available', 1,9);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER) VALUES ('Available', 4,1);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER) VALUES ('Available', 1,10);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER) VALUES ('Available', 2,1);
INSERT INTO MP_DIS_USE (DIUS_VALIDITY,DIUS_FK_DISCOUNT,DIUS_FK_USER) VALUES ('Available', 1,10);

----------------------------- PACKAGE ------------------------------------

INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (2.07,11.67,7.78,2.36,29,'Phone',5);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (2.2,2.61,13.04,5.99,86,'Chair',10);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (5.45,5.35,8.47,4.52,45,'Cellphone',9);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (6.01,5.33,15.96,1.05,31,'Food',9);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (11.1,1.54,19.24,1.49,90,'H&M dresses',3);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (4.76,9.89,6.72,1.06,67,null,10);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (10.71,16.48,6.08,0.58,50,'Leather jacket',10);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (0.54,0.51,14.16,10.89,47,'Kitchen',1);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (1.85,0.43,1.95,1.42,63,'Clothes',6);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (15.44,4.25,11.12,8.89,62,'Pet/Cat',6);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (4.76,9.89,6.72,1.06,67,null,4);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (10.71,16.48,6.08,0.58,50,'Leather jacket',2);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (0.54,0.51,14.16,10.89,47,'Kitchen',1);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (1.85,0.43,1.95,1.42,63,'Clothes',8);
INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_DESCRIPTION,PA_FK_SHIPMENT) VALUES (15.44,4.25,11.12,8.89,62,'Pet/Cat',7);

/* MP_STOP */

insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-27 09:00:00', 1, 1, 22);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-27 08:30:00', 2, 1, 24);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-27 06:00:00', 3, 1, 26);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-27 11:15:00', 4, 1, 28);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-27 12:45:00', 5, 1, 30);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-25 10:10:00', 6, 1, 11);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-25 12:50:00', 6, 2, 12);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-26 08:20:00', 6, 2, 13);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-26 12:10:00', 6, 2, 14);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-23 12:30:00', 7, 1, 16);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-24 07:00:00', 7, 2, 17);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-24 11:10:00', 7, 2, 18);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-21 11:20:00', 8, 1, 30);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-23 08:00:00', 8, 2, 12);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-23 12:40:00', 8, 2, 13);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-26 9:00:00', 8, 2, 14);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-26 10:50:00', 8, 2, 15);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-27 12:00:00', 9, 1, 24);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-28 12:00:00', 9, 2, 25);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-29 12:00:00', 9, 2, 26);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-30 12:00:00', 9, 2, 27);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-05-01 12:00:00', 9, 2, 28);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-02 12:00:00', 9, 3, 29);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-20 11:00:00', 10, 1, 10);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-21 12:00:00', 10, 2, 8);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-23 07:00:00', 10, 2, 7);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-23 12:00:00', 10, 2, 6);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-26 08:00:00', 10, 2, 5);
insert into MP_STOP (ST_date, ST_FK_shipment, ST_FK_status, ST_FK_direction) values ('2020-04-27 09:00:00', 10, 3, 4);

--------------------- SHI- OPT -------------------------------

INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (7,2);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (1,1);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (9,3);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (3,3);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (10,3);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (5,2);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (1,4);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (1,4);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (7,4);
INSERT INTO MP_SHI_OPT (SHOP_FK_SHIPMENT,SHOP_FK_OPTION) VALUES (1,1);