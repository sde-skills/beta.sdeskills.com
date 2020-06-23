---
layout: page
title: Discussions from book club
subtitle: Summary of the chapters from the book - Designing Data Intensive Applications
author: Dippy Aggarwal
---
Link to the book at Amazon(<https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321)>

This post summarizes major takeaways from the first chapter in the book. The book is a great read for anyone looking for general reference around building data intensive applications as well as someone preparing for interviews for system design.

Regardless of your motivation for following this book/our posts, we hope the summary presented here serves you well. The post is written and organized in a manner that facilitates food for thought by presenting questions before sharing the key takeaway and answers at the end of the post.
The first chapter highlights the key ideas around three non functional requirements of any application. These requirements include scalability, reliability, and maintainability. Let’s start with scalability.

### Scalability

Q1. Which of the following options address scalability?
a) Assessing the impact of increasing load on your application/system performance.
b) Assessing the amount and type of resources we need to add to handle additional load to ensure a certain, consistent performance
c) Both a and b.

Q2: In the definition above, what would be some examples to describe "load"?

Q3. What are some metrics for measuring scalability?

Q4. What statistical measures would you consider to highlight response time of your system? Assume that system is handling a variety of requests. Can you articulate pros and cons of each?
(a) Average response time, (b) percentiles?

Q5. What would 99.9th percentile imply? Can you think of a scenario where 99.9th percentile can be useful? 

Q6. How about the 99.99th percentile? The above scenario highlighted a use-case for focusing on 99.9th percentile? Can you think of some pros and cons of following the same principle for optimizing response time to 99.99th percentile?

Q7: Can you list some approaches for handling scalability (ensuring consistent performance even when load of the system has increased)?

Q8: Consider following two operations around twitter news feed feature:

* A user can publish a new message to their followers (4.6k requests/sec on average,over 12k requests/sec at peak).
* A user can view tweets posted by the people they follow (300k requests/sec).

Here are two sample ways of handling/implementing these operations. Which one would you prefer and why? 

1) Posting a tweet simply inserts the new tweet into a global collection of tweets. When a user requests their home timeline, look up all the people they follow,
find all the tweets for each of those users, and merge them (sorted by time).
2) Maintain a cache for each user’s home timeline—like a mailbox of tweets for each recipient user. When a user posts a tweet, look up all the people who follow that user, and insert the new tweet into each of their home timeline caches. The request to read the home timeline is then cheap, because its
result has been computed ahead of time.

### Reliability

The idea around reliability is centered around the idea that the even when things go wrong, the application/system handles it in a responsible (refer to #2 below) manner.
(1) the application provides expected results for a certain valid user call.
(2) in case of any errors (invalid input parameters for example), the application can respond/terminate gracefully without causing any inconsistencies in the system.
(3) the application prevents any unauthorised access.  

Q9. What are some application/system vulnerabilities around reliability?

Q10. What are some of the ways to address/ensure system reliability?

### Maintainability

Think around clean and clear code design, making the code easier to modify (evolvability), dashboards for monitoring system's health.

This concludes the summary for chapter 1. Feel free to post questions if you have any, in the comments section of this post. Here’s a link to another article that discusses scalability in real-world, large data systems including youtube, facebook, and amazon.
<http://highscalability.com/scalability-resources>

Check out and participate in our active sessions by joining our book club channel on [discord][4] server. SDE Skills is a non-profit organization with the singular vision to bridge the gap between the skills job seekers possess and the skills that they need to succeed. We provide the resources and support necessary to maintain the sharpness of technical skills. it is founded by [Vivekanand Kirubanandan][1], and currently [co-organized by many leaders][5] along with [many volunteers][6] and thousands of active members across the globe.

### Answers with explanations

Answer 1: The answer is (c) - both (a) and (b). When it comes to addressing scalability attributes, we need to consider both data scalability and resource scalability.  
(a) Assessing the impact of increasing load on your application/system performance -  This refers to data scalability (If your system executes a 1 TB workload in 1 hour, then keeping the system resources unchanged, what is the impact on performance? Is it 3x or worse?)
(b) Assessing the amount and type of resources we need to add to handle additional load to ensure a certain, consistent performance. This refers to resource scalability.

Answer 2: Some examples of “load parameters” in the context of scalability can be:
*1 GB -> 1 TB data scaling
*increase in number of requests per second
*increase in number of simultaneously active users
*increase in the hit rate of cache.

Answer 3: Here are some metrics for measuring scalability:

1) Throughput - rate at which jobs/transactions/records are processed by the system.
2) Response time: elapsed time between client sending a request and receiving a response. In other words, end-to-end elapsed time which includes queueing delays + server processing time + network time.
3) Resource usage: CPU/memory/IO used to execute a certain load.

Answer 4: The answer is (b)
When it comes to the statistical measures for reporting scalability of an application/system, percentiles tend to be a better metric compared to average time.

Average response time: A single number representing average can be biased towards certain response times. For example: first request taking 15 seconds, while two other requests each taking 1 second. average time will be heavily skewed.

Percentiles: Median is considered 50th percentile.If the median response time of your application is 100 ms, that means half of your requests return in less than 100 ms, and half of the requests take longer than that. It can help to capture the time users "typically" have to wait.  
Higher percentiles such as the 95th percentile can be useful to capture the outliers. For example: if the 95th percentile response time of your application is 1.5 seconds, that means 95 out of 100 requests take less than 1.5 seconds.

Answer 5: 99.9th percentile means 1 in 1000 requests.

Here’s one scenario where reporting 99.9th percentile is used: It is possible that the one request in 1000 that is running longer than the rest is coming from a customer with much more purchases than others (in other words, more data in his/her account). This can be a motivation for business to pay attention to handling/improving response time there. Amazon describes response time for its internal services in terms of 99.9th percentile.

Answer 6: 99.99th percentile means 1 in 10,000 requests.
While we discussed one real world use case of employing 99.9th percentile, the same reasoning is not applicable directly for 99.99th percentile. Optimizing the 99.99th percentile means focusing on the slowest 1 in 10,000 requests. Important to keep in mind the run-to-run variance and return on investment.

Answer 7: Here are a few examples of approaches to manage scalability: Scale-up vs. scale-out architectures, determining what type of resources to add to the system depends on traffic patterns (reads vs. write heavy for example).

Answer 8: Out of the two listed approaches, second approach is better for managing the operations of posting a tweet and reading the tweets posted by the people one follows.
First approach will soon encounter bottlenecks because of the load during read operation by multiple users.
Second approach ends up doing more work at the time of posting a tweet because tweet is pushed to each of the follower's timeline. But notice the number of write requests/sec vs. read requests (4.6k vs. 300k).
Thus, doing more work at write time to reap the banefit at read time is a valuable proposition.

While second approach is better than the first, can you identify a potential bottleneck in second approach as well?
> While the average number of postings is 4.6k/sec, but what would be the rate of posts as you consider average number of followers per user as well.
Assuming that each user has 75 followers, the average number of write operations become ~345K. How about varying distribution of number of followers for different users? Think of celebrities who may have millions of followers. What would be the number of writes for them using second approach?

One way to alleviate this challenge is to follow a hybrid approach based on users' follower's distribution. Tweets from celebrities that a user may follow are fetched using pull model and merged with users' timeline.

Answer 9: Here are a few examples highlighting causes of system failure in the context of reliability: hardware faults, bad input parameters at software level, one of the system's components stops responding, cascading failures (small fault in one component triggers a fault in another).

Answer 10: Here are a few ways of making ur system design/applications reliable:
RAID configuration for hardware faults, software fault-tolerant techniques such as deliberately introducing errors in the testing phase to verify system/application's ability of dealing with errors, modularized design, setting up dashboards/telemetry for monitoring.

[1]: https://www.linkedin.com/in/vkirub
[4]: http://sdeskills.com/discord
[5]: https://www.sdeskills.com/about
[6]: https://www.sdeskills.com/presenters