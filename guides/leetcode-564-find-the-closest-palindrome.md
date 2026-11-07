---
layout: page
title: "LeetCode 564: Find the Closest Palindrome (Explained, With Video)"
description: How to solve LeetCode 564 Find the Closest Palindrome with the five-candidate method, the edge cases that break most solutions, Python code, and a free video walkthrough from an SDE Skills session.
background: '/img/bg-leetcode.jpg'
permalink: /guides/leetcode-564-find-the-closest-palindrome
---
{% include join-cta.html %}

**The problem:** given an integer as a string `n`, return the closest integer palindrome that is not `n`
itself. If two palindromes are equally close, return the smaller one.

Brute force (walk outward from `n` checking each number) is far too slow, since `n` can have 18 digits. The
trick is that the answer is always one of just **five candidates**.

## The five candidates

1. **Mirror the first half.** Keep the left half (including the middle digit for odd lengths) and copy it onto
   the right: `12932 -> 12921`.
2. **First half plus one, mirrored:** `12932 -> 130 -> 13031`.
3. **First half minus one, mirrored:** `12932 -> 128 -> 12821`.
4. **All nines with one fewer digit:** `10^(L-1) - 1`, for example `1000 -> 999`.
5. **One, zeros, one with one more digit:** `10^L + 1`, for example `99 -> 101`.

Candidates 4 and 5 cover the cases where changing the half crosses a power of ten. Drop `n` itself from the set,
then pick the candidate with the smallest absolute difference, breaking ties by the smaller value.

## Python solution

```python
def nearestPalindromic(n: str) -> str:
    L, num = len(n), int(n)
    candidates = {10 ** (L - 1) - 1, 10 ** L + 1}
    prefix = int(n[:(L + 1) // 2])
    for p in (prefix - 1, prefix, prefix + 1):
        s = str(p)
        pal = s + s[::-1] if L % 2 == 0 else s + s[-2::-1]
        candidates.add(int(pal))
    candidates.discard(num)
    return str(min(candidates, key=lambda x: (abs(x - num), x)))
```

It runs in O(L) time for L digits. Python integers handle the 18-digit inputs; in Java or C++ use `long`.

## Edge cases to test

| Input | Answer | Why |
|---|---|---|
| `"1"` | `"0"` | Single digit: the answer is n - 1 |
| `"10"` | `"9"` | Crossing down a power of ten |
| `"11"` | `"9"` | n is already a palindrome, so it is excluded |
| `"99"` | `"101"` | Crossing up a power of ten |
| `"1000"` | `"999"` | Ties and lengths change |

## Video walkthrough

This problem was worked live in an SDE Skills daily coding session (10,000+ views).

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/2vqs56N5CbM" title="Leetcode [564] Find the Closest Palindrome" loading="lazy" allowfullscreen></iframe>
</div>

## Practice problems like this with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free daily LeetCode practice on Zoom. See the
[schedule]({{ '/programs' | relative_url }}), the [LeetCode practice guide]({{ '/leetcode' | relative_url }}) and the
[free DSA practice sheet]({{ '/guides/dsa-practice-sheet' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
</p>
