import { Login,getCurrentUser } from '../controllers/user.controller'
import { Router } from 'express'

const route = Router()

route
    .post('/api/login', Login)
    .get('/api/getCurrentUser', getCurrentUser)

export default route
