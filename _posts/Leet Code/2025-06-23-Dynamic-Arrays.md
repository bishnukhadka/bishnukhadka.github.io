---
title: "Dynamic Arrays"
date: 2025-06-23
permalink: /post/2025/06/dynamic-array
category: 
    - LeetCode
tags:
    - arrays
---

 
Resources:
- Video:  [Dynamic Arrays](https://neetcode.io/courses/dsa-for-beginners/3)
- Link: [The Simple and Elegant Idea behind Efficient Dynamic Arrays](https://www.youtube.com/watch?v=5AllG-i_yto)
- Link: [What if you had to invent a dynamic array?](https://www.youtube.com/watch?v=Ij7NQ-0mIVA)

## Dynamic Array
- should be able to change the shape of the array dynamically. 
    - should be able to add/delete element fast
    - should be able to insert/delete a element in the middle. 
- since we need to make this as efficient as possible. Let's try what would we have done if we had to invent it for ourself.

- First, we take the functionality of it and try to simplify it as much as possible. 
- Here, let's take only the 'adding dynamically' part. 

**Adding Dynamically**
- say we have an fixed array of 4 elements. Then, how can we make it such that we can add an element to it. 
- Here, we know that we need to describe on a fixed space required for our task before hand to utilize a memory (refer to how memory works).

Alternative #1: Make an array of 5 element then copy all the data to the new array. 
- Here, using this we can make an dynamic array. However, it is very expensive to do this for huge amount of data. 
- For example, for an 1M length array, we need to perform around 90 billion copies. 
- Here lets assume we are continuously adding element to the array. So, for 5th element we need 5 copying operation. For the 6th element, we need to first create a new array of size 6 and copy the 6 elements. So here our total operations is 5+6. For the 7th element, it is 5+6+7. In big O notation it is $O(N^2)$. 

Alternative #2: Making a new array of size of the fixed array + 8 (say). 
- Here, it will reduce a lot of copying operations, however it is still of $O(N^2)$ complexity. 

Alternative #3: Making the new array the double size of the array. 
- Here, the number of copying operation needed for an array of size N is always N. So it's complexity is $O(N)$. 
- This is very cool problem, so if you are math savvy then take out a piece of paper and do the math, it is quite fun to think about this problem. Find how this is $O(N)$. 
- This is how programming languages define dynamic arrays. 

For deletion, say if the filled element is less that the half of the size then we reduce the size of array by half. Here, this means our memory usage has also been optimized.

Similarly, with this way we can also easily perform insertions and deletion from the middle or front of the array with high speed . 