import { PrismaClient, Prisma } from "../../generated/prisma"

const prisma = new PrismaClient()

export const readAll = async () => {
    try {
        const users = await prisma.user.findMany()
        return users
    } catch (error) {
        return false
    }
}

type UserPostData = Prisma.Args<typeof prisma.user, 'create'>['data']
export const create = async (dataUser: UserPostData) => {
    try {
        const createUser = await prisma.user.create({
            data: dataUser
        })
        return createUser
    } catch (error) {
        return false
    }
}