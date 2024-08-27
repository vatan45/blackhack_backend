// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://vmro45:Vmro45%407856@coddunity.kyll8.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Database connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Define schema
const memberSchema = new mongoose.Schema({
    name: String,
    id: String,
    email: String,
    phone: String,
    gender: String
});

const teamLeaderSchema = new mongoose.Schema({
    error: String,
    id: String,
    problemStatement: String,
    theme: String
});

const Team = mongoose.model('Team', {
    teamLeader: teamLeaderSchema,
    members: [memberSchema]
});

// Routes
app.post('/register', async (req, res) => {
    const { teamLeader, members } = req.body;
    try {
        const newTeam = new Team({ teamLeader, members });
        await newTeam.save();
        res.status(201).send('Team registered successfully');
    } catch (error) {
        console.error('Error registering team:', error);
        res.status(500).send('Error registering team');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
