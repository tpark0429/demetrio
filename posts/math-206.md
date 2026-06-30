---
id: "math-206"
title: "Monte Carlo Approximation"
date: "2026-6-30"
category: "수학/Probability & Information"
tags: ["Probability", "Monte Carlo"]
pinned: false
excerpt: "Monte Carlo Approximation 개념"
---

## Goal
- Approximate $\mathbb{E}_{X \sim p(x)}[f(X)]$
- $p(x)$가 주어졌을 때, $f(x)$의 기댓값을 구하는 것이 목표
- 그러나 일단적으로 정확한 값을 계산하는 것은 intractable하므로 효율적인 방법을 통해 근사화

## Definition
- if $x_1, x_2, \dots, x_n \sim P(x)$ 동일한 분포에서 독립적으로 시행 했을 때, 추출한 분포가 똑같다면 (i.i.d라면)
- $\hat {\mu}_n = \frac{1}{n}\sum_{i=1}^n f(x_i)$를 Monte Carlo estimator라고 함
- 수식상으론 샘플 데이터에 대한 mean과 동일한 결과
> 💡 **Mathematical Insight**: $\mathbb{E}[\hat{\mu}_n] = \mathbb{E}[f(x)]$ : Unbiased estimator (샘플의 평균은 전체 평균과 같다.)

## Example: Monte Carlo Approximation을 이용한 원주율($\pi$) 추정

가로세로의 길이가 1인 정사각형 영역 $[0, 1] \times [0, 1]$ 내에 무작위로 점을 찍어 원주율 $\pi$를 근사하는 예제

### 1. Background
- 한 변의 길이가 1인 정사각형의 넓이는 $1$
- 반지름의 길이가 1인 원의 4분의 1(4분원)의 넓이는 $\frac{\pi}{4}$
- 정사각형 영역 안에 무작위로 점 $(x, y)$를 균일하게 생성할 때, 해당 점이 4분원 내부($x^2 + y^2 \le 1$)에 위치할 확률은 $\frac{\pi}{4}$
- 무작위 시행 횟수 $N$이 커질수록, 4분원 내부에 들어온 점의 개수 $N_{\text{in}}$의 비율은 기댓값 $\frac{\pi}{4}$에 수렴
  $$ \frac{N_{\text{in}}}{N} \approx \frac{\pi}{4} \implies \pi \approx 4 \times \frac{N_{\text{in}}}{N} $$

### 2. Python code
무작위 시행을 통해 점을 생성하고 원주율을 계산한 뒤 시각화하는 파이썬 스크립트

```python
import numpy as np
from matplotlib import pyplot as plt

if __name__ == '__main__':
    N = 10000  # 무작위 시행 횟수
    x = np.random.random([N, 2])
    distance = np.sum(x ** 2.0, axis=1)
    in_out = distance <= 1.0
    
    pi = np.sum(in_out) * 4 / N
    color = list(map(lambda val: 'red' if val else 'blue', in_out))

    plt.figure(figsize=(5, 5))
    plt.scatter(x[:,0], x[:,1], color=color, s=5, label='Result : {}'.format(np.round(pi, 4)))
    
    cx = np.cos(np.linspace(0, np.pi/2, 1000))
    cy = np.sin(np.linspace(0, np.pi/2, 1000))
    plt.plot(cx, cy, color='black', lw=2)
    plt.legend(loc='lower right')

    plt.xlim(0, 1)
    plt.ylim(0, 1)
    plt.show()
```

### 3. Simulation Result
시행 횟수 $N = 10000$으로 수행한 몬테카를로 시뮬레이션 결과 그래프

![Monte Carlo Pi Simulation](/assets/monte_carlo.png)

> 💡 **Mathematical Insight**: 시행 횟수 $N$이 증가할수록 **대수의 법칙(Law of Large Numbers)**에 의해 몬테카를로 추정값은 실제 원주율 $\pi$값인 $3.14159\dots$에 근사한다. 몬테카를로 근사는 수치적인 적분이 불가능하거나 기하학적 형태가 복잡한 영역의 면적/부피(기댓값)를 구할 때 매우 강력한 도구가 된다.
