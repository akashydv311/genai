import { Link } from 'react-router-dom'
import { Bed, MapPin, Calendar, Users } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Bed className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">HotelBook</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Hotels
            </Link>
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </Link>
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 bg-gray-100 rounded-lg px-4 py-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 min-w-[200px]"
            />
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              className="bg-transparent border-none outline-none text-sm text-gray-700"
            />
            <Users className="h-4 w-4 text-gray-400" />
            <select className="bg-transparent border-none outline-none text-sm text-gray-700">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
            <button className="bg-primary-600 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">
              Search
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 