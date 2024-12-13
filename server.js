const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件托管，将public目录中的文件对外提供访问
app.use(express.static(path.join(__dirname, 'public')));

// 提供一个API接口，返回商品数据
app.get('/api/products', (req, res) => {
  const productsPath = path.join(__dirname, 'public', 'products.json');
  fs.readFile(productsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '无法读取商品数据' });
    }
    const products = JSON.parse(data);
    res.json(products);
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Pawki 网站已在 http://localhost:${PORT} 启动`);
});
