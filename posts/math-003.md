# 상수 계수를 갖는 2계 제차 미분 방정식
$ y"+ay'+by=0 $의 해를 $ e^{\lambda x} $ 라고 놓고 풀면 $ {\lambda^2} + a{\lambda} +b=0 $이므로 주어진 미분 방정식의 해는 $ y_1=e^{\lambda_1 x}, y_2=e^{\lambda_2 x} $가 된다. 이 미분 방정식을 Characteristic equation이라고 한다.
Characteristic equation의 해는 두 개의 함수 $ y_1, y_2 $가 정의된 구간에서 1차 독립 (linearly independent)이어야 하며 어떠한 상수 $ C $가 곱해진 형태 $ Ce^x $도 해가 될 수 있고 $ C_1e^{\lambda_1x} + C_2e^{\lambda_2x} $도 해가 될 수 있다. 따라서 basis는 2개 ($ y_1, y_2 $), 일반해는 $ C_1e^{\lambda_1x}+C_2e^{\lambda_2x} $가 된다.

## 1차 독립
$$ k_1y_1(x)+k_2y_2(x)=0이면\ k_1=k_2=0 $$
## 1차 종속
$$ k_1y_1(x)+k_2y_2(x)=0이면\ k_1\neq0, k_2\neq0인\ k존재 $$

특성 방정식의 해가 두 허근 $ \lambda_1=p+jq, \lambda_2=p-jq $ 을 가질때 두 basis는 오일러 공식에 의해
$y_1=e^{(p+jq)x}=e^{px}e^{jqx}=e^{px}(cos(qx)+jsin(qx))$와 $y_2=e^{(p-jq)x}=e^{px}e^{-jqx}=e^{px}(cos(qx)-jsin(qx))$로 주어지며
real part만 남기고 소거하면 $\frac{1}{2}(y_1+y_2)=e^{px}cos(qx), \frac{1}{2j}(y_1-y_2)=e^{px}sin(qx)$로 1차 독립이므로 일반해는 $e^{px}(C_1cos(qx)+C_2sin(qx))$가 된다.
특성 방정식이 중근 $\lambda$를 가질 때, basis는 $y_1=e^{-\lambda x}, y_2=u(x)y_1(x)$로 놓고 $y_2$를 미분 방정식에 넣고 $u(x)$를 구한다.
결과적으로 일반해는 $C_1e^{\lambda x}+C_2xe^{\lambda x}$가 된다.

# 상수 계수를 갖는 2계 비제차 미분 방정식
$y\prime\prime+ay\prime+by=r(x)$의 일반해 $y(x)$는 $y(x)=y_h(x)+y_p(x)$를 만족한다. (h : homogeneous (제차), p : particular (특수해)) 이때, 제차해는 제차 미분 방정식의 풀이법을 이용하고 특수해는 미정계수법으로 구한다. 미정계수법이란 $y_p$를 $r(x)$와 유사한 꼴에 적당히 계수를 붙인 것으로 가정한 다음, 주어진 방정식을 만족하도록 미정계수를 결정하는 방법이다.

| $r(x)$ | $y_p$ |
|-----|-----|
| $ke^{rx}$ | $Ce^{rx}$ |
| $kx^n$ | $K_nx^n+K_{n-1}x^{n-1}+\cdot\cdot\cdot+K_0$ |
| $kcos(\omega x)$ | $kcos(\omega x)+Msin(\omega x)$ |
|$ksin(\omega x)$ | $ $ |
| $ke^{\alpha x}cos(\omega x)$
$ke^{\alpha x}sin(\omega x)$ | $e^{\alpha x}(kcos(\omega x)+Msin(\omega x))$ |

- **랭크(rank)**, 유효 차원(effective dimension), PCA 스펙트럼(고유값 감소)을 보면 판단 가능합니다.

## 실전 체크
1. branch feature의 공분산 고유값 분포를 보고 32개 이후가 급격히 작아지는지 확인
2. projection 전후의 재구성 오차(또는 downstream 성능) 비교
