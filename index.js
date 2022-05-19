import chalk from 'chalk'
import fs from 'fs'
import path, { resolve } from 'path'

let text = 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo. São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.)'

function handleError(err)
{
    console.log(chalk.red(`${err.code} invalid path`))
}

function extract(text)
{
    //console.log(chalk.bgMagenta(text))
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm; //regular expression for search links 
    const responsesRegex = []
    let temp
    while((temp = (regex.exec(text))) !== null)
    {
        //console.log(chalk.bgYellow.black(temp))
        responsesRegex.push({
            'key' : temp[1],
            'url' : temp[2]
        })
        // console.log(chalk.green(`${responsesRegex[i].key}  ${responsesRegex[i].url}`))
        // i++
    }
    
    return responsesRegex === 0 ? 'links not found' : responsesRegex

}



export default async function readFile(pathFile)
{
    
    try
    {
        let files = await fs.promises.readdir(pathFile,{encoding:'utf-8'})
        const result = await  Promise.all(files.map(async(f)=>{
            let path = `${pathFile}/${f}`
            let text = await fs.promises.readFile(path,'utf-8')
            return extract(text)
        }))
        return result
    }
    catch(e)
    {
        handleError(e)
    }
    //console.log(chalk.red(result))
   

    try
    {
        let files = await fs.promises.readdir(pathFile,{encoding:'utf-8'})
        console.log("Files in path:",files)
        files.map(async (f) => {
            console.log("this file:",f)
            let text = await fs.promises.readFile(`${pathFile}/${f}`,'utf-8')
            //console.log(chalk.bgRed(text))
            return extract(text)
        })
      
        //console.log(chalk.blue((extract(text))))
    
    }
    catch(e)
    {
        handleError(e)
    }


}


// console.log(chalk.red("package version 1.0"))
// readFile('texto1.md')
//extract(text)