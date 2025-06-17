import express, {Request, Response} from "express"
import fs from "fs"
import { request } from "http"
import { stringify } from "querystring"

const app = express()

interface User{
    id: number,
    nome: string,
    idade: number,
    email?: string,
    genero: string
}

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

app.get("/age/children", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersAgeList: number[] = []

        for(let users in usersData){
            if(usersData[users].idade >= 0 && usersData[users].idade <= 12){
                usersAgeList.push(usersData[users].idade)
            }
            continue
        }
        if(usersAgeList.length === 0){
            throw new Error("Nenhuma criança encontrada!")
        }
        res.send(`Crianças encontradas: ${usersAgeList.length}: \n\n ${usersAgeList.join(", ")}`)
    }catch(error){
        res.send(error.message)
    }
})

app.get("/age/teen", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersAgeList: number[] = []

        for(let users in usersData){
            if(usersData[users].idade > 12 && usersData[users].idade < 18){
                usersAgeList.push(usersData[users].idade)
            }
            continue
        }
        if(usersAgeList.length === 0){
            throw new Error("Nenhuma adolescente encontrada!")
        }
        res.send(`Adolescente encontrados: ${usersAgeList.length}: \n\n ${usersAgeList.join(", ")}`)
    }catch(error){
        res.send(error.message)
    }
})

app.get("/age/adult", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersAgeList: number[] = []

        for(let users in usersData){
            if(usersData[users].idade > 18 && usersData[users].idade < 65){
                usersAgeList.push(usersData[users].idade)
            }
            continue
        }
        if(usersAgeList.length === 0){
            throw new Error("Nenhuma adultos encontrada!")
        }
        res.send(`Adultos encontrados: ${usersAgeList.length}: \n\n ${usersAgeList.join(", ")}`)
    }catch(error){
        res.send(error.message)
    }
})

app.get("/age/old", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersAgeList: number[] = []

        for(let users in usersData){
            if(usersData[users].idade >= 65){
                usersAgeList.push(usersData[users].idade)
            }
            continue
        }
        if(usersAgeList.length === 0){
            throw new Error("Nenhuma idoso encontrada!")
        }
        res.send(`Idosos encontrados: ${usersAgeList.length}: \n\n ${usersAgeList.join(", ")}`)
    }catch(error){
        res.send(error.message)
    }
})

app.get("/genre/male", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersGenreList: string[] = []

        for(let users in usersData){
            if(usersData[users].genero === "Masculino"){
                usersGenreList.push(usersData[users].genero)
            }
            continue
        }
        if(usersGenreList.length === 0){
            throw new Error("Nenhum sexo masculino encontrado!")
        }
        res.send(`Sexo masculino encontrados: ${usersGenreList.length}`)
    }catch(error){
        res.send(error.message)
    }
})

app.get("/genre/female", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersGenreList: string[] = []

        for(let users in usersData){
            if(usersData[users].genero === "Feminino"){
                usersGenreList.push(usersData[users].genero)
            }
            continue
        }
        if(usersGenreList.length === 0){
            throw new Error("Nenhum sexo feminino encontrado!")
        }
        res.send(`Sexo feminino encontrados: ${usersGenreList.length}`)
    }catch(error){
        res.send(error.message)
    }
})

app.get("/genre/other", (req: Request, res: Response)=>{
    try{
        if(!fs.existsSync("users.json")){
            throw new Error("Arquivo não foi encontrado!")
        }
        const usersJsonString: string = fs.readFileSync("users.json", "utf8")
        const usersData: User[] = JSON.parse(usersJsonString)
        const usersGenreList: string[] = []

        for(let users in usersData){
            if(usersData[users].genero === "Outro"){
                usersGenreList.push(usersData[users].genero)
            }
            continue
        }
        if(usersGenreList.length === 0){
            throw new Error("Nenhum sexo outros encontrado!")
        }
        res.send(`Sexo outros encontrados: ${usersGenreList.length}`)
    }catch(error){
        res.send(error.message)
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})
