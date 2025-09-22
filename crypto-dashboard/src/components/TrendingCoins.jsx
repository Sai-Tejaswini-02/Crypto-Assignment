import { useEffect, useState } from "react";
import { getTrending } from "../api/coinService";
import "./style.css";

export default function TrendingCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrending()
      .then((data) => setCoins(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading trending coins...</p>;

  return (
    <div className="container">
      <h2>🔥 Trending Coins</h2>
      <div className="cards">
        {coins.map((coin) => (
          <div key={coin.item.id} className="card">
            <h3>{coin.item.name} ({coin.item.symbol.toUpperCase()})</h3>
            <p>Rank: {coin.item.market_cap_rank}</p>
            <p>Price: {coin.item.price_btc ? coin.item.price_btc.toFixed(8) : "N/A"} BTC</p>
          </div>
        ))}
      </div>
    </div>
  );
}