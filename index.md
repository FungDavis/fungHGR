---
layout: page
description: "Building a historical gazetteer of Russia"
lang: en
---

Connecting the Past to the Present
==================================
The Historical Gazetteer of Russia project explores best practices for extracting information from historical texts and presenting that information in a useful way.  
  
For a general overview of the project, check out our [About]({{ site.baseurl }}pg01.html) page. If you want to jump right in to either [Geocoding]({{ site.baseurl }}pg02.html) or [Text Processing]({{ site.baseurl }}pg03.html), then check out those pages. If you really want to get into the nuts and bolts of the project, then go ahead and [fork us on GitHub](https://github.com/jaguillette/fungHGR). Don't forget to go to our [Team]({{ site.baseurl }}pg04.html) page to see the people who brought this project to fruition.

<!-- Paginator code, saving for a rainy day full of blog posts.
{% for post in paginator.posts %}
<div class="post-preview">
    <a href="{{ post.url | prepend: site.baseurl }}">
        <h2 class="post-title">            {{ post.title }}
        </h2>
        {% if post.subtitle %}
        <h3 class="post-subtitle">
            {{ post.subtitle }}
        </h3>
        {% endif %}
    </a>
    <p class="post-meta">Posted by {% if post.author %}{{ post.author }}{% else %}{{ site.title }}{% endif %} on {{ post.date | date: "%B %-d, %Y" }}</p>
</div>
<hr>
{% endfor %}
-->
<!-- Pager -->
<!--
{% if paginator.total_pages > 1 %}
<ul class="pager">
    {% if paginator.previous_page %}
    <li class="previous">
        <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&larr; Newer Posts</a>
    </li>
    {% endif %}
    {% if paginator.next_page %}
    <li class="next">
        <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Older Posts &rarr;</a>
    </li>
    {% endif %}
</ul>
{% endif %}
-->
