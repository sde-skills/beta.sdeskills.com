---
layout: post
title: "2019 11 16 meetup - Design Tagged LeetCode questions."
subtitle: "Coding Questions that are tagged with design"
date: 2019-11-16 15:00:00 -0800
background: '/img/posts/2019/11/code.jpg'
author: Vivek K
---

## Intro
Naga led todays session, with focus on three hand picked questions that were tagged "#design" in leetcode. 
* [PDF Handout][5]

* [Meetup Link][4]

## [LC# 173 - Binary Search Tree Iterator][1]


Here is the code from Aseem.

<script src="https://gist.github.com/vivek-sdeskills/cdf43529054446fb7a49891bb744d763.js"></script>

Gaurav talked about Morris Traversal.

## [LC# 380 - Insert Delete GetRandom O(1)][2]

## [LC# 348 - Design Tic-Tac-Toe][3]

Cracking the Coding Interview discusses a subset of the TTT question in Q19.2. The question is "determine the winner, of a given TTT board".  If this hasWon method will be called many times, it may make sense to pre-compute the results from all possible boards and just loop up the solution. There are 9 cells, with 3 possible values each X,O,Empty. Thus 3^9 (=19,683) board states. Pretty trivial to compute this, and store this in a Hashmap.

Another approach is to represent the Xs and O as two 9bit number - representing the positions where the are marked. After this, you can use 8 bit-masks to figure out if X or O have won.

Another Approach discussed was to mark X as -1 and O as 1, add up all the values in each row/column and diagonals. X wins, if the sum is (-n) and O wins, if the sum is (+n).



[1]: https://leetcode.com/problems/binary-search-tree-iterator/
[2]: https://leetcode.com/problems/insert-delete-getrandom-o1/
[3]: https://leetcode.com/problems/design-tic-tac-toe/
[4]: https://www.meetup.com/skillets/events/bjvsdryzpbvb/
[5]: https://jmpto.us/2019-11-16-handout