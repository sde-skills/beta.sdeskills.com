---
layout: page
title: "Dynamic Programming Interview Patterns: Stairs, Subset Sum, Coin Change"
description: Learn the dynamic programming patterns that come up most in coding interviews, with tested Python solutions for climbing stairs, partition equal subset sum, coin change, combination sum IV, integer break and distinct subsequences, plus a free video walkthrough.
background: '/img/bg-leetcode.jpg'
permalink: /guides/dynamic-programming-patterns
---
{% include join-cta.html %}

Dynamic programming (DP) scares a lot of people, but most interview DP problems use the same few ideas.
This guide walks through them with short, tested Python solutions.

## The three questions

Every DP solution answers three questions:

1. **State:** what does `dp[i]` mean? Say it in one sentence before you write code.
2. **Transition:** how do you build `dp[i]` from smaller answers?
3. **Base case:** what is the answer for the smallest input?

If you can't say what `dp[i]` means in plain words, stop and work that out first.

## Pattern 1: Climbing stairs (LeetCode 70)

`ways[i]` = the number of ways to reach step `i`. If you can take 1 to `k` steps at a time, you reach step
`i` from any of the `k` steps below it.
([session clip at 3:28](https://www.youtube.com/watch?v=a4LiotNc7EU&t=208s))

```python
def climbStairs(n, k=2):
    ways = [0] * (n + 1)
    ways[0] = 1
    for i in range(1, n + 1):
        for step in range(1, k + 1):
            if i >= step:
                ways[i] += ways[i - step]
    return ways[n]
```

With `k = 2` this is Fibonacci. You only ever look back `k` steps, so you can cut memory to O(k) later.

## Pattern 2: Subset sum (Partition Equal Subset Sum, LeetCode 416)

Can we split the numbers into two groups with the same sum? That is the same as: can some subset add up to
half the total? Write down simple facts like this before you code.
([session clip at 18:11](https://www.youtube.com/watch?v=a4LiotNc7EU&t=1091s))

`can[s]` = can some of the numbers seen so far add up to `s`?

```python
def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    can = [True] + [False] * target
    for x in nums:
        for s in range(target, x - 1, -1):   # go down so each number is used once
            can[s] = can[s] or can[s - x]
    return can[target]
```

The inner loop goes **down**. If it went up, the same number could be used twice.

## Pattern 3: Coin change (LeetCode 322)

`best[a]` = the fewest coins that make amount `a`.

```python
def coinChange(coins, amount):
    INF = float("inf")
    best = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                best[a] = min(best[a], best[a - c] + 1)
    return -1 if best[amount] == INF else best[amount]
```

## Pattern 4: Loop order decides combinations vs orderings

This is the trick most people miss. Counting ways to make an amount gives **different answers** depending on
which loop is outside.
([session clip at 61:30](https://www.youtube.com/watch?v=a4LiotNc7EU&t=3690s))

**Coins outside** counts combinations, so 1+2 and 2+1 are the same (Coin Change II, LeetCode 518):

```python
def change(amount, coins):
    ways = [1] + [0] * amount
    for c in coins:                           # coins outside
        for a in range(c, amount + 1):
            ways[a] += ways[a - c]
    return ways[amount]
```

**Amounts outside** counts orderings, so 1+2 and 2+1 are different (Combination Sum IV, LeetCode 377):

```python
def combinationSum4(nums, target):
    ways = [1] + [0] * target
    for a in range(1, target + 1):            # amounts outside
        for x in nums:
            if x <= a:
                ways[a] += ways[a - x]
    return ways[target]
```

Same lines, swapped loops, different problem.

## Pattern 5: Integer break (LeetCode 343)

Split `n` into at least two positive numbers and maximize their product. `best[i]` = the best product for
`i`. For each first piece `j`, either stop (`j * (i - j)`) or keep splitting the rest (`j * best[i - j]`).
([session clip at 70:30](https://www.youtube.com/watch?v=a4LiotNc7EU&t=4230s))

```python
def integerBreak(n):
    best = [0] * (n + 1)
    best[1] = 1
    for i in range(2, n + 1):
        for j in range(1, i):
            best[i] = max(best[i], j * (i - j), j * best[i - j])
    return best[n]
```

For `n = 10` the answer is 36 (3 + 3 + 4). It is easy to guess a rule here and get it wrong. The DP checks
every split, so it is safe.

## Pattern 6: Distinct subsequences (LeetCode 115)

`ways[j]` = the number of ways to form the first `j` letters of `t` from what we have read of `s`. When a
letter matches, every way to form the shorter prefix also extends to the longer one.
([session clip at 10:54](https://www.youtube.com/watch?v=10oUYQJz_vk&t=654s))

```python
def numDistinct(s, t):
    ways = [1] + [0] * len(t)
    for ch in s:
        for j in range(len(t), 0, -1):        # right to left, like subset sum
            if t[j - 1] == ch:
                ways[j] += ways[j - 1]
    return ways[len(t)]
```

All solutions on this page were checked against brute force on thousands of random inputs.

## Practice problems

| Problem | Pattern |
|---|---|
| Climbing Stairs (70) | Look back k steps |
| House Robber (198) | Take it or skip it |
| Partition Equal Subset Sum (416) | Subset sum, loop down |
| Coin Change (322) | Fewest items |
| Coin Change II (518) | Combinations, coins outside |
| Combination Sum IV (377) | Orderings, amounts outside |
| Integer Break (343) | Try every first piece |
| Longest Increasing Subsequence (300) | Best ending at i |
| Distinct Subsequences (115) | Two strings, loop down |

## Video walkthrough

**Dynamic programming problems (SDE Skills weekly session)**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/a4LiotNc7EU" title="SDE Skills Weekly Session - Dynamic Programming Problems" loading="lazy" allowfullscreen></iframe>
</div>

## Practice with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free daily LeetCode practice on Zoom. See the
[schedule]({{ '/programs' | relative_url }}) and the
[free DSA practice sheet]({{ '/guides/dsa-practice-sheet' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
</p>
