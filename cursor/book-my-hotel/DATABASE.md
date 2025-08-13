# Database Documentation - Indian Hotel Booking App

## 🗄️ **Database Overview**

Your hotel booking app now has a **real database** powered by JSON Server, providing:
- **RESTful API endpoints** for all data operations
- **Persistent data storage** in `db.json` file
- **Real-time data updates** with automatic file watching
- **Professional API structure** for future development

## 🏗️ **Database Schema**

### **1. Hotels Collection**
```json
{
  "id": 1,
  "name": "Taj Palace Hotel",
  "location": "Mumbai, Maharashtra",
  "rating": 4.9,
  "price": 15000,
  "image": "hotel_image_url",
  "description": "Hotel description...",
  "amenities": ["Free WiFi", "Pool", "Spa"],
  "rooms": [
    {
      "id": "1-1",
      "type": "Deluxe King",
      "price": 15000,
      "capacity": 2,
      "available": true,
      "features": ["City View", "Balcony"]
    }
  ],
  "reviews": [
    {
      "id": "r1-1",
      "userName": "Priya Sharma",
      "rating": 5,
      "comment": "Great experience!",
      "date": "2024-01-15"
    }
  ],
  "locationDetails": {
    "address": "Full address",
    "coordinates": {"lat": 18.9217, "lng": 72.8347},
    "nearbyAttractions": ["Gateway of India", "Marine Drive"]
  }
}
```

### **2. Bookings Collection**
```json
{
  "id": "booking_id",
  "hotelId": 1,
  "hotelName": "Taj Palace Hotel",
  "location": "Mumbai, Maharashtra",
  "checkIn": "2024-02-01",
  "checkOut": "2024-02-03",
  "guests": 2,
  "totalAmount": 30000,
  "bookingDate": "2024-01-20",
  "status": "confirmed",
  "roomType": "Deluxe King",
  "userId": 1
}
```

### **3. Users Collection**
```json
{
  "id": 1,
  "name": "Demo User",
  "email": "demo@example.com",
  "phone": "+91-98765-43210",
  "preferences": {
    "favoriteDestinations": ["Mumbai", "Udaipur"],
    "roomPreferences": ["King Bed", "City View"],
    "amenities": ["Spa", "Pool"]
  }
}
```

### **4. Amenities Collection**
```json
[
  "Free WiFi",
  "Swimming Pool",
  "Spa & Wellness",
  "Fine Dining",
  "Gym",
  "Room Service"
]
```

### **5. Locations Collection**
```json
{
  "city": "Mumbai",
  "state": "Maharashtra",
  "region": "West India",
  "popularity": 5,
  "bestTime": "October to March"
}
```

## 🌐 **API Endpoints**

### **Base URL**: `http://localhost:3001`

### **Hotels Endpoints**
```
GET    /hotels              # Get all hotels
GET    /hotels/:id          # Get hotel by ID
POST   /hotels              # Create new hotel
PUT    /hotels/:id          # Update hotel
PATCH  /hotels/:id          # Partial update
DELETE /hotels/:id          # Delete hotel

# Filtering & Search
GET    /hotels?location_like=Mumbai
GET    /hotels?rating_gte=4.5
GET    /hotels?price_gte=10000&price_lte=20000
GET    /hotels?amenities_like=Spa
```

### **Bookings Endpoints**
```
GET    /bookings            # Get all bookings
GET    /bookings/:id        # Get booking by ID
POST   /bookings            # Create new booking
PUT    /bookings/:id        # Update booking
PATCH  /bookings/:id        # Partial update
DELETE /bookings/:id        # Delete booking

# Filtering
GET    /bookings?hotelId=1
GET    /bookings?userId=1
GET    /bookings?status=confirmed
```

### **Users Endpoints**
```
GET    /users               # Get all users
GET    /users/:id           # Get user by ID
POST   /users               # Create new user
PUT    /users/:id           # Update user
PATCH  /users/:id           # Partial update
DELETE /users/:id           # Delete user
```

### **Other Collections**
```
GET    /amenities           # Get all amenities
GET    /locations           # Get all locations
```

## 🚀 **How to Use the Database**

### **1. Start the Database Server**
```bash
# Start database only
npm run db

# Start database with network access
npm run db:start

# Start both app and database
npm run dev:full
```

### **2. Access Database Directly**
- **Database File**: `db.json` (view/edit manually)
- **API Browser**: `http://localhost:3001` (JSON Server interface)
- **API Endpoints**: `http://localhost:3001/hotels`, etc.

### **3. Use in Your App**
```typescript
import { hotelAPI, bookingAPI } from './services/api'

// Get all hotels
const hotels = await hotelAPI.getAll()

// Search hotels by location
const mumbaiHotels = await hotelAPI.searchByLocation('Mumbai')

// Create a booking
const newBooking = await bookingAPI.create({
  hotelId: 1,
  hotelName: 'Taj Palace Hotel',
  // ... other fields
})
```

## 🔧 **Database Features**

### **Automatic Features**
- **File Watching**: Database updates automatically when `db.json` changes
- **ID Generation**: Automatic ID assignment for new records
- **Data Validation**: Basic JSON validation
- **CORS Support**: Accessible from your React app

### **Query Features**
- **Filtering**: `?field=value`
- **Search**: `?field_like=searchterm`
- **Range**: `?field_gte=min&field_lte=max`
- **Sorting**: `?_sort=field&_order=asc`
- **Pagination**: `?_page=1&_limit=10`

### **Advanced Queries**
```bash
# Get hotels with rating >= 4.5, sorted by price
GET /hotels?rating_gte=4.5&_sort=price&_order=asc

# Get confirmed bookings for a specific hotel
GET /bookings?hotelId=1&status=confirmed

# Search hotels by multiple amenities
GET /hotels?amenities_like=Spa&amenities_like=Pool
```

## 📊 **Sample Data Included**

### **5 Luxury Indian Hotels**
1. **Taj Palace Hotel** - Mumbai, Maharashtra (₹15,000/night)
2. **Oberoi Udaivilas** - Udaipur, Rajasthan (₹25,000/night)
3. **The Leela Palace** - New Delhi, Delhi (₹18,000/night)
4. **Kumarakom Lake Resort** - Kerala, South India (₹12,000/night)
5. **Wildflower Hall** - Shimla, Himachal Pradesh (₹22,000/night)

### **Each Hotel Includes**
- Basic information (name, location, rating, price)
- High-quality images
- Detailed descriptions
- Comprehensive amenities list
- Multiple room types with pricing
- User reviews and ratings
- Location details with coordinates
- Nearby attractions

## 🛠️ **Development Workflow**

### **1. Development Mode**
```bash
npm run dev:full  # Starts both app and database
```

### **2. Database Management**
- **View Data**: Open `http://localhost:3001` in browser
- **Edit Data**: Modify `db.json` file directly
- **API Testing**: Use browser or tools like Postman

### **3. Data Backup**
- **Automatic**: JSON Server watches for changes
- **Manual**: Copy `db.json` for backup
- **Version Control**: Commit `db.json` to git

## 🔮 **Future Enhancements**

### **Database Upgrades**
- **MongoDB**: For production scalability
- **PostgreSQL**: For complex relationships
- **Redis**: For caching and sessions

### **API Features**
- **Authentication**: JWT tokens
- **Rate Limiting**: API usage limits
- **Webhooks**: Real-time notifications
- **GraphQL**: Advanced querying

## 📚 **Useful Commands**

```bash
# Start database server
npm run db

# Start with network access
npm run db:start

# Start both app and database
npm run dev:full

# View database in browser
open http://localhost:3001

# Test API endpoints
curl http://localhost:3001/hotels
curl http://localhost:3001/hotels/1
curl http://localhost:3001/bookings
```

---

## 🎉 **Your Database is Ready!**

You now have a **professional database system** with:
- ✅ **Real API endpoints** for all data operations
- ✅ **Comprehensive data structure** for hotels and bookings
- ✅ **Professional API service** in your React app
- ✅ **Easy data management** through JSON Server
- ✅ **Scalable architecture** for future development

**Start your database with**: `npm run db` 🚀 