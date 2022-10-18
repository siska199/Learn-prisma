import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express()

app.use(express.json())

const prisma = new PrismaClient()

app.post("/", async(req:Request,res:Response)=>{
    try {
        const {username, password} = req.body
        const user = await prisma.user.create({
            data:{username
                , password}
        })  
        
        res.status(201).json(user)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

app.post("/createManyUser", async(req:Request,res:Response)=>{
    try {
        const {userList} = req.body
        const createUsers = await prisma.user.createMany({
            data : userList
        })
        res.status(200).json(createUsers)
    } catch (error:any) {
        res.status(500).send(error.message)
    }
})

app.post("/createManyCar", async(req:Request, res:Response) => {
    try {
        const {carList} = req.body
        const cars = await prisma.car.createMany({
            data : carList
        })
        res.status(201).json(cars)
    } catch (error : any) {
        res.status(500).send(error.message)
    }
})

app.get("/", async(req:Request,res:Response)=>{
    try {
        const users = await prisma.user.findMany({
            include : {cars:true}
        })
        res.status(200).json(users)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

app.get("/users/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const getUser = await prisma.user.findUnique({
            where: {
                id
            }
        })
        res.status(200).json(getUser)
    } catch (error:any) {
        res.status(500).send(error.message)
    }
})

app.put("/", async(req:Request,res:Response)=>{
    try {
        const {id,username} = req.body

        const updateUser = await prisma.user.update({
            where : {
                id
            },
            data : {
                username
            }
        })
        res.status(200).send(`Update user with id : ${id} is success`)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})
app.delete("/:id", async(req:Request,res:Response)=>{
    try {
        const id = req.params.id
         const deleteUser = await prisma.user.delete({
            where : {
                id
            }
         })
         res.status(201).send(`Delete user with id : ${id} success`)
    } catch (error : any) {
        res.status(500).send(error.message)
    }
})






const PORT = 5000
app.listen(PORT,()=>{
    console.log(`listen to port ${PORT}`)
})