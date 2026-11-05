---
layout: page
title: Object-Oriented Design (Low-Level Design) Interview Prep
description: How to prepare for object-oriented design and low-level design (LLD) interviews, with a repeatable approach and free video walkthroughs of classic problems like Amazon Locker, Vending Machine and Meeting Scheduler.
background: '/img/bg-presenters.jpg'
permalink: /guides/object-oriented-design-interview
---
{% include join-cta.html %}

Object-oriented design (OOD) rounds, also called low-level design (LLD) rounds, ask you to model a small system
in code: classes, their responsibilities and how they interact. Unlike high-level system design, the focus is on
clean abstractions, not servers and databases.

## A repeatable approach

1. **Clarify the scope.** Which features are in? Who are the actors (customer, admin, delivery agent)?
2. **Identify the core objects.** Nouns in the requirements usually become classes (Locker, Package, Slot, Order).
3. **Assign responsibilities.** Each class should have one clear job. Keep data and the behavior that uses it together.
4. **Define relationships.** Composition vs inheritance, interfaces for things that vary (payment methods, sizes).
5. **Walk through a use case.** Trace one request end to end through your classes and adjust.
6. **Handle edge cases and extensibility.** Concurrency, invalid states, and how a new feature would fit.

Patterns that come up often: Strategy (swappable behavior), State (vending machines, elevators), Observer
(notifications), Factory (creating the right subtype) and Singleton (used sparingly).

## Watch classic OOD problems worked live

These are recordings from SDE Skills sessions, our most-watched object-oriented design videos.

**Amazon Locker** (16,000+ views)

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/b7riKazRJkU" title="Object Oriented Design - Amazon Locker Problem" loading="lazy" allowfullscreen></iframe>
</div>

**Vending Machine system design**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/hNUBgi-9CFY" title="Object Oriented Design - Vending Machine" loading="lazy" allowfullscreen></iframe>
</div>

**Meeting Scheduler**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/s-xXLD-Xo8s" title="Object Oriented Design - Meeting Scheduler" loading="lazy" allowfullscreen></iframe>
</div>

**Blackjack game**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/1pzcn3uNC6U" title="Object Oriented Design - Blackjack game" loading="lazy" allowfullscreen></iframe>
</div>

## More problems to practice

Parking lot system, elevator controller, library management, chess, ride sharing, rate limiter (as a class),
LRU cache, and a notification service. Try each with the 6-step approach above, then compare notes with others.

## Practice with other engineers, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free weekly design sessions and daily coding practice on
Zoom. See the [schedule]({{ '/programs' | relative_url }}) or read
[How to Prepare for a System Design Interview]({{ '/guides/system-design-interview-prep' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
</p>
