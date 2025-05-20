import { RequestHandler } from "express";
import * as userModels from '../models/user'
import z, { string } from 'zod'

export const getAll: RequestHandler = async (req, res)=>{
    const users = await userModels.readAll()

    if(!users){
        res.json({msg: "Não existe users"})
        return
    }
    res.json({ users: users })
    return
}

export const post: RequestHandler = async (req, res)=>{
    const validatorDatas = z.object({
        name: string(),
        email: string().email(),
        tel: string()
    })

    const dataUser = validatorDatas.safeParse(req.body)

    if(!dataUser.success){
        res.json({msg:"Dados inválidos"})
        return
    }

    const user = await userModels.create(dataUser.data)

    if(!user){
        res.json({msg: "Não foi possivel cadastrar"})
        return
    }
    res.json({userCreated: user})
    return
}
