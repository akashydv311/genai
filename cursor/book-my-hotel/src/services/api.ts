// API service for interacting with JSON Server database

const API_BASE_URL = 'http://localhost:3001'

export interface Hotel {
  id: number
  name: string
  location: string
  rating: number
  price: number
  image: string
  description: string
  amenities: string[]
  rooms: Room[]
  reviews: Review[]
  locationDetails: LocationDetails
}

export interface Room {
  id: string
  type: string
  price: number
  capacity: number
  available: boolean
  features: string[]
}

export interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface LocationDetails {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  nearbyAttractions: string[]
}

export interface Booking {
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
  roomType?: string
  userId?: number
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  preferences: {
    favoriteDestinations: string[]
    roomPreferences: string[]
    amenities: string[]
  }
}

// Generic API functions
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Hotel API functions
export const hotelAPI = {
  // Get all hotels
  getAll: (): Promise<Hotel[]> => apiRequest<Hotel[]>('/hotels'),

  // Get hotel by ID
  getById: (id: number): Promise<Hotel> => apiRequest<Hotel>(`/hotels/${id}`),

  // Search hotels by location
  searchByLocation: (location: string): Promise<Hotel[]> => 
    apiRequest<Hotel[]>(`/hotels?location_like=${encodeURIComponent(location)}`),

  // Get hotels by rating
  getByRating: (minRating: number): Promise<Hotel[]> => 
    apiRequest<Hotel[]>(`/hotels?rating_gte=${minRating}`),

  // Get hotels by price range
  getByPriceRange: (minPrice: number, maxPrice: number): Promise<Hotel[]> => 
    apiRequest<Hotel[]>(`/hotels?price_gte=${minPrice}&price_lte=${maxPrice}`),

  // Get hotels by amenities
  getByAmenities: (amenities: string[]): Promise<Hotel[]> => {
    const query = amenities.map(a => `amenities_like=${encodeURIComponent(a)}`).join('&')
    return apiRequest<Hotel[]>(`/hotels?${query}`)
  }
}

// Booking API functions
export const bookingAPI = {
  // Get all bookings
  getAll: (): Promise<Booking[]> => apiRequest<Booking[]>('/bookings'),

  // Get booking by ID
  getById: (id: string): Promise<Booking> => apiRequest<Booking>(`/bookings/${id}`),

  // Create new booking
  create: (booking: Omit<Booking, 'id'>): Promise<Booking> => 
    apiRequest<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    }),

  // Update booking
  update: (id: string, updates: Partial<Booking>): Promise<Booking> => 
    apiRequest<Booking>(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  // Delete booking
  delete: (id: string): Promise<void> => 
    apiRequest<void>(`/bookings/${id}`, {
      method: 'DELETE',
    }),

  // Get bookings by user
  getByUser: (userId: number): Promise<Booking[]> => 
    apiRequest<Booking[]>(`/bookings?userId=${userId}`),

  // Get bookings by hotel
  getByHotel: (hotelId: number): Promise<Booking[]> => 
    apiRequest<Booking[]>(`/bookings?hotelId=${hotelId}`)
}

// User API functions
export const userAPI = {
  // Get all users
  getAll: (): Promise<User[]> => apiRequest<User[]>('/users'),

  // Get user by ID
  getById: (id: number): Promise<User> => apiRequest<User>(`/users/${id}`),

  // Create new user
  create: (user: Omit<User, 'id'>): Promise<User> => 
    apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),

  // Update user
  update: (id: number, updates: Partial<User>): Promise<User> => 
    apiRequest<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
}

// Utility functions
export const apiUtils = {
  // Check if API is running
  isRunning: async (): Promise<boolean> => {
    try {
      await fetch(`${API_BASE_URL}/hotels`)
      return true
    } catch {
      return false
    }
  },

  // Get database stats
  getStats: async () => {
    const [hotels, bookings, users] = await Promise.all([
      hotelAPI.getAll(),
      bookingAPI.getAll(),
      userAPI.getAll()
    ])

    return {
      totalHotels: hotels.length,
      totalBookings: bookings.length,
      totalUsers: users.length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
      cancelledBookings: bookings.filter(b => b.status === 'cancelled').length
    }
  }
}

export default {
  hotel: hotelAPI,
  booking: bookingAPI,
  user: userAPI,
  utils: apiUtils
} 