import csvParser from "csv-parser";
("csv-parser");
import fs from "fs";
import { registerFormatter } from "../utils/fileValidator";
import { createMockFile } from "../utils/createMockFile";

export const fileRegisterService = async (file_path: string) => {
  try {
    const results: any = [];
    let format_regs = [];
    let archivo_name = "register2.json";
    await fs
      .createReadStream(file_path)
      .pipe(
        csvParser({
          separator: ",",
          quote: '"',
          escape: '"',
          headers: true,
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => {
        let number = 1;
        for (let fila of results) {
          let reg = fila["_0"];
          let registros = reg.split(";");
          let format = registerFormatter(registros, number);
          if (format) {
            format_regs.push(format);
          }
          number++;
        }
        createMockFile(2, format_regs);
      })
      .on("error", (error: string) => {
        console.error("Error leyendo el archivo CSV:", error);
      });

    const data = await fs.readFileSync(archivo_name, "utf8");
    const formatData = JSON.parse(data);

    return formatData;
  } catch (error) {
    throw new Error(error as string);
  }
};
