---
id: "math-302"
title: "그린 함수(Green's Function)와 Neural Operator"
date: "2026-06-29"
category: "수학/Differential Equation"
tags: ["Differential Equation", "Green's function", "Neural Operator"]
pinned: false
excerpt: "역행렬에서 출발하여 그린 함수를 거쳐 Neural Operator까지의 수학적 연결 고리 정리"
---



# 1. 연산자(Operator)의 본질

### 함수 (Function)
함수는 숫자를 입력받아 다른 숫자를 출력하는 규칙이다.
$$ f: X \rightarrow Y $$
예를 들어, $f(x) = x^2$은 실수 공간의 입력을 받아 실수를 대응시킨다.

### 연산자 (Operator)
연산자는 함수의 개념을 확장한 것이다. 입력이 단순한 숫자가 아니라 **벡터, 함수, 행렬** 등일 수 있다.
대표적으로 미분 연산자 $D$를 생각할 수 있다.
$$ D = \frac{d}{dx} $$
미분 연산자 $D$는 함수 $f(x)$를 입력받아 새로운 도함수 $f'(x)$를 출력한다.
$$ Df = f' $$

---

# 2. 이산 공간(Discrete)에서의 연산자

이산 공간에서 가장 친숙한 선형 연산자는 **행렬**이다.
선형 시스템 $Ax = b$에서 $A$가 역행렬을 가질 때, 역행렬 $B = A^{-1}$는 다음을 만족한다.
$$ AB = I $$
역행렬 $B$의 각 열벡터를 나누어 표현하면 다음과 같다.
$$ B = \begin{bmatrix} b_1 & b_2 & \cdots & b_n \end{bmatrix} $$
행렬 곱셈의 성질에 의해, 각 열벡터 $b_j$는 다음 방정식을 만족한다.
$$ Ab_j = e_j $$
여기서 $e_j = \begin{bmatrix} 0 & \cdots & 1 & \cdots & 0 \end{bmatrix}^T$는 $j$번째 원소만 1이고 나머지는 0인 **단위 기저 벡터(standard basis vector)**이다.

> 💡 **핵심 직관**: 역행렬 $A^{-1}$의 $j$번째 열벡터 $b_j$는 **"단위 기저 입력 $e_j$에 대한 시스템 $A$의 응답"**이다. 임의의 입력 $b$에 대한 해 $x = A^{-1}b$는 각 기저 입력에 대한 응답들의 선형 결합으로 표현된다.

---

# 3. 연속 공간(Continuous)에서의 단위 기저의 부재

이제 연속 공간에서의 미분 방정식 시스템을 생각해본다.
$$ Lu = f $$
여기서 $L$은 미분 연산자이며, $u(x)$와 $f(x)$는 정의역 $x \in [a, b]$에서 정의된 함수(무한 차원 벡터)이다.

이러한 무한 차원 함수 공간에서는 이산 공간의 $e_1, e_2, \cdots$와 같은 이산적인 단위 기저 벡터를 정의할 수 없다. 연속적인 도메인 전체에서 특정 위치 $y$에서만 "콕 찝어" 자극을 주는 새로운 형태의 기저가 필요하다.

이때 등장하는 개념이 바로 **디랙 델타 함수(Dirac Delta Function)**(연속 공간의 단위 기저)이다.

---

# 4. 디랙 델타 함수의 의미

디랙 델타 함수 $\delta(x-y)$는 연속 공간에서 이산 공간의 단위 기저 $e_j$ 역할을 수행한다.

| 이산 공간 (Discrete) | 연속 공간 (Continuous) |
| :--- | :--- |
| $j$번째 위치의 기저 $e_j$ | $y$ 위치에서의 기저 $\delta(x-y)$ |
| 원소 선택 (Sifting): $x_j = e_j^T x$ | 함수값 선택 (Sifting): $f(y) = \int_a^b \delta(x-y)f(x)dx$ |

디랙 델타 함수는 다음과 같이 정의된다.
$$ \delta(x-y) = \begin{cases} \infty, & x = y \\ 0, & x \neq y \end{cases} $$
$$ \int_{-\infty}^{\infty} \delta(x-y) dx = 1 $$

### 물리적 차원(Unit) 분석
디랙 델타 함수는 단순히 수학적인 도구가 아닌 구체적인 물리적 단위를 가진다.
예를 들어 3차원 공간에서 정의된 디랙 델타 함수 $\delta(\mathbf{r})$는 공간에 대한 적분 값이 1(무차원)이 되어야 하므로 다음과 같은 단위를 가진다.
$$ [\delta] = \frac{1}{m^3} $$
즉, 델타 함수는 그 자체로 **부피 밀도**의 성격을 띤다.

---

# 5. 점원(Point Source)의 표현 예시

일반적으로 공간 상의 전하 밀도 $\rho$는 다음과 같이 정의된다.
$$ \rho = \frac{dq}{dV} $$
하지만 부피가 0인 점전하(Point Charge) $q$의 경우 일반적인 연속 함수로 전하 밀도를 표현하는 것이 불가능하다. 이를 디랙 델타 함수를 이용해 다음과 같이 나타낸다.
$$ \rho(\mathbf{r}) = q \delta(\mathbf{r} - \mathbf{r}') $$
이 표현식을 단위를 통해 검증해보면 다음과 같이 정확히 밀도 단위가 됨을 볼 수 있다.
$$ [C] \times \frac{1}{m^3} = [C/m^3] $$
전체 공간에 대해 적분하면 점전하의 총 전하량 $q$가 정확히 복원된다.
$$ \int \rho(\mathbf{r}) dV = q $$

---

# 6. 그린 함수(Green's Function)의 정의

이산 공간의 $Ab_j = e_j$에 대응하여, 연속 공간에서 미분 연산자 $L$과 디랙 델타 함수 $\delta(x-y)$ 사이의 관계를 정의한다.
그린 함수 $G(x,y)$는 다음을 만족하는 함수이다.
$$ L_x G(x,y) = \delta(x-y) $$
여기서 첨자 $x$는 연산자 $L$이 변수 $x$에 대해서만 작용함을 의미한다.

> 💡 **그린 함수의 정의**: 그린 함수 $G(x,y)$는 **"연속 공간에서 디랙 델타 입력(점원, Point Source)에 대한 미분 연산자의 응답"**이다.

이산 공간에서 역행렬이 $G(x,y) \approx L^{-1}$ 형태로 미분 연산자의 역연산(Inverse Operator)을 표현한다는 것을 보여준다.

---

# 7. 그린 함수의 해석

### 1) 두 변수 함수로서의 의미
그린 함수는 기본적으로 두 개의 입력 변수 $x, y$를 받아 하나의 실수를 출력하는 함수이다.
$$ G: \mathbb{R}^2 \rightarrow \mathbb{R} $$
이때 두 변수는 서로 다른 물리적 의미를 가진다.
* $y$ : 입력 자극이 발생하는 **Source 위치**
* $x$ : 그 자극에 의한 영향이 관측되는 **Observation 위치**

즉, $G(x,y)$는 **"$y$ 위치에 가해진 점자극(Impulse)이 $x$ 위치에 미치는 영향"**을 나타낸다.

### 2) 함수들의 집합이라는 관점
입력 자극의 위치 $y$를 하나 고정하면 $G(x, y_0)$는 오직 $x$에 관한 함수가 된다. 자극의 위치 $y$를 연속적으로 변화시킬 때마다 서로 다른 함수들이 만들어지므로, 그린 함수는 무수히 많은 함수들을 $y$축을 따라 쌓아 놓은 **함수 공간의 집합**으로 이해할 수 있다.
$$ G(x,y) = \{ G(\cdot, y) \}_y $$

---

# 8. 역연산과 해(Solution)의 도출

그린 함수를 알고 있다면 임의의 forcing term $f(x)$를 가지는 비제차 미분 방정식 $Lu = f$의 해 $u(x)$를 적분을 통해 직접 구할 수 있다.

양변에 $f(y)$를 곱하고 $y$에 대해 적분한다.
$$ \int_a^b L_x G(x, y) f(y) dy = \int_a^b \delta(x-y) f(y) dy $$
우변은 디랙 델타 함수의 성질(Sifting Property)에 의해 $f(x)$가 된다. 좌변은 연산자 $L_x$가 $x$에만 작용하므로 적분 기호 밖으로 빠져나올 수 있다.
$$ L_x \left( \int_a^b G(x,y)f(y)dy \right) = f(x) $$
본래 미분 방정식이 $L_x u(x) = f(x)$였으므로, 괄호 안의 식 자체가 우리가 찾던 해 $u(x)$가 된다.
$$ u(x) = \int_a^b G(x,y) f(y) dy $$

이것은 이산 공간에서의 $x = A^{-1}b$ 관계가 연속 공간에서 적분 형태로 구현된 것과 같다. 미분의 역연산이 적분이기 때문에 역행렬의 곱 연산이 적분 커널(Kernel) 연산으로 확장된 것이다.

---

# 9. 그린 함수를 이용한 ODE 풀이 예시 (수식적 흐름)

### [예제 1] 1계 미분 방정식
$$ \frac{du}{dx} = f(x), \quad x \in [a, \infty) $$
초기 조건: $u(a) = 0$

**1. 그린 함수 설정**
연산자 $L = \frac{d}{dx}$에 대해 그린 함수는 다음을 만족해야 한다.
$$ \frac{\partial}{\partial x} G(x,y) = \delta(x-y) $$
$x \neq y$인 영역에서는 $\delta(x-y) = 0$이므로, 그린 함수는 상수 함수 형태를 가진다.
$$ G(x,y) = \begin{cases} c_1, & x < y \\ c_2, & x > y \end{cases} $$

**2. 조건 대입 및 불연속성 검증**
초기 조건 $u(a) = 0$에 의해 $G(a,y) = 0$이므로 $c_1 = 0$이다.
또한 델타 함수의 적분 성질을 이용해 $x=y$에서의 도함수 점프 조건을 확인한다.
$$ \int_{y-\epsilon}^{y+\epsilon} \frac{\partial}{\partial x} G(x,y) dx = G(y+\epsilon, y) - G(y-\epsilon, y) = \int_{y-\epsilon}^{y+\epsilon} \delta(x-y) dx = 1 $$
$$ c_2 - c_1 = 1 \implies c_2 = 1 $$
따라서 그린 함수는 다음과 같은 단위 계단 함수(Unit Step Function)의 형태를 띤다.
$$ G(x,y) = \begin{cases} 0, & x < y \\ 1, & x > y \end{cases} = H(x-y) $$

**3. 최종 일반해 도출**
$$ u(x) = \int_a^\infty G(x,y) f(y) dy = \int_a^\infty H(x-y) f(y) dy = \int_a^x f(y) dy $$
만약 $f(x) = x$라면 해는 다음과 같이 얻어진다.
$$ u(x) = \int_a^x y dy = \frac{1}{2}x^2 - \frac{1}{2}a^2 $$

---

### [예제 2] 2계 미분 방정식 (경계값 문제)
$$ \frac{d^2u}{dx^2} = f(x), \quad x \in [0, \pi] $$
경계 조건: $u(0) = 0, \quad u(\pi) = 0$

**1. 그린 함수 설정**
연산자 $L = \frac{d^2}{dx^2}$에 대해 그린 함수는 다음을 만족한다.
$$ \frac{\partial^2}{\partial x^2} G(x,y) = \delta(x-y) $$
$x \neq y$인 영역에서는 두 번 미분해서 0이 되어야 하므로 1차 식 형태를 가진다.
$$ G(x,y) = \begin{cases} c_1 x + c_2, & x < y \\ c_3 x + c_4, & x > y \end{cases} $$

**2. 조건 대입**
경계 조건 $G(0, y) = 0$과 $G(\pi, y) = 0$을 적용한다.
* $c_2 = 0$
* $c_3 \pi + c_4 = 0 \implies c_4 = -c_3 \pi$

따라서 다음과 같이 정리된다.
$$ G(x,y) = \begin{cases} c_1 x, & x < y \\ c_3 (x - \pi), & x > y \end{cases} $$

**3. 연속성 및 도함수의 불연속성 검증**
그린 함수 자체는 $x=y$에서 연속이어야 하므로
$$ c_1 y = c_3 (y - \pi) $$
1계 도함수는 $x=y$에서 1만큼의 점프(Discontinuity)를 가져야 하므로
$$ \left. \frac{\partial G}{\partial x} \right|_{x=y^+} - \left. \frac{\partial G}{\partial x} \right|_{x=y^-} = 1 \implies c_3 - c_1 = 1 $$

두 식을 연립하여 $c_1, c_3$을 구하면 다음과 같다.
$$ c_1 = \frac{y}{\pi} - 1, \quad c_3 = \frac{y}{\pi} $$
최종적인 그린 함수 $G(x,y)$는 다음과 같이 대칭적인 구조를 가진다.
$$ G(x,y) = \begin{cases} \left(\dfrac{y}{\pi} - 1\right)x, & x < y \\ \left(\dfrac{x}{\pi} - 1\right)y, & x > y \end{cases} $$

---

# 10. 무한차원 역행렬로서의 그린 함수 요약

선형대수학의 이산 대수 방정식과 함수해석학의 연속 미분 방정식 사이의 대응 관계는 다음과 같이 완벽한 대칭을 이룬다.

| 이산 공간 (Discrete) | 연속 공간 (Continuous) |
| :--- | :--- |
| **행렬** ($A$) | **선형 연산자** ($L$) |
| **역행렬** ($A^{-1}$) | **역연산자** ($L^{-1}$) |
| **단위 기저 벡터** ($e_j$) | **디랙 델타 함수** ($\delta(x-y)$) |
| **역행렬의 $j$번째 열** ($b_j$) | **그린 함수** ($G(\cdot, y)$) |
| **선형 변환**: $Ab_j = e_j$ | **연산자 작용**: $L_x G(x,y) = \delta(x-y)$ |
| **해 도출**: $x = \sum_j b_j y_j$ | **해 도출**: $u(x) = \int G(x,y)f(y)dy$ |

그린 함수는 특정 도메인이나 전자기학에 국한된 개념이 아니라, **모든 선형 연산자의 역연산을 커널 적분 형태로 표현하는 보편적인 수학적 개념**이다.

---

# 11. Neural Operator와의 연결 고리

인공신경망을 이용해 편미분 방정식(PDE)의 해를 학습하는 최근의 연구 흐름인 **Neural Operator**는 바로 이 그린 함수의 관계식에서 출발한다.

일반적인 PDE 문제에서 우리는 임의의 입력(forcing term 또는 초기 조건) $f(y)$에 대해 해 $u(x)$를 구하고자 하지만, 미분 연산자 $L$에 대응하는 그린 함수 $G(x, y)$의 엄밀한 수학적 형태를 알지 못하는 경우가 대부분이다.
$$ u(x) = \int_a^b G(x,y) f(y) dy $$

Neural Operator는 **그린 함수 $G(x,y)$를 데이터로부터 학습 가능한 신경망 $\kappa_\theta(x,y)$로 대체**하여 근사한다.
$$ u(x) \approx \int_a^b \kappa_\theta(x,y) f(y) dy $$

즉, Neural Operator는 **"지배 방정식(연산자)의 역연산 커널(그린 함수)을 데이터로부터 학습하여 임의의 입력 함수를 출력 함수로 바로 매핑하는 알고리즘"**이다. 이 수학적 토대를 바탕으로 Fourier Neural Operator(FNO)나 DeepONet과 같은 고등 기법들이 파생되며 물리 법칙을 결합한 연산자 학습(Physics-informed Operator Learning)의 근본이 된다.
