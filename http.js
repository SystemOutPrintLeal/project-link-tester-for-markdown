import chalk from "chalk"
import fetch from "node-fetch"


function errorHandler(erro)
{
    throw new Error(erro.message)
}

async function statusCheck(urlsToValidade)
{
    const statusAll = await Promise.all(urlsToValidade.map(async url => {
        const res = await fetch(url)
        return `${res.status} - ${res.statusText}`
    }))
    return statusAll
}

export default async function validate(links)
{
    try
    {
        let urls = extractURL(links)
        let statusAll = await statusCheck(urls)
        //console.log(statusAll)
        let urlValidates = createObj(links,statusAll)
        //console.log(urlValidates)
        return (urlValidates)
    }
    catch(e)
    {
        errorHandler(e)
    }
}

function createObj(links,status)
{
    let objectsFull = []
    links.map(file => {
        file.map((link,i)=>{
            
            objectsFull.push({
                "link": link.key,
                "url": link.url,
                "status": status[i]
            })
        })
    })
    return objectsFull
}

function extractURL(links)
{
    let allURLs = []
    links.map(file => {
        file.map(link=>{
            allURLs.push(link.url)
            //console.log(chalk.red(link.url))
        })
    })
    return allURLs
}