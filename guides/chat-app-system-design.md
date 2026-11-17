---
layout: page
title: "Design a Chat App Like WhatsApp: System Design Interview Guide"
description: A step-by-step chat app system design for interviews (WhatsApp, Messenger), covering estimation, WebSockets, message ordering, sharding and offline delivery, with tested Python code and two free mock interview recordings.
background: '/img/bg-presenters.jpg'
permalink: /guides/chat-app-system-design
---
{% include join-cta.html %}

{% include top-video.html id="VCrRULNz15M" start=2288 title="Design a Chat App Like WhatsApp: System Design Interview Guide" %}

"Design WhatsApp" (or Messenger, or Slack) is one of the most common system design questions. The core is
small: send a message, deliver it fast, keep it in order, and don't lose it when someone is offline. What the
interviewer is really testing is how you handle real-time connections and ordering at scale.

## 1. Start small

No messenger launched with a billion users. Begin with 1:1 chat, get it right, and make the design easy to
extend to groups, media and read receipts later.
([session clip at 8:28](https://www.youtube.com/watch?v=9GhPVOowP7A&t=508s))

**Functional**

- Send and receive 1:1 messages in real time.
- Deliver messages sent while the receiver was offline.
- Show message history in the right order.
- Later: group chats, read receipts, media, online status.

**Non-functional**

- Low latency (a message should arrive in well under a second).
- Never lose a message once the server accepted it.
- Highly available; consistent order within a conversation.

## 2. Estimate the scale

| What | Math | Result |
|---|---|---|
| Daily active users | given | 500 million |
| Messages per day | 500M x 30 | about 15 billion |
| Messages per second | 15B / 86,400 | about 175,000 (plan for peaks of 2-3x) |
| Storage per day | 15B x 100 bytes | about 1.5 TB |

([session clip at 4:30](https://www.youtube.com/watch?v=VCrRULNz15M&t=270s))
Storage grows by about half a petabyte a year, so plan for partitioning from day one. See
[back-of-the-envelope estimation]({{ '/guides/back-of-the-envelope-estimation' | relative_url }}) for the method.

## 3. Real-time delivery needs a persistent connection

Polling every few seconds wastes battery and adds delay. Keep a **WebSocket** open between each online
device and a chat server. Push notifications (APNs, FCM) only wake the app; they are not a reliable delivery
channel for the message itself.
([session clip at 47:08](https://www.youtube.com/watch?v=9GhPVOowP7A&t=2828s))

Each chat server holds many open sockets, and operating-system limits (like file descriptors) cap how many.
One mock interview tells a real outage story where that limit capped socket counts, so mention it.
([session clip at 1:15:15](https://www.youtube.com/watch?v=VCrRULNz15M&t=4515s))
Keep a small **session service** (user to chat-server mapping) so any server can find where the receiver
is connected.

## 4. Message flow

1. Alice's device sends the message over its WebSocket to chat server A.
2. Server A assigns the next sequence number for that conversation and writes the message to storage.
3. Server A looks up Bob in the session service. If Bob is online on server B, it forwards the message there
   and B pushes it down Bob's socket. If Bob is offline, it sends a push notification.
4. Bob's device acknowledges the highest sequence number it has. When Bob reconnects, his device asks for
   everything after that number.

## 5. Ordering: the server decides, not the client clock

Phone clocks drift, so client timestamps can't give a reliable global order. Let the server assign a
**sequence number per conversation**. You only need order inside a conversation, not across all of them,
which keeps it cheap. Also be ready to defend your storage choice instead of reaching for "just use NoSQL".
([session clip at 1:27:44](https://www.youtube.com/watch?v=9GhPVOowP7A&t=5264s))

Here is the core logic, in memory, small enough to explain on a whiteboard:

```python
from collections import defaultdict


class ChatServer:
    """Orders messages per conversation and holds them until each device acks."""

    def __init__(self):
        self.seq = defaultdict(int)          # conversation_id -> last sequence number
        self.log = defaultdict(list)         # conversation_id -> [(seq, sender, text)]
        self.members = {}                    # conversation_id -> set of user ids
        self.acked = defaultdict(int)        # (user, conversation_id) -> last seq delivered
        self.online = {}                     # user -> callback for an open WebSocket

    def send(self, conv, sender, text):
        self.seq[conv] += 1                  # server assigns the order, not the client clock
        msg = (self.seq[conv], sender, text)
        self.log[conv].append(msg)
        for user in self.members[conv]:
            if user != sender and user in self.online:
                self.online[user](conv, msg)
        return msg[0]

    def ack(self, user, conv, seq):
        self.acked[(user, conv)] = max(self.acked[(user, conv)], seq)

    def sync(self, user, conv):
        """Called on reconnect: everything after the last acked sequence number."""
        last = self.acked[(user, conv)]
        return [m for m in self.log[conv] if m[0] > last]


if __name__ == "__main__":
    s = ChatServer()
    s.members["c1"] = {"alice", "bob"}
    got = []
    s.online["bob"] = lambda conv, m: got.append(m)
    s.send("c1", "alice", "hi")
```

(Tested: offline messages come back in order after reconnect, nothing is delivered twice after an ack, and
1,000 messages from three senders in one group keep sequence numbers 1 to 1,000.)

## 6. Storage and sharding

Messages are written once and read mostly by conversation, newest first. A wide-column store (Cassandra,
HBase) keyed by conversation ID and sequence number fits that access pattern.

Shard by **conversation ID, not user ID**. Sharding by user means every 1:1 message is stored twice (once for
each person); sharding by conversation stores it once and keeps the whole conversation on one shard.
([session clip at 38:08](https://www.youtube.com/watch?v=VCrRULNz15M&t=2288s))

## 7. Wrap up

With time left, mention: group chats (fan out to members; cap very large groups), read receipts (just
another small message type), media (upload to blob storage, send a link), end-to-end encryption, rate
limiting (see [how to design a rate limiter]({{ '/guides/rate-limiter-system-design' | relative_url }})) and
presence (online status) with heartbeats.

## Watch two mock interviews

**Chat messenger mock interview: sharding by conversation, WebSocket limits**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/VCrRULNz15M" title="SDE Skills Mock Interviews - Chat Messenger" loading="lazy" allowfullscreen></iframe>
</div>

**Facebook Messenger / WhatsApp deep dive: WebSockets vs push, SQL vs NoSQL, ordering**

<div class="embed-responsive embed-responsive-16by9 mb-3">
  <iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/9GhPVOowP7A" title="System Design Session - Facebook messenger / WhatsApp / Snapchat" loading="lazy" allowfullscreen></iframe>
</div>

## Practice system design with others, free

SDE Skills is a volunteer-run 501(c)(3) nonprofit with free weekly system design sessions and mock interviews
on Zoom. See the [schedule]({{ '/programs' | relative_url }}) or read
[how to prepare for a system design interview]({{ '/guides/system-design-interview-prep' | relative_url }}).

<p>
  <a class="btn btn-primary mt-2" href="https://www.sdeskills.com/discord">Join our free Discord</a>
  <a class="btn btn-outline-primary mt-2" href="https://www.sdeskills.com/zoom">Join a session on Zoom</a>
</p>
