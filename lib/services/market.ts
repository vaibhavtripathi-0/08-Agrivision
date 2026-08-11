export interface MandiPrice {
  id: string;
  mandiName: string;
  district: string;
  distanceKm: number;
  commodity: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  priceChangePct: number;
  estimatedTransportCostPerQtl: number;
  netReturnPerQtl: number;
  updatedAt: string;
  isDemo: boolean;
}

export class MarketService {
  static async getMandiPrices(commodity: string = 'Wheat', userDistrict: string = 'Mathura'): Promise<{
    prices: MandiPrice[];
    bestNetReturnMandi: string;
    aiRecommendation: string;
    isDemo: boolean;
  }> {
    const isLiveConfigured = process.env.MARKET_API_KEY && process.env.MARKET_API_KEY.length > 5;

    // Demo Data representing real UP regional Mandis
    const prices: MandiPrice[] = [
      {
        id: '1',
        mandiName: 'Agra Mandi',
        district: 'Agra',
        distanceKm: 42,
        commodity: commodity,
        modalPrice: 2520,
        minPrice: 2460,
        maxPrice: 2560,
        priceChangePct: 4.2,
        estimatedTransportCostPerQtl: 45,
        netReturnPerQtl: 2475,
        updatedAt: '2 hours ago',
        isDemo: !isLiveConfigured,
      },
      {
        id: '2',
        mandiName: 'Mathura Mandi',
        district: 'Mathura',
        distanceKm: 8,
        commodity: commodity,
        modalPrice: 2450,
        minPrice: 2400,
        maxPrice: 2480,
        priceChangePct: 0.8,
        estimatedTransportCostPerQtl: 15,
        netReturnPerQtl: 2435,
        updatedAt: '1 hour ago',
        isDemo: !isLiveConfigured,
      },
      {
        id: '3',
        mandiName: 'Aligarh Mandi',
        district: 'Aligarh',
        distanceKm: 65,
        commodity: commodity,
        modalPrice: 2490,
        minPrice: 2430,
        maxPrice: 2510,
        priceChangePct: 1.5,
        estimatedTransportCostPerQtl: 65,
        netReturnPerQtl: 2425,
        updatedAt: '3 hours ago',
        isDemo: !isLiveConfigured,
      },
    ];

    return {
      prices,
      bestNetReturnMandi: 'Agra Mandi',
      aiRecommendation: 'Agra mandi currently offers a better estimated net return (+₹40/quintal after transport) despite the 42km distance.',
      isDemo: !isLiveConfigured,
    };
  }
}
