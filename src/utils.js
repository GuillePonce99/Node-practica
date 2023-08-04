import fs from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const read = async (file) => {
  try {
    let result = await fs.promises.readFile(__dirname + "/" + file, "utf-8")
    let data = await JSON.parse(result)
    return data
  }
  catch (error) {
    console.log(error);
  }
}


const write = async (file, data) => {

  try {
    await fs.promises.writeFile(__dirname + "/" + file, JSON.stringify(data))
    return true;
  }
  catch (error) {
    console.log(error);
  }
}


export default { read, write };