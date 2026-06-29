---
id: "math-101"
title: "Linear projection은 정보 손실이 '없을' 수 있나?"
date: "2025-11-30"
category: "수학/Linear Algebra"
tags: ["Linear Algebra", "Projection", "Rank"]
pinned: true
excerpt: "차원 축소는 원칙적으로 정보 손실. 단, 데이터가 저차원 다양체/저랭크면 예외적으로 손실이 작아질 수 있음."
---
## 결론
- 일반적으로 $96 \to 32$의 선형 투영은 **정보 손실이 존재**한다.
- 다만 데이터가 사실상 32차 이하의 **저랭크 구조(또는 낮은 유효 차원)**를 갖는다면, 손실이 작게 나타날 수 있다.

> 💡 **Mathematical Insight**: 고차원 공간($96 \to 32$)으로의 선형 투영은 데이터의 독립변수 관계가 복잡하다면 원칙적으로 정보 손실을 유발한다. 하지만 원본 데이터가 사실상 32차원 이하의 **저랭크 다양체(Low-rank manifold)**에 집중되어 있다면 정보 손실을 거의 최소화하여 축소할 수 있다.

### 핵심 개념
- **랭크(rank)**, 유효 차원(effective dimension), PCA 스펙트럼(고유값 감소)을 보면 판단 가능하다.

### 실전 체크
1. branch feature의 공분산 고유값 분포를 보고 32개 이후가 급격히 작아지는지 확인
2. projection 전후의 **재구성 오차**(또는 downstream 성능) 비교
