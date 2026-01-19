/**
 * Mock OHLCV Data for LWC Reference Samples
 * 
 * 공통 테스트 데이터를 제공하여 모든 레퍼런스 샘플이 동일한 데이터로 검증되도록 보장합니다.
 */

export interface OHLCVData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

/**
 * 100개 바의 기본 OHLCV 데이터
 * 트렌드와 변동성이 적절히 섞여 있어 EMA, Bollinger Bands 등의 지표 테스트에 적합
 */
export function generateMockOHLCV(bars: number = 100): OHLCVData[] {
    const now = Math.floor(Date.now() / 1000);
    const data: OHLCVData[] = [];

    let basePrice = 100;

    for (let i = 0; i < bars; i++) {
        const time = now - (bars - i) * 86400; // 일봉 기준

        // 트렌드 + 노이즈
        const trend = Math.sin(i / 10) * 5; // 주기적 트렌드
        const noise = (Math.random() - 0.5) * 3; // 랜덤 변동

        basePrice += trend + noise;

        const open = basePrice + (Math.random() - 0.5) * 2;
        const close = basePrice + (Math.random() - 0.5) * 2;
        const high = Math.max(open, close) + Math.random() * 3;
        const low = Math.min(open, close) - Math.random() * 3;
        const volume = 1000000 + Math.random() * 500000;

        data.push({
            time,
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
            volume: Math.floor(volume)
        });
    }

    return data;
}

/**
 * 강한 상승 트렌드 데이터 (Bull Market)
 */
export function generateBullTrendData(bars: number = 100): OHLCVData[] {
    const now = Math.floor(Date.now() / 1000);
    const data: OHLCVData[] = [];

    let basePrice = 100;

    for (let i = 0; i < bars; i++) {
        const time = now - (bars - i) * 86400;

        basePrice += 0.5 + Math.random() * 1.5; // 지속적 상승

        const open = basePrice + (Math.random() - 0.5);
        const close = basePrice + Math.random() * 2; // 양봉 편향
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random();

        data.push({
            time,
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2))
        });
    }

    return data;
}

/**
 * 횡보 구간 데이터 (Sideways Market)
 */
export function generateSidewaysData(bars: number = 100): OHLCVData[] {
    const now = Math.floor(Date.now() / 1000);
    const data: OHLCVData[] = [];

    const basePrice = 100;

    for (let i = 0; i < bars; i++) {
        const time = now - (bars - i) * 86400;

        const noise = (Math.random() - 0.5) * 4; // 좁은 범위 변동

        const open = basePrice + noise;
        const close = basePrice + (Math.random() - 0.5) * 4;
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;

        data.push({
            time,
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2))
        });
    }

    return data;
}

// 기본 데이터셋 (모든 샘플에서 공통 사용)
export const MOCK_OHLCV_100_BARS = generateMockOHLCV(100);
