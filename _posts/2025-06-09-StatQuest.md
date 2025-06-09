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
- From Chapter 1 we learned, that we train the model on 'train set' and evaluate the model on 'test set'.
- But how do we decide on what data points to choose for 'test set' or the 'train set'. 
- The answer is cross validation. 
- Say you have 10 data points. And let us say that we have chosen a 80/20 train-test split. This means that we are going to assign 8 points randomly to train set and the rest of the 2 data point for test set. Here the 2 points chosen will not be used in test set for the next cross validation. So, for second we choose another 2 data points for test set and remaining for train set. We can do this 5 times, since our total data points is 10 and we have chosen a 80/20 train-test split. 
- Therefore, `cross validation` is a way solving the problem of not knowing which points are the best for testing by using them all in an iterative way. 
- You can also think of it like make 5 groups. And each time using one group as the 'test set' and remaining as the 'train set'.
- The number of iterations/groups are also called `folds`. Therefore, this is an example of `5-fold cross validation`.
- But why can't we use all the data as 'train set'.
    - Because, only way to determine if a model has been overfit or not is to evaluate on new data. 
    - Reusing same data points for training and testing is called `Data Leakage`. 
- The main advantage of cross-validation is that it is a proper measure of how good a model has performed, instead of relying on chance for train-test split. Here, if test set is by chance easy, then the model will be interpreted as better than it actually is.
- When we have a lot of data, 10-Fold Cross Validation is commonly used. 
- Another commonly used cross validation is `Leave-One-Out`. 
    - used all but one point for training, and the remaining point for testing.
    - iterate until every single point has been tested. 
    - we usually use this for small dataset. 
- Commonly, sometimes a particular model performs better in some iteration and another model can perform better in other iteration. In such case we use `Statistics` to decide the better model. 


## Chapter 3: Fundamental Concepts in Statistics!!!

