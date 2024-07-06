import { config } from "../config";

const { cabecera } = config;
import fs from "fs";
export const registerFormatter = (registro: string, nro: number) => {
  let data_registro = {};
  let logs = [];
  if (!(registro.length === cabecera.length)) {
    console.log(
      `El registro ${nro} no cuenta con ${cabecera.length} columnas!`
    );
    return;
  }
  for (let i = 0; i < registro.length; i++) {
    let data;
    if (i == 0) {
      data = isAlphanumeric(registro[i]) ? registro[i] : "";
      if (!isAlphanumeric(registro[i]))
        createLog(
          nro,
          `El campo nro. ${i} de la fila ${nro} no es un caracter alfanumérico, tiene el siguiente valor ${registro[i]}!`
        );
    }
    if (i == 1) {
      data = registro[i];
    }
    if (i === 2 || i === 3) {
      data = convertToNumberIfRowIsValid(registro[i]);
      if (!isNumeric(registro[i]))
        createLog(
          nro,
          `El campo nro. ${i} de la fila ${nro} no es un caracter numérico, tiene el siguiente valor ${registro[i]}!`
        );
    }
    Object.assign(data_registro, { [cabecera[i].name]: data });
  }
  if (nro !== 1) return data_registro;
  return;
};
const createLog = (nro: number, description: string) => {
  let data = fs.readFileSync("logs.json", "utf8");
  const logsFilePath = "logs.json";
  if (!fs.existsSync(logsFilePath) || JSON.stringify(data) !== "[]") {
    fs.writeFileSync(logsFilePath, JSON.stringify([]));
  }
  if (nro !== 1) {
    let formatData: any[] = JSON.parse(data);
    let new2 = [
      ...formatData,
      {
        fila: nro,
        description: description,
      },
    ];
    fs.writeFileSync("logs.json", JSON.stringify(new2));
  }
};
export const isNumeric = (value: string): boolean => {
  return /^\d+(\.\d+)?$/.test(value);
};

const isAlphanumeric = (value: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(value);
};

const convertToNumberIfRowIsValid = (value: string): number | string => {
  if (isNumeric(value)) {
    return parseFloat(value);
  } else {
    return value;
  }
};
