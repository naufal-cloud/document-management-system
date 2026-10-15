
const { Pool } = require('pg')
const fs = require('node:fs')
const path = require('node:path')

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL belum diatur')
}

const caPath = path.join(
  __dirname,
  '..',
  'certs',
  'prod-ca-2021.crt'
)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: fs.readFileSync(caPath, 'utf8'),
    rejectUnauthorized: true,
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err.message)
})

module.exports = pool
