# Featured Posts Configuration Guide

## How to Mark Posts as Featured

To mark any blog post as featured, simply add `featured: true` to the front matter:

```yaml
---
title: "Your Post Title"
date: 2025-01-01
featured: true
category: 
    - Your Category
tags:
    - your tags
---
```

## Configuration Options

In `_config.yml`, you can control the featured posts behavior:

```yaml
# Featured Posts Settings
featured_posts:
  enabled                : true     # enable/disable featured posts section
  count                  : 3        # number of featured posts to show
  show_on_archive        : true     # show featured section on blog archive page
```

### Options Explained:

- **enabled**: Set to `false` to completely disable featured posts
- **count**: How many featured posts to show in the featured section (default: 3)
- **show_on_archive**: Whether to show the featured section on the blog archive page

## Visual Indicators

Featured posts are subtly marked with:
- ⭐ A small star icon next to the title
- Special highlighting in the featured posts section
- Gentle background styling in the featured section

## Current Featured Posts

The following posts are currently marked as featured:
1. TabR (Tabular DL)
2. Stanford Business School Notes (Business)
3. GPTopic (Topic Modeling)
