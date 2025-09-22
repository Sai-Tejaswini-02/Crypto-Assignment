import api from "./api";

// Fetch top market coins
export const getMarkets = async (page = 1, perPage = 10) => {
  const res = await api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page,
      price_change_percentage: "24h,7d",
    },
  });
  return res.data;
};

// Fetch trending coins
export const getTrending = async () => {
  const res = await api.get("/search/trending");
  return res.data.coins; // trending coins array
};