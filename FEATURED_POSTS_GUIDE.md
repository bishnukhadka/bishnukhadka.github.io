# Featured Posts Configuration Guide

## How to Mark Posts as Featured

To mark any blog post as featured, simply add `featured: true` to the front matter:

```yaml
---
title: "Your Post Title"
date: 2025-01-01
featured: true
summary: "A brief description of your post content that will appear in the blog archive."
category: 
    - Your Category
tags:
    - your tags
---
```

## Adding Post Summaries for Better Display

### Method 1: Summary Field (Recommended)
Add a `summary` field to your front matter for a user-friendly approach:

```yaml
---
title: "Your Post Title"
summary: "This description will appear in the blog archive, making it easy for readers to understand what your post is about."
---
```

### Method 2: Excerpt Field (Technical - Backward Compatibility)
You can still use the traditional `excerpt` field:

```yaml
---
title: "Your Post Title"
excerpt: "Technical excerpt field for Jekyll compatibility."
---
```

### Method 3: Excerpt Separator (Advanced)
Use the excerpt separator `\n\n` (two blank lines) in your content:

```markdown
---
title: "Your Post Title"
---

This is your summary content that will appear in the archive.


This content appears after the separator and won't show in the archive.
```

## Why "Summary" Instead of "Excerpt"?

- **User-friendly**: "Summary" is more intuitive for content creators
- **Clear purpose**: Everyone understands what a summary should contain  
- **Better UX**: More descriptive field name for non-technical users
- **Backward compatible**: Still supports the traditional "excerpt" field

## Configuration Options

In `_config.yml`, you can control the featured posts behavior:

```yaml
# Featured Posts Settings
featured_posts:
  enabled                : true     # enable/disable featured posts section
  count                  : 3        # number of featured posts to show
  show_on_archive        : true     # show featured section on blog archive page

# Excerpt Settings
read_more                : "enabled" # enables "Read more" links
show_excerpts            : true      # ensures excerpts are processed
excerpt_separator        : "\n\n"   # double newline separator
```

### Options Explained:

- **enabled**: Set to `false` to completely disable featured posts
- **count**: How many featured posts to show in the featured section (default: 3)
- **show_on_archive**: Whether to show the featured section on the blog archive page
- **read_more**: Set to "enabled" to show "Read more" links on summaries
- **show_excerpts**: Ensures Jekyll processes summaries properly

## Visual Indicators

Featured posts are subtly marked with:
- ⭐ A small star icon next to the title
- Special highlighting in the featured posts section
- Gentle background styling in the featured section

## GitHub Pages Compatibility

The system includes multiple fallbacks for reliability:
- **Primary**: Uses `summary` field (user-friendly)
- **Secondary**: Falls back to `excerpt` field (backward compatibility)
- **Tertiary**: Automatic content truncation if no summary is found
- Enhanced processing for consistent display across platforms

## Summary Writing Tips

**Good Summary Examples:**
```yaml
summary: "Learn how to implement TabR, a retrieval-augmented model for tabular data that improves prediction accuracy."

summary: "My key takeaways from Stanford Business School's MBA program condensed into actionable business strategies."

summary: "A comprehensive guide to hyperparameter tuning using Optuna, with practical examples and best practices."
```

**What Makes a Good Summary:**
- ✅ 15-25 words ideal length
- ✅ Describes what the reader will learn
- ✅ Uses active, engaging language
- ✅ Includes key topics/benefits
- ❌ Avoid technical jargon
- ❌ Don't make it too long
- ❌ Don't be vague or generic

## Current Featured Posts

The following posts are currently marked as featured:
1. TabR (Tabular DL)
2. Stanford Business School Notes (Business)
3. GPTopic (Topic Modeling)

## Troubleshooting

If posts show full content instead of summaries on GitHub Pages:

1. **Add explicit summaries** to your post front matter using the `summary` field
2. **Check your _config.yml** has `read_more: "enabled"`
3. **Verify excerpt_separator** is set to `"\n\n"`
4. **Use the summary field method** rather than relying on separators

## Quick Reference

**New Post Template:**
```yaml
---
title: "Your Amazing Post Title"
date: 2025-01-01
featured: false  # Set to true for featured posts
summary: "Brief, engaging description of what readers will learn from this post."
category: 
    - Your Category
tags:
    - relevant, tags, here
---

Your post content starts here...
```
