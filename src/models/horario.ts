import { PrismaClient, Prisma } from '../../generated/prisma'

const prisma = new PrismaClient()

type HorarioPostData = Prisma.Args<typeof prisma.horario, 'create'>['data']
export const create = async (dataHorario: HorarioPostData) => {
    try {
        const createHorario = await prisma.horario.create({
            data: dataHorario
        })
        return createHorario
    } catch (error) {
        return false
    }
}

export const readAll = async ()=>{
    try {
        const horarios = await prisma.horario.findMany()
        return horarios
    } catch(error) {
        return false
    }
}