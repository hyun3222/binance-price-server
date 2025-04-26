const express = require('express');
const axios = require('axios');
const app = express();

app.get('/price', async (req, res) => {
  try {
    const symbols = ['BTCUSDT', 'ETHUSDT'];
    const prices = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        return { symbol: symbol, price: response.data.price };
      })
    );
    res.json(prices);
  } catch (error) {
    console.error('API 요청 에러:', error.response ? error.response.data : error.message);
    res.status(500).send(error.response ? error.response.data : error.message);
  }
});

module.exports = app;
