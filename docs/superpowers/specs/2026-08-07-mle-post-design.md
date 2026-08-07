# MLE 포스팅 설계

## 목표

`posts/math-202.md`의 전반부에 Maximum Likelihood Estimation(MLE)을 설명하는 글을 작성한다. 공식의 나열보다 관측 데이터가 likelihood에 들어가는 이유, 추정 대상인 parameter의 의미, 확률 모델을 정의하는 과정에 초점을 둔다.

## 범위

- Bayes 정리 안에서 likelihood와 MLE의 위치를 설명한다.
- 사람 키를 정규분포로 모델링하여 MLE를 유도한다.
- logistic regression에서 sigmoid 출력이 확률로 해석되는 조건을 설명한다.
- 고정 평균·분산 모델과 입력에 따라 평균·분산이 변하는 조건부 Gaussian 모델을 비교한다.
- 재현 가능한 Python plotting 코드와 생성된 결과 이미지를 포함한다.
- MAP는 후속 내용으로 남기며, 이번 작업에서는 MLE 본문만 완성한다.

## 설명 구조

### 1. Bayes 정리에서 MLE의 위치

Bayes 정리

$$
p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}{p(D)}
$$

에서 posterior, likelihood, prior, evidence를 구분한다. MLE는 데이터를 고정한 뒤 likelihood $p(D\mid\theta)$를 가장 크게 만드는 $\theta$를 선택하는 점 추정임을 설명한다. 확률값은 데이터가 parameter를 가질 확률이 아니라, 주어진 parameter의 모델이 현재 데이터를 생성할 개연성임을 강조한다.

### 2. 사람 키 예제

관측된 키 숫자 자체가 확률로 변하는 것이 아니라, 모집단에서 사람을 무작위로 선택하므로 관측 전의 키 $H$를 확률변수로 모델링한다고 설명한다. 정규분포

$$
H\sim\mathcal N(\mu,\sigma^2)
$$

를 가정하고 $\theta=(\mu,\sigma^2)$로 정의한다. 독립·동일분포 표본의 joint likelihood와 log-likelihood를 구성하고, MLE가 표본평균과 $1/N$을 사용하는 분산 추정량으로 이어지는 과정을 유도한다. 정규분포라는 분포족은 사전에 선택하며 MLE가 분포 종류까지 자동 발견하지는 않는다는 주의사항을 포함한다.

### 3. Logistic regression 연결

이진 label에 대해

$$
Y\mid X=x\sim\operatorname{Bernoulli}(p_\theta(x)),\qquad
p_\theta(x)=\sigma(w^Tx+b)
$$

로 모델을 정의한다. sigmoid가 단지 $[0,1]$ 범위이기 때문에 확률인 것이 아니라, 그 출력을 Bernoulli parameter로 정의했기 때문에 조건부 확률로 해석됨을 설명한다. 이때 $\theta=(w,b)$이며 Bernoulli log-likelihood 최대화가 binary cross entropy 최소화와 동치임을 보인다.

### 4. 조건부 Gaussian regression

입력에 따라 평균과 잡음 분산이 달라지는 합성 데이터를 사용한다. 다음 두 모델을 같은 데이터에서 비교한다.

- Baseline: 전체 데이터에 단일 평균과 단일 분산을 MLE로 적합한다.
- Conditional model: $Y\mid X=x\sim\mathcal N(\mu_\theta(x),\sigma_\theta^2(x))$로 두고 평균과 표준편차를 입력의 함수로 적합한다.

이 비교의 결론은 MLE가 분포 가정을 제거한다는 것이 아니다. likelihood family를 조건부 모델로 설계하면 고정된 평균·분산보다 풍부한 데이터 생성 구조를 MLE로 학습할 수 있다는 것이다.

## 플롯 설계

Python 코드가 고정된 random seed로 합성 데이터를 만들고 `assets/mle_conditional_regression.png`를 생성한다. 플롯에는 다음 요소를 표시한다.

- 관측 데이터 산점도
- 실제 조건부 평균
- 단일 Gaussian MLE의 수평 평균선과 일정한 95% 구간
- 조건부 Gaussian MLE의 평균 곡선과 입력에 따라 달라지는 95% 구간

본문에 실행 가능한 전체 코드를 싣는다. 추가 의존성은 저장소 환경에서 사용 가능한 NumPy, Matplotlib과 필요한 경우 SciPy만 사용한다. 최적화가 불안정하거나 SciPy 의존성이 불필요하면 평균과 log-variance에 대한 명시적 basis model을 NumPy로 계산해 재현성을 우선한다.

## 문체 및 포맷

- `posts/WRITING_RULES.md`의 평어체, 헤더 계층, 수식 여백, 문장 부호 규칙을 따른다.
- 본문은 H2부터 시작한다.
- 예제에는 `🧪`, 오해 방지에는 `⚠️`, 핵심 수학 해석에는 `💡` 블록을 제한적으로 사용한다.
- 이미지 경로는 기존 포스트와 동일하게 `/assets/...` 형식을 사용한다.

## 검증 기준

- front matter가 기존 metadata 구조와 호환된다.
- 모든 display math 앞뒤에 빈 줄이 있다.
- MLE와 $p(\theta\mid D)$를 혼동하지 않는다.
- sigmoid의 확률 해석에 Bernoulli 모델 가정이 명시된다.
- 고정 Gaussian과 조건부 Gaussian을 모두 MLE로 적합했다는 점이 드러난다.
- Python 코드를 실행하면 이미지가 생성되며 이미지 링크가 유효하다.
- 사이트 렌더링에서 Markdown, 수식 및 이미지가 정상 표시된다.
