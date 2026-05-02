---
layout: default
title: Blog
---

# 📘 DevOps Blog

{% for post in site.posts %}
## [{{ post.title }}]({{ post.url }})

🗓 {{ post.date | date: "%b %d, %Y" }}

{{ post.excerpt }}

---
{% endfor %}