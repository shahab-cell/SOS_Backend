export const createSOSRequest = async (
  latitude,
  longitude,
  address,
  responder,
  notes
) => {
  const newSOS = new SOS({
    userId: req.user.id, // from verifyToken middleware
    location: {
      latitude,
      longitude,
      address,
    },
    responder,
    notes,
  })

  const savedSOS = await newSOS.save()

  return savedSOS
}
