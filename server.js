const path = require('path')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001

// app.use(express.static('build'))

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
