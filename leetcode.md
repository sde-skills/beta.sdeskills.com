---
layout: page
title: Leetcode Practice
description: Leetcode has become the most used repository of questions. 
background: '/img/bg-leetcode.jpg'
---

When we see aspiring engineers solve leetcode questions, I see them "grind" leetcode, as in, set aside a dedicated time slot and read question after question and solve them. This process is as dry and painful as it sounds. Learning typically is not a solo activity. It is very easy to get discouraged, or be put off by the tough questions. 

There are solutions and discussions, that often increase your anxiety levels. You are not alone, there are 100s of folks like you who are looking to learn and improve their skills. If you are at a location where you can form local study groups, do it. If you have access to a network that you can tap into to do a group study/solve session, do it.

If not! read along.

1. First join our [SDE Skills Slack group][sde-skills-slack]
2. Once you are there, join the #leetcode-practice channel
3. Each week, Our L33tbot shares 3 questions from leetcode.com from easy, medium and hard difficulty levels. You can solve them offline, or interactively with other leetcoders. Test your code against test cases in leetcode.

This channel has 800+ members who are interested in practicing. At any point of time you should fine a few folks who are solving intersting questions. 

Dont see anyone active, post a question to start the conversation and watch the buzz grow.

[![](/img/btn-add-to-slack.png)][sde-skills-slack]

## Current and Past Questions
{% for post in site.posts %}
{% if post.layout=="post-leetcode" %}
*  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a>
{% endif %}
{% endfor %}

Happy Leetcoding!



[sde-skills-slack]: https://www.sdeskills.com/slack