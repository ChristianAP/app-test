import { Request, Response } from "express";
import { fileRegisterService } from "../service/file.services";
import fs from "fs";
import { groupByCode } from "../utils/groupByCode";
import { isNumeric } from "../utils/fileValidator";
import { getLogs } from "../utils/getLogs";

export const readFileController = async (req: Request, res: Response) => {
  try {
    const filePath = "src/file/archivo.csv";
    let registerInfoFile = await fileRegisterService(filePath);

    let product_repetidos = groupByCode(registerInfoFile);

    let stock_total = registerInfoFile.reduce(
      (acu: any, dato: any) =>
        acu + (isNumeric(dato.cantidad) ? parseFloat(dato.cantidad) : 0),
      0
    );

    let logs = await getLogs();
    // console.log({ logs });
    const logs_response = JSON.parse(logs);
    let response_api = {
      products_info: {
        amount_products: registerInfoFile.length,
        list_of_products: registerInfoFile,
      },
      product_repetidos,
      stock_total,
      logs_fallidos: logs_response,
    };
    return res.json({
      status: 200,
      message: response_api,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: error as string,
    });
  }
};

module.exports = { readFileController };
