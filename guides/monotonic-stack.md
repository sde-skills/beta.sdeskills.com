---
layout: page
title: "Monotonic Stack: One Idea, Five LeetCode Problems"
description: Learn the monotonic stack pattern for next greater element, daily temperatures, largest rectangle in histogram and sum of subarray minimums, with tested Python solutions and a free video walkthrough from an SDE Skills session.
background: '/img/bg-leetcode.jpg'
permalink: /guides/monotonic-stack
---
{% include join-cta.html %}

A monotonic stack is a stack that stays sorted. Every time a new item comes in, you pop anything that breaks
the order, then push the new item. It sounds small, but it turns many O(n²) problems into **O(n)**.

**When to think of it:** the problem asks for the **next greater** or **next smaller** element, how many days
until something happens, or the biggest area or span bounded by smaller values.

## The idea: people in a line

Picture people standing in a line, sorted by height. A tall person walks in. Everyone shorter in front of them
can no longer see past them, so they step out. Each person who steps out now knows who their "next taller"
person is: the one who just arrived.
([session clip at 18:08](https://www.youtube.com/watch?v=m4hvxzLoN_I&t=1088s))

That is the whole trick. **When an item is popped, the item that popped it is its answer.**
([session clip at 19:50](https://www.youtube.com/watch?v=m4hvxzLoN_I&t=1190s))

## The template: next greater element

```python
def next_greater(nums):
    ans = [-1] * len(nums)
    stack = []                     # indexes, values decreasing
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            ans[stack.pop()] = x   # x is the next greater for the popped item
        stack.append(i)
    return ans
```

Each index is pushed once and popped at most once, so the loop runs in **O(n)** time.

- For **next greater**, keep values **decreasing** and pop while the top is smaller.
- For **next smaller**, keep values **increasing** and pop while the top is bigger.
- Store **indexes**, not values. You often need the distance or the width.

## Example 1: Daily Temperatures (LeetCode 739)

Same template, but the answer is the number of days to wait.
([session clip at 48:31](https://www.youtube.com/watch?v=m4hvxzLoN_I&t=2911s))

```python
def dailyTemperatures(temperatures):
    ans = [0] * len(temperatures)
    stack = []
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            j = stack.pop()
            ans[j] = i - j
        stack.append(i)
    return ans
```

## Example 2: Next Greater Element II (LeetCode 503)

The array is circular. Walk it twice and use `i % n` to wrap around. Only push during the first pass.
([session clip at 78:29](https://www.youtube.com/watch?v=m4hvxzLoN_I&t=4709s))

```python
def nextGreaterElements(nums):
    n = len(nums)
    ans = [-1] * n
    stack = []
    for i in range(2 * n):         # walk the array twice
        x = nums[i % n]
        while stack and nums[stack[-1]] < x:
            ans[stack.pop()] = x
        if i < n:
            stack.append(i)
    return ans
```

## Example 3: Largest Rectangle in Histogram (LeetCode 84)

Keep heights **increasing**. When a bar is popped, the current bar is its right wall and the new top of the
stack is its left wall. A height-0 bar at the end flushes everything out.

```python
def largestRectangleArea(heights):
    stack = []                     # indexes, heights increasing
    best = 0
    for i, h in enumerate(heights + [0]):
        while stack and heights[stack[-1]] >= h:
            top = heights[stack.pop()]
            left = stack[-1] + 1 if stack else 0
            best = max(best, top * (i - left))
        stack.append(i)
    return best
```

## Example 4: Sum of Subarray Minimums (LeetCode 907)

For each number, count how many subarrays it is the minimum of: (how far it reaches left) × (how far it
reaches right). Two monotonic stack passes find both distances. Use `>` on one side and `>=` on the other so
equal values are not counted twice.
([session clip at 99:17](https://www.youtube.com/watch?v=m4hvxzLoN_I&t=5957s))

```python
def sumSubarrayMins(arr):
    MOD = 10**9 + 7
    n = len(arr)
    left = [0] * n                 # how far each item reaches left as the min
    right = [0] * n
    stack = []
    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        left[i] = i - stack[-1] if stack else i + 1
        stack.append(i)
    stack = []
    for i in range(n - 1, -1, -1):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        right[i] = stack[-1] - i if stack else n - i
        stack.append(i)
    return sum(arr[i] * left[i] * right[i] for i in range(n)) % MOD
```

All five solutions were checked against brute force on thousands of random inputs.

## Practice problems

| Problem | Stack order |
|---|---|
| Next Greater Element I (496) | Decreasing |
| Daily Temperatures (739) | Decreasing |
| Next Greater Element II (503) | Decreasing, walk twice |
| Online Stock Span (901) | Decreasing |
| Largest Rectangle in Histogram (84) | Increasing |
| Sum of Subarray Minimums (907) | Increasing, two passes |
| Trapping Rain Water (42) | Decreasing |

A close cousin is the **monotonic deque**, used for Sliding Window Maximum (239). See the
[sliding window guide]({{ '/guides/sliding-window-technique' | relative_url }}).

## Video walkthrough

**Monotonic stack, derived from scratch and applied to six problems (SDE Skills daily coding practice)**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/m4hvxzLoN_I" title="Monotonic Stack - Daily Coding Practice" loading="lazy" allowfullscreen></iframe>
</div>

## Practice with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free daily LeetCode practice on Zoom. See the
[schedule]({{ '/programs' | relative_url }}) and the
[free DSA practice sheet]({{ '/guides/dsa-practice-sheet' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
</p>
