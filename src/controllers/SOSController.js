import express from 'express'
import SOS from '../models/SOSRequestModel.js' // adjust path if needed
import { createSOSRequest } from '../repositories/SOSRepository.js'

// POST /api/sos
export const SOSRequest = async (req, res) => {
  try {
    const { latitude, longitude, address, responder, notes } = req.body

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json(
          createResponse(true, 'Latitude and longitude are required', [], '')
        )
    }

    const newSOS = createSOSRequest(
      latitude,
      longitude,
      address,
      responder,
      notes
    )

    if (newSOS) {
      return res
        .status(201)
        .json(createResponse(false, 'SOS created successfully', [newSOS], ''))
    }
  } catch (err) {
    return res.status(500).json(createResponse(true, 'Server error', [], ''))
  }
}
