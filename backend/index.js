import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './model/db.js';
import { Profile } from './model/profile.js'; 

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));  

app.use(bodyParser.json());
 
// Sync with the database
db.sync().then(() => {
    console.log('Database synced successfully');
}).catch((error) => {
    console.error('Error syncing database:', error);
});

app.post('/api/profiles', async (req, res) => {
    try {
        const { name, url, about, bio, location, followerCount, connectionCount, bioLine } = req.body;
        
const existing = await Profile.findOne({ where: {name:name, url: url } });

if (existing) {
  return res.status(200).json({ message: "Profile already exists", data: existing });
}

        const profile = await Profile.create({
            name,
            url,
            about,
            bio,
            location,
            followerCount: followerCount,
            connectionCount: connectionCount,
            bioLine
        });

        res.status(201).json({
            success: true,
            message: 'Profile created successfully',
            data: profile
        });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});


 
app.get('/get/user-linkdin', async (req, res) => { 
    try {
        const profiles = await Profile.findAll();
        res.json({
            success: true,
            data: profiles
        });
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});