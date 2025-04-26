const express = require('express');
const axios = require('axios');
const app = express();

// 루트 경로
app.get('/', (req, res) => {
  res.send('Binance Price Server is running');
});

// 가격 가져오는 경로
app.get('/price', async (req, res) => {
  try {
    const response = await axios.get('https://api.bybit.com/v2/public/tickers');
    const tickers = response.data.result;

    const targetSymbols = ['BTCUSDT', 'ETHUSDT'];

    const prices = tickers
      .filter(ticker => targetSymbols.includes(ticker.symbol))
      .map(ticker => ({
        symbol: ticker.symbol,
        price: ticker.last_price
      }));

    res.json(prices);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching prices');
  }
});

// 서버를 외부에서 사용할 수 있도록 export
module.exports = app;

// 포트 설정 (Render에서는 환경변수 PORT를 사용)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
