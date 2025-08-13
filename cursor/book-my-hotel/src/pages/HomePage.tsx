import React, { useState, useEffect } from 'react'

// Define hotel type
interface Hotel {
  id: number
  name: string
  location: string
  rating: number
  price: number // Price in INR
  image: string
  description: string
  amenities: string[]
}

// Define booking type
interface Booking {
  id: string
  hotelId: number
  hotelName: string
  location: string
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  bookingDate: string
  status: 'confirmed' | 'cancelled' | 'completed'
}

// Sample Indian hotels data
const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Taj Palace Hotel',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    price: 15000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    description: 'Luxury 5-star hotel in the heart of Mumbai with stunning city views and world-class amenities.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Fine Dining', 'Gym', 'Room Service', 'Concierge']
  },
  {
    id: 2,
    name: 'Oberoi Udaivilas',
    location: 'Udaipur, Rajasthan',
    rating: 4.8,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    description: 'Palace-style luxury resort overlooking Lake Pichola with traditional Rajasthani architecture.',
    amenities: ['Lake View', 'Infinity Pool', 'Ayurvedic Spa', 'Heritage Tours', 'Boat Rides', 'Cultural Shows']
  },
  {
    id: 3,
    name: 'The Leela Palace',
    location: 'New Delhi, Delhi',
    rating: 4.7,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    description: 'Regal luxury hotel in the diplomatic enclave with Mughal-inspired design and gardens.',
    amenities: ['Diplomatic Location', 'Mughal Gardens', 'Spa', 'Multiple Restaurants', 'Business Center', 'Valet Parking']
  },
  {
    id: 4,
    name: 'Kumarakom Lake Resort',
    location: 'Kerala, South India',
    rating: 4.6,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    description: 'Backwater resort with traditional Kerala architecture and Ayurvedic wellness treatments.',
    amenities: ['Backwater Views', 'Ayurvedic Spa', 'Houseboat Tours', 'Traditional Massage', 'Yoga Classes', 'Local Cuisine']
  },
  {
    id: 5,
    name: 'Wildflower Hall',
    location: 'Shimla, Himachal Pradesh',
    rating: 4.5,
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    description: 'Mountain resort with panoramic views of the Himalayas and colonial charm.',
    amenities: ['Mountain Views', 'Adventure Sports', 'Spa', 'Fine Dining', 'Trekking', 'Skiing (Winter)']
  }
]

function HomePage() {
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  })
  const [bookings, setBookings] = useState<Booking[]>([])

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('hotelBookings')
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings))
    }
  }, [])

  // Save bookings to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem('hotelBookings', JSON.stringify(bookings))
  }, [bookings])

  const handleHotelClick = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setShowBooking(false)
    setShowHistory(false)
  }

  const handleBooking = () => {
    setShowBooking(true)
  }

  const handleHistory = () => {
    setShowHistory(true)
    setSelectedHotel(null)
    setShowBooking(false)
  }

  const confirmBooking = () => {
    if (!selectedHotel) return

    const nights = Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    const totalAmount = selectedHotel.price * nights

    const newBooking: Booking = {
      id: Date.now().toString(),
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      location: selectedHotel.location,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      totalAmount: totalAmount,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    }

    setBookings([newBooking, ...bookings])
    
    alert(`Booking confirmed! Total amount: ₹${totalAmount.toLocaleString('en-IN')}`)
    setShowBooking(false)
    setSelectedHotel(null)
    setBookingData({ checkIn: '', checkOut: '', guests: 1 })
  }

  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ))
  }

  const filteredHotels = hotels.filter(hotel =>
    hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0
    return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
  }

  if (showHistory) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <button 
          onClick={() => setShowHistory(false)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Hotels
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Booking History</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500">Start by booking your first hotel stay!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{booking.hotelName}</h3>
                    <p className="text-gray-600">{booking.location}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Check-in:</span>
                    <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Check-out:</span>
                    <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Guests:</span>
                    <p className="font-medium">{booking.guests}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Total Amount:</span>
                    <p className="font-bold text-lg text-blue-600">{formatCurrency(booking.totalAmount)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Booked on: {new Date(booking.bookingDate).toLocaleDateString('en-IN')}</span>
                  {booking.status === 'confirmed' && (
                    <button 
                      onClick={() => cancelBooking(booking.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (selectedHotel && !showBooking) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => setSelectedHotel(null)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Hotels
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={selectedHotel.image} 
            alt={selectedHotel.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedHotel.name}</h1>
            <p className="text-gray-600 mb-4">{selectedHotel.location}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-700">{selectedHotel.rating}</span>
              <span className="ml-4 text-2xl font-bold text-blue-600">{formatCurrency(selectedHotel.price)}</span>
              <span className="ml-1 text-gray-500">per night</span>
            </div>
            <p className="text-gray-700 mb-6">{selectedHotel.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {selectedHotel.amenities.map((amenity, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleBooking}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Book This Hotel
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showBooking && selectedHotel) {
    const nights = calculateNights(bookingData.checkIn, bookingData.checkOut)
    const totalAmount = selectedHotel.price * nights

    return (
      <div className="max-w-2xl mx-auto p-6">
        <button 
          onClick={() => setShowBooking(false)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Hotel Details
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Booking</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{selectedHotel.name}</h3>
            <p className="text-gray-600">{selectedHotel.location}</p>
            <p className="text-xl font-bold text-blue-600 mt-2">{formatCurrency(selectedHotel.price)} per night</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
              <input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
              <input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <select
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>
          </div>

          {nights > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price per night:</span>
                  <span>{formatCurrency(selectedHotel.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of nights:</span>
                  <span>{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of guests:</span>
                  <span>{bookingData.guests}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <button 
            onClick={confirmBooking}
            disabled={!bookingData.checkIn || !bookingData.checkOut || nights <= 0}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Discover Amazing Indian Hotels</h1>
        <p className="text-xl text-gray-600">Experience luxury and comfort across India's most beautiful destinations</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowHistory(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 mr-4"
        >
          📋 Booking History
        </button>
        <span className="text-gray-500 text-sm py-3">
          {bookings.length} booking{bookings.length !== 1 ? 's' : ''} in history
        </span>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by city or state..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Hotel Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div 
            key={hotel.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleHotelClick(hotel)}
          >
            <img 
              src={hotel.image} 
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-3">{hotel.location}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-700">{hotel.rating}</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{formatCurrency(hotel.price)}</span>
              </div>
              <p className="text-gray-700 text-sm mb-4">{hotel.description}</p>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hotels found for "{searchLocation}"</p>
        </div>
      )}
    </div>
  )
}

export default HomePage 