const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
  res.send('Binance Price Server is running');
});

app.get('/price', async (req, res) => {
  try {
    const symbols = ['BTCUSDT', 'ETHUSDT'];
    const prices = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        return { symbol: symbol, price: response.data.price };
      })
    );
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching prices');
  }
});

// ⭐ 여기 추가 ⭐
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
