const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  const productsPath = path.join(__dirname, 'public', 'products.json');
  fs.readFile(productsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to read product data' });
    }
    const products = JSON.parse(data);
    res.json(products);
  });
});

app.listen(PORT, () => {
  console.log(`Pawki site running at http://localhost:${PORT}`);
});
