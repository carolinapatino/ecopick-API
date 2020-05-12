ALTER TABLE MP_LANGUAGE ADD CONSTRAINT unique_language_iso_code UNIQUE(LA_iso_code);

ALTER TABLE MP_CHARACTERISTIC ADD CONSTRAINT check_characteristic_charge_parameter CHECK(CH_charge_parameter IN ('$', '%'));

ALTER TABLE MP_OPTION ADD CONSTRAINT check_option_charge_parameter CHECK(OP_charge_parameter IN ('$', '%'));

ALTER TABLE MP_USER ADD CONSTRAINT unique_user_identification UNIQUE(US_identification);
ALTER TABLE MP_USER ADD CONSTRAINT unique_user_email UNIQUE(US_email);
ALTER TABLE MP_USER ADD CONSTRAINT check_user_charge CHECK(US_charge IN ('Admin', 'Client'));
ALTER TABLE MP_USER ADD CONSTRAINT fk_user_language FOREIGN KEY(US_FK_language) REFERENCES MP_LANGUAGE(LA_id);
ALTER TABLE MP_USER ADD CONSTRAINT fk_user_status FOREIGN KEY(US_FK_status) REFERENCES MP_STATUS(ST_id);

ALTER TABLE MP_SHIPMENT ADD CONSTRAINT unique_shipment_tracking_id UNIQUE(SH_tracking_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT unique_shipment_qr_code UNIQUE(SH_qr_code);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_office_origin FOREIGN KEY(SH_FK_office_origin) REFERENCES MP_OFFICE(OF_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_direction_destination FOREIGN KEY(SH_FK_direction_destination) REFERENCES MP_DIRECTION(DI_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_user FOREIGN KEY(SH_FK_user) REFERENCES MP_USER(US_id);
ALTER TABLE MP_SHIPMENT ADD CONSTRAINT fk_shipment_receiver FOREIGN KEY(SH_FK_receiver) REFERENCES MP_RECEIVER(RE_id);

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