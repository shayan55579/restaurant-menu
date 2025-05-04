// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON bodies

const menu = [
  { id: 1, name: "کباب کوبیده", description: "گوشت چرخ‌کرده و ادویه‌جات", price: 120000, category: "main" },
  { id: 2, name: "جوجه کباب", description: "مرغ مزه‌دار شده با زعفران", price: 100000, category: "main" },
  { id: 3, name: "سالاد شیرازی", description: "خیار، گوجه، پیاز", price: 30000, category: "appetizer" },
  { id: 4, name: "بستنی سنتی", description: "زعفرانی و گلاب", price: 25000, category: "dessert" },
  { id: 5, name: "دوغ محلی", description: "نوشیدنی سنتی با نعناع", price: 15000, category: "drink" },
];

app.get('/menu', (req, res) => {
  res.json(menu);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
