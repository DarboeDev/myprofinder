// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../lib/mongodb';
import Professional from '../lib/models/Professional';
import { dummyProfessionals } from '../lib/dummy-data';

async function addTitles() {
  try {
    await connectDB();

    console.log('🔄 Adding titles to existing professionals...');

    const professionals = await Professional.find({});
    
    console.log(`Found ${professionals.length} professionals`);

    // Map titles from dummy data based on name
    const titleMap: { [key: string]: string } = {};
    dummyProfessionals.forEach((prof: any) => {
      titleMap[prof.name] = prof.title;
    });

    let updated = 0;
    for (const prof of professionals) {
      const title = titleMap[prof.name];
      if (title && !prof.title) {
        await Professional.findByIdAndUpdate(prof._id, { title });
        console.log(`✅ Updated ${prof.name} with title: ${title}`);
        updated++;
      } else if (prof.title) {
        console.log(`⏭️  ${prof.name} already has title: ${prof.title}`);
      } else {
        console.log(`⚠️  No title found for ${prof.name}`);
      }
    }

    console.log('');
    console.log(`🎉 Migration completed! Updated ${updated} professionals.`);
    console.log('');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

addTitles();
