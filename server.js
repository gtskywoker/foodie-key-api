require('dotenv').config(); // โหลด Environment Variables จาก .env ไฟล์
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001; // ใช้ PORT จาก Environment หรือ Default เป็น 3001

// Middleware
app.use(cors());
app.use(express.json()); // สำหรับ Parse JSON Request Body

// API Endpoint สำหรับดึง Cloudinary Keys
app.get('/cloudinary-keys', (req, res) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET; // ดึงค่า uploadPreset

    if (cloudName && apiKey && apiSecret && uploadPreset) {
        res.json({ 
            cloud_name: cloudName, 
            api_key: apiKey, 
            api_secret: apiSecret, 
            uploadPreset: uploadPreset // ส่งค่า uploadPreset กลับไปด้วย
        });
    } else {
        res.status(500).json({ error: 'Cloudinary keys not configured in environment variables' });
    }
});

// Health Check Endpoint (Optional)
app.get('/ping', (req, res) => {
    res.send('pong');
});

// เริ่ม Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});