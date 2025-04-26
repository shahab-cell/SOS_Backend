import express from 'express'
import SOS from '../models/SOSRequestModel.js' // adjust path if needed
import { createSOSRequest } from '../repositories/SOSRepository.js'
import User from '../models/userModel.js'

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

export const updateUserLocation = async (req, res) => {
  const { longitude, latitude } = req.body
  const user = req.user

  const updatedUser = await User.findOneAndUpdate(
    { email: user.email }, // Search by email
    {
      $set: {
        permanentLocation: {
          type: 'Point',
          coordinates: [longitude, latitude], // Update with new coordinates
        },
      },
    },
    { new: true } // Return the updated user
  )

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({
    message: 'Location updated successfully',
    user: updatedUser,
  })
}

export const findNearest = async (req, res) => {
  const { lat, lng } = req.query

  const latitude = parseFloat(lat)
  const longitude = parseFloat(lng)

  if (
    isNaN(latitude) ||
    isNaN(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  ) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' })
  }

  try {
    const nearestResponder = await User.findOne({
      userType: 'responder',
      permanentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          // $maxDistance: 10000, // optional, meters
        },
      },
    })

    if (!nearestResponder || !nearestResponder.permanentLocation?.coordinates) {
      return res.status(404).json({ error: 'No nearby responder found' })
    }

    const [responderLng, responderLat] =
      nearestResponder.permanentLocation.coordinates

    return res.json({
      latitude: responderLat,
      longitude: responderLng,
    })
  } catch (err) {
    console.error('Error finding nearest responder:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
