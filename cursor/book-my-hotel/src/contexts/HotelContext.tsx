import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Hotel {
  id: string
  name: string
  location: string
  rating: number
  price: number
  image: string
  description: string
  amenities: string[]
  rooms: Room[]
}

export interface Room {
  id: string
  type: string
  price: number
  capacity: number
  available: boolean
}

export interface SearchFilters {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  priceRange: [number, number]
}

interface HotelContextType {
  hotels: Hotel[]
  filteredHotels: Hotel[]
  searchFilters: SearchFilters
  setSearchFilters: (filters: SearchFilters) => void
  selectedHotel: Hotel | null
  setSelectedHotel: (hotel: Hotel | null) => void
  loading: boolean
}

const HotelContext = createContext<HotelContextType | undefined>(undefined)

export const useHotelContext = () => {
  const context = useContext(HotelContext)
  if (context === undefined) {
    throw new Error('useHotelContext must be used within a HotelProvider')
  }
  return context
}

interface HotelProviderProps {
  children: ReactNode
}

export const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 1000]
  })
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock hotel data
  useEffect(() => {
    const mockHotels: Hotel[] = [
      {
        id: '1',
        name: 'Grand Plaza Hotel',
        location: 'New York, NY',
        rating: 4.8,
        price: 299,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        description: 'Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.',
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
        rooms: [
          { id: '1-1', type: 'Deluxe King', price: 299, capacity: 2, available: true },
          { id: '1-2', type: 'Executive Suite', price: 499, capacity: 4, available: true },
          { id: '1-3', type: 'Standard Double', price: 199, capacity: 2, available: true }
        ]
      },
      {
        id: '2',
        name: 'Oceanview Resort',
        location: 'Miami Beach, FL',
        rating: 4.6,
        price: 399,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
        description: 'Beachfront resort with private beach access, multiple pools, and tropical gardens.',
        amenities: ['Private Beach', 'Multiple Pools', 'Spa', 'Water Sports', 'Kids Club', 'Beach Bar'],
        rooms: [
          { id: '2-1', type: 'Ocean View King', price: 399, capacity: 2, available: true },
          { id: '2-2', type: 'Beachfront Suite', price: 699, capacity: 4, available: true },
          { id: '2-3', type: 'Garden Room', price: 299, capacity: 2, available: true }
        ]
      },
      {
        id: '3',
        name: 'Mountain Lodge',
        location: 'Aspen, CO',
        rating: 4.7,
        price: 599,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        description: 'Cozy mountain lodge with ski-in/ski-out access and rustic luxury accommodations.',
        amenities: ['Ski-in/Ski-out', 'Hot Tub', 'Fireplace', 'Restaurant', 'Ski Storage', 'Shuttle Service'],
        rooms: [
          { id: '3-1', type: 'Mountain View King', price: 599, capacity: 2, available: true },
          { id: '3-2', type: 'Luxury Suite', price: 899, capacity: 6, available: true },
          { id: '3-3', type: 'Cozy Cabin', price: 399, capacity: 4, available: true }
        ]
      },
      {
        id: '4',
        name: 'Urban Boutique Hotel',
        location: 'San Francisco, CA',
        rating: 4.5,
        price: 249,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
        description: 'Modern boutique hotel in the trendy Mission District with local art and craft cocktails.',
        amenities: ['Rooftop Bar', 'Local Art Gallery', 'Bike Rentals', 'Coffee Shop', 'Meeting Rooms'],
        rooms: [
          { id: '4-1', type: 'Boutique Queen', price: 249, capacity: 2, available: true },
          { id: '4-2', type: 'Artist Loft', price: 349, capacity: 2, available: true },
          { id: '4-3', type: 'City View Suite', price: 449, capacity: 3, available: true }
        ]
      },
      {
        id: '5',
        name: 'Desert Oasis Resort',
        location: 'Phoenix, AZ',
        rating: 4.4,
        price: 199,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
        description: 'Relaxing desert resort with golf courses, spa treatments, and stunning sunset views.',
        amenities: ['Golf Course', 'Spa & Wellness', 'Pool Complex', 'Tennis Courts', 'Fine Dining', 'Shuttle Service'],
        rooms: [
          { id: '5-1', type: 'Desert View King', price: 199, capacity: 2, available: true },
          { id: '5-2', type: 'Golf Villa', price: 399, capacity: 4, available: true },
          { id: '5-3', type: 'Spa Suite', price: 299, capacity: 2, available: true }
        ]
      }
    ]

    setHotels(mockHotels)
    setFilteredHotels(mockHotels)
    setLoading(false)
  }, [])

  // Filter hotels based on search criteria
  useEffect(() => {
    let filtered = hotels

    if (searchFilters.location) {
      filtered = filtered.filter(hotel =>
        hotel.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      )
    }

    if (searchFilters.priceRange[1] < 1000) {
      filtered = filtered.filter(hotel => 
        hotel.price >= searchFilters.priceRange[0] && hotel.price <= searchFilters.priceRange[1]
      )
    }

    setFilteredHotels(filtered)
  }, [hotels, searchFilters])

  const value: HotelContextType = {
    hotels,
    filteredHotels,
    searchFilters,
    setSearchFilters,
    selectedHotel,
    setSelectedHotel,
    loading
  }

  return (
    <HotelContext.Provider value={value}>
      {children}
    </HotelContext.Provider>
  )
} 