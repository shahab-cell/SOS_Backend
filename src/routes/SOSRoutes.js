import express from 'express'
import {
  findNearest,
  SOSRequest,
  updateUserLocation,
} from '../controllers/SOSController.js'
import { protect } from '../middlewares/protectMiddleware.js'

const router = express.Router()

router.post('/createSOSRequest', SOSRequest)
router.post('/updateUserLocation', protect, updateUserLocation)
router.get('/findNearest', findNearest)

export default router
