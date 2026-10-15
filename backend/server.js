
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const pool = require('./config/database')

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

// Health check backend
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend terhubung',
    timestamp: new Date().toISOString(),
  })
})

// Health check PostgreSQL
// Khusus development lokal, hapus atau lindungi
// endpoint ini sebelum deployment publik.
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/health/db', async (req, res) => {
    try {
      await pool.query('SELECT 1')

      res.json({
        success: true,
        message: 'PostgreSQL Supabase terhubung',
        database: 'PostgreSQL',
        status: 'connected',
        timestamp: new Date().toISOString(),
      })
    } catch (err) {
      console.error('Database connection error:', err.message)

      res.status(503).json({
        success: false,
        message: 'Koneksi database gagal.',
        status: 'disconnected',
      })
    }
  })
}

// API route tidak ditemukan
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint API tidak ditemukan.',
  })
})

// Error handling
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
