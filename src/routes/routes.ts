import { Router } from "express"
import * as userController from '../controllers/user'
import * as horarioController from '../controllers/horario'

const router = Router()

router.get('/ping', (req, res)=>{
    res.json({pong:true})
})

//USUARIO
router.get('/user', userController.getAll)
router.post('/user', userController.post)

//HORARIO
router.post('/horario', horarioController.post)
router.get('/horario', horarioController.getAll)

//SERVICOS

export default router