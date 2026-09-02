---
id: "math-202"
title: "Maximum Likelihood Estimation (MLE) & Maximum A Posteriori (MAP)"
date: "2026-1-19"
category: "수학/Probability & Information"
tags: ["Probability", "MLE", "MAP"]
pinned: false
excerpt: "MLE/MAP 개념."
---
 
## Maximum Likelihood Estimation

Maximum Likelihood Estimation(MLE)은 관측한 데이터를 가장 그럴듯하게 설명하는 parameter를 찾는 점 추정 방법이다. Bayes 정리 안에서 보면 MLE가 무엇을 사용하는지 명확해진다.

$$
p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}{p(D)}
$$

- $p(\theta\mid D)$: 데이터를 관측한 뒤 parameter에 대해 갖는 posterior
- $p(D\mid\theta)$: parameter가 주어졌을 때 데이터가 관측될 확률인 likelihood
- $p(\theta)$: 데이터를 보기 전에 parameter에 대해 갖는 prior
- $p(D)$: 가능한 모든 parameter를 고려했을 때 데이터가 관측될 확률인 evidence

MLE는 이 중 likelihood만 사용한다.

$$
\hat{\theta}_{\mathrm{MLE}}
=\underset{\theta}{\arg\max}\;p(D\mid\theta)
=\underset{\theta}{\arg\max}\;\log p(D\mid\theta)
$$

로그는 단조 증가 함수이므로 log-likelihood를 사용해도 최댓값을 만드는 parameter는 변하지 않는다. 여기서 $\theta$는 정답 label이 아니라 데이터 생성 모델의 parameter이다. 정규분포에서는 평균과 분산이며, logistic regression에서는 weight와 bias이다.

### Probability와 Likelihood

$p(D\mid\theta)$라는 표기는 같지만 무엇을 고정하는지에 따라 관점이 달라진다.

- Probability: $\theta$를 고정하고 앞으로 어떤 데이터 $D$가 나올지를 본다.
- Likelihood: 이미 관측한 $D$를 고정하고 어떤 $\theta$가 이 데이터를 잘 설명하는지 본다.

동전의 앞면 확률을 $\theta$라고 하자. $\theta=0.7$로 고정하면 10번 던져 8번 앞면이 나올 확률을 계산할 수 있다. 실제로 8번의 앞면을 관측한 뒤에는 동일한 식을 여러 $\theta$에 대해 비교한다. 후자의 함수가 likelihood이다.

> 💡 **Mathematical Insight**: Likelihood는 parameter에 대한 확률분포가 아니다. 따라서 $\theta$에 대해 적분했을 때 1일 필요가 없으며, 서로 다른 parameter가 동일한 관측 데이터를 얼마나 잘 설명하는지 비교한다.

## 🧪 Example: 일부 사람의 키로 모집단 추정하기

일부 사람의 키가 $172$, $168$, $181$ cm로 측정되었다고 하자. 측정이 끝난 숫자는 더 이상 무작위로 변하지 않는다. 이 데이터를 확률로 다루는 이유는 **사람을 모집단에서 무작위로 선택하는 과정**에 있다. 사람을 뽑기 전에는 키를 알 수 없으므로 관측 전의 키 $H$를 확률변수로 모델링한다.

키가 하나의 평균 주변에 모이고 좌우로 비슷하게 퍼진다는 지식을 바탕으로 정규분포를 가정한다.

$$
H\sim\mathcal{N}(\mu,\sigma^2),
\qquad
\theta=(\mu,\sigma^2)
$$

$\mu$는 모집단의 중심을, $\sigma^2$은 개인별 키가 중심에서 얼마나 퍼지는지를 나타낸다. $D=\{h_1,\ldots,h_N\}$이고 각 사람을 독립적으로 같은 모집단에서 선택했다고 가정하면 likelihood는 각 확률밀도의 곱이다.

$$
p(D\mid\mu,\sigma^2)
=\prod_{i=1}^{N}\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left[-\frac{(h_i-\mu)^2}{2\sigma^2}\right]
$$

어떤 $(\mu,\sigma^2)$를 넣느냐에 따라 관측한 키들이 분포의 중심에 놓일 수도 있고 꼬리에 놓일 수도 있다. MLE는 관측값 전체의 밀도 곱을 가장 크게 만드는 조합을 선택한다. log-likelihood를 미분하면 다음 결과를 얻는다.

$$
\hat{\mu}_{\mathrm{MLE}}=\frac{1}{N}\sum_{i=1}^{N}h_i
$$

$$
\hat{\sigma}_{\mathrm{MLE}}^2
=\frac{1}{N}\sum_{i=1}^{N}\left(h_i-\hat{\mu}_{\mathrm{MLE}}\right)^2
$$

평균과 분산은 MLE와 별개의 임시방편이 아니다. Gaussian likelihood를 선택했을 때 MLE가 도출하는 결과이다.

> ⚠️ **Caution**: MLE 분산은 likelihood를 최대화하므로 분모가 $N$이다. 불편 표본분산은 편향 보정이 목적이므로 분모가 $N-1$이다.

> ⚠️ **Caution**: MLE가 정규분포라는 분포 종류까지 자동으로 발견한 것은 아니다. Gaussian random variable이라는 모델링 가정은 먼저 정하며, MLE는 그 안의 $\mu$와 $\sigma^2$을 찾는다.

## Logistic Regression에서 확률은 어디에서 나오는가

출력이 $0$ 또는 $1$인 문제에는 Bernoulli distribution이 자연스럽다.

$$
Y\mid X=x\sim\operatorname{Bernoulli}\left(p_{\theta}(x)\right)
$$

Logistic regression은 입력을 logit으로 바꾸고 sigmoid를 적용한다.

$$
p_{\theta}(x)=\sigma(w^Tx+b)=\frac{1}{1+e^{-(w^Tx+b)}},
\qquad
\theta=(w,b)
$$

Sigmoid가 값을 $(0,1)$로 보낸다는 사실만으로 출력이 확률이 되는 것은 아니다. $p_{\theta}(x)$를 Bernoulli distribution의 parameter로 정의했기 때문에 $P(Y=1\mid X=x;\theta)$로 해석한다.

$$
p(y_i\mid x_i;\theta)
=p_{\theta}(x_i)^{y_i}\left(1-p_{\theta}(x_i)\right)^{1-y_i}
$$

전체 데이터의 negative log-likelihood는 다음과 같다.

$$
-\log p(D\mid\theta)
=-\sum_{i=1}^{N}\left[y_i\log p_{\theta}(x_i)
+(1-y_i)\log\left(1-p_{\theta}(x_i)\right)\right]
$$

이 식이 Binary Cross Entropy(BCE)이다. 따라서 BCE 최소화는 Bernoulli likelihood를 최대화하는 MLE와 같다.

> ✅ **Key Takeaway**: Sigmoid 출력은 Bernoulli observation model의 parameter로 사용될 때 확률 의미를 갖는다.

## 🧪 Example: Conditional Gaussian Regression

사람 키 예제는 모든 관측값이 하나의 평균과 분산을 공유한다고 가정했다. 그러나 입력 $x$에 따라 출력의 중심과 불확실성이 함께 달라지는 문제에서는 단일 평균과 분산만으로 데이터 구조를 설명하기 어렵다.

$$
y=0.5x^3-2x+\epsilon,
\qquad
\epsilon\sim\mathcal{N}(0,\sigma^2(x))
$$

$$
\sigma(x)=0.35+0.25(x+3)
$$

단일 Gaussian baseline과 조건부 Gaussian model을 같은 데이터에 적합한다.

$$
Y\mid X=x\sim\mathcal{N}\left(\mu_{\theta}(x),\sigma_{\theta}^2(x)\right)
$$

두 모델 모두 MLE를 사용한다. 차이는 MLE 자체가 아니라 선택한 likelihood의 표현력이다. 다음 코드는 평균을 cubic basis로, log-variance를 $x$의 선형함수로 두고 Gaussian negative log-likelihood를 최소화한다.

```python
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(7)
n = 240
x = rng.uniform(-3.0, 3.0, n)
true_mean = 0.5 * x**3 - 2.0 * x
true_std = 0.35 + 0.25 * (x + 3.0)
y = true_mean + rng.normal(0.0, true_std)

constant_mean = np.mean(y)
constant_std = np.sqrt(np.mean((y - constant_mean) ** 2))

mean_design = np.column_stack([np.ones_like(x), x, x**2, x**3])
mean_coef, *_ = np.linalg.lstsq(mean_design, y, rcond=None)
fitted_mean = mean_design @ mean_coef
residual = y - fitted_mean

variance_design = np.column_stack([np.ones_like(x), x])
variance_coef = np.array([np.log(np.mean(residual**2)), 0.0])

def variance_nll(coef):
    log_variance = variance_design @ coef
    return 0.5 * np.sum(log_variance + residual**2 * np.exp(-log_variance))

for _ in range(60):
    log_variance = variance_design @ variance_coef
    scaled_square = residual**2 * np.exp(-log_variance)
    gradient = 0.5 * variance_design.T @ (1.0 - scaled_square)
    hessian = 0.5 * variance_design.T @ (
        variance_design * scaled_square[:, None]
    )
    step = np.linalg.solve(hessian + 1e-8 * np.eye(2), gradient)
    old_nll = variance_nll(variance_coef)
    scale = 1.0
    while variance_nll(variance_coef - scale * step) >= old_nll:
        scale *= 0.5
        if scale < 1e-8:
            break
    variance_coef -= scale * step
    if np.linalg.norm(scale * step) < 1e-8:
        break

x_grid = np.linspace(-3.0, 3.0, 400)
grid_mean = np.column_stack(
    [np.ones_like(x_grid), x_grid, x_grid**2, x_grid**3]
) @ mean_coef
grid_std = np.exp(0.5 * (np.column_stack(
    [np.ones_like(x_grid), x_grid]
) @ variance_coef))
grid_true_mean = 0.5 * x_grid**3 - 2.0 * x_grid

fig, ax = plt.subplots(figsize=(9, 5.5))
ax.scatter(x, y, s=16, alpha=0.38, color="0.35", label="Observed data")
ax.plot(x_grid, grid_true_mean, "k--", linewidth=2, label="True mean")
ax.axhline(constant_mean, color="tab:orange", linewidth=2,
           label="Constant Gaussian MLE")
ax.fill_between(x_grid, constant_mean - 1.96 * constant_std,
                constant_mean + 1.96 * constant_std,
                color="tab:orange", alpha=0.16, label="Constant 95% interval")
ax.plot(x_grid, grid_mean, color="tab:blue", linewidth=2.4,
        label="Conditional Gaussian MLE")
ax.fill_between(x_grid, grid_mean - 1.96 * grid_std,
                grid_mean + 1.96 * grid_std,
                color="tab:blue", alpha=0.20, label="Conditional 95% interval")
ax.set(xlabel="x", ylabel="y", title="Constant vs. Conditional Gaussian MLE")
ax.grid(alpha=0.2)
ax.legend(ncol=2, fontsize=9)
fig.tight_layout()
fig.savefig("assets/mle_conditional_regression.png", dpi=180,
            bbox_inches="tight")
plt.close(fig)
```

![고정 Gaussian MLE와 조건부 Gaussian MLE 비교](/assets/mle_conditional_regression.png)

고정 Gaussian model은 모든 $x$에 같은 수평 평균과 같은 폭의 구간을 제시한다. 반면 조건부 model은 nonlinear mean을 따라가며 $x$가 증가할수록 커지는 noise도 표현한다.

> 💡 **Mathematical Insight**: 이 결과는 MLE가 분포 가정을 제거했기 때문에 얻은 것이 아니다. Gaussian likelihood를 유지하면서 평균과 분산을 입력의 함수로 확장했기 때문에 얻은 결과이다. MLE는 더 유연하게 설계된 확률 모델의 parameter를 데이터에 맞춘다.

## Maximum A Posteriori

Maximum A Posteriori(MAP)는 데이터를 관측한 뒤 가장 확률이 높은 parameter를 선택하는 점 추정 방법이다. MLE가 데이터가 주는 정보만 사용하는 반면, MAP는 데이터와 사전 지식을 함께 사용한다.

$$
\hat{\theta}_{\mathrm{MLE}}
=\underset{\theta}{\arg\max}\;p(D\mid\theta)
$$

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\max}\;p(\theta\mid D)
$$

결정적인 차이는 prior $p(\theta)$이다. Prior는 데이터를 관측하기 전에 어떤 parameter가 더 그럴듯한지를 나타내는 확률분포이다. 예를 들어 지나치게 큰 weight가 필요하지 않다고 판단하면 0 주변의 작은 weight에 높은 확률을 주는 prior를 사용할 수 있다.

> 💡 **Mathematical Insight**: MLE에서 $\theta$는 고정된 미지수이고 likelihood만 비교한다. MAP에서는 $\theta$를 확률변수로 취급하여 prior와 likelihood를 결합한 posterior의 mode를 선택한다. 다만 MAP도 posterior 전체가 아니라 하나의 대표값만 반환하는 점 추정이다.

### Bayes 정리에서 MAP까지

Bayes 정리에서 시작한다.

$$
p(\theta\mid D)
=\frac{p(D\mid\theta)p(\theta)}{p(D)}
$$

각 항의 의미는 다음과 같다.

- $p(\theta\mid D)$: 데이터 관측 후의 posterior
- $p(D\mid\theta)$: parameter가 데이터를 설명하는 likelihood
- $p(\theta)$: 데이터 관측 전의 prior
- $p(D)$: 가능한 모든 parameter를 고려한 evidence

MAP 정의에 Bayes 정리를 대입하면 다음과 같다.

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\max}\;
\frac{p(D\mid\theta)p(\theta)}{p(D)}
$$

Evidence는 parameter를 적분하여 얻는다.

$$
p(D)=\int p(D\mid\theta)p(\theta)\,d\theta
$$

이 적분이 marginalization이다. 모든 가능한 $\theta$의 영향을 합쳐 데이터 $D$ 자체가 관측될 확률을 구한다. 그러나 MAP 최적화에서는 이미 관측한 $D$가 고정되어 있으므로 $p(D)$는 후보 $\theta$에 따라 변하지 않는 하나의 양의 스칼라 상수이다. 같은 양의 상수로 나누어도 최댓값의 위치는 바뀌지 않는다.

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\max}\;
p(D\mid\theta)p(\theta)
$$

따라서 MAP가 marginalization을 다른 항으로 근사하거나 weight로 대체하는 것은 아니다. 최적점의 위치를 구하는 데 필요하지 않아 정확히 제거할 수 있다. Posterior의 정규화된 확률값이나 posterior predictive distribution을 계산하려면 evidence 또는 이에 대한 근사가 다시 필요하다.

로그를 취하면 곱이 합으로 변한다.

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\max}\;
\left[
\log p(D\mid\theta)+\log p(\theta)
\right]
$$

부호를 바꾸면 익숙한 minimization problem이 된다.

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\min}\;
\left[
-\log p(D\mid\theta)-\log p(\theta)
\right]
$$

첫 번째 항은 data loss이고 두 번째 항은 prior가 만드는 penalty이다.

### Prior는 어떤 분포를 사용하는가

Prior가 반드시 특정 분포여야 하는 것은 아니다. Parameter의 범위, 대칭성, sparsity와 같은 사전 지식을 표현하도록 선택한다.

- Gaussian prior: parameter가 0 주변에 모이고 큰 절댓값은 드물다고 가정한다.
- Laplace prior: 0에서 더 뾰족한 분포를 사용하여 많은 parameter가 정확히 0에 가까워지도록 유도한다.
- Uniform prior: 허용 범위 안의 parameter를 동등하게 취급한다.

Prior를 정해도 되는 이유는 확률이 반복 실험의 빈도만을 의미하지 않기 때문이다. Bayesian 관점에서 확률은 아직 알지 못하는 parameter에 대한 불확실성을 표현할 수 있다. 사전 지식이 약하면 분산이 큰 prior를 사용하고, 충분한 데이터가 쌓이면 likelihood가 posterior를 지배하게 한다.

> ⚠️ **Caution**: 계산이 편하다는 이유만으로 prior가 참이라고 단정할 수는 없다. Prior는 모델 가정이므로 domain knowledge와 sensitivity analysis를 통해 결과가 prior 선택에 얼마나 의존하는지 확인해야 한다.

### Gaussian Likelihood와 Gaussian Prior

L2 regularization과의 관계를 보기 위해 regression 문제를 생각한다. 관측 noise가 서로 독립이며 분산이 $\sigma^2$인 Gaussian distribution을 따른다고 가정한다.

$$
y_i\mid x_i,\theta
\sim\mathcal{N}\left(f_{\theta}(x_i),\sigma^2\right)
$$

전체 데이터의 likelihood는 다음과 같다.

$$
p(D\mid\theta)
=\prod_{i=1}^{N}
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left[
-\frac{\left(y_i-f_{\theta}(x_i)\right)^2}{2\sigma^2}
\right]
$$

Negative log-likelihood에서 $\theta$와 무관한 상수를 제거하면 다음 항만 남는다.

$$
-\log p(D\mid\theta)
\overset{c}{=}
\frac{1}{2\sigma^2}
\sum_{i=1}^{N}
\left(y_i-f_{\theta}(x_i)\right)^2
$$

$\overset{c}{=}$는 양변이 $\theta$와 무관한 상수만큼 차이 난다는 의미이다. Weight vector에 대해서는 평균이 0이고 covariance가 $\tau^2I$인 isotropic Gaussian prior를 가정한다.

$$
\theta\sim\mathcal{N}(0,\tau^2I)
$$

$$
p(\theta)
=\frac{1}{(2\pi\tau^2)^{d/2}}
\exp\left(-\frac{\theta^T\theta}{2\tau^2}\right)
$$

이 prior는 모든 방향을 동일하게 취급하며, 0에서 멀리 떨어진 큰 weight에 낮은 density를 부여한다. Negative log를 취하고 $\theta$와 무관한 상수를 제거하면 다음과 같다.

$$
-\log p(\theta)
\overset{c}{=}
\frac{1}{2\tau^2}\theta^T\theta
=\frac{1}{2\tau^2}\lVert\theta\rVert_2^2
$$

즉, L2 norm은 임의로 추가한 모양이 아니라 Gaussian prior의 negative log-density에서 나온다. Likelihood와 prior를 MAP 목적함수에 대입하면 다음과 같다.

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\min}\;
\left[
\frac{1}{2\sigma^2}
\sum_{i=1}^{N}\left(y_i-f_{\theta}(x_i)\right)^2
+\frac{1}{2\tau^2}\lVert\theta\rVert_2^2
\right]
$$

목적함수 전체에 양의 상수 $2\sigma^2$을 곱해도 minimizer는 변하지 않는다.

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\min}\;
\left[
\sum_{i=1}^{N}\left(y_i-f_{\theta}(x_i)\right)^2
+\lambda\lVert\theta\rVert_2^2
\right],
\qquad
\lambda=\frac{\sigma^2}{\tau^2}
$$

여기서 weight $\lambda$는 빠진 marginalization을 보충하는 값이 아니다. Data noise의 scale $\sigma^2$과 prior uncertainty의 scale $\tau^2$ 사이의 상대적 비율이다.

- $\sigma^2$이 크면 데이터를 덜 신뢰하므로 prior의 상대적 영향이 커진다.
- $\tau^2$이 크면 넓고 약한 prior가 되므로 L2 penalty가 작아진다.
- $\tau^2$이 작으면 0 주변을 강하게 신뢰하므로 L2 penalty가 커진다.

### MLE와 MAP의 최종 비교

동일한 Gaussian regression model에서 두 추정량은 다음과 같이 비교된다.

$$
\hat{\theta}_{\mathrm{MLE}}
=\underset{\theta}{\arg\min}\;
\sum_{i=1}^{N}
\left(y_i-f_{\theta}(x_i)\right)^2
$$

$$
\hat{\theta}_{\mathrm{MAP}}
=\underset{\theta}{\arg\min}\;
\left[
\sum_{i=1}^{N}
\left(y_i-f_{\theta}(x_i)\right)^2
+\lambda\lVert\theta\rVert_2^2
\right]
$$

MLE는 관측 데이터에 가장 잘 맞는 parameter를 선택한다. MAP는 데이터 적합도와 prior가 선호하는 parameter 사이의 균형점을 선택한다. Uniform prior처럼 $p(\theta)$가 허용 영역에서 상수이면 prior 항이 최적점에 영향을 주지 않으므로 MAP는 MLE와 같아진다.

Gaussian prior 대신 Laplace prior를 사용하면 negative log-prior가 $\lVert\theta\rVert_1$에 비례하므로 L1 regularization이 된다. 이처럼 regularization의 형태는 선택한 prior의 모양과 직접 연결된다.

> ⚠️ **Caution**: 실제 neural network에서는 보통 bias를 weight decay에서 제외하기도 한다. 이는 bias에 같은 Gaussian prior를 적용하지 않거나 더 넓은 prior를 둔 것으로 해석할 수 있다.

> ✅ **Key Takeaway**: MAP는 likelihood에 penalty를 임의로 덧붙인 방법이 아니다. Bayes 정리에서 evidence를 최적화와 무관한 상수로 제거하고, likelihood와 prior의 negative log를 최소화하면 data loss와 regularization으로 이루어진 목적함수가 자연스럽게 나타난다.

### MLE와 MAP 비교표

| 비교 항목 | MLE | MAP |
|---|---|---|
| Goal | Find Optimal Parameter Set | Find Optimal Parameter Set |
| Objective Function | $\hat{\theta}_{\mathrm{MLE}}=\underset{\theta}{\arg\min}\;\sum_{i=1}^{N}\left(y_i-f_{\theta}(x_i)\right)^2$ | $\hat{\theta}_{\mathrm{MAP}}=\underset{\theta}{\arg\min}\;\left[\sum_{i=1}^{N}\left(y_i-f_{\theta}(x_i)\right)^2+\lambda\lVert\theta\rVert_2^2\right]$ |
