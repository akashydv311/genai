import { Star, MapPin, Wifi, Pool, Car, Utensils } from 'lucide-react'
import { Hotel } from '../contexts/HotelContext'

interface HotelCardProps {
  hotel: Hotel
  onClick: () => void
}

const HotelCard = ({ hotel, onClick }: HotelCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />
    if (amenity.toLowerCase().includes('pool')) return <Pool className="h-4 w-4" />
    if (amenity.toLowerCase().includes('parking') || amenity.toLowerCase().includes('shuttle')) return <Car className="h-4 w-4" />
    if (amenity.toLowerCase().includes('restaurant') || amenity.toLowerCase().includes('bar')) return <Utensils className="h-4 w-4" />
    return null
  }

  return (
    <div 
      className="card hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Hotel Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
        </div>
      </div>

      {/* Hotel Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {hotel.name}
          </h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">${hotel.price}</p>
            <p className="text-sm text-gray-500">per night</p>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
              {getAmenityIcon(amenity)}
              <span className="text-xs text-gray-600">{amenity}</span>
            </div>
          ))}
          {hotel.amenities.length > 4 && (
            <div className="bg-gray-100 px-2 py-1 rounded-full">
              <span className="text-xs text-gray-600">+{hotel.amenities.length - 4} more</span>
            </div>
          )}
        </div>

        {/* Available Rooms */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{hotel.rooms.filter(room => room.available).length}</span> room types available
          </div>
          <button className="btn-primary text-sm px-4 py-2">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelCard 