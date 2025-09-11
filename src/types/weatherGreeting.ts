// 날씨 인사말 관련 타입 정의

export interface LocationInfo {
  country: string;
  countryName: string;
  city: string;
  region: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon?: string;
}

export interface GreetingInfo {
  message: string;
  colorTheme: string; // 7가지 색상 중 선택
  timestamp: number;
}

export interface WeatherGreetingData {
  location: LocationInfo;
  weather: WeatherInfo;
  greeting: GreetingInfo;
}

export interface LocationServiceResponse {
  success: boolean;
  data?: LocationInfo;
  error?: string;
}

export interface WeatherServiceResponse {
  success: boolean;
  data?: WeatherInfo;
  error?: string;
}

export interface LLMServiceResponse {
  success: boolean;
  data?: GreetingInfo;
  error?: string;
}
