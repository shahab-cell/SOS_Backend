import express from 'express'
import { SOSRequest } from '../controllers/SOSController'

const router = express.Router()

router.post('/createSOSRequest', SOSRequest)

export default router
