# Bayes’ Theorem Derivation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the joint-probability example in `math-201.md` and extend it through a clear derivation and interpretation of Bayes’ theorem.

**Architecture:** Keep the existing die example as the single narrative thread. Correct its event probabilities, introduce conditional probability, derive Bayes’ theorem by equating two factorizations of the same joint probability, and verify the result numerically.

**Tech Stack:** Markdown, LaTeX rendered by KaTeX, PowerShell validation commands.

## Global Constraints

- Follow `posts/WRITING_RULES.md`.
- Use `$...$` for inline math and balanced `$$...$$` blocks for display math.
- Preserve the introductory Korean explanatory style and existing English probability terms.
- State the denominator condition \(P(B)>0\).
- Modify only `posts/math-201.md`.

---

### Task 1: Correct the Joint-Probability Example and Derive Bayes’ Theorem

**Files:**
- Modify: `posts/math-201.md:302`
- Test: PowerShell content and delimiter validation

**Interfaces:**
- Consumes: Existing events \(A=\{2,4,6\}\), \(B=\{3,6\}\), and \(A\cap B=\{6\}\).
- Produces: Correct joint and conditional probabilities, the Bayes formula, definitions of prior/likelihood/evidence/posterior, and a numerical consistency check.

- [ ] **Step 1: Run the failing content check**

```powershell
$text = Get-Content -Encoding utf8 -Raw 'posts\math-201.md'
$required = @(
  'P(A)=\frac{1}{2}',
  'P(B)=\frac{1}{3}',
  'P(A\cap B)=\frac{1}{6}',
  'P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}',
  'Prior',
  'Likelihood',
  'Evidence',
  'Posterior'
)
$missing = @($required | Where-Object { -not $text.Contains($_) })
if ($missing.Count) { Write-Error "Missing required Bayes content: $($missing -join ', ')"; exit 1 }
```

Expected: FAIL because the current example contains incorrect probabilities and no Bayes derivation.

- [ ] **Step 2: Correct the existing event calculations**

Replace the inaccurate probability lines with:

```markdown
  - $P(A)=P(X=2\text{ or }X=4\text{ or }X=6)=\frac{3}{6}=\frac{1}{2}$
  - $P(B)=P(X=3\text{ or }X=6)=\frac{2}{6}=\frac{1}{3}$
  - $P(A\cap B)=P(X=6)=\frac{1}{6}$
```

- [ ] **Step 3: Add the conditional-probability explanation**

Append:

```markdown
## Conditional Probability

조건부확률 $P(B\mid A)$는 사건 $A$가 발생했다는 조건 아래에서 사건 $B$가 발생할 확률이다. 표본공간을 전체 $S$가 아니라 사건 $A$로 제한하여 생각한다.

$$
P(B\mid A)=\frac{P(A\cap B)}{P(A)},\qquad P(A)>0
$$

주사위 예시에서 $A=\{2,4,6\}$가 발생했다고 알면 가능한 결과는 세 개로 줄어든다. 이 중 $B=\{3,6\}$도 만족하는 결과는 6 하나이므로 $P(B\mid A)=1/3$이다.
```

- [ ] **Step 4: Add the two joint-probability factorizations and derivation**

Append:

```markdown
## Bayes’ Theorem

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

$P(B)>0$일 때 양변을 $P(B)$로 나누면 Bayes’ theorem을 얻는다.

$$
P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}
$$
```

- [ ] **Step 5: Add the interpretation and numerical check**

Append:

```markdown
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

주사위 예시에서는 $P(B\mid A)=1/3$, $P(A)=1/2$, $P(B)=1/3$이므로

$$
P(A\mid B)
=\frac{P(B\mid A)P(A)}{P(B)}
=\frac{\frac{1}{3}\cdot\frac{1}{2}}{\frac{1}{3}}
=\frac{1}{2}
$$

$B=\{3,6\}$가 발생했다고 알았을 때 가능한 결과는 3과 6이고, 그중 짝수인 결과는 6 하나이므로 직접 계산한 $P(A\mid B)=1/2$와 일치한다.
```

- [ ] **Step 6: Run content, delimiter, and diff verification**

```powershell
$text = Get-Content -Encoding utf8 -Raw 'posts\math-201.md'
$required = @(
  'P(A)=\frac{1}{2}',
  'P(B)=\frac{1}{3}',
  'P(A\cap B)=\frac{1}{6}',
  'P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}',
  'Prior',
  'Likelihood',
  'Evidence',
  'Posterior'
)
$missing = @($required | Where-Object { -not $text.Contains($_) })
if ($missing.Count) { Write-Error "Missing required Bayes content: $($missing -join ', ')"; exit 1 }
$blockDelimiters = @(Select-String -Path 'posts\math-201.md' -Encoding utf8 -Pattern '^\$\$$')
if (($blockDelimiters.Count % 2) -ne 0) { Write-Error 'Unbalanced display-math delimiters'; exit 1 }
git diff --check -- posts/math-201.md
```

Expected: PASS with all required content present, an even number of display-math delimiters, and no whitespace errors.

- [ ] **Step 7: Commit**

```powershell
git add -- posts/math-201.md
git commit -m "docs: derive Bayes theorem from joint probability"
```
