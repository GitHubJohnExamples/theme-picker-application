const express = require('express')
const axios = require('axios')
const cors = require('cors') // Import the cors middleware
const app = express()
const PORT = 3001

// Use cors middleware
app.use(cors())

app.get('/colors', async (req, res) => {
  try {
    const response = await axios.get(
      'https://mocki.io/v1/2a727afb-a2c8-420f-8cad-e644c412d464'
    )
    const colors = response.data

    const query = req.query.q || ''
    const filteredColors = colors.items.filter((color) =>
      color.name.toLowerCase().includes(query.toLowerCase())
    )

    res.json({ items: filteredColors })
  } catch (error) {
    console.error('Error fetching colors:', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
