export interface WeatherData {
  district: string;
  state: string;
  temperatureC: number;
  humidityPct: number;
  rainfallMm: number;
  windKmh: number;
  condition: string;
  isRainExpected: boolean;
  rainProbabilityPct: number;
  irrigationRecommendation: string;
  isDemo: boolean;
  forecast: Array<{
    day: string;
    tempHigh: number;
    tempLow: number;
    rainChancePct: number;
    condition: string;
  }>;
}

export class WeatherService {
  static async getDistrictWeather(district: string = 'Mathura'): Promise<WeatherData> {
    const isLiveConfigured = process.env.WEATHER_API_KEY && process.env.WEATHER_API_KEY.length > 5;

    if (isLiveConfigured) {
      // Future Live Weather API integration hook
    }

    // Demo Weather Provider with rich localized data
    return {
      district: district,
      state: 'Uttar Pradesh',
      temperatureC: 28.5,
      humidityPct: 74,
      rainfallMm: 12.4,
      windKmh: 14.2,
      condition: 'Humid / Light Rain Likely',
      isRainExpected: true,
      rainProbabilityPct: 78,
      irrigationRecommendation: 'Hold off irrigation today. High probability of precipitation tomorrow will satisfy soil water deficit naturally.',
      isDemo: !isLiveConfigured,
      forecast: [
        { day: 'Today', tempHigh: 31, tempLow: 23, rainChancePct: 40, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', tempHigh: 27, tempLow: 21, rainChancePct: 78, condition: 'Moderate Rain' },
        { day: 'Thursday', tempHigh: 29, tempLow: 22, rainChancePct: 30, condition: 'Scattered Sun' },
        { day: 'Friday', tempHigh: 32, tempLow: 24, rainChancePct: 15, condition: 'Sunny' },
        { day: 'Saturday', tempHigh: 33, tempLow: 25, rainChancePct: 10, condition: 'Clear Sky' },
      ],
    };
  }
}
