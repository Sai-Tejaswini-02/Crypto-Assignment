import { useEffect, useState } from "react";
import { getMarkets } from "../api/coinService";
import "./style.css";

export default function MarketCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarkets(1, 10)
      .then((data) => setCoins(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading market coins...</p>;

  return (
    <div className="container">
      <h2>💰 Top Market Coins</h2>
      <div className="cards">
        {coins.map((coin) => (
          <div key={coin.id} className="card">
            <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
            <p className="price">Price: ${coin.current_price.toLocaleString()}</p>
            <p className={`change ${coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}>
              24h: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className={`change ${coin.price_change_percentage_7d_in_currency >= 0 ? "positive" : "negative"}`}>
              7d: {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}