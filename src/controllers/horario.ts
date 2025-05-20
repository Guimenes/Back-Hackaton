import { RequestHandler } from "express";
import * as horarioModels from '../models/horario'
import z, { string } from 'zod'

export const post: RequestHandler = async (req, res)=>{
    const validatorDatas = z.object({
        name: string(),
        dia: string(),
        hora: string(),
        servico: string()
    })

    const dataHorario = validatorDatas.safeParse(req.body)

    if(!dataHorario.success){
        res.json({msg:"Dados inválidos"})
        return
    }

    const horario = await horarioModels.create(dataHorario.data)

    if(!horario){
        res.json({msg: "Não foi possivel cadastrar o agendamento"})
        return
    }
    res.json({userCreated: horario})
    return
}

export const getAll: RequestHandler = async (req, res)=>{
    const horarios = await horarioModels.readAll()

    if(!horarios){
        res.json({msg:"Não existe agendamentos"})
        return
    }
    res.json({agendamentos: horarios})
    return
}
