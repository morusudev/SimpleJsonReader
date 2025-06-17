import express, {Request, Response} from "express"
import fs from "fs"
import { request } from "http"
import { stringify } from "querystring"

const app = express()

app.get("/", (req: Request, res: Response)=>{
    res.send("Filtro de Users ON")
})

app.get("/users", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não encontrado")
        }
        const fileContent: string = fs.readFileSync("users.json", "utf8")
        res.send(fileContent)
    }
    catch(error){
        res.send(error.message)
    }
})

app.get("/users/name", (req: Request, res: Response)=>{
    interface User{
        id: number,
        nome: string,
        email?: string
    }

    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersNameList: string[] = []

        for(let users in usersData){
            usersNameList.push(usersData[users].nome)
        }
        res.send(usersNameList)

    }catch(error){
        res.send(error.message)
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})
