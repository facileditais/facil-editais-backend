import express from 'express'
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pkg

const app = express()
const port = process.env.PORT || 3000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.send(`Fácil Editais está online!<br>Data do servidor: ${result.rows[0].now}`)
  } catch (err) {
    console.error(err)
    res.send('Erro ao conectar com o banco de dados')
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})