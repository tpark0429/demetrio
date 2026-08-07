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
