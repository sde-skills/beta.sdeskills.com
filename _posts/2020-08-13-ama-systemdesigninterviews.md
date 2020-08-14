---
layout: post
title: "Insights into System Design Interview Preparation and Hiring Process"
subtitle: "Notes from AMA (Ask Me Anything) session "
date: 2020-08-13 10:45:13 -0700
background: '/img/posts/2019/11/patrons.jpg'
author: Dippy Aggarwal
---
Here’s a post summarizing the key points from a AMA (Ask Me Anything) session that was conducted on SDE Skills forum in 2020. The session invited questions related to the system design interview process and was led by Vivekanand Kirubanandan, who comes with 15+ years of software development, and has been a former Amazon Bar Raiser with ~600+ interviews.

If you have questions around the overall software engineering interviews (that includes questions around levels of hiring at different companies, coding practice etc.), please refer to the the post [here][7].

##### Could you please throw some light on the parameters that one should consider for designing a system to start with?

Here is how you can reason about the considerations to designing a system. Let us define what is a system - a set of things working together as parts of a mechanism or an interconnecting network. So how will you go about designing a system? First step is to understand what the "different" components are and how they interact with each other. The roles and responsibilities of each component, and the expectation/dependency that each component has with each other.

##### What are the things that are being tested by an interviewer while taking a system design interview?

During the interview process, I tend to split the interview into four "phases". Requirements Clarification, Problem Solving, Implementation and System Verification. During each phase, this is what I look for (and I suspect most interviewers do something similar). The fundamental question I am trying to get an answer for: Can you, the candidate, design a system that meets a requirement that we may have?

Here are some of the check-boxes I need you to tick to be successful.

1. Can you clarify ambiguous requirements?
2. Do you know enough "concepts" to be able to break down the problem into smaller problems?
3. Can you solve the smaller problems using common tools?
4. Can the candidate catch obvious issues in their design?

##### Could you talk about the difference in expectations for system design for mid-level and senior job roles?

The fun part (as an interviewer) is that there is no difference in the question that I/we ask between the level of the candidate. What is different is the responses.

System design cannot be "learnt" from text books that easily. Junior engineers typically have this sort of text-book knowledge. Sr Engineers typically have a wider gamut of experience.

##### How do the interviewers tell if the interviewee's response is from textbooks or from his past experience?

It is quite easy to distinguish. As long as you are not pretending, it is not bad. This is similar to how you can talk about visiting a specific city. Say you have never been to Paris.
a. you can either read about it and pretend to have visited it.
b. talk to someone who has visited that city and then "inherit the knowledge".
c. talk about another city with similar properties.

These are okay, but nothing beats real experience.

##### What is the best way to get some experience building distributed systems? Follow a course like Distributed systems by MIT that involves reading papers and doing some golang assignments (building chord, etc) or building up a project in our spare time?

There is no replacement for real-life experience. In the absence of that, I would recommend the following resources.

1. Gang of Four book (there is a PDF that lists non-software examples of common design patterns)
2. Designing Data Intensive Applications - Martin Kleppmann.
Side note: At SDE Skills, we run a book club as well where we are currently (August 2020) going through this book as a group. If you are interested in attending, we encourage you to join our SDE skills Discord server and join the book-club channel. 

Reading papers are useful only if you are already at a specific level.

##### What if getting real life experience is not possible in the current role? Can we do something from outside our work to help get such an experience?

You have to go through the motions of designing it. Even if you do not have such possibilities, try to acquire this knowledge second hand (talking to people, and discussing their designs for their problems).

##### I have heard it is better to design the system from inside out as against top to bottom with bottom being the low level details. Which is better?

Design Fractally! Start with super high level, and iteratively refine each segment. This is good, because your design always works all the time. With more time, you are just refining each section and are making your design more robust. You also let your interviewer dive into areas he/she is interested in.

##### Is there any video on youtube that you like and think is the most right way to approach a system design interview?

>> I am super partial. Here is a list i often share.

* <https://github.com/shashank88/system_design> 
* <https://www.educative.io/collection/5668639101419520/5649050225344512> - dont have to buy, just look at the free content.
* <https://www.youtube.com/watch?v=grGqCuTcu50> - Data Intensive Applications with Martin Kleppmann
* <https://www.youtube.com/watch?v=qI8vjyiwmDU> - What to cover in System Design (Vivek K)
* <https://www.youtube.com/watch?v=nQvnF6cW_UA> - Design a Carpool Buddy System (Vivek K)
* <https://www.youtube.com/watch?v=_8KLd5HSdB0> - OO Design for Chat Server
* <https://www.youtube.com/watch?v=1JThycZ16Zo> - OO Design for Blackjack game
* <https://www.youtube.com/watch?v=kE8Qro40_V4> - Full version of (d) - includes other items.

##### Any Ideas/suggestions/tips for performing well in system design interviews virtually, given that onsite interviews are going to be virtual in coming months

Ask the recruiter to provide a better system design collaboration tool like - <https://sketchboard.me/home>. Tools like google drawing won't be great.

Nothing works then just share your screen. And have some tools where you have practice a lot. It could be draw.io.

##### In one interview, Interviewer gave me a scenario of designing the timeline. Did my part of requirement, estimation, high level design. But then in the feedback I got to know the interviewer was more interested in product design and I did system design.

You may not have spent enough time on requirement clarification? Empathise with the customers?

##### How important is to calculate the metrics like QPS, Bandwidth, Latency, total space etc required? Do we always design only after taking the above metrics into consideration? For example the QPS deciding if we should go with SQL or NOSQL?

Not super relevant for junior engineers, but extremely relevant for senior roles.

##### How does interviewer evaluate in system design interview between 2 candidates: if one candidate is providing multiple solutions with tradeoff's vs. another candidate providing single best solution to an system design question? is it always good to list multiple approaches if we know them?

Great question! There are no "single best solutions" for any question. I prefer the trade-off based solutions.

##### What if I was asked a question to which I had no idea how to design, for example, returning the top 10 posts based on the views count in the least time, how would I proceed then

How do you solve questions that you do not know answers to? The idea is to come up with a generic problem solving framework that you can use to arrive at a solution with interviewers help.

##### Should the back of the hand calculations be done in starting or we should not be doing them until and unless the interviewer asks it?

Calculation needs to be done at three parts.
a. during requirements gathering: high level calculations
b. during implementation: more detailed QPS, find system chokepoints etc.
c. during verification phase: wil your system design work?

##### How important is it to read engineering blogs? I feel these blogs usually don’t present how and why choose a particular design and how they moved.

You need to be at a specific skill level before this is useful!

##### Pointers on sample design scenarios

* Design a search service that allows searching all the rental listings.

Start from use-case. What are the ways the user can do a search? Do we need search by location, number of rooms, price, search matching the description, do we have search based on distance criteria like 100 miles within SF or Seattle.
Thoughts around data structure - if the user is more interested in houses by number of rooms, or price, or a combination of many such criterias. This might help us decide how we might want to structure the data. 
For questions around load balancers, replication - think about what questions do you need to ask to get to this decision?

* Design a system that will control a moon orbiter mission.

1) Is it a telemetry system?
2) Is it a command/control system?
3) How do you deal with low bandwidth, high latency networks between the control center and the module? The system should be able to provide acknowledgements and account for loss of acknowledgment.

* Design an ETA system for Uber. Similar question - “Design a system so that the rider and driver can share the location between each other”

Liked this post or have further questions? Check out and participate in our active sessions by joining our [discord server][4]. SDE Skills is a non-profit organization with the singular vision to bridge the gap between the skills job seekers possess and the skills that they need to succeed. We provide the resources and support necessary to maintain the sharpness of technical skills. it is founded by [Vivekanand Kirubanandan][1], and currently [co-organized by many leaders][5] along with [many volunteers][6] and thousands of active members across the globe.

[1]: https://www.linkedin.com/in/vkirub
[4]: https://sdeskills.com/discord
[5]: https://www.sdeskills.com/about
[6]: https://www.sdeskills.com/presenters
[7]: https://beta.sdeskills.com/2020/04/03/ama-sdeinterviews.html