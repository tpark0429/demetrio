# 상수 계수를 갖는 2계 제차 미분 방정식
$ y"+ay'+by=0 $의 해를 $ e^{\lambda x} $ 라고 놓고 풀면 $ {\lambda^2} + a{\lambda} +b=0 $이므로 주어진 미분 방정식의 해는 $ y_1=e^{{\lambda_1 x}, y_2=e^{\lambda_2 x} $가 된다. 이 미분 방정식을 Characteristic equation이라고 한다.
Characteristic equation의 해는 두 개의 함수 $ y_1, y_2 $가 정의된 구간에서 1차 독립 (linearly independent)이어야 하며 어떠한 상수 $ C $가 곱해진 형태 $ Ce^x $도 해가 될 수 있고 $ C_1e^{\lambda_1x} + C_2e^{\lambda_2x} $도 해가 될 수 있다. 따라서 basis는 2개 ($ y_1, y_2 $, 일반해는 $ C_1e^\lambda_1x+C_2e^\lambda_2x $가 된다.

## 1차 독립
- **랭크(rank)**, 유효 차원(effective dimension), PCA 스펙트럼(고유값 감소)을 보면 판단 가능합니다.

## 실전 체크
1. branch feature의 공분산 고유값 분포를 보고 32개 이후가 급격히 작아지는지 확인
2. projection 전후의 재구성 오차(또는 downstream 성능) 비교
