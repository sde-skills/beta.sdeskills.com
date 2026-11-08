---
layout: page
title: "LeetCode 457: Circular Array Loop (Explained, With Video)"
description: How to solve LeetCode 457 Circular Array Loop in O(n) time and O(1) space with fast and slow pointers, the two rules that make a cycle valid, tested Python code, and a free video walkthrough.
background: '/img/bg-leetcode.jpg'
permalink: /guides/leetcode-457-circular-array-loop
---
{% include join-cta.html %}

**The problem:** you get a circular array of non-zero integers. From index `i` you move `nums[i]` steps
(forward if positive, backward if negative, wrapping around). Return `true` if there is a **cycle** that

1. has more than one element, and
2. moves in only one direction (all positive or all negative).

## The idea: fast and slow pointers

This is cycle detection, like Linked List Cycle (LeetCode 141), with two extra rules. From each start index:

- Move `slow` one step and `fast` two steps.
- Stop the walk as soon as a step would **change direction** or **land on itself** (a one-element loop).
- If `slow` and `fast` meet, there is a valid cycle.

To keep it O(n), once a start fails, walk its path again and set those entries to `0`. Any later walk that
reaches a `0` can stop immediately, so every index is visited a constant number of times.

## Python solution

```python
def circularArrayLoop(nums: list[int]) -> bool:
    n = len(nums)

    def nxt(i):
        return (i + nums[i]) % n

    for i in range(n):
        if nums[i] == 0:
            continue
        forward = nums[i] > 0

        def ok(j):  # same direction, not visited, not a 1-element loop
            return nums[j] != 0 and (nums[j] > 0) == forward and nxt(j) != j

        slow = fast = i
        while ok(fast) and ok(nxt(fast)):
            slow, fast = nxt(slow), nxt(nxt(fast))
            if slow == fast:
                return True

        j = i  # mark this failed path so it is never walked again
        while nums[j] != 0 and (nums[j] > 0) == forward:
            k = nxt(j)
            nums[j] = 0
            j = k
    return False
```

Python's `%` always returns a non-negative result, so backward moves wrap correctly. In Java or C++ use
`((i + nums[i]) % n + n) % n`.

## Test cases

| Input | Answer | Why |
|---|---|---|
| `[2,-1,1,2,2]` | `true` | 0 -> 2 -> 3 -> 0, all forward |
| `[-1,2]` | `false` | 1 -> 1 is a one-element loop |
| `[-2,1,-1,-2,-2]` | `false` | The only loop mixes directions |
| `[1,-1,5,1,4]` | `true` | 3 -> 4 -> 3, all forward |
| `[-1,-1,-1]` | `true` | Every element points back one step |

## Video walkthrough

Worked live in an SDE Skills daily coding session (6,000+ views).

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/cjeQwRNbiDo" title="Leetcode [457] Circular Array Loop" loading="lazy" allowfullscreen></iframe>
</div>

## Practice problems like this with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free daily LeetCode practice on Zoom. See the
[schedule]({{ '/programs' | relative_url }}), the [free DSA practice sheet]({{ '/guides/dsa-practice-sheet' | relative_url }})
and [LeetCode 564: Find the Closest Palindrome]({{ '/guides/leetcode-564-find-the-closest-palindrome' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
</p>
