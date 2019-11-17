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
Solution:
* Approach 1: Brute force – inorder traversal, and use ArrayList to store BST elements, and traverse one by one. But this requires O(n) space, so in question it is expected that we use at most O(h) space. So, we will skip solution.

* Approach 2: Do controlled in-order traversal on BST. i.e. all left most can be stored in stack and on reading next smallest, we can do preprocessing work for next smallest. i.e. by visiting popped stack treenode’s right child’s left most tree. Approach can be seen in code example below.

Here is the code from Aseem.

<script src="https://gist.github.com/vivek-sdeskills/cdf43529054446fb7a49891bb744d763.js"></script>

Gaurav talked about Morris Traversal.

## [LC# 380 - Insert Delete GetRandom O(1)][2]
Solution:
* For O(1) inserts, we know that Array / ArrayList / Queue / Hashmap data structures support it.
* For O(1) remove, we know that HashMap can be used.
* For getRandom() – O(1) – we could use Random function on Array indices, and randomly return an element from that index in array.
* For our solution we could leverage both these data structures. i.e. on insert(), we could add element in Array list, and maintain its index in Hash Map. On remove() is where it gets tricky, as default ArrayList() remove would take up to O(n) in worst case. To eliminate that, we could always swap last element with removal element in ArrayList, and update its corresponding index in Hash Map. For getRandom(), returning element using random index using ArrayList length would work.

Below solution uses above approach.
<script src="https://gist.github.com/vivek-sdeskills/60a8a5cf79b26f4d338f7b05cb2c3c4c.js"></script>

## [LC# 348 - Design Tic-Tac-Toe][3]
Solution:
* We know that Tic Tac Toe game win condition, one has to check each row, each column, diagonal and anti-diagonal to check if same player occupied all contiguous cells. Brute force approach is to explore all the possible paths and check for both players occupied them or not. But this would take up to O(n^2).
* We can do better in terms of time/space complexity with little trick here. We only need to keep track of count for each row and column, not for the entire N x N matrix. If at any time, any of row or column reaches size N, then one of player has won. 
* To simplify the counting logic, we can use +1 for player 1, and -1 for player 2. This way we either hit +N or -N up on winning condition. We could use Absolute value of count to figure win. 
* We also need one variable each for diagonal and anti-diagonal. On each move(), we check all row, column, diagonal, anti-diagonal counters have hit N or not to figure out win, if not return 0 saying no player won.

Code below explains demonstrates this approach:
<script src="https://gist.github.com/vivek-sdeskills/ef68b4163cc3d6002655bcb9d7b0ceb0.js"></script>

Cracking the Coding Interview discusses a subset of the TTT question in Q19.2. The question is "determine the winner, of a given TTT board".  If this hasWon method will be called many times, it may make sense to pre-compute the results from all possible boards and just loop up the solution. There are 9 cells, with 3 possible values each X,O,Empty. Thus 3^9 (=19,683) board states. Pretty trivial to compute this, and store this in a Hashmap.

Another approach is to represent the Xs and O as two 9bit number - representing the positions where the are marked. After this, you can use 8 bit-masks to figure out if X or O have won.

Another Approach discussed was to mark X as -1 and O as 1, add up all the values in each row/column and diagonals. X wins, if the sum is (-n) and O wins, if the sum is (+n).



[1]: https://leetcode.com/problems/binary-search-tree-iterator/
[2]: https://leetcode.com/problems/insert-delete-getrandom-o1/
[3]: https://leetcode.com/problems/design-tic-tac-toe/
[4]: https://www.meetup.com/skillets/events/bjvsdryzpbvb/
[5]: https://jmpto.us/2019-11-16-handout