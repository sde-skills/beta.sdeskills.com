---
layout: page
title: "Back-of-the-Envelope Estimation in System Design Interviews"
description: How to do back-of-the-envelope estimation in a system design interview in about five minutes - the numbers to memorize, a worked example, and what interviewers actually want from it, with clips from SDE Skills mock interviews.
background: '/img/bg-presenters.jpg'
permalink: /guides/back-of-the-envelope-estimation
---
{% include join-cta.html %}

Most system design interviews include a few minutes of "capacity estimation": how many users, requests per
second, how much storage. Candidates often lose time here. In SDE Skills mock interview feedback the advice is
consistent: **do it fast, use round numbers, and use the result to make a decision.**

## Why you estimate at all

Estimation is not the deliverable. It exists to pick a direction: is the system read-heavy or write-heavy? Does
the data fit on one machine? Do you need a cache? Once the numbers answer that, move on.
([feedback at 77:20](https://www.youtube.com/watch?v=a7p0bVqYNZ8&t=4640s))

## Timebox it to about 5 minutes

Say up front: "Let me do a quick estimate so we know the scale, and I can revisit it later." Then stop after
about five minutes. ([60:50](https://www.youtube.com/watch?v=a2UEfsGzNUw&t=3650s))

## Numbers worth memorizing

| Fact | Round value |
|---|---|
| Seconds in a day | 86,400, round to **~1e5** |
| 2^10 | 1,024, round to **~1e3** (so 2^20 ~ 1e6, 2^30 ~ 1e9) |
| 1 million requests/day | ~**12 per second** (1e6 / 1e5 = 10, round up) |
| 1 KB x 1 million | **1 GB** |
| 1 KB x 1 billion | **1 TB** |
| Peak traffic | usually **2x to 3x** the average |

Write everything in scientific notation (1e6, 1e9) so you never miscount zeros, and round in the safe direction.
([66:26](https://www.youtube.com/watch?v=xPWaYNhxj5Q&t=3986s),
[97:10](https://www.youtube.com/watch?v=uuN4Xh2eNrI&t=5830s))

## Worked example: a URL shortener

Assume 100 million new short links per month and a 100:1 read-to-write ratio.

1. **Writes:** 1e8 per month / (30 x 1e5 seconds) ~ 1e8 / 3e6 ~ **40 writes per second**, peak ~100.
2. **Reads:** 100x writes ~ **4,000 reads per second**, peak ~10,000. Clearly read-heavy, so plan a cache.
3. **Storage:** ~500 bytes per link x 1e8 per month ~ 5e10 bytes = **50 GB per month**, ~6 TB over 10 years.
   Fits on a handful of database nodes; sharding can come later.

That took three lines of arithmetic and gave two design decisions: add a cache, and storage is not the hard part.

## Common mistakes

- **Precision over speed.** Exact math wastes time; one reviewer told a candidate the calculations had been made
  more complex instead of easier. ([56:20](https://www.youtube.com/watch?v=a2UEfsGzNUw&t=3380s))
- **Not using the result.** If the numbers do not change your design, say what they rule out and move on.
- **Inventing scale silently.** Agree the assumptions (users, ratio, object size) with the interviewer first.

## Watch it in a mock interview

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/xPWaYNhxj5Q?start=3986" title="System design mock interview - estimation" loading="lazy" allowfullscreen></iframe>
</div>

## Practice with other engineers, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free weekly system design sessions on Zoom. See the
[schedule]({{ '/programs' | relative_url }}),
[How to Prepare for a System Design Interview]({{ '/guides/system-design-interview-prep' | relative_url }}) and
[What System Design Interviewers Look For]({{ '/guides/what-system-design-interviewers-look-for' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
</p>
