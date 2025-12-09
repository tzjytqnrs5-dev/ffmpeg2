const express = require('express');
const cors = require('cors');
const app = express();

// 1. Allow ALL CORS requests (Fixes the "Load Failed" error)
app.use(cors({ origin: '*' }));
app.use(express.json());

// 2. Logging Middleware (So you see logs in Railway)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', JSON.stringify(req.body).substring(0, 100) + '...');
  next();
});

// 3. The Generator Endpoint (Fixes "Cannot POST /")
app.post('/', async (req, res) => {
  try {
    const { topic, headline, template } = req.body;
    console.log(`🚀 Generating video for: ${topic || headline}`);

    // --- YOUR GENERATION LOGIC GOES HERE ---
    // For now, we return a success response to prove the connection works.
    
    // Simulate processing delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.json({
      success: true,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
      caption: `Viral content generated for: ${topic || headline || 'Random'}`
    });
    
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Health Check
app.get('/', (req, res) => {
  res.send('Sircus Studio API is Running! Send POST requests to root.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
