
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  }),
)

app.use(express.json({ limit: '1mb' }))

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  }),
)

// Endpoint untuk memeriksa apakah backend berjalan.
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend terhubung',
    timestamp: new Date().toISOString(),
  })
})

// Menangani alamat API yang belum tersedia.
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint API tidak ditemukan.',
  })
})

// Penanganan error umum.
app.use((err, req, res, next) => {
  console.error('Server error:', err.message)

  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.',
  })
})

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`)
})
