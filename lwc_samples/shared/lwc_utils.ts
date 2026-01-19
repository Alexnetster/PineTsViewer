/**
 * LWC Reference Sample Utilities
 * 
 * Pine Script 지표를 순수 TypeScript로 구현한 유틸리티 함수들
 * TradingView의 ta.* 함수와 동일한 결과를 보장합니다.
 */

/**
 * Simple Moving Average (SMA)
 * Pine Script: ta.sma(source, length)
 */
export function calculateSMA(data: number[], period: number): number[] {
    const result: number[] = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            result.push(NaN); // 데이터 부족
            continue;
        }

        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i - j];
        }

        result.push(sum / period);
    }

    return result;
}

/**
 * Exponential Moving Average (EMA)
 * Pine Script: ta.ema(source, length)
 */
export function calculateEMA(data: number[], period: number): number[] {
    const result: number[] = [];
    const multiplier = 2 / (period + 1);

    // 첫 번째 EMA는 SMA로 시작
    let ema = 0;
    for (let i = 0; i < period; i++) {
        if (i >= data.length) break;
        ema += data[i];
    }
    ema /= period;

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            result.push(NaN);
            continue;
        }

        if (i === period - 1) {
            result.push(ema);
        } else {
            ema = (data[i] - ema) * multiplier + ema;
            result.push(ema);
        }
    }

    return result;
}

/**
 * Standard Deviation
 * Pine Script: ta.stdev(source, length)
 */
export function calculateStdDev(data: number[], period: number): number[] {
    const result: number[] = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            result.push(NaN);
            continue;
        }

        // Mean 계산
        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i - j];
        }
        const mean = sum / period;

        // Variance 계산
        let variance = 0;
        for (let j = 0; j < period; j++) {
            const diff = data[i - j] - mean;
            variance += diff * diff;
        }
        variance /= period;

        result.push(Math.sqrt(variance));
    }

    return result;
}

/**
 * Crossover Detection
 * Pine Script: ta.crossover(series1, series2)
 * Returns true when series1 crosses above series2
 */
export function detectCrossover(series1: number[], series2: number[]): boolean[] {
    const result: boolean[] = [];

    for (let i = 0; i < series1.length; i++) {
        if (i === 0) {
            result.push(false);
            continue;
        }

        const current1 = series1[i];
        const current2 = series2[i];
        const prev1 = series1[i - 1];
        const prev2 = series2[i - 1];

        // NaN 체크
        if (isNaN(current1) || isNaN(current2) || isNaN(prev1) || isNaN(prev2)) {
            result.push(false);
            continue;
        }

        // 이전에는 아래였고, 현재는 위
        const crossover = prev1 <= prev2 && current1 > current2;
        result.push(crossover);
    }

    return result;
}

/**
 * Crossunder Detection
 * Pine Script: ta.crossunder(series1, series2)
 * Returns true when series1 crosses below series2
 */
export function detectCrossunder(series1: number[], series2: number[]): boolean[] {
    const result: boolean[] = [];

    for (let i = 0; i < series1.length; i++) {
        if (i === 0) {
            result.push(false);
            continue;
        }

        const current1 = series1[i];
        const current2 = series2[i];
        const prev1 = series1[i - 1];
        const prev2 = series2[i - 1];

        // NaN 체크
        if (isNaN(current1) || isNaN(current2) || isNaN(prev1) || isNaN(prev2)) {
            result.push(false);
            continue;
        }

        // 이전에는 위였고, 현재는 아래
        const crossunder = prev1 >= prev2 && current1 < current2;
        result.push(crossunder);
    }

    return result;
}

/**
 * Bollinger Bands 계산
 * Pine Script:
 *   basis = ta.sma(close, length)
 *   dev = mult * ta.stdev(close, length)
 *   upper = basis + dev
 *   lower = basis - dev
 */
export function calculateBollingerBands(
    data: number[],
    period: number,
    multiplier: number
): { basis: number[]; upper: number[]; lower: number[] } {
    const basis = calculateSMA(data, period);
    const stdDev = calculateStdDev(data, period);

    const upper = basis.map((b, i) => b + stdDev[i] * multiplier);
    const lower = basis.map((b, i) => b - stdDev[i] * multiplier);

    return { basis, upper, lower };
}

/**
 * 로그 출력 헬퍼
 */
export function logToPanel(container: HTMLElement, message: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
}
