---
title: "The StatQuest Illustrated Guide to Machine Learning!!!"
date: 2025-06-04
permalink: /post/2025/06/statquest
category: 
    - Book Notes
tags:
    - book
---

- Author: Josh Starmer, Ph.D.
- Book Amazon link: [https://www.amazon.com/dp/B0BLM4TLPY](https://www.amazon.com/dp/B0BLM4TLPY)
- Youtube link: [https://www.youtube.com/@statquest](https://www.youtube.com/@statquest) 


## Chapter 1 : Fundamental Concepts of ML

What is Machine Learning (ML)? 
- According to the author, ML is a collection of tools and techniques that transforms data into decisions. 
- Basically, ML is about 2 things: 
    1. Classifying things (`Classification`) and 
    2. Quantifying Predictions (`Regression`).
- Comparing ML Methods:
    - To choose, which methods to use for your application, we can just compare the prediction of the method/model with the actual outcomes. This is called evaluation of a model and the metrics used are called evaluation metrics. 
    - For this, we first fit the model to the training data. 
    - Then make predictions based on the trained model. 
    - Then we evaluate the predictions made on test set with the actual outcome. 
    - We can do this for different model/methods and based on the evaluation metrics we can select a suitable method for our application. 
    - Here, just because a machine learning methods fits the training data well, it doesn't mean it will perform well with the Testing Data. 
    - Fit Train Data well but poor predictions = Overfitting
    - Doesn't fit train data well = Underfitting. 
- Independent and Dependent Variables
    - variable: value of which vary from record to record. 
    - Say that we have two variables, 'height' and 'weight'. And let us also say that height prediction depends on weight of a person, then here, the 'height' is a `dependent variable`, and 'weight' is an `independent variable`, as this variable used to predict a dependent variable. 
    - Here, the independent variables are also called `features`. 
- Discrete and Continuous Data
    - `discrete data`: countable values. only takes specific values. 
    - `continuous data`: measurable values under a particular pre-defined range. 

## Chapter 2: Cross Validation
