# Why do tree-based models still outperform deep learning tabular data? 

- Authors:  Léo Grinsztajn,  Edouard Oyallon,  Gaël Varoquaux
- Link: [https://arxiv.org/pdf/2207.08815](https://arxiv.org/pdf/2207.08815)
- code: [https://github.com/LeoGrin/tabular-benchmark](https://github.com/LeoGrin/tabular-benchmark)

## My initial thoughts and what I would like to get out of this? 

- What makes it difficult for learning tabular-data for deep-learning algorithms or even Neural Networks? 
- What is the correct way for benchmarking? 

## Notes on the paper

- There are benchmarks for Deep Learning, however not much for tabular-data. 
- the paper defines 
    - a standard set of 45 datasets from varied domains with  clear characteristics of tabular data and 
    - a benchmarking methodology accounting for 
        - fitting models and 
        - finding good hyperparameters. 
- results show that tree-based models remain SOTA on medium-sized dta (~10K samples)
- Inductive biases that lead to better performance for tree-based models for tabular data

- Challenges to build tabular-specific NNs as per the authors
    1. be robust to uninformative  features, 
         
    2. preserve the orientation of the data, and 
        
    3. be able to easily learn irregular functions. 

- Deep Learning architectures have been crafted to create inductive bias matching invariance and spatial dependencies of data. 
    - This means that the inherent assumptions of the model, like what structure does the model expect the input data to have help match with the invariance of the model (for example., how CNN has translational invariance i.e., it will detect an object wherever the object is placed. It does have some other factor but now lets only consider object that is less than the size of the window of CNN). 
- Benchmark
    - the code provides 45 datasets split across different settings
        - medium/large
        - with/without categorical features
    - accounts for hyperparameter tuning cost. 
        - But how does it account for it? 
    - choosing dataset.
        - what is “inter-sample” attention
    - preprocessing dataset?
- Raw comparison of DL and tree based models.
- Explanations of why Tree-based models work better than NNs.
         
## Questions that arose while reading the paper

- What are the characteristics that let the authors to select a particular dataset? 
    - Heterogeneous Columns
    - Not high dimensional: Only dataset with a d/n ratio below 1/10. Note: `I am not sure what d/n means in this context`. 
    - Dataset cannot have too little information. 
    - Dataset cannot be stream-like or time series. 
    - Should be real-world data. 
    - Dataset cannot have features<4 or samples<3000. 
    - Dataset cannot be too easy.  
        - The authors use a different scoring system. But does it account for different Bayes rate for different dataset, that is the real question. 
        - they remove a dataset if a default  Logistic Regression (or Linear Regression for regression) reach a score whose relative difference  with the score of both a default Resnet (from Gorishniy et al. [2021](arXiv:2106.11959)) and a default HistGradientBoosting model (from scikit learn) is below 5%. 

- Does tree-based models still remain SOTA for small- and large-sized data? 

- How do you account for 

- How can a model be robust to uninformative features?

- Can NN models preserve the orientation of the data? 

- Can NNs learn irregular functions?