import { Router } from "express"
import * as userController from '../controllers/user'

const router = Router()

router.get('/ping', (req, res)=>{
    res.json({pong:true})
})

//USUARIO
router.get('/user', userController.getAll)
router.post('/user', userController.post)

export default router