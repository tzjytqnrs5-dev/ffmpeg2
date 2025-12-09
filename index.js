
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const { topic } = req.body;
    console.log("Generating:", topic);
    
    // Success Response
    res.json({
      success: true,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
      caption: "Generated for " + topic
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => res.send('Server Running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started'));
