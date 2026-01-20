# 반응형 CSS 적용 가이드

## 개요

`lwc_samples/common/responsive.css` 파일을 사용하여 모든 샘플 파일에 모바일 반응형 디자인을 적용할 수 있습니다.

## 이미 적용된 파일

다음 파일들은 이미 `responsive.css`가 링크되어 있습니다:

- ✅ `Advanced/pivot_points.html`
- ✅ `Oscillators/rsi.html`
- ✅ `Oscillators/macd.html`
- ✅ `Volume/vwap.html`
- ✅ `Strategy/risk_management.html` (인라인 CSS)
- ✅ `Strategy/scale_in_out.html` (인라인 CSS)
- ✅ `stability_test_reference.html` (인라인 CSS)

## 적용 방법

### 1. HTML 파일에 링크 추가

HTML 파일의 `<head>` 섹션에 다음 코드를 추가하세요:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../common/responsive.css">
    <title>Your Title</title>
    ...
</head>
```

**경로 주의사항:**
- 하위 폴더 (예: `Oscillators/`, `Trend/`)에서: `../common/responsive.css`
- 루트 폴더 (`lwc_samples/`)에서: `common/responsive.css`

### 2. 기존 인라인 반응형 CSS 제거 (선택사항)

파일에 이미 `@media (max-width: 768px)` 같은 반응형 CSS가 있다면:

**옵션 A**: 그대로 유지 (공통 CSS와 함께 작동)
**옵션 B**: 제거하고 공통 CSS만 사용 (권장)

## 반응형 CSS 기능

### 모바일 (768px 이하)
- 2열 레이아웃 → 1열 세로 배치
- 차트 높이: 400px
- 로그/사이드바: 차트 아래 배치
- 제목 크기 축소

### 작은 모바일 (480px 이하)
- 차트 높이: 300px
- 더 작은 폰트 크기
- 패딩 축소

### 태블릿 (768px ~ 1024px)
- 적절한 간격 조정
- 차트 높이: 500px

### 터치 디바이스
- 버튼 최소 크기: 44px (터치 친화적)
- 스크롤 최적화

## 일괄 적용 스크립트 (향후 사용)

나중에 모든 파일에 일괄 적용하려면 Python 스크립트를 사용할 수 있습니다:

```python
import os
import re

def add_responsive_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 이미 링크가 있는지 확인
    if 'responsive.css' in content:
        print(f'Already has responsive.css: {file_path}')
        return
    
    # viewport 메타 태그 다음에 링크 추가
    pattern = r'(<meta name="viewport"[^>]*>)'
    replacement = r'\1\n    <link rel="stylesheet" href="../common/responsive.css">'
    
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Added responsive.css to: {file_path}')
    else:
        print(f'Could not add to: {file_path}')

# 사용 예시
samples_dir = 'd:/github.com/PineTsChart/TauriApp2/lwc_samples'
for root, dirs, files in os.walk(samples_dir):
    for file in files:
        if file.endswith('.html') and file != 'index.html':
            file_path = os.path.join(root, file)
            add_responsive_css(file_path)
```

## 테스트 방법

### 1. 브라우저 테스트
1. 샘플 파일을 브라우저에서 열기
2. 개발자 도구 열기 (F12)
3. 반응형 모드 전환 (Ctrl+Shift+M)
4. 다양한 기기 크기 테스트

### 2. 실제 모바일 테스트
1. 모바일 기기에서 파일 열기
2. 세로/가로 모드 전환 테스트
3. 터치 인터랙션 확인

## 주의사항

### CSS 우선순위
`responsive.css`는 `!important`를 사용하여 기존 스타일을 덮어씁니다. 만약 특정 파일에서 다른 동작이 필요하다면:

1. 해당 파일의 인라인 CSS에 더 구체적인 선택자 사용
2. 또는 `responsive.css`를 복사하여 파일별로 커스터마이즈

### 차트 크기
차트 라이브러리가 `width`와 `height`를 동적으로 설정하는 경우, CSS의 `!important`가 필요할 수 있습니다.

## 파일 목록

아직 `responsive.css`가 적용되지 않은 파일들:

### Advanced (7개)
- [ ] auto_fib.html
- [ ] auto_trend_lines.html
- [ ] ict_fvg.html
- [ ] supply_demand.html
- [ ] support_resistance.html
- [ ] utbot.html
- [ ] zigzag.html

### Oscillators (6개)
- [ ] ao.html
- [ ] cci.html
- [ ] momentum.html
- [ ] squeeze_momentum.html
- [ ] stochastic.html
- [ ] williams_r.html

### Trend (6개)
- [ ] bollinger_with_fill.html
- [ ] donchian_channels.html
- [ ] ichimoku_cloud.html
- [ ] keltner_channels.html
- [ ] ma_series.html
- [ ] parabolic_sar.html
- [ ] supertrend.html

### Volatility (5개)
- [ ] adx.html
- [ ] atr.html
- [ ] envelopes.html
- [ ] stddev.html
- [ ] trix.html

### Volume (8개)
- [ ] ad.html
- [ ] anchored_vwap.html
- [ ] cmf.html
- [ ] eom.html
- [ ] mfi.html
- [ ] obv.html
- [ ] volume_oscillator.html
- [ ] vpvr.html

### SupportResistance (1개)
- [ ] order_blocks.html

### Root (1개)
- [ ] bollinger_reference.html

**총 34개 파일**이 아직 적용 대기 중입니다.

## 권장 작업 순서

1. **우선순위 높음**: 자주 사용하는 샘플부터 적용
2. **중간 우선순위**: 카테고리별로 일괄 적용
3. **낮은 우선순위**: 나머지 파일들

또는 위의 Python 스크립트를 실행하여 한 번에 모두 적용할 수 있습니다.
