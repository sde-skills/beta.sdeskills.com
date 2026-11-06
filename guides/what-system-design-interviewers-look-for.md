---
layout: page
title: "What System Design Interviewers Look For: Lessons From Real Mock Interviews"
description: Five things system design interviewers actually evaluate, drawn from feedback in recorded SDE Skills mock interviews, with the moments linked so you can watch them.
background: '/img/bg-presenters.jpg'
permalink: /guides/what-system-design-interviewers-look-for
---
{% include join-cta.html %}

SDE Skills volunteers have run and recorded many system design mock interviews, each followed by an open
feedback round. The same handful of points come up again and again. Here they are, with links to the exact
moments in the recordings.

## 1. Scope the problem on purpose

Strong candidates narrow the problem early and say their assumptions out loud: one user's devices only, a few
cities instead of the whole world, one sport instead of every sport. A smaller, clearly stated problem leaves
time to go deep. ([example at 3:25](https://www.youtube.com/watch?v=JJZMhz59yz8&t=205s),
[another at 1:47](https://www.youtube.com/watch?v=3yQMEWpl8o4&t=107s))

## 2. Watch the clock

In one feedback round the reviewer timed the interview: about 8 minutes on estimation, 13 minutes before
reaching the core problem, and 43 minutes before any discussion of scale. That left almost no time for the part
that matters most. A rough budget for a 45 to 60 minute round:

| Phase | Time |
|---|---|
| Requirements and scope | 5 min |
| Rough estimates (only what changes the design) | 3 to 5 min |
| High-level design | 10 to 15 min |
| Deep dive on the hardest part | 15 to 20 min |
| Scale, failures, wrap-up | 5 to 10 min |

([the pacing feedback at 62:24](https://www.youtube.com/watch?v=a7p0bVqYNZ8&t=3744s))

## 3. Keep it a conversation, then tie it back

Aim to talk around 60% of the time and leave room for the interviewer to steer. Before time runs out, walk the
final design back through the original requirements so the interviewer sees every one covered.
([feedback at 53:49](https://www.youtube.com/watch?v=3yQMEWpl8o4&t=3229s))

## 4. Justify every box

Interviewers ask "why is this here?" about each component. Extra queues, caches and services that are not
needed count against you. In one session a candidate's own verdict on their rate limiter design was that they had
over-complicated a simple problem. ([63:04](https://www.youtube.com/watch?v=JJZMhz59yz8&t=3784s),
[42:23](https://www.youtube.com/watch?v=XqQztcVWtjM&t=2543s)) See our
[rate limiter guide]({{ '/guides/rate-limiter-system-design' | relative_url }}) for a right-sized answer.

## 5. Be genuine

It should feel like two engineers discussing a design. If you already know a question, say so rather than
pretending to work it out from scratch; interviewers notice.
([64:16](https://www.youtube.com/watch?v=xPWaYNhxj5Q&t=3856s))

## Watch the feedback rounds

**Pacing and structure feedback**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/a7p0bVqYNZ8?start=3744" title="System design mock interview feedback - pacing" loading="lazy" allowfullscreen></iframe>
</div>

**Talk ratio and mapping back to requirements**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/3yQMEWpl8o4?start=3229" title="System design mock interview feedback - wrap-up" loading="lazy" allowfullscreen></iframe>
</div>

## Get this kind of feedback yourself, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit. Join a free weekly system design session on Zoom, or ask in
our Discord to pair up for a mock interview. See the [schedule]({{ '/programs' | relative_url }}) and
[How to Prepare for a System Design Interview]({{ '/guides/system-design-interview-prep' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
</p>
