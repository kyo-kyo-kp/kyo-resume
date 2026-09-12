import { GreetingInfo, LLMServiceResponse, LocationInfo, WeatherInfo } from '../types/weatherGreeting';
import { rainbowColors } from '../utils/colorPalette';

/**
 * LLM 기반 인사말 생성 서비스
 * OpenAI GPT API와 Google Gemini API를 지원합니다.
 */
class LLMService {
  private readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  // gemini-1.5/2.5 계열은 v1beta generateContent에서 제공 종료(404, 2026-09 확인). 필요 시 env로 교체.
  private readonly GEMINI_MODEL = process.env.REACT_APP_GEMINI_MODEL || 'gemini-3.6-flash';
  private readonly GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${this.GEMINI_MODEL}:generateContent`;
  private readonly OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || '';
  private readonly GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
  private readonly CACHE_KEY = 'llm_greeting_cache';
  private readonly CACHE_DURATION = 60 * 1000; // 1분

  constructor() {
    this.logApiKeyStatus();
  }

  /**
   * API 키 상태를 로그로 출력합니다.
   */
  private logApiKeyStatus(): void {
    console.log('LLM Service 초기화:');
    console.log('- OpenAI API 키:', this.OPENAI_API_KEY ? '✅ 설정됨' : '❌ 설정되지 않음');
    console.log('- Gemini API 키:', this.GEMINI_API_KEY ? '✅ 설정됨' : '❌ 설정되지 않음');
    console.log('- Gemini 모델:', this.GEMINI_MODEL);
  }

  /**
   * 사용 가능한 LLM 서비스를 확인합니다.
   */
  getAvailableServices(): { openai: boolean; gemini: boolean } {
    return {
      openai: !!this.OPENAI_API_KEY,
      gemini: !!this.GEMINI_API_KEY
    };
  }

  /**
   * 캐시된 인사말을 가져옵니다.
   */
  private getCachedGreeting(locationKey: string, weatherKey: string): GreetingInfo | null {
    try {
      const cacheKey = `${this.CACHE_KEY}_${locationKey}_${weatherKey}`;
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // 캐시가 유효한지 확인 (6시간)
      if (now - timestamp < this.CACHE_DURATION) {
        return data;
      }

      // 만료된 캐시 삭제
      localStorage.removeItem(cacheKey);
      return null;
    } catch (error) {
      console.error('LLM 캐시 읽기 오류:', error);
      return null;
    }
  }

  /**
   * 인사말을 캐시에 저장합니다.
   */
  private setCachedGreeting(locationKey: string, weatherKey: string, greeting: GreetingInfo): void {
    try {
      const cacheKey = `${this.CACHE_KEY}_${locationKey}_${weatherKey}`;
      const cacheData = {
        data: greeting,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('LLM 캐시 저장 오류:', error);
    }
  }

  /**
   * 위치와 날씨 정보를 기반으로 캐시 키를 생성합니다.
   */
  private getCacheKeys(location: LocationInfo, weather: WeatherInfo): { locationKey: string; weatherKey: string } {
    // 10초 캐싱을 위한 키 생성
    const locationKey = `llm_${location.city}_${location.region}_${location.country}`.toLowerCase().replace(/\s+/g, '_');
    const weatherKey = `llm_${weather.condition}_${weather.temperature}`.toLowerCase().replace(/\s+/g, '_');
    return { locationKey, weatherKey };
  }

  /**
   * 날씨 상태에 따른 색상 테마를 선택합니다.
   */
  private selectColorTheme(weather: WeatherInfo): string {
    const condition = weather.condition.toLowerCase();
    
    // 날씨 상태에 따른 색상 매핑
    if (condition.includes('맑음') || condition.includes('clear')) {
      return rainbowColors.find(c => c.name === '노랑')?.name || '노랑';
    } else if (condition.includes('구름') || condition.includes('cloud')) {
      return rainbowColors.find(c => c.name === '남색')?.name || '남색';
    } else if (condition.includes('비') || condition.includes('rain')) {
      return rainbowColors.find(c => c.name === '파랑')?.name || '파랑';
    } else if (condition.includes('눈') || condition.includes('snow')) {
      return rainbowColors.find(c => c.name === '보라')?.name || '보라';
    } else if (condition.includes('안개') || condition.includes('fog')) {
      return rainbowColors.find(c => c.name === '남색')?.name || '남색';
    } else {
      // 기본값: 온도에 따른 색상 선택
      if (weather.temperature > 25) return '주황';
      if (weather.temperature > 15) return '초록';
      if (weather.temperature > 5) return '파랑';
      return '남색';
    }
  }

  /**
   * OpenAI GPT API를 사용하여 인사말을 생성합니다.
   */
  private async generateWithOpenAI(location: LocationInfo, weather: WeatherInfo): Promise<string> {
    const prompt = `당신은 유머러스한 개발자 김규호입니다. 
현재 날씨는 ${weather.condition}, 온도는 ${weather.temperature}도입니다.
이 정보를 바탕으로 포트폴리오 방문자에게 재밌고 개성있는 인사말을 작성해주세요.

요구사항:
- 50자 이내로 간결하게
- 개발자다운 유머나 일상 개그 포함
- 날씨를 재밌게 활용
- 친근하고 자연스러운 톤
- 한국어로 작성
- 도시명은 언급하지 마세요
- 진부하지 않고 창의적으로`;

    const response = await fetch(this.OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '당신은 친근하고 유머러스한 개발자입니다. 간결하고 개성있는 인사말을 작성합니다.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 100,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  /**
   * Google Gemini API를 사용하여 인사말을 생성합니다.
   */
  private async generateWithGemini(location: LocationInfo, weather: WeatherInfo): Promise<string> {
    const prompt = `당신은 유머러스한 개발자 김규호입니다. 
현재 날씨는 ${weather.condition}, 온도는 ${weather.temperature}도입니다.
이 정보를 바탕으로 포트폴리오 방문자에게 재밌고 개성있는 인사말을 작성해주세요.

요구사항:
- 50자 이내로 간결하게
- 개발자다운 유머나 일상 개그 포함
- 날씨를 재밌게 활용
- 친근하고 자연스러운 톤
- 한국어로 작성
- 도시명은 언급하지 마세요
- 진부하지 않고 창의적으로`;

    const response = await fetch(`${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: 100,
          temperature: 0.8,
          topP: 0.8,
          topK: 10
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API 오류 상세:', errorText);
      throw new Error(`Gemini API 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Gemini API 응답 형식 오류');
    }
    
    return data.candidates[0].content.parts[0].text.trim();
  }

  /**
   * 기본 인사말을 생성합니다 (API 키가 없을 때 사용).
   */
  private generateDefaultGreeting(location: LocationInfo, weather: WeatherInfo): string {
    const greetings = [
      `${weather.temperature}도면 CPU도 땀 흘릴 날씨네요! 🔥💻`,
      `버그 잡으러 오셨나요? 저도 매일 잡고 있어요! 🐛🔍`,
      `${weather.condition} 날씨에 코딩하기 딱 좋네요! ☀️`,
      `커밋 메시지 뭐로 할지 고민 중이에요... 🤔📝`,
      `포트폴리오 리뷰 감사합니다! 코드 리뷰도 해주세요! 👀✨`,
      `${weather.temperature}도에서도 열심히 개발 중! 🚀`,
      `배포 전에 테스트는 했죠? (저도 매번 깜빡해요) 🧪`,
      `${weather.condition} 날씨에 코딩하기 좋다고 해요! ☀️💻`,
      `오늘도 코드와 씨름하는 하루! 반갑습니다! 👨‍💻`,
      `날씨 좋은데 집에서 코딩하고 있네요... 😅`
    ];

    // 위치와 날씨를 기반으로 인사말 선택
    const index = (location.city.length + weather.temperature) % greetings.length;
    return greetings[index];
  }

  /**
   * 위치와 날씨 정보를 기반으로 인사말을 생성합니다.
   */
  async generateGreeting(location: LocationInfo, weather: WeatherInfo): Promise<LLMServiceResponse> {
    try {
      const { locationKey, weatherKey } = this.getCacheKeys(location, weather);

      // 1. 캐시 확인
      const cachedGreeting = this.getCachedGreeting(locationKey, weatherKey);
      if (cachedGreeting) {
        console.log('캐시된 인사말 사용:', cachedGreeting);
        return {
          success: true,
          data: cachedGreeting
        };
      }

      // 2. 사용 가능한 서비스 확인
      const services = this.getAvailableServices();
      let greetingText: string;

      if (services.openai) {
        console.log('OpenAI GPT를 사용하여 인사말 생성 중...');
        greetingText = await this.generateWithOpenAI(location, weather);
      } else if (services.gemini) {
        console.log('Google Gemini를 사용하여 인사말 생성 중...');
        greetingText = await this.generateWithGemini(location, weather);
      } else {
        console.log('API 키가 없어 기본 인사말을 사용합니다.');
        greetingText = this.generateDefaultGreeting(location, weather);
      }

      // 3. 색상 테마 선택
      const colorTheme = this.selectColorTheme(weather);

      // 4. 인사말 정보 생성
      const greetingInfo: GreetingInfo = {
        message: greetingText,
        colorTheme,
        timestamp: Date.now()
      };

      // 5. 캐시에 저장
      this.setCachedGreeting(locationKey, weatherKey, greetingInfo);

      console.log('인사말 생성 성공:', greetingInfo);
      return {
        success: true,
        data: greetingInfo
      };

    } catch (error) {
      console.error('인사말 생성 실패:', error);
      
      // 에러 발생 시 기본 인사말 사용
      const defaultGreeting = this.generateDefaultGreeting(location, weather);
      const colorTheme = this.selectColorTheme(weather);
      
      const fallbackGreeting: GreetingInfo = {
        message: defaultGreeting,
        colorTheme,
        timestamp: Date.now()
      };

      return {
        success: true,
        data: fallbackGreeting
      };
    }
  }

  /**
   * 특정 위치와 날씨의 캐시를 강제로 삭제합니다.
   */
  clearCache(location: LocationInfo, weather: WeatherInfo): void {
    const { locationKey, weatherKey } = this.getCacheKeys(location, weather);
    const cacheKey = `${this.CACHE_KEY}_${locationKey}_${weatherKey}`;
    localStorage.removeItem(cacheKey);
    console.log(`LLM 캐시가 삭제되었습니다: ${cacheKey}`);
  }

  /**
   * 모든 LLM 캐시를 삭제합니다.
   */
  clearAllCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_KEY)) {
        localStorage.removeItem(key);
      }
    });
    console.log('모든 LLM 캐시가 삭제되었습니다.');
  }

  /**
   * 현재 캐시 상태를 확인합니다.
   */
  getCacheStatus(location: LocationInfo, weather: WeatherInfo): { hasCache: boolean; isExpired: boolean; timestamp?: number } {
    try {
      const { locationKey, weatherKey } = this.getCacheKeys(location, weather);
      const cacheKey = `${this.CACHE_KEY}_${locationKey}_${weatherKey}`;
      const cached = localStorage.getItem(cacheKey);
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
export const llmService = new LLMService();
export default llmService;
