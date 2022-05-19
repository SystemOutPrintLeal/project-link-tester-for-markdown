
import chalk from "chalk"
import FILE_READER from "./index.js"
import HTTP from "./http.js"
const path = process.argv



async function preProcessPath(path_md)
{
    //console.log(path_md)
    let response = await FILE_READER(path_md[2])
    console.log(chalk.bgYellow.black.bold('links:'),(response.length))
    if (path_md[3] === '--validate')
    {
        let res = await HTTP(response)
        console.log(res)
    }
    
}


preProcessPath(path)

