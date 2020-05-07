module.exports = {
  createPackage: function (con, body, shipment, i) {
    return con
      .query(
        "INSERT INTO MP_PACKAGE (PA_WIDTH,PA_HEIGHT,PA_LENGTH,PA_WEIGHT,PA_COST,PA_FK_SHIPMENT,PA_FK_CHARACTERISTIC) VALUES ($1,$2,$3,$4,$5,$6,$7) returning pa_id",
        [
          body.packages[i].width,
          body.packages[i].height,
          body.packages[i].lenght,
          body.packages[i].weight,
          body.packages[i].cost,
          body.packages[i].description,
          shipment[0].sh_id,
          body.packages[i].characteristic,
        ]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
  getPackageCharacteristics: function (con, packageId) {
    return con
      .query(
        `SELECT C.CH_name, C.CH_charge, C.CH_charge_parameter
          FROM MP_PAC_CHA PC, MP_CHARACTERISTIC C
          WHERE C.CH_id = PC.PACH_FK_characteristic AND PC.PACH_FK_package = $1;`,
        [packageId]
      )
      .catch((error) => {
        return new Error(error);
      });
  },
};
