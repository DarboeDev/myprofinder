// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../lib/mongodb';
import Admin from '../lib/models/Admin';
import Professional from '../lib/models/Professional';
import Request from '../lib/models/Request';
import { dummyProfessionals, dummyRequests } from '../lib/dummy-data';

async function seed() {
  try {
    await connectDB();

    console.log('🌱 Starting database seed...');

    // Clear existing data
    await Admin.deleteMany({});
    await Professional.deleteMany({});
    await Request.deleteMany({});

    console.log('✅ Cleared existing data');

    // Create admin user
    const admin = await Admin.create({
      email: 'admin@myprofinder.af',
      password: 'admin123',
      name: 'Admin User',
    });

    console.log('✅ Created admin user:', admin.email);
    console.log('   Password: admin123');

    // Transform and seed professionals
    const transformedProfessionals = dummyProfessionals.map((prof: any) => ({
      name: prof.name,
      title: prof.title, // Include the title field
      bio: prof.bio,
      bioFr: prof.bioFr,
      skills: prof.skills || [],
      languages: prof.languages || [],
      location: prof.location,
      hourlyRate: prof.hourlyRate,
      avatar: prof.avatar,
      rating: prof.rating,
      totalReviews: prof.reviewCount || 0,
      categories: prof.categories || [],
      portfolio: (prof.portfolio || []).map((item: any) => ({
        title: item.title,
        titleFr: item.titleFr,
        image: item.image,
        description: item.description,
        descriptionFr: item.descriptionFr || item.description,
      })),
      reviews: (prof.reviews || []).map((review: any) => ({
        clientName: review.client,
        rating: review.rating,
        comment: review.comment,
        commentFr: review.commentFr,
        date: new Date(review.date),
      })),
      isActive: true,
    }));

    const professionals = await Professional.insertMany(transformedProfessionals);
    console.log(`✅ Created ${professionals.length} professionals`);

    // Seed requests
    const requests = await Request.insertMany(dummyRequests);
    console.log(`✅ Created ${requests.length} requests`);

    console.log('');
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('Admin Login Credentials:');
    console.log('Email: admin@myprofinder.af');
    console.log('Password: admin123');
    console.log('');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
