---
layout: page
title: "Design a URL Shortener (and Pastebin): System Design Interview Guide"
description: A step-by-step URL shortener system design for interviews, from requirements and estimation to key generation, storage and caching, with tested base62 code and two free mock interview recordings from SDE Skills.
background: '/img/bg-presenters.jpg'
permalink: /guides/url-shortener-system-design
---
{% include join-cta.html %}

"Design a URL shortener" (TinyURL, bit.ly) is often the first system design question people get. It looks
simple, which is the trap: the interviewer wants to see how you scope it, size it and make key generation
safe at scale. Pastebin is the same design with text instead of links.

## 1. Requirements

**Functional**

- Given a long URL, return a short one (for example `https://short.example/aZ3k9Qx`).
- Visiting the short URL redirects to the long one.
- Optional: custom alias, expiry time, click counts.

**Non-functional**

- Redirects must be fast (they are on every click).
- Highly available: a dead link is a broken promise.
- Short links must never collide or be guessable in order.

For Pastebin the list is almost the same: text only, a unique URL, configurable expiry, an optional custom
alias, and no data loss.
([session clip at 2:16](https://www.youtube.com/watch?v=a2UEfsGzNUw&t=136s))

## 2. Estimate the scale

Pick round numbers and say them out loud. Say 100 million new links a day and 10 reads for every write.

| What | Math | Result |
|---|---|---|
| Writes per second | 100M / 86,400 | about 1,200 |
| Reads per second | 10 x writes | about 12,000 |
| Links in 5 years | 100M x 365 x 5 | about 183 billion |
| Storage (500 bytes each) | 183B x 500 B | about 90 TB |

Two things follow: the system is **read-heavy**, so caching matters, and we need a key space well over
183 billion. Seven base62 characters give 62^7, about 3.5 trillion keys, which is plenty.
See [back-of-the-envelope estimation]({{ '/guides/back-of-the-envelope-estimation' | relative_url }}) for
the method.

A good interviewer may push back on "users": a script can be a user, and traffic can grow 10x a week, so
straight-line guesses break. Size for the workload, not the head count.
([session clip at 5:01](https://www.youtube.com/watch?v=IfzTeMtgk7s&t=301s))

## 3. API

```
POST /links        {"long_url": "...", "alias": "optional", "expires_at": "optional"}  -> {"short": "aZ3k9Qx"}
GET  /{short}      -> 301 or 302 redirect to the long URL
```

Use **302** if you want to count every click (the browser asks you each time). Use **301** if you want the
fewest requests (browsers cache it).

## 4. Generating the short key

This is the heart of the question. Three common options:

1. **Hash the long URL** (MD5, take 7 characters). Simple, but two URLs can collide, so you must check and retry.
2. **Counter + base62.** A unique number per link, written in base62. No collisions, but a single counter is a
   bottleneck and makes links guessable in order.
3. **Pre-generated keys.** A separate key service creates random keys ahead of time and hands them out in
   batches. No collisions and no work on the write path. Give the key service its own replicas so it is not a
   single point of failure.
   ([session clip at 36:00](https://www.youtube.com/watch?v=a2UEfsGzNUw&t=2160s))

Base62 turns a number into a short string:

```python
ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n: int) -> str:
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, r = divmod(n, 62)
        out.append(ALPHABET[r])
    return "".join(reversed(out))

def decode(s: str) -> int:
    n = 0
    for ch in s:
        n = n * 62 + ALPHABET.index(ch)
    return n
```

(Checked on 100,000 random numbers: `decode(encode(n)) == n` every time.)

Avoid locks to hand out unique IDs; in a distributed system they slow everything down. Instead, give each
app server its own range of IDs, or stream pre-made keys through a queue such as Kafka.
([session clip at 44:58](https://www.youtube.com/watch?v=IfzTeMtgk7s&t=2698s))

## 5. Storage

The data is simple: short key, long URL, created time, expiry, owner. A key-value or wide-column store
(DynamoDB, Cassandra) fits well because every read is a lookup by key.

If you also need "has this long URL been shortened before?", don't add a secondary index. Keep a **second
table keyed by the long URL**, one table per lookup direction.
([session clip at 36:42](https://www.youtube.com/watch?v=IfzTeMtgk7s&t=2202s))

## 6. Make reads fast

- Put a cache (Redis) in front of the database; a small set of popular links gets most clicks.
- Use a CDN or edge redirects for the hottest links.
- Shard the database by the short key so load spreads evenly.

## 7. Wrap up

Mention what you would add with more time: rate limiting on link creation (see
[how to design a rate limiter]({{ '/guides/rate-limiter-system-design' | relative_url }})), a cleanup job for
expired links, abuse and malware checks, and click analytics written asynchronously so redirects stay fast.

## Watch two mock interviews

**Design Pastebin: requirements, estimation and pre-generated keys**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/a2UEfsGzNUw" title="System Design Mock Interview - Design Pastebin" loading="lazy" allowfullscreen></iframe>
</div>

**Design a URL shortener: scaling, Kafka key generation and Cassandra modeling (advanced)**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/IfzTeMtgk7s" title="System Design Mock Interview - Design URL Shortener" loading="lazy" allowfullscreen></iframe>
</div>

## Practice system design with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free weekly system design sessions and mock interviews
on Zoom. See the [schedule]({{ '/programs' | relative_url }}) or read
[how to prepare for a system design interview]({{ '/guides/system-design-interview-prep' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
</p>
