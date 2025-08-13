// Test script for the database
const fs = require('fs');

console.log('🔍 Testing Database Setup...\n');

// Check if db.json exists
if (fs.existsSync('db.json')) {
  console.log('✅ Database file (db.json) exists');
  
  try {
    const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    console.log(`✅ Database contains ${data.hotels?.length || 0} hotels`);
    console.log(`✅ Database contains ${data.bookings?.length || 0} bookings`);
    console.log(`✅ Database contains ${data.users?.length || 0} users`);
    
    if (data.hotels && data.hotels.length > 0) {
      console.log('\n🏨 Sample Hotel Data:');
      const hotel = data.hotels[0];
      console.log(`   Name: ${hotel.name}`);
      console.log(`   Location: ${hotel.location}`);
      console.log(`   Price: ₹${hotel.price}`);
      console.log(`   Rating: ${hotel.rating}/5`);
      console.log(`   Amenities: ${hotel.amenities?.length || 0} items`);
      console.log(`   Rooms: ${hotel.rooms?.length || 0} types`);
    }
    
    console.log('\n🚀 Database is ready!');
    console.log('   Start with: npx json-server --watch db.json --port 3003');
    console.log('   Access at: http://localhost:3003');
    
  } catch (error) {
    console.log('❌ Error reading database:', error.message);
  }
} else {
  console.log('❌ Database file (db.json) not found');
}

console.log('\n📊 Database Structure:');
console.log('   - /hotels (GET, POST, PUT, DELETE)');
console.log('   - /bookings (GET, POST, PUT, DELETE)');
console.log('   - /users (GET, POST, PUT, DELETE)');
console.log('   - /amenities (GET)');
console.log('   - /locations (GET)'); 