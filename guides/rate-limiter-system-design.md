---
layout: page
title: "How to Design a Rate Limiter: System Design Interview Guide"
description: Design a rate limiter for a system design interview. Token bucket, leaky bucket, fixed window and sliding window algorithms, distributed counters, and two free SDE Skills session recordings.
background: '/img/bg-presenters.jpg'
permalink: /guides/rate-limiter-system-design
---
{% include join-cta.html %}

"Design a rate limiter" is one of the most common system design interview questions. It is small enough to
finish in 45 minutes, but it touches algorithms, distributed state and latency trade-offs. This guide follows the
order that works well in an interview, with links into two recorded SDE Skills sessions where the problem is
worked live.

## 1. Clarify the requirements

- **Who is the client?** An end user, an API key, or another internal service.
- **What are the rules?** Usually configured per API, for example 10 requests per second per user.
- **What happens on rejection?** Typically HTTP 429 "Too Many Requests", sometimes with a retry-after header.
- **Non-functional needs:** highly available, and very low added latency, because the limiter sits in front of
  every request. ([session clip at 0:34](https://www.youtube.com/watch?v=XqQztcVWtjM&t=34s))

## 2. Pick an algorithm

| Algorithm | How it works | Trade-off |
|---|---|---|
| **Token bucket** | A bucket with fixed capacity refills at a preset rate. Each request takes a token; an empty bucket rejects. | Allows short bursts up to the capacity. Simple and widely used. |
| **Leaky bucket** | Requests enter a queue that is drained at a fixed rate. | Smooth output rate, but a poor fit for synchronous accept/reject HTTP calls. |
| **Fixed window counter** | Count requests per clock window (for example per minute). | Easy to code, but up to 2x the limit can pass at a window boundary. |
| **Sliding window log** | Store a timestamp per request and count those inside the window. | Exact, but memory grows with traffic. |
| **Sliding window counter** | Weighted average of the previous and current window counts. | Close to exact with tiny memory. A strong default answer. |

Walkthroughs of token bucket ([8:15](https://www.youtube.com/watch?v=YNYXzTUtpkU&t=495s)), the leaky bucket
trade-off ([34:34](https://www.youtube.com/watch?v=YNYXzTUtpkU&t=2074s)) and the fixed window boundary problem
([42:57](https://www.youtube.com/watch?v=YNYXzTUtpkU&t=2577s)) are in the session below.

## 3. Make it distributed

With many API hosts, per-host counters drift apart and the real limit becomes "limit x number of hosts".
Common fixes:

- Keep counters in a **shared low-latency store** (for example an in-memory cache cluster) and update them
  atomically.
- Shard counters by client key so no single node is hot.
- Accept small inaccuracy in exchange for speed: local counters that sync periodically are fine for many APIs.
- **Do not over-build.** Every network hop counts against the API's own latency budget, and interviewers notice
  extra components that are not justified. ([27:44](https://www.youtube.com/watch?v=XqQztcVWtjM&t=1664s),
  [36:49](https://www.youtube.com/watch?v=XqQztcVWtjM&t=2209s))

## 4. Wrap up

Mention monitoring (how many requests are rejected, per rule), how rules are configured and reloaded without a
deploy, and what happens if the limiter itself fails (fail open vs fail closed).

## Watch it worked live

**Rate limiter system design mock interview**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/XqQztcVWtjM" title="Rate limiter system design mock interview" loading="lazy" allowfullscreen></iframe>
</div>

**Rate limiting algorithms session**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/YNYXzTUtpkU" title="Rate limiter algorithms - SDE Skills session" loading="lazy" allowfullscreen></iframe>
</div>

## Practice system design with other engineers, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free weekly system design sessions on Zoom. See the
[schedule]({{ '/programs' | relative_url }}), or read
[How to Prepare for a System Design Interview]({{ '/guides/system-design-interview-prep' | relative_url }}) and
[Object-Oriented Design Interview Prep]({{ '/guides/object-oriented-design-interview' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
</p>
