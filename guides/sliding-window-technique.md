---
layout: page
title: "The Sliding Window Technique: One Template for LeetCode"
description: Learn the sliding window technique with one reusable template, three tested Python examples (LeetCode 3, 209 and 862), and the monotonic deque fix when numbers can be negative. Free video walkthroughs from SDE Skills sessions.
background: '/img/bg-leetcode.jpg'
permalink: /guides/sliding-window-technique
---
{% include join-cta.html %}

Sliding window is one of the most common patterns in coding interviews. If a problem asks for the **longest,
shortest or best contiguous subarray or substring** under some rule, think sliding window first.

## Three kinds of windows

1. **Fixed size:** the window is always k long (for example, the max sum of any k numbers in a row).
2. **Growing and shrinking:** the window grows on the right and shrinks on the left when a rule breaks.
3. **Growing and shrinking, plus a helper:** same as above, but you also keep a hash map, a count or a deque.

([session clip at 1:08](https://www.youtube.com/watch?v=F7fWyFHe_xk&t=68s))

## The template

The right edge moves forward in an outer loop. When the window breaks the rule, an inner `while` loop moves the
left edge until the window is valid again. Then you record the answer.

```python
def sliding_window(items):
    left = 0
    state = ...                       # counts, sum, etc.
    best = 0
    for right, x in enumerate(items):
        add x to state
        while window is not valid:
            remove items[left] from state
            left += 1
        best = max(best, right - left + 1)
    return best
```

Every item enters the window once and leaves once, so this runs in **O(n)** time.
([template walkthrough at 75:58](https://www.youtube.com/watch?v=F7fWyFHe_xk&t=4558s))

## Example 1: Longest substring without repeating characters (LeetCode 3)

```python
def lengthOfLongestSubstring(s: str) -> int:
    count = {}
    left = best = 0
    for right, ch in enumerate(s):
        count[ch] = count.get(ch, 0) + 1
        while count[ch] > 1:          # a repeat: shrink from the left
            count[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best
```

## Example 2: Minimum size subarray sum (LeetCode 209)

Here we want the **shortest** window, so we record the answer inside the shrinking loop.

```python
def minSubArrayLen(target: int, nums: list[int]) -> int:
    left = total = 0
    best = float("inf")
    for right, x in enumerate(nums):
        total += x
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best == float("inf") else best
```

## When the template breaks: negative numbers

The template works because adding an item never makes the window "less valid" in the wrong direction. With
**negative numbers** that is no longer true: shrinking can make the sum bigger. For problems like
**Shortest Subarray with Sum at Least K (LeetCode 862)**, switch to prefix sums and a **monotonic deque**.
([session clip at 1:50](https://www.youtube.com/watch?v=bDMurnnxkTk&t=110s))

```python
from collections import deque

def shortestSubarray(nums: list[int], k: int) -> int:
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    dq = deque()                       # indexes with increasing prefix sums
    best = float("inf")
    for i, p in enumerate(prefix):
        while dq and p - prefix[dq[0]] >= k:
            best = min(best, i - dq.popleft())
        while dq and prefix[dq[-1]] >= p:
            dq.pop()
        dq.append(i)
    return -1 if best == float("inf") else best
```

All three solutions were checked against brute force on thousands of random inputs.

## Practice problems

| Problem | Window type |
|---|---|
| Best Time to Buy and Sell Stock (121) | Growing and shrinking |
| Longest Substring Without Repeating Characters (3) | Growing and shrinking, plus a map |
| Minimum Window Substring (76) | Growing and shrinking, plus counts |
| Grumpy Bookstore Owner (1052) | Fixed size |
| Sliding Window Maximum (239) | Fixed size, plus a deque |
| Shortest Subarray with Sum at Least K (862) | Prefix sums plus a monotonic deque |

## Video walkthroughs

**Sliding window template (SDE Skills algorithm session)**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/F7fWyFHe_xk" title="Sliding window template - SDE Skills session" loading="lazy" allowfullscreen></iframe>
</div>

**Sliding window with negative numbers**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/bDMurnnxkTk" title="SDE Skills Algo Weekly Session - Sliding Window" loading="lazy" allowfullscreen></iframe>
</div>

## Practice with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free daily LeetCode practice on Zoom. See the
[schedule]({{ '/programs' | relative_url }}) and the
[free DSA practice sheet]({{ '/guides/dsa-practice-sheet' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
</p>
