import fs from "fs";
export const getLogs = async () => {
  let logs = await fs.readFileSync("logs.json", "utf8");
  //   console.log(logs);
  return logs;
};
