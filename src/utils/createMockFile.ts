import fs from "fs";

export const createMockFile = (nro: number, registros: any) => {
  fs.writeFileSync(`register${nro}.json`, JSON.stringify(registros));
};
