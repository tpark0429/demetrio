---
id: "math-201"
title: "Probability"
date: "2026-05-21"
category: "수학/Probability & Information"
tags: ["Probability", "Random Variable", "Expexted Value"]
pinned: false
excerpt: "Probability의 기초"
---
## Random Variable
어떤 실험 결과(s)가 확률적으로 나타날때, 이를 **실수값(R)로 표현한 함수**이다.
즉, 실험 결과를 특정값으로 mapping 해주는 function이다.
- $X:s\to R, s \in S$
- s: sample space, X: random variable

### Random Variable의 종류

#### Discrete Random Variable(이산확률변수)
실험 결과를 이산적인 값으로 mapping (ex: 주사위 굴리기, 대한민국에서 하루에 태어나는 사람 수)

Discrete random variable은 정확한 값을 알고 있는 경우이다. (distinct or separated values) 따라서 **확률 질량 함수(probability mass function)**로 표현된다.

#### Continuous Random Variable(연속확률변수)
실험 결과를 특정 구간의 모든 실수 값을 취하는 연속 구간의 값으로 mapping (ex: 서울에 거주하는 40대 남성의 키, 올림픽 100 m 달리기 우승자의 기록)

'키'라는 개념이 이산적인 개념으로 보일 수 있으나 정확한 값을 알 수 없기 때문에 (소수점 몇째 자리까지인가? 특정 구간에 있을 확률로 표시할 수 밖에 없음 : 175~180 cm일 확률) **확률 밀도 함수(probability density function)**로 표현된다.

## Expected Value

#### **평균 (Mean)**
어떤 집합의 모든 원소 값을 더한 후 원소의 갯수로 나눈 값

- $Mean (\mu)=\frac{x_1 + x_2 + ... + x_n}{n}=\frac{1}{n}\sum_{i=1}^n x_i$

#### **기댓값 (Expected Value)**
정확히 아는 값이 아닌 기대되는 값 (확률적으로 계산해야 하는 값), generalization of the weighted average.

> 💡 **Mathematical Insight**: **평균(Mean)**은 데이터 집합을 단순히 등분한 산술적 평균값인 반면, **기댓값(Expected Value)**은 각 확률 변수가 가질 수 있는 값에 확률적 가중치를 곱해 평균낸 값이다. 즉, 확률 분포 상에서 기대되는 가중 평균의 일반화된 개념이다.

- $E[X] = x_1p_1 + x_2p_2 + ... + x_np_n = \sum_{i=1}^n x_ip_i$
  - X: a random variable
  - $p_i$: the probability of $x_i$
  - $x_i$: the possible outcome value of $X$

#### 주사위 2번 던지기 예제 #1
- 나올 수 있는 sample space는 36가지 ((1,1), (1,2), ... , (6,6))
- 확률은 36가지 경우 모두 동일하게 1/36.
- random variable X는 주사위 값 2개의 합이라고 가정. min value는 2, max value는 12로 총 11가지의 값을 취할 수 있다.
  - 주사위 2개를 던졌을 때, 합이 7이 될 확률 : $P(X=7) = \frac{6}{36} = \frac{1}{6}$
  - 주사위 2개를 던졌을 때, 합이 9가 될 확률 : $P(X=9) = \frac{4}{36} = \frac{1}{9}$
  - 기댓값 : $E[X] = \sum_{i=1}^n x_ip_i = 2 \times \frac{1}{36} + 3 \times \frac{2}{36} + 4 \times \frac{3}{36} + 5 \times \frac{4}{36} + 6 \times \frac{5}{36} + 7 \times \frac{6}{36} + 8 \times \frac{5}{36} + 9 \times \frac{4}{36} + 10 \times \frac{3}{36} + 11 \times \frac{2}{36} + 12 \times \frac{1}{36} = 7$

#### 주사위 2번 던지기 예제 #2
 - 주사위 2개를 던진 실험을 10회 반복하여 dataset을 확보했다.
 - Dataset #1은
<table>
  <thead>
    <tr>
      <th>$실험$</th>
      <th>$1$</th>
      <th>$2$</th>
      <th>$3$</th>
      <th>$4$</th>
      <th>$5$</th>
      <th>$6$</th>
      <th>$7$</th>
      <th>$8$</th>
      <th>$9$</th>
      <th>$10$</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>$결과값$</th>
      <th>$3,4$</th>
      <th>$1,5$</th>
      <th>$5,1$</th>
      <th>$3,3$</th>
      <th>$1,2$</th>
      <th>$6,3$</th>
      <th>$6,6$</th>
      <th>$1,6$</th>
      <th>$2,4$</th>
      <th>$4,4$</th>
    </tr>
    <tr>
      <th>$RV X$</th>
      <th>$7$</th>
      <th>$6$</th>
      <th>$6$</th>
      <th>$6$</th>
      <th>$3$</th>
      <th>$9$</th>
      <th>$12$</th>
      <th>$7$</th>
      <th>$6$</th>
      <th>$8$</th>
    </tr>
  </tbody>
</table>

$Mean(\mu)=\frac{1}{10}\sum_{i=1}^{10} x_i=\frac{70}{10}=7$ : 평균과 기댓값이 동일한 case

- Dataset #2는
<table>
  <thead>
    <tr>
      <th>$실험$</th>
      <th>$1$</th>
      <th>$2$</th>
      <th>$3$</th>
      <th>$4$</th>
      <th>$5$</th>
      <th>$6$</th>
      <th>$7$</th>
      <th>$8$</th>
      <th>$9$</th>
      <th>$10$</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>$결과값$</th>
      <th>$3,4$</th>
      <th>$3,6$</th>
      <th>$6,6$</th>
      <th>$5,6$</th>
      <th>$1,2$</th>
      <th>$2,6$</th>
      <th>$5,1$</th>
      <th>$1,6$</th>
      <th>$2,4$</th>
      <th>$4,4$</th>
    </tr>
    <tr>
      <th>$RV X$</th>
      <th>$7$</th>
      <th>$9$</th>
      <th>$12$</th>
      <th>$11$</th>
      <th>$3$</th>
      <th>$8$</th>
      <th>$6$</th>
      <th>$7$</th>
      <th>$6$</th>
      <th>$8$</th>
    </tr>
  </tbody>
</table>

$Mean(\mu)=\frac{1}{10}\sum_{i=1}^{10} x_i=\frac{81}{10}=8.1$: 평균과 기댓값이 다른 case

따라서 예측문제에 있어선 과거의 평균값 보단 기댓값을 사용해야 한다.

#### Properties
- $E[X+Y] = E[X] + E[Y]$
- $E[XY] = E[X]\dot E[Y]$
- $E[aX + b] = aE[X] + b$
- $E[aX^2 + bX + c] = aE[X] + bE[Y] + c$
- $E[aX + bY] = aE[X] + bE[Y], where a,b,c \in R$

## Probability Distribution

### Definition
- 확률 변수가 특정한 값을 가질 확률을 아나태는 함수를 의미
- Sample Space $\to$ Random Variable $\to$ Measurable Space
- Probability Function
  - 입력 : 확률변수 값
  - 출력 : 확률
  - 표현 : $p=f(x)$

### 확률분포의 종류 (Random variable 값에 따라 구분)

#### 이산형 (Discrete) 값 입력
- Probability Mass Function(확률 질량 함수)
- $p(x) = f_X(X=x)$

#### 연속형 (Continuous) 값 입력
- Probability Density Function(확률 밀도 함수)
- $p(a \le X \le b) = \int_a^b f_x(x)dx$

### 베르누이 분포 (Bernoulli Distribution)

#### Random variable
- 1 $\to$ success
- 0 $\to$ failure
- $p(success) = p(x=1) = p$
- $p(failure) = p(x=0) = 1-p$

#### 확률 함수
- f_X(x;p)=p^x(1-p)^{1-x}, x=0 or 1
- 매개변수 p가 주어졌을 때 확률변수 X값이 x일 확률

#### Expected value
- $E[X] = P$

#### Variance
- $Var[X] = p(1-p)$

### 이항 분포 (Binomial Distribution)
매개변수 n과 p가 주어졌을 때 n번 시행 중에 k번 성공할 확률

베르누이 분포는 파라미터 n=1로 고정한 이항 분포의 special case라고 생각하면 됨

#### 확률 함수
- $P(X=k; n, p) = C(n,k) p^k(1-p)^{n-k}$
- $C(n,k)=\frac{n!}{k!(n-k)!}$

#### Expected value
- $E[X] = np$

#### Variance
- $Var[X] = np(1-p)$

### 정규 분포 (Normal Distribution)
매개변수 $\mu$와 $\sigma^2$가 주어졌을 때 확률변수 X가 x일 확률

정규 분포를 가우스 분포라고도 부르며 평균이 0이고 분산이 1인 정규 분포를 표준 정규 분포 (Standard Normal Distribution)라고 함

#### 확률 함수
- $f(x|\mu,\sigma^2)=\frac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$

#### Expected value
- $E[X] = \mu$

#### Variance
- $Var[X] = \sigma^2$

### 데이터셋과 확률 분포
고양이, 강아지, 코끼리 이미지가 있다고 가정했을 떄, 각 이미지가 갖는 RGB의 3차원 픽셀 값들은 벡터가 나열된 행렬로 나타나며 이를 확률 변수라고 볼 수 있다.

이때의 확률 함수는 $f_X(X=\vec x_i, L=l; \theta)$로 표현할 수 있다. (L: label (고양이, 강아지, 코끼리 ...))

딥러닝 관점에서 볼 떄 이 각 이미지 데이터는 확률 분포로 정의 할 수 있으며, 데이터적으로 입력과 정답을 알고 있는 상황이기 떄문에 궁극적으로 우리가 알고자 하는 바는 parameter ($\theta$)인 것이다.

다시 말해, 데이터가 주어졌을 때, 그 데이터를 정확히 표현하는 확률 분포는 존재할 것이나 이를 우리는 알 수 없기 때문에 (사람 개개인의 완벽히 정확한 몸무게를 알 수 있는가?) 데이터를 잘 학습하여 정답을 모사하는 확률 분포를 찾는 것이 딥러닝의 활용인 것이다.

## Paradigm in Probability

### Frequentist (Ronald Fisher)
- Long-term relative frequency
  - 확률적인 이론값들이 있는데 이 이론값을 증명하기 위해선 무한대로 많은 시행이 필요하다.
  - Ex) 동전던지기를 무한히 많이 시행하면 각 면의 확률은 0.5로 수렴한다.
- Fixed parameters
  - 파라미터들은 다 정해져 있다. 데이터가 정규분포를 따른다고 본다면 $\mu$와 $\sigma$는 정해져있다.
- Random data
  - 데이터는 서로 독립적이고 랜덤하다.
- Traditional (classical) statistics
- Pros
  - Ease of interpretation & computation (통계나 확률적인 결과를 해석하기 간단하다. ~검정, 신뢰수준 등으로 쉽게 해석 가능하며 연산량이 많지 않다.)
  - 파라미터가 fixed 되어 있기 때문에 prior knowledge가 필요없다.
- Cons
  - Depending on the number of times conducted (얼마나 시행했느냐에 따라 확률값이 달라진다.)
  - Not informative for other hupothesises (주장할 수 있는 가설들이 많은데 이들을 검증하는데 한계가 있다.)

### Bayesianist (Thomas Bayes)
- Updata beliefs based on new information
  - 확률이라는 것은 어떤 믿음에 대한 정보인데 그 믿음은 새로운 정보를 얼마나 보느냐에 따라 달라질 수 있다.
  - Ex) 매번 동전 던지는 것을 보면서 나오는 확률값은 업데이트 된다.
- Degree of uncertainty (Unknown parameters)
  - 불확실성의 정도, 데이터를 관찰하면 할 수록 확률값들이 업데이트 되는데, 이를 결정하는 파라미터를 명확히 지정하지 않는다.
- Fixed data
- Data-driven, evidence/information basis
- Pros
  - Higher precision than classical approaches
  - 데이터를 업데이트하기 때문에 정보의 수준이 높다.
- Cons
  - Intensive computation (계산량이 매우 많다. 과거엔 인기가 없었음)
  - Require prior knowledge & very complex

### Frequentist Approach (Beginning of Problem)
- 주사위 던지기 실험 데이터에서 3이 나올 확률
  - 이론적인 값 = $\frac{1}{6} \cong 0.167 (16.7 %)
  - 6번 실험한 데이터로부터 확률값을 구할 경우

  | 데이터 종류 | 데이터 수집 | 3이 나올 확률 |
  | :--- | :--- | :--- |
  | Dataset1 | 4 \Rightarrow 1 \Rightarrow 3 \Rightarrow 6 \Rightarrow 6 \Rightarrow 6 | $\frac{1}{6}=0.167 (16.7 %) |
  | Dataset2 | 1 \Rightarrow 4 \Rightarrow 5 \Rightarrow 6 \Rightarrow 2 \Rightarrow 1 | $\frac{0}{6}=0.0 (0.0 %) |
  | Dataset3 | 3 \Rightarrow 3 \Rightarrow 3 \Rightarrow 3 \Rightarrow 3 \Rightarrow 3 | $\frac{6}{6}=1.0 (1.0 %) |

  데이터에서 얻은 값이 이론값과 완전히 다를 경우 데이러로부터 추론한 것이 맞나?
  - Idea : 실험을 많이 하면 이론값에 근접할 것이다. 즉, 무한대로 실험하면 이론값이 된다.

### Frequentist Approach (Obstacles & Solution)
- 가설은 개념적이므로 명시적 실행이 어렵다. 따라서 이론을 따르는 그래프 자체가 존재할 수 없다.
- 그러므로 무한대로 실험한 데이터가 있다고 가정 (어떤 분포가 존재한다고 가정한다. Ex) Normal Distribution)
  즉, 관찰한 집단의 probability를 구한 뒤 가정한 분포에서의 어떤 구간을 벗어날 경우 이 구간 수준을 벗어날 경우엔 가설을 기각한다.
- 대표적 tool : p-value
  .만약 관측 데이터의 출현 확률이 가정했던 분포와 명확히 차이가 난다면, 우리 가설이 틀린 (false)것으로 판정 : 귀무가설을 기각
  .만약 관측 데이터의 출현 확률이 가정했던 분포의 어떤 기준 범위에 있다면, 우리 가설이 맞는 (True)것으로 판정 : 귀무가설을 채택

### Bayesianist Approach
- Probability는 각 개인의 belief 또는 uncertainty level이다. 관측 데이터 기반으로 확률값 자체를 업데이트 해 나간다. (Frequentist는 끝까지 이론값 고정)

![Bayesian Approach](/assets/bayesian_approach.png)

위 그림에서 frequentist 관점에선 observed data는 기각 대상이다. 그러나 bayesianist는 확률 분포 자체를 업데이트 한다. 즉, 데이터의 양과 무관하게 현재까지 관측된 결과로만 판단한다.

## Bayes Theorem in Math

### Joint Probability
- 두 사건이 동시에 발생할 확률
- Ex) 주사위 던지기
  - Sample space $S=\{1,2,3,4,5,6\}$
  - 사건 A : 짝수가 나오는 사건 $\rightarrow$ A = {2,4,6}
  - 사건 B : 3의 배수가 나오는 사건 $\rightarrow$ B = {3,6}
  - 사건 C : 짝수이면서 3의 배수가 나오는 사건 $\rightarrow$ C = {6}
  - Random variable X : 주사위를 던졌을 때 나온 값 ($S \xrightarrow{X} x$)
  - $P(A)=P(X=2\text{ or }X=4\text{ or }X=6)=\frac{3}{6}=\frac{1}{2}$
  - $P(B)=P(X=3\text{ or }X=6)=\frac{2}{6}=\frac{1}{3}$
  - $P(C)=P(A\cap B)=P(X=6)=\frac{1}{6}$

사건 $C$는 사건 $A$와 사건 $B$가 동시에 발생하는 사건이므로 joint probability는 다음과 같이 표현한다.

$$
P(C)=P(A,B)=P(A\cap B)=\frac{1}{6}
$$

### Conditional Probability

조건부확률 $P(B\mid A)$는 사건 $A$가 발생했다는 조건 아래에서 사건 $B$가 발생할 확률이다. 표본공간을 전체 $S$가 아니라 사건 $A$로 제한하여 생각한다.

$$
P(B\mid A)=\frac{P(A\cap B)}{P(A)},\qquad P(A)>0
$$

주사위 예시에서 $A=\{2,4,6\}$가 발생했다고 알면 가능한 결과는 세 개로 줄어든다. 이 중 $B=\{3,6\}$도 만족하는 결과는 6 하나이므로 다음과 같다.

$$
P(B\mid A)=\frac{P(A\cap B)}{P(A)}
=\frac{\frac{1}{6}}{\frac{1}{2}}
=\frac{1}{3}
$$

### Bayes' Theorem

조건부확률의 정의를 정리하면 joint probability를 다음과 같이 나타낼 수 있다.

$$
P(A\cap B)=P(B\mid A)P(A)
$$

사건 $A$와 $B$의 순서를 바꾸어도 같은 joint probability이므로 다음 식도 성립한다.

$$
P(A\cap B)=P(A\mid B)P(B)
$$

두 식의 왼쪽은 모두 $P(A\cap B)$이므로 오른쪽을 같게 놓는다.

$$
P(B\mid A)P(A)=P(A\mid B)P(B)
$$

$P(B)>0$일 때 양변을 $P(B)$로 나누면 Bayes' theorem을 얻는다.

$$
P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}
$$

### Bayesian Interpretation

$$
\underbrace{P(A\mid B)}_{\text{Posterior}}
=
\frac{
\underbrace{P(B\mid A)}_{\text{Likelihood}}
\underbrace{P(A)}_{\text{Prior}}
}{
\underbrace{P(B)}_{\text{Evidence}}
}
$$

- **Prior** $P(A)$: 새로운 정보 $B$를 관찰하기 전에 사건 $A$에 대해 알고 있던 확률이다.
- **Likelihood** $P(B\mid A)$: 사건 $A$가 참이라고 할 때 관측 정보 $B$가 나타날 확률이다.
- **Evidence** $P(B)$: 관측 정보 $B$ 자체가 나타날 전체 확률이며 posterior를 정규화한다.
- **Posterior** $P(A\mid B)$: 정보 $B$를 관찰한 뒤 갱신된 사건 $A$의 확률이다.

주사위 예시에서는 $P(B\mid A)=1/3$, $P(A)=1/2$, $P(B)=1/3$이므로 다음과 같다.

$$
P(A\mid B)
=\frac{P(B\mid A)P(A)}{P(B)}
=\frac{\frac{1}{3}\cdot\frac{1}{2}}{\frac{1}{3}}
=\frac{1}{2}
$$

$B=\{3,6\}$가 발생했다고 알았을 때 가능한 결과는 3과 6이고, 그중 짝수인 결과는 6 하나이므로 직접 계산한 $P(A\mid B)=1/2$와 일치한다.

### Hypothesis와 Evidence로 해석한 Bayes' Theorem

Frequentist 관점과 비교하기 위해 사건 $A$를 hypothesis $H$, 사건 $B$를 evidence $E$로 바꾸어 생각할 수 있다. 이때 Bayes' theorem은 다음과 같이 표현한다.

$$
P(H\mid E)
=\frac{P(E\mid H)}{P(E)}P(H)
$$

- $P(H)$는 evidence를 관찰하기 전에 hypothesis가 참이라고 믿는 정도인 **prior probability**이다.
- $P(E\mid H)$는 hypothesis가 참이라고 가정했을 때 현재 evidence가 관찰될 확률인 **likelihood**이다.
- $P(E)$는 hypothesis의 참·거짓과 관계없이 evidence가 관찰될 전체 확률인 **evidence** 또는 **marginal likelihood**이다.
- $P(H\mid E)$는 evidence를 관찰한 뒤 갱신된 hypothesis의 확률인 **posterior probability**이다.

### Frequentist 관점과의 차이

Frequentist 관점에서는 hypothesis를 확률변수로 취급하지 않고 참 또는 거짓으로 고정된 대상으로 본다. 따라서 일반적으로 $P(H\mid E)$, 즉 evidence가 주어졌을 때 hypothesis가 참일 확률을 직접 계산하지 않는다. 대신 hypothesis $H$가 참이라고 가정했을 때 현재 evidence 또는 그보다 더 극단적인 결과가 관찰될 확률을 이용해 hypothesis를 기각할지 판단한다.

Bayesian 관점에서는 hypothesis 자체의 불확실성을 probability로 표현한다. Evidence를 관찰하기 전의 $P(H)$에서 출발하여 evidence가 hypothesis와 얼마나 잘 일치하는지를 반영하고, 그 결과를 $P(H\mid E)$로 업데이트한다.

![Hypothesis H와 Evidence E의 Bayesian updating factor](/assets/bayes_updating_factor_venn.svg)

벤다이어그램에서 전체 사각형은 sample space $\Omega$이고, 각 영역의 넓이는 probability에 대응한다.

- 파란 원의 전체 영역은 $P(H)$이며 evidence를 보기 전의 prior이다.
- 주황 원의 전체 영역은 $P(E)$이며 evidence 자체가 나타날 probability이다.
- 두 원이 겹치는 영역은 $P(H\cap E)$이며 hypothesis가 참이면서 evidence도 관찰되는 경우이다.

Hypothesis $H$가 참인 경우로 sample space를 제한하면, 파란 원 가운데 겹치는 영역의 비율이 likelihood가 된다.

$$
P(E\mid H)=\frac{P(H\cap E)}{P(H)}
$$

반대로 evidence $E$가 관찰된 경우로 sample space를 제한하면, 주황 원 가운데 겹치는 영역의 비율이 posterior가 된다.

$$
P(H\mid E)=\frac{P(H\cap E)}{P(E)}
$$

첫 번째 식을 $P(H\cap E)=P(E\mid H)P(H)$로 정리하여 두 번째 식에 대입하면 다음 관계를 얻는다.

$$
P(H\mid E)
=\frac{P(E\mid H)P(H)}{P(E)}
=\underbrace{\frac{P(E\mid H)}{P(E)}}_{\text{Updating factor}}
\underbrace{P(H)}_{\text{Prior}}
$$

따라서 $\frac{P(E\mid H)}{P(E)}$는 prior를 posterior로 바꾸는 **updating factor**이다. 이 값은 evidence $E$가 전체적으로 나타나는 정도와 비교하여, hypothesis $H$가 참일 때 evidence $E$가 얼마나 더 잘 나타나는지를 측정한다.

- $\frac{P(E\mid H)}{P(E)}>1$: Evidence가 전체 경우보다 hypothesis 아래에서 더 잘 나타나므로 $P(H\mid E)>P(H)$가 된다. Evidence가 hypothesis를 지지한다.
- $\frac{P(E\mid H)}{P(E)}=1$: Evidence와 hypothesis가 독립이므로 $P(H\mid E)=P(H)$가 된다. Evidence가 belief를 바꾸지 않는다.
- $\frac{P(E\mid H)}{P(E)}<1$: Evidence가 hypothesis 아래에서 상대적으로 덜 나타나므로 $P(H\mid E)<P(H)$가 된다. Evidence가 hypothesis를 약화한다.

즉, Bayesian inference는 새로운 evidence가 들어올 때마다 prior에 updating factor를 곱하여 posterior를 만들고, 이 posterior를 다음 evidence에 대한 새로운 prior로 사용하는 반복적인 belief update 과정이다.

## 🧪 Example: Rolling Billiard Balls

Alice와 Bob이 직사각형 당구대에서 공을 굴리는 게임을 한다고 가정한다. 당구대에는 세로 방향의 경계선이 하나 그어져 있으며, 공이 멈춘 위치에 따라 다음과 같이 점수를 얻는다.

- 공이 경계선의 왼쪽인 **Alice 영역**에 멈추면 Alice가 1점을 얻는다.
- 공이 경계선의 오른쪽인 **Bob 영역**에 멈추면 Bob이 1점을 얻는다.
- 각 시행에서 공은 독립적으로 굴러가며, 이전 결과는 다음 공의 움직임에 영향을 주지 않는다.

![Rolling Billiard Balls의 8회 관측 결과](/assets/rolling_billiard_balls_frequentist.svg)

당구대 전체 길이를 1로 정규화하고 공이 어느 위치에나 균일하게 멈춘다고 가정한다. Alice 영역의 비율을 $p$라고 하면 한 번의 시행에서 각 선수가 이길 확률은 다음과 같다.

$$
P(\text{Alice wins})=p
$$

$$
P(\text{Bob wins})=1-p
$$

경계선의 정확한 위치를 알 수 없으므로 $p$는 알려지지 않은 값이다. 게임을 8번 진행한 결과가 다음과 같다고 하자.

| 시행 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 승자 | Alice | Bob | Alice | Alice | Bob | Alice | Bob | Alice |

Alice는 5번, Bob은 3번 승리했다.

### Frequentist Approach

Frequentist 관점에서는 승리 확률 $p$가 어떤 하나의 고정된 참값을 가지지만, 현재 그 값을 모른다고 본다. 반면 8번의 게임 결과는 고정된 $p$에서 무작위로 생성된 random data이다.

Alice의 승리 횟수를 random variable $X$라고 하면, 각 게임은 성공 확률이 $p$인 Bernoulli trial이고 전체 8번의 승리 횟수는 binomial distribution을 따른다.

$$
X\sim\operatorname{Binomial}(n=8,p)
$$

따라서 Alice가 8번 중 정확히 $k$번 이길 확률은 다음과 같다.

$$
P(X=k\mid p)
=\binom{8}{k}p^k(1-p)^{8-k}
$$

현재 관측값은 $X=5$이므로, 이 데이터를 얻을 likelihood는 다음과 같다.

$$
L(p)
=P(X=5\mid p)
=\binom{8}{5}p^5(1-p)^3
$$

Frequentist는 관측된 데이터가 가장 잘 나타나도록 하는 하나의 $p$를 추정한다. Binomial distribution에서 maximum likelihood estimate는 전체 시행 중 성공한 비율이므로 다음과 같다.

$$
\widehat{p}_{\mathrm{MLE}}
=\frac{\text{Alice의 승리 횟수}}{\text{전체 시행 횟수}}
=\frac{5}{8}
=0.625
$$

따라서 현재 데이터로 추정한 다음 게임의 승리 확률은 다음과 같다.

$$
\widehat{P}(\text{Alice wins})=\frac{5}{8}=0.625
$$

$$
\widehat{P}(\text{Bob wins})=\frac{3}{8}=0.375
$$

추정값 $\widehat p=5/8$을 binomial probability에 대입하면, 동일한 조건에서 8번 중 Alice가 정확히 5번 이길 확률은 다음과 같다.

$$
P\left(X=5\mid \widehat p=\frac{5}{8}\right)
=\binom{8}{5}
\left(\frac{5}{8}\right)^5
\left(\frac{3}{8}\right)^3
\approx 0.2816
$$

즉, Frequentist는 관측된 8번의 결과에서 $p$를 하나의 값 $5/8$로 point estimation하고, 이 값을 기준으로 Alice와 Bob의 이후 승리 확률을 계산한다.

> ⚠️ **Caution**: $\widehat p=5/8$은 8번의 제한된 관측에서 얻은 추정값이지 실제 경계 확률 $p$ 그 자체는 아니다. Frequentist의 point estimate만으로는 $p$에 대한 불확실성이나 관측 이전의 정보를 직접 나타내지 않는다.


### Bayesian Approach

Bayesian 관점에서는 승리 확률의 불확실성을 probability distribution으로 표현한다. 기존의 Alice 승률 $p$와 구분하기 위해 Bob이 한 게임에서 이길 확률을 $q=1-p$로 정의하자.

경계선의 위치에 관해 알고 있는 정보가 없으므로 uniform prior를 사용한다.

$$
q\sim\operatorname{Beta}(1,1),\qquad f(q)=1
$$

8번의 게임에서 Bob이 3번, Alice가 5번 이긴 관측 데이터를 $D$라고 하면 likelihood는 다음과 같다.

$$
P(D\mid q)=\binom{8}{3}q^3(1-q)^5
$$

#### Posterior Distribution

연속 random variable에 대한 Bayes' theorem을 적용하면

$$
f(q\mid D)
=\frac{P(D\mid q)f(q)}
{\displaystyle\int_0^1P(D\mid u)f(u)\,du}
$$

이다. Uniform prior와 likelihood를 대입하고 공통항 $\binom83$을 약분하면 다음과 같다.

$$
f(q\mid D)
=\frac{q^3(1-q)^5}
{\displaystyle\int_0^1u^3(1-u)^5\,du}
$$

Beta function의 정의

$$
B(a,b)=\int_0^1t^{a-1}(1-t)^{b-1}\,dt
$$

를 이용하면 분모는 $B(4,6)$이므로

$$
f(q\mid D)=\frac{q^{4-1}(1-q)^{6-1}}{B(4,6)}
$$

이다. 따라서 posterior distribution은 다음과 같다.

$$
q\mid D\sim\operatorname{Beta}(4,6)
$$

이는 Beta--Binomial conjugacy에 따라 prior의 parameter에 관측 횟수가 더해진 결과이다.

$$
\operatorname{Beta}(1,1)
\xrightarrow{\text{Bob 3 wins, Alice 5 wins}}
\operatorname{Beta}(1+3,1+5)
$$

Posterior mean은 $E[q\mid D]=4/(4+6)=0.4$이다. 관측 비율 $3/8=0.375$와 다른 이유는 uniform prior가 양쪽 결과에 한 번씩의 pseudo-count를 더하는 것과 같은 역할을 하기 때문이다.

#### Posterior Predictive Probability

앞으로 Bob이 3번 연속으로 이길 사건을 $W_3$라고 하자. $q$가 알려져 있다면 $P(W_3\mid q)=q^3$이지만, Bayesian 관점에서는 $q$를 하나의 값으로 고정하지 않고 posterior 전체에 대해 적분한다.

$$
\begin{aligned}
P(W_3\mid D)
&=\int_0^1P(W_3\mid q)f(q\mid D)\,dq\\
&=\int_0^1q^3\frac{q^3(1-q)^5}{B(4,6)}\,dq\\
&=\frac{B(7,6)}{B(4,6)}\\
&=\frac{4\cdot5\cdot6}{10\cdot11\cdot12}\\
&=\frac1{11}\approx0.0909.
\end{aligned}
$$

따라서 Bob이 앞으로 3번 연속으로 이길 Bayesian probability는 약 $9.09\%$이다.

#### Frequentist와 Bayesian 결과 비교

Frequentist의 point estimate를 사용하는 plug-in 방식에서는 Bob의 승률을 $\widehat q=3/8$로 고정한다.

$$
\widehat P(W_3)=\left(\frac38\right)^3
=\frac{27}{512}\approx0.0527
$$

| 접근 | 계산 | Bob의 3연승 확률 |
|:---|:---|---:|
| Frequentist plug-in | $(3/8)^3$ | 약 $5.27\%$ |
| Bayesian posterior predictive | $E[q^3\mid D]$ | 약 $9.09\%$ |

Bayesian 결과가 더 큰 이유는 $q$의 불확실성을 posterior 전체에 걸쳐 적분하기 때문이다. $q^3$은 $0\le q\le1$에서 convex function이므로 Jensen's inequality에 의해 $E[q^3\mid D]\ge(E[q\mid D])^3$가 성립한다.

#### Simulation of Bayesian Inference

다음 코드는 이 계산을 rejection sampling으로 재현한다. Uniform prior에서 Bob의 승률 후보를 생성한 뒤, 관측 데이터의 likelihood에 비례하여 후보를 채택한다. 채택된 승률들은 $\operatorname{Beta}(4,6)$ posterior를 따른다.

```python
import random
from typing import Optional

from scipy.special import comb


def experiment(n: int = 8, bob_wins_observed: int = 3) -> Optional[str]:
    """Run one rejection-sampling experiment."""
    prob_bob_win = random.random()

    prob_current_status = (
        comb(n, bob_wins_observed)
        * prob_bob_win**bob_wins_observed
        * (1 - prob_bob_win) ** (n - bob_wins_observed)
    )

    if random.random() >= prob_current_status:
        return None

    if random.random() < prob_bob_win**3:
        return "Bob"
    return "Alice"


def run_simulation(trials: int = 100_000) -> None:
    """Compare Bayesian simulation with the frequentist plug-in estimate."""
    results = [experiment() for _ in range(trials)]
    bob_wins = results.count("Bob")
    alice_wins = results.count("Alice")
    accepted = bob_wins + alice_wins

    if accepted == 0:
        print("No posterior samples were accepted. Increase trials.")
        return

    print(f"# Experiments         : {trials:,}")
    print(f"# Accepted samples    : {accepted:,}")
    print(f"Bayesian probability  : {bob_wins / accepted * 100:.2f}%")
    print(f"Frequentist plug-in   : {(3 / 8) ** 3 * 100:.2f}%")


if __name__ == "__main__":
    run_simulation()
```

충분히 많이 실행하면 Bayesian simulation은 이론값 $9.09\%$에 가까워지고, frequentist plug-in 값은 $5.27\%$이다. 채택 표본 수는 평균적으로 전체의 약 $1/9$이다. 이는 evidence가

$$
P(D)=\int_0^1\binom83q^3(1-q)^5\,dq
=\binom83B(4,6)=\frac19
$$

이기 때문이다. 따라서 100,000개의 후보 중 평균 약 11,111개가 posterior sample로 채택된다.

