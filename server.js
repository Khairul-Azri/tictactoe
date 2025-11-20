const express = require('express');
const { collectDefaultMetrics, register, Counter } = require('prom-client');
const path = require('path');

const app = express();
const PORT = 3000;

// Create a Counter metric for tracking player actions
const playerActionCounter = new Counter({
    name: 'player_action_count',
    help: 'Count of player actions',
    labelNames: ['player']
});

// Collect default metrics
collectDefaultMetrics({ register });

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html by default for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to expose metrics
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
