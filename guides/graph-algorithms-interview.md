---
layout: page
title: "Graphs for Coding Interviews: BFS vs Dijkstra, Topological Sort"
description: Learn the graph patterns that come up in coding interviews, with tested Python solutions for number of islands, shortest path with BFS, Dijkstra, course schedule (topological sort) and counting paths, plus a free video walkthrough from an SDE Skills session.
background: '/img/bg-leetcode.jpg'
permalink: /guides/graph-algorithms-interview
---
{% include join-cta.html %}

Graph problems look scary, but most interview questions use one of a few tools: DFS, BFS, Dijkstra and
topological sort. The hard part is picking the right one. This guide shows how, with short, tested Python
solutions.

## Store the graph as an adjacency list

Most interview graphs are **sparse** (few edges per node). Use a dictionary from each node to its neighbors.
An adjacency matrix only makes sense when almost every pair of nodes is connected.
([session clip at 7:07](https://www.youtube.com/watch?v=ZEHgJ_OSWXM&t=427s))

```python
from collections import defaultdict

graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)     # leave this out for a directed graph
```

Grids are graphs too: each cell is a node, and its up/down/left/right cells are its neighbors.

## Which tool when?

| The question asks for | Use |
|---|---|
| Connected groups, "can I reach X?" | DFS or BFS |
| Fewest steps, every edge costs the same | BFS |
| Cheapest path, edges have different costs | Dijkstra |
| An order that respects dependencies, or "is there a cycle?" | Topological sort |
| Number of paths in a DAG | DFS with memo |

## Pattern 1: Number of Islands (LeetCode 200)

Count connected groups. Every time you find land you haven't seen, flood it with DFS and add one.

```python
def numIslands(grid):
    rows, cols = len(grid), len(grid[0]) if grid else 0
    seen = set()
    def dfs(r, c):
        stack = [(r, c)]
        seen.add((r, c))
        while stack:
            r, c = stack.pop()
            for nr, nc in ((r+1, c), (r-1, c), (r, c+1), (r, c-1)):
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1" and (nr, nc) not in seen:
                    seen.add((nr, nc))
                    stack.append((nr, nc))
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1" and (r, c) not in seen:
                dfs(r, c)
                count += 1
    return count
```

## Pattern 2: Fewest steps uses BFS, not Dijkstra (LeetCode 1091)

If every step costs the same, **BFS already finds the shortest path**. It visits nodes in order of distance, so
the first time it reaches the target, that is the answer. Dijkstra works too, but it is slower and more code.
([session clip at 51:22](https://www.youtube.com/watch?v=ZEHgJ_OSWXM&t=3082s))

```python
from collections import deque

def shortestPathBinaryMatrix(grid):
    n = len(grid)
    if grid[0][0] or grid[n-1][n-1]:
        return -1
    queue = deque([(0, 0, 1)])
    seen = {(0, 0)}
    while queue:
        r, c, dist = queue.popleft()
        if (r, c) == (n-1, n-1):
            return dist
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and not grid[nr][nc] and (nr, nc) not in seen:
                    seen.add((nr, nc))       # mark when you add, not when you pop
                    queue.append((nr, nc, dist + 1))
    return -1
```

Mark a cell as seen **when you add it** to the queue. If you wait until you pop it, the same cell can be added
many times.

## Pattern 3: Different edge costs use Dijkstra (LeetCode 743)

When edges have different weights, use a min-heap. Always expand the closest node that isn't settled yet.

```python
import heapq
from collections import defaultdict

def networkDelayTime(times, n, k):
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    dist = {}
    heap = [(0, k)]
    while heap:
        d, node = heapq.heappop(heap)
        if node in dist:
            continue                 # already settled with a shorter distance
        dist[node] = d
        for nxt, w in graph[node]:
            if nxt not in dist:
                heapq.heappush(heap, (d + w, nxt))
    return max(dist.values()) if len(dist) == n else -1
```

Dijkstra needs **non-negative** weights.

## Pattern 4: Topological sort and cycles (Course Schedule, LeetCode 207)

Can you take every course, given the prerequisites? Only if the dependency graph has no cycle. Use DFS with
two sets: `visiting` (on the current path) and `visited` (fully done). Reaching a node that is still
`visiting` means you went in a circle. You can start the DFS from any node.
([session clip at 94:08](https://www.youtube.com/watch?v=ZEHgJ_OSWXM&t=5648s))

```python
from collections import defaultdict

def canFinish(numCourses, prerequisites):
    graph = defaultdict(list)
    for course, pre in prerequisites:
        graph[pre].append(course)
    visiting, visited = set(), set()
    def has_cycle(node):
        if node in visiting:
            return True              # back edge: we are inside this path
        if node in visited:
            return False
        visiting.add(node)
        if any(has_cycle(nxt) for nxt in graph[node]):
            return True
        visiting.remove(node)
        visited.add(node)
        return False
    return not any(has_cycle(c) for c in range(numCourses))
```

To get the actual order (Course Schedule II, LeetCode 210), append each node to a list when it moves to
`visited`, then reverse the list.

## Pattern 5: Counting paths, and the visited-set trap

To count all paths from `src` to `dst` in a DAG, do **not** skip nodes you have visited before. A node can
lie on many different paths, and skipping it loses them. Instead, remember the answer for each node (memo).
([session clip at 59:27](https://www.youtube.com/watch?v=ZEHgJ_OSWXM&t=3567s))

```python
from collections import defaultdict

def countPaths(n, edges, src, dst):
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
    memo = {}
    def ways(node):
        if node == dst:
            return 1
        if node not in memo:
            memo[node] = sum(ways(nxt) for nxt in graph[node])
        return memo[node]
    return ways(src)
```

All five solutions were checked against brute force on thousands of random inputs.

## Practice problems

| Problem | Tool |
|---|---|
| Number of Islands (200) | DFS or BFS |
| Clone Graph (133) | DFS with a map |
| Rotting Oranges (994) | BFS from many starts |
| Shortest Path in Binary Matrix (1091) | BFS |
| Network Delay Time (743) | Dijkstra |
| Course Schedule (207) | Cycle check |
| Course Schedule II (210) | Topological sort |
| All Paths From Source to Target (797) | DFS on a DAG |

## Video walkthrough

**Graphs for interviews: representations, BFS mazes, counting paths, topological sort (SDE Skills session)**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/ZEHgJ_OSWXM" title="Graphs - SDE Skills algorithm session" loading="lazy" allowfullscreen></iframe>
</div>

## Practice with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free daily LeetCode practice on Zoom. See the
[schedule]({{ '/programs' | relative_url }}) and the
[free DSA practice sheet]({{ '/guides/dsa-practice-sheet' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
</p>
