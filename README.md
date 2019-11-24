# SDE Skills Website
We built the SDE Skills website using Jekyll - meant to be hosted via git-pages.


# Edit instructions
1. Most top level pages are at the home directory
  - `index.html` - Home page
  - `about.html` - About SDE Skills
  - `contact.html` - Contact Page
  - `presenters.html` - Generates list of all presenters (from /_data/presenters.yaml)
  - `privacy.html` - Privacy policy
  - `resources.html` - Books and resources
2. Layouts for these pages are defined at `_layouts`
3. Chapters are defined in `_chapters` folder. Consider updating front matter with chapter details.
```
---
layout: chapter
title: CHAPTER_NAME_TITLE
sortkey: n - Used for relative ordering of chapters
background: '/img/chapters/IMAGE.JPG'
name: CHAPTER_NAME
year: 2010
meetup-name: MEETUP NAME
meetup-link: MEETUP URL
slack-meetup: '#SLACK_CHANNEL_FOR_MEETUP_INFO'
slack-studygroup: '#SLACK_CHANNEL_FOR_STUDYGROUPS'
slack-elves: '#SLACK_CHANNEL_FOR_ELVES'
calendar: 'http://GOOGLE_CALENDAR_LINK_OF_MEETUP'

team:
- name: CHAPTER_TEAM_MEMBER
  pic: MEMBER.PIC
  position: MEMBER TITLE

- name: CHAPTER_TEAM_MEMBER
  pic: MEMBER.PIC
  position: MEMBER TITLE

- name: CHAPTER_TEAM_MEMBER
  pic: MEMBER.PIC
  position: MEMBER TITLE
---
```

4. Posts need to be created as a .md (or .html) file in the `_posts` folder.  For each post, update the front matter. Example:
```
---
layout: post
title: "Post Title"
subtitle: "This is the post subtitle."
date: YYYY-MM-DD HH:MM:SS
background: '/PATH_TO_IMAGE'
---
```



# Notes on the build
* This is based on [Start Bootstrap - Clean Blog Jekyll](https://startbootstrap.com/template-overviews/clean-blog-jekyll/) - Official Jekyll Version
* If you want to set this up

## Installation & Setup
```bash
$ mkdir git-repos
$ cd git-repos
$ git clone --branch gh-pages https://github.com/sde-skills/beta.sdeskills.com.git 

$ cd beta.sdeskills.com 

# follow steps in https://jekyllrb.com/tutorials/using-jekyll-with-bundler/ to set up jekyll

$ bundle exec jekyll serve
```