import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHotelContext } from '../contexts/HotelContext'
import { Star, MapPin, Wifi, Pool, Car, Utensils, Check, ArrowLeft } from 'lucide-react'

const HotelDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { hotels, setSelectedHotel } = useHotelContext()
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    if (id && hotels.length > 0) {
      const foundHotel = hotels.find(h => h.id === id)
      if (foundHotel) {
        setHotel(foundHotel)
        setSelectedHotel(foundHotel)
      }
    }
  }, [id, hotels, setSelectedHotel])

  const handleBooking = () => {
    if (selectedRoom && checkIn && checkOut) {
      navigate(`/booking/${id}`, {
        state: {
          hotel,
          room: selectedRoom,
          checkIn,
          checkOut,
          guests
        }
      })
    }
  }

  if (!hotel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hotel Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-2 flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{hotel.rating}</span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{hotel.location}</span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{hotel.description}</p>
              </div>
              
              <div className="text-right">
                <p className="text-4xl font-bold text-primary-600">${hotel.price}</p>
                <p className="text-gray-500">per night</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      {amenity.toLowerCase().includes('wifi') && <Wifi className="h-4 w-4 text-primary-600" />}
                      {amenity.toLowerCase().includes('pool') && <Pool className="h-4 w-4 text-primary-600" />}
                      {(amenity.toLowerCase().includes('parking') || amenity.toLowerCase().includes('shuttle')) && <Car className="h-4 w-4 text-primary-600" />}
                      {(amenity.toLowerCase().includes('restaurant') || amenity.toLowerCase().includes('bar')) && <Utensils className="h-4 w-4 text-primary-600" />}
                      {!amenity.toLowerCase().includes('wifi') && !amenity.toLowerCase().includes('pool') && 
                       !amenity.toLowerCase().includes('parking') && !amenity.toLowerCase().includes('shuttle') &&
                       !amenity.toLowerCase().includes('restaurant') && !amenity.toLowerCase().includes('bar') && 
                       <Check className="h-4 w-4 text-primary-600" />}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Room Selection and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Rooms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
              
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedRoom?.id === room.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{room.type}</h3>
                        <p className="text-gray-600">Capacity: {room.capacity} guests</p>
                        <p className="text-gray-600">Available: {room.available ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">${room.price}</p>
                        <p className="text-sm text-gray-500">per night</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Book Your Stay</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input-field"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="input-field"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {selectedRoom && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Room Type:</span>
                      <span className="font-medium">{selectedRoom.type}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price per night:</span>
                      <span className="font-medium">${selectedRoom.price}</span>
                    </div>
                    {checkIn && checkOut && (
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Total:</span>
                        <span className="text-xl font-bold text-primary-600">
                          ${selectedRoom.price * Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <button
                  onClick={handleBooking}
                  disabled={!selectedRoom || !checkIn || !checkOut}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetailPage 