# Bayes’ Theorem Derivation Design

## Goal

Extend `posts/math-201.md` from its joint-probability definition through a derivation of Bayes’ theorem while preserving the article’s introductory level and Korean explanatory style.

## Scope

- Correct the probability values in the existing die example:
  - \(P(A)=1/2\)
  - \(P(B)=1/3\)
  - \(P(A\cap B)=1/6\)
- Explain conditional probability using the same events.
- Express the joint probability in both directions:
  - \(P(A\cap B)=P(B\mid A)P(A)\)
  - \(P(A\cap B)=P(A\mid B)P(B)\)
- Equate the two expressions and isolate \(P(A\mid B)\) to derive Bayes’ theorem.
- Define prior, likelihood, evidence, and posterior.
- Verify the derived formula numerically with the die example.

## Structure

1. Revise `Joint Probability` so its event sets, prose, and values agree.
2. Add `Conditional Probability`.
3. Add `Bayes’ Theorem` with a line-by-line display-math derivation.
4. Add a compact interpretation of the four Bayesian terms.
5. Substitute the die-example probabilities as a consistency check.

## Formatting

- Follow `posts/WRITING_RULES.md`.
- Use H2 for major sections and H3/H4 for subordinate explanations.
- Use `$...$` for inline expressions and separate `$$...$$` blocks for derivations.
- Keep terminology in English where the existing article already establishes it, with Korean explanations.

## Verification

- Confirm all event probabilities are arithmetically correct.
- Confirm all display-math delimiters are balanced.
- Confirm the derivation does not divide by zero without stating \(P(B)>0\).
- Run `git diff --check`.
