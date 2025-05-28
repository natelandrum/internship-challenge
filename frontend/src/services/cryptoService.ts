import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
}

export interface CoinHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface PopularCoin {
  id: string;
  name: string;
  symbol: string;
}

export const cryptoService = {
  /**
   * Get list of popular coins
   */
  async getPopularCoins(): Promise<PopularCoin[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 20,
          page: 1,
          sparkline: false
        }
      });
      
      // Map the response to the simplified format needed for the dropdown
      return response.data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol
      }));
    } catch (error) {
      console.error('Error fetching coin list:', error);
      throw error;
    }
  },
  /**
   * Get coins by symbol
   * @returns Array of coins with the matching symbol
   */
  async getCoinsBySymbol(symbol: string): Promise<Coin[]> {
    try {
      // First, find all coin IDs with the given symbol
      const coinsListResponse = await axios.get(`${API_BASE_URL}/coins/list`);
      const matchingCoins = coinsListResponse.data.filter((c: any) => 
        c.symbol.toLowerCase() === symbol.toLowerCase()
      );
      
      if (matchingCoins.length === 0) {
        throw new Error(`Cryptocurrency with symbol ${symbol} not found`);
      }
      
      // Get coin IDs as a comma-separated string
      const coinIds = matchingCoins.map((c: any) => c.id).join(',');
      
      // Then, get the market data for the matching coins
      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: coinIds,
          sparkline: false,
        }
      });
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching coin data:', error);
      throw error;
    }
  },

  /**
   * Get coin by specific ID
   */
  async getCoinById(coinId: string): Promise<Coin | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: coinId,
          sparkline: false,
        }
      });
      
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching coin data:', error);
      throw error;
    }
  },
  /**
   * Get history data for a coin
   */
  async getCoinHistoryData(coinId: string, days = 7): Promise<CoinHistory> {
    try {
      // Add small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const params: Record<string, any> = {
        vs_currency: 'usd',
        days: days
      };
      
      // Only add interval parameter for longer timeframes
      if (days > 90) {
        params.interval = 'daily';
      }
      
      const response = await axios.get(`${API_BASE_URL}/coins/${coinId}/market_chart`, { 
        params,
        // Increase timeout for potential slow API responses
        timeout: 10000
      });
      
      if (!response.data || !response.data.prices) {
        console.error('Invalid response format from CoinGecko API:', response.data);
        throw new Error('Invalid data format received from API');
      }
      
      return response.data;
    } catch (error: any) {
      // Enhanced error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API error response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
        if (error.response.status === 429) {
          console.error('Rate limit exceeded for CoinGecko API. Please try again later.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from API:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up API request:', error.message);
      }
      throw error;
    }
  }
};
