import { LocationInfo, LocationServiceResponse } from '../types/weatherGreeting';

/**
 * IP 기반 지역 정보 조회 서비스
 * ipapi.co API를 사용하여 사용자의 IP 주소로부터 지역 정보를 획득합니다.
 */
class LocationService {
  private readonly API_URL = 'https://ipapi.co/json/';
  private readonly CACHE_KEY = 'location_cache';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간

  /**
   * 캐시된 지역 정보를 가져옵니다.
   */
  private getCachedLocation(): LocationInfo | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // 캐시가 유효한지 확인 (24시간)
      if (now - timestamp < this.CACHE_DURATION) {
        return data;
      }

      // 만료된 캐시 삭제
      localStorage.removeItem(this.CACHE_KEY);
      return null;
    } catch (error) {
      console.error('캐시 읽기 오류:', error);
      return null;
    }
  }

  /**
   * 지역 정보를 캐시에 저장합니다.
   */
  private setCachedLocation(location: LocationInfo): void {
    try {
      const cacheData = {
        data: location,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('캐시 저장 오류:', error);
    }
  }

  /**
   * IP 기반으로 지역 정보를 조회합니다.
   * 먼저 캐시를 확인하고, 없으면 API를 호출합니다.
   * 
   * 참고: 기업 네트워크의 경우 실제 위치와 다를 수 있습니다.
   * 예: 판교에 있지만 회사 WiFi가 평택 데이터센터를 통해 연결되는 경우
   */
  async getLocationInfo(): Promise<LocationServiceResponse> {
    try {
      // 1. 캐시 확인
      const cachedLocation = this.getCachedLocation();
      if (cachedLocation) {
        console.log('캐시된 지역 정보 사용:', cachedLocation);
        return {
          success: true,
          data: cachedLocation
        };
      }

      // 2. API 호출
      console.log('IP 기반 지역 정보 조회 중...');
      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // 타임아웃 설정 (10초)
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status} ${response.statusText}`);
      }

      const apiData = await response.json();
      
      // 3. 응답 데이터 검증 및 변환
      const locationInfo: LocationInfo = {
        country: apiData.country_code || 'Unknown',
        countryName: apiData.country_name || 'Unknown',
        city: apiData.city || 'Unknown',
        region: apiData.region || 'Unknown',
        timezone: apiData.timezone || 'UTC',
        latitude: apiData.latitude,
        longitude: apiData.longitude
      };

      // 4. 캐시에 저장
      this.setCachedLocation(locationInfo);

      console.log('지역 정보 조회 성공:', locationInfo);
      return {
        success: true,
        data: locationInfo
      };

    } catch (error) {
      console.error('지역 정보 조회 실패:', error);
      
      // 에러 타입에 따른 처리
      let errorMessage = '지역 정보를 가져올 수 없습니다.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = '요청 시간이 초과되었습니다.';
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
   * 캐시를 강제로 삭제합니다.
   */
  clearCache(): void {
    localStorage.removeItem(this.CACHE_KEY);
    console.log('지역 정보 캐시가 삭제되었습니다.');
  }

  /**
   * 현재 캐시 상태를 확인합니다.
   */
  getCacheStatus(): { hasCache: boolean; isExpired: boolean; timestamp?: number } {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
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
export const locationService = new LocationService();
export default locationService;
