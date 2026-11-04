---
layout: page
title: Free DSA Practice Sheet, Roadmap and Notes
description: A free data structures and algorithms practice sheet organized by pattern, with LeetCode problems, video walkthroughs from SDE Skills sessions, and free live practice with other engineers.
background: '/img/bg-leetcode.jpg'
permalink: /guides/dsa-practice-sheet
---
{% include join-cta.html %}


Most people learn data structures and algorithms by grinding random problems. It works better to learn
**patterns**: once you recognize a sliding window or a monotonic stack, dozens of problems become the same
problem. This free sheet is organized that way. Work top to bottom, and do not move on from a pattern until you
can solve a new problem in it without hints.

## How to use this sheet

1. Read or watch the idea behind the pattern first.
2. Solve the problems in order. Give each one 25 to 30 minutes before looking at hints.
3. After solving, write one sentence: *what clue told me to use this pattern?*
4. Revisit missed problems after 3 days and again after a week.

## A simple DSA roadmap (8 weeks)

| Week | Focus |
|---|---|
| 1 | Arrays and hashing, two pointers |
| 2 | Sliding window, stacks and monotonic stacks |
| 3 | Binary search, linked lists |
| 4 | Trees (DFS, BFS, BST properties) |
| 5 | Heaps, selection, intervals |
| 6 | Backtracking |
| 7 | Graphs (BFS/DFS on grids, topological sort, union find) |
| 8 | Dynamic programming, then mixed review |

## The sheet

| Pattern | Problems (LeetCode #) |
|---|---|
| Arrays and hashing | Two Sum (1), Contains Duplicate (217), Group Anagrams (49), Top K Frequent Elements (347), Product of Array Except Self (238) |
| Two pointers | Valid Palindrome (125), 3Sum (15), Container With Most Water (11) |
| Sliding window | Best Time to Buy and Sell Stock (121), Longest Substring Without Repeating Characters (3), Minimum Window Substring (76), Sliding Window Maximum (239) |
| Stack and monotonic stack | Valid Parentheses (20), Daily Temperatures (739), Largest Rectangle in Histogram (84) |
| Binary search | Binary Search (704), Search in Rotated Sorted Array (33), Koko Eating Bananas (875) |
| Linked lists | Reverse Linked List (206), Merge Two Sorted Lists (21), Linked List Cycle (141) |
| Trees | Maximum Depth of Binary Tree (104), Binary Tree Level Order Traversal (102), Validate Binary Search Tree (98), Lowest Common Ancestor of a BST (235) |
| Heaps and selection | Kth Largest Element in an Array (215), Merge k Sorted Lists (23), Find Median from Data Stream (295) |
| Backtracking | Subsets (78), Combination Sum (39), Permutations (46) |
| Graphs | Number of Islands (200), Clone Graph (133), Course Schedule (207), Redundant Connection (684) |
| Dynamic programming | Climbing Stairs (70), House Robber (198), Coin Change (322), Longest Increasing Subsequence (300) |


## Quick DSA notes: when to use each pattern

- **Hashing**: you need fast lookups or counts ("have I seen this before?").
- **Two pointers**: sorted input, or pairs/triples that must satisfy a condition.
- **Sliding window**: a contiguous subarray or substring with a constraint (longest, shortest, at most k).
- **Monotonic stack**: "next greater/smaller element" or spans and areas in histograms.
- **Binary search**: sorted data, or a yes/no answer that flips at some value (search on the answer).
- **Heap**: repeatedly need the smallest/largest item, top k, or merging sorted streams.
- **Backtracking**: generate all subsets, permutations or combinations; prune early.
- **Graph BFS/DFS**: connected regions, shortest steps in unweighted graphs, dependencies (topological sort).
- **Dynamic programming**: overlapping subproblems; define the state, the transition and the base case.

## Video walkthroughs from SDE Skills sessions

**Sliding window**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/bDMurnnxkTk" title="SDE Skills Algo Weekly Session - Sliding Window" loading="lazy" allowfullscreen></iframe>
</div>

**Monotonic stack**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/m4hvxzLoN_I" title="Monotonic Stack - Daily Coding Practice" loading="lazy" allowfullscreen></iframe>
</div>

**Binary search templates**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/Do95Apr9Ldc" title="Binary Search Templates" loading="lazy" allowfullscreen></iframe>
</div>

**QuickSelect (for Kth Largest Element)**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/u0-KiwDcTlQ" title="What is QuickSelect? Evolve from QuickSort Algorithm" loading="lazy" allowfullscreen></iframe>
</div>

## Practice it with other engineers, free

Working through a sheet alone is hard to keep up. SDE Skills, a volunteer-run 501(c)(3) nonprofit, runs
**free daily LeetCode practice** on weekdays and a **weekly data structures and algorithms session** on Sundays,
all on Zoom. See the [schedule]({{ '/programs' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Find study partners on Discord</a>
</p>

More guides: [How to practice LeetCode]({{ '/leetcode' | relative_url }}) ·
[Free mock interviews]({{ '/guides/free-mock-interviews' | relative_url }}) ·
[System design interview prep]({{ '/guides/system-design-interview-prep' | relative_url }})
