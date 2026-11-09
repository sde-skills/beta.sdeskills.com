---
layout: page
title: "QuickSelect Explained: Kth Largest Element in O(n) (LeetCode 215)"
description: What QuickSelect is, how it evolves from QuickSort, why it averages O(n), and a tested Python solution for LeetCode 215 Kth Largest Element in an Array, with a free video walkthrough.
background: '/img/bg-leetcode.jpg'
permalink: /guides/quickselect-kth-largest-element
---
{% include join-cta.html %}

**QuickSelect** finds the k-th smallest (or largest) element without sorting the whole array. It is the
standard answer to **LeetCode 215: Kth Largest Element in an Array** and shows up in "top k" and median problems.

## From QuickSort to QuickSelect

QuickSort picks a pivot, **partitions** the array so smaller values are left of the pivot and larger values are
right of it, then recurses into **both** sides.

After one partition the pivot sits at its final sorted position `p`. If you only need the element at sorted index
`target`, you only have to look at **one** side:

- `p == target`: done, the pivot is the answer.
- `p < target`: the answer is to the right, so continue there.
- `p > target`: the answer is to the left.

Dropping one side each round makes the average cost n + n/2 + n/4 + ... = **O(n)**, instead of QuickSort's
O(n log n). The worst case is O(n^2) when pivots are consistently bad, which a **random pivot** makes very
unlikely.

## Python solution (LeetCode 215)

```python
import random

def findKthLargest(nums: list[int], k: int) -> int:
    target = len(nums) - k          # k-th largest = index n-k in ascending order
    lo, hi = 0, len(nums) - 1
    while True:
        p = random.randint(lo, hi)  # random pivot avoids the O(n^2) worst case
        nums[p], nums[hi] = nums[hi], nums[p]
        pivot, store = nums[hi], lo
        for i in range(lo, hi):     # Lomuto partition
            if nums[i] < pivot:
                nums[i], nums[store] = nums[store], nums[i]
                store += 1
        nums[store], nums[hi] = nums[hi], nums[store]
        if store == target:
            return nums[store]
        if store < target:
            lo = store + 1
        else:
            hi = store - 1
```

Average O(n) time, O(1) extra space. It modifies the input array; copy it first if that matters.

## QuickSelect vs a heap

| Approach | Time | Space | When to use |
|---|---|---|---|
| Sort | O(n log n) | O(1) to O(n) | Simplest; fine for small inputs |
| Min-heap of size k | O(n log k) | O(k) | Streaming data, or k much smaller than n |
| QuickSelect | O(n) average | O(1) | One-off query on an array in memory |

In an interview, mention the heap first as the safe answer, then offer QuickSelect as the optimization.

## Video walkthrough

From an SDE Skills session (6,000+ views): how QuickSelect evolves from QuickSort.

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/u0-KiwDcTlQ" title="What is QuickSelect? Evolve from QuickSort Algorithm" loading="lazy" allowfullscreen></iframe>
</div>

## Practice with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free daily LeetCode practice on Zoom. See the
[schedule]({{ '/programs' | relative_url }}) and the [free DSA practice sheet]({{ '/guides/dsa-practice-sheet' | relative_url }}),
which uses QuickSelect in its heaps and selection week.

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
</p>
