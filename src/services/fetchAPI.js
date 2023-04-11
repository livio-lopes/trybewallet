export const fetchListCoins = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const listCoins = Object.keys(data).filter((coin) => coin !== 'USDT');
  return listCoins;
};

export const fetchExchangeRates = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};
