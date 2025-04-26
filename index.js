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
        const response = await axios.get(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`);
        const ticker = response.data.result.list[0];
        return { symbol: ticker.symbol, price: ticker.lastPrice };
      })
    );
    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching prices');
  }
});

module.exports = app;
