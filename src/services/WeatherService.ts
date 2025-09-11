import { WeatherInfo, WeatherServiceResponse, LocationInfo } from '../types/weatherGreeting';

/**
 * 날씨 정보 조회 서비스
 * OpenWeatherMap API를 사용하여 지역의 현재 날씨 정보를 획득합니다.
 */
class WeatherService {
  private readonly API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || '';
  private readonly CACHE_KEY = 'weather_cache';
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1시간

  constructor() {
    if (!this.API_KEY) {
      console.warn('OpenWeatherMap API 키가 설정되지 않았습니다. 환경변수 REACT_APP_OPENWEATHER_API_KEY를 확인해주세요.');
    } else {
      console.log('OpenWeatherMap API 키가 설정되었습니다:', this.API_KEY.substring(0, 8) + '...');
    }
  }

  /**
   * 캐시된 날씨 정보를 가져옵니다.
   */
  private getCachedWeather(locationKey: string): WeatherInfo | null {
    try {
      const cached = localStorage.getItem(`${this.CACHE_KEY}_${locationKey}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // 캐시가 유효한지 확인 (1시간)
      if (now - timestamp < this.CACHE_DURATION) {
        return data;
      }

      // 만료된 캐시 삭제
      localStorage.removeItem(`${this.CACHE_KEY}_${locationKey}`);
      return null;
    } catch (error) {
      console.error('날씨 캐시 읽기 오류:', error);
      return null;
    }
  }

  /**
   * 날씨 정보를 캐시에 저장합니다.
   */
  private setCachedWeather(locationKey: string, weather: WeatherInfo): void {
    try {
      const cacheData = {
        data: weather,
        timestamp: Date.now()
      };
      localStorage.setItem(`${this.CACHE_KEY}_${locationKey}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error('날씨 캐시 저장 오류:', error);
    }
  }

  /**
   * 위치 정보를 기반으로 캐시 키를 생성합니다.
   */
  private getLocationKey(location: LocationInfo): string {
    return `${location.city}_${location.region}_${location.country}`.toLowerCase().replace(/\s+/g, '_');
  }

  /**
   * 날씨 상태를 한국어로 변환합니다.
   */
  private translateWeatherCondition(condition: string): string {
    const weatherMap: { [key: string]: string } = {
      'clear sky': '맑음',
      'few clouds': '구름 조금',
      'scattered clouds': '구름 많음',
      'broken clouds': '구름 많음',
      'shower rain': '소나기',
      'rain': '비',
      'thunderstorm': '뇌우',
      'snow': '눈',
      'mist': '안개',
      'fog': '안개',
      'haze': '실안개',
      'dust': '먼지',
      'sand': '모래바람',
      'tornado': '토네이도'
    };

    return weatherMap[condition.toLowerCase()] || condition;
  }

  /**
   * 온도를 섭씨로 변환합니다.
   */
  private kelvinToCelsius(kelvin: number): number {
    return Math.round(kelvin - 273.15);
  }

  /**
   * 위치 정보를 기반으로 날씨 정보를 조회합니다.
   * 먼저 캐시를 확인하고, 없으면 API를 호출합니다.
   */
  async getWeatherInfo(location: LocationInfo): Promise<WeatherServiceResponse> {
    try {
      // API 키 확인
      if (!this.API_KEY) {
        return {
          success: false,
          error: 'OpenWeatherMap API 키가 설정되지 않았습니다.'
        };
      }

      const locationKey = this.getLocationKey(location);

      // 1. 캐시 확인
      const cachedWeather = this.getCachedWeather(locationKey);
      if (cachedWeather) {
        console.log('캐시된 날씨 정보 사용:', cachedWeather);
        return {
          success: true,
          data: cachedWeather
        };
      }

      // 2. 좌표 확인
      if (!location.latitude || !location.longitude) {
        return {
          success: false,
          error: '위치 좌표 정보가 없습니다.'
        };
      }

      // 3. API 호출
      console.log('날씨 정보 조회 중...', { city: location.city, lat: location.latitude, lon: location.longitude });
      
      const url = new URL(this.API_URL);
      url.searchParams.append('lat', location.latitude.toString());
      url.searchParams.append('lon', location.longitude.toString());
      url.searchParams.append('appid', this.API_KEY);
      url.searchParams.append('lang', 'kr'); // 한국어 응답 요청

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // 타임아웃 설정 (10초)
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('API 키가 유효하지 않습니다.');
        } else if (response.status === 404) {
          throw new Error('해당 위치의 날씨 정보를 찾을 수 없습니다.');
        } else {
          throw new Error(`HTTP 오류: ${response.status} ${response.statusText}`);
        }
      }

      const apiData = await response.json();
      
      // 4. 응답 데이터 검증 및 변환
      const weatherInfo: WeatherInfo = {
        temperature: this.kelvinToCelsius(apiData.main.temp),
        condition: this.translateWeatherCondition(apiData.weather[0].main),
        description: apiData.weather[0].description || apiData.weather[0].main,
        humidity: apiData.main.humidity,
        windSpeed: apiData.wind?.speed || 0,
        icon: apiData.weather[0].icon
      };

      // 5. 캐시에 저장
      this.setCachedWeather(locationKey, weatherInfo);

      console.log('날씨 정보 조회 성공:', weatherInfo);
      return {
        success: true,
        data: weatherInfo
      };

    } catch (error) {
      console.error('날씨 정보 조회 실패:', error);
      
      // 에러 타입에 따른 처리
      let errorMessage = '날씨 정보를 가져올 수 없습니다.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = '요청 시간이 초과되었습니다.';
        } else if (error.message.includes('API 키')) {
          errorMessage = error.message;
        } else if (error.message.includes('HTTP 오류')) {
          errorMessage = '서버 오류가 발생했습니다.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = '네트워크 연결을 확인해주세요.';
        }
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * 특정 위치의 캐시를 강제로 삭제합니다.
   */
  clearCache(location: LocationInfo): void {
    const locationKey = this.getLocationKey(location);
    localStorage.removeItem(`${this.CACHE_KEY}_${locationKey}`);
    console.log(`날씨 캐시가 삭제되었습니다: ${locationKey}`);
  }

  /**
   * 모든 날씨 캐시를 삭제합니다.
   */
  clearAllCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_KEY)) {
        localStorage.removeItem(key);
      }
    });
    console.log('모든 날씨 캐시가 삭제되었습니다.');
  }

  /**
   * 현재 캐시 상태를 확인합니다.
   */
  getCacheStatus(location: LocationInfo): { hasCache: boolean; isExpired: boolean; timestamp?: number } {
    try {
      const locationKey = this.getLocationKey(location);
      const cached = localStorage.getItem(`${this.CACHE_KEY}_${locationKey}`);
      if (!cached) {
        return { hasCache: false, isExpired: false };
      }

      const { timestamp } = JSON.parse(cached);
      const now = Date.now();
      const isExpired = now - timestamp >= this.CACHE_DURATION;

      return {
        hasCache: true,
        isExpired,
        timestamp
      };
    } catch (error) {
      return { hasCache: false, isExpired: false };
    }
  }
}

// 싱글톤 인스턴스 생성
export const weatherService = new WeatherService();
export default weatherService;
