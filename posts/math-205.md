---
id: "math-205"
title: "KL Divergence"
date: "2026-5-14"
category: "수학/Probability & Information"
tags: ["Information Theory", "KL Divergence"]
pinned: false
excerpt: "KL Divergence 개념"
---
## KL Divergence
KL Divergence는 **두 확률 분포 간의 차이**를 나타내는 척도 중 하나로, 정보 이론에서 중요한 개념으로 사용된다.
즉, $Y(P_{Label})$의 확률 분포와 $\hat{Y}(P_{\theta})$확률 분포의 차이를 최소화 하도록 최적화(backpropagation)가 가능하다는 말이다.

#### Definition
$D(p \parallel q) = \mathbf{E}_p (\log \frac{p(X)}{q(X)}) = \sum_{x \in X} p(x) \times \log \frac{p(x)}{q(x)}$
,where $p$ & $q$ are probability distributions, $X$ is a random variable and $0 \log \frac{0}{0} = 0$, $0 \log \frac{0}{q} = 0$, $0 \log \frac{p}{0} = \infty$
(분자와 분모를 바꿔도 무방)

#### **Distance와 Divergence의 차이**
일반적으로 KL divergence를 구해보면 p를 기준으로 할 때 q까지의 거리와 q를 기준으로 할 때 p까지의 거리가 다를 수도 있다. Euclidean distance 관점에서는 틀린 말.

#### KL Divergence의 범위
Log-sum inequality에 의해, $D(p \parallel q) = \sum_{x \in X} p(x) \log \frac{p(x)}{q(x)} \ge \left( \sum_{x \in X} p(x) \right) \log \frac{\sum_{x \in X} p(x)}{\sum_{x \in X} q(x)} = 1 \times \log \frac{1}{1} = 0$ 이므로, $D(p \parallel q) \ge 0$임이 증명된다.

![KL Divergance](/assets/KLDivergence.png)

만약 위 그림의 p와 q 분포가 완전히 동일하다면 $D(p \parallel q)$는 0이 되며, 완전히 떨어져 있는 경우엔 $\infty$에 가까워진다.

#### KLD in Deeplearning Optimization
$L(\theta) = D_{KL}(Y \parallel \hat{Y}) = \mathbf{E}_Y \left[ \log \frac{Y}{\hat{Y}} \right]$
$Y$와 $\hat{Y}$는 softmax를 통과한 확률분포라고 가정하고, n개의 **데이터를 모아 Monte Carlo 근사** (n개의 데이터를 샘플링한 평균은 전체의 평균이다.)를 취하면 $L(\theta) = \frac{1}{n} \sum_{i=1}^n \log \frac{Y_i}{\hat{Y}_i}$로 표현할 수 있다.
이것을 loss로 사용하게 되면 예측 오차를 줄이면서 전체적인 확률 분포도 같아지도록 학습이 가능하다.

> 💡 **Mathematical Insight**: **KL Divergence**는 두 확률 분포의 다름을 측정하는 척도이다. 대칭성($D(p \parallel q) \neq D(q \parallel p)$)을 만족하지 않으므로 엄밀한 의미의 거리(Distance)가 아닌 **발산(Divergence)**으로 정의된다. 딥러닝에서는 실제 레이블 분포 $Y$와 예측 확률 분포 $\hat{Y}$ 사이의 차이를 줄이는 손실 함수로 활용된다.
