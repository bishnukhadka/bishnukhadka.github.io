---
title: "Book Notes: LLM Engineer's Handbook"
date: 2025-06-23
permalink: /post/2025/06/llm_handbook
category: 
    - LLM
tags:
    - LLM, RAG
---

Book: 
- [Amazon link](https://www.amazon.com/LLM-Engineers-Handbook-engineering-production/dp/1836200072)


## Notes
- An LLM engineer should have the knowledge in the following:
    - Data preparation
    - Fine-tune LLM 
    - Inference Optimization 
    - Product Deployment (MLOps)
- What the book will teach: 
    - Data Engineering
    - Supervised Fine-tuning
    - Model Evaluation
    - Inference Optimization 
    - RAG
- For every project there must be planning. And the three planning steps the book talks about is as follows: 
    1. Understand the problem 
        - What we want to build ? 
        - Why are we building it? 
    2. Minimal Viable Product reflecting real-world scenario.
        - Bridge the gap between the idealistic and the reality of what can be built. 
        - What are the steps that is required to build it? 
        - *not clear on this part*
    3. System Design step
        - Core architecture and design choices
        - How are we going to build it? 
- What the book covers: 



### Chapter 1: Understanding
- The chapter covers the following topics: 
    - Understanding the LLM Twin concept
    - Planning the MVP of the LLM Twin product
    - Building ML systems with feature/training/inference pipelines
    - Designing the system architecture of the LLM Twin
- The key of the LLM Twin stands in the following:
    - What data we collect
    - How we preprocess the data
    - How we feed the data into the LLM
    - How we chain multiple prompts for the desired results
    - How we evaluate the generated content

### Chapter2: Tooling and Installation
- The chapter covers: 
    - Python ecosystem and project installation
    - MLOps and LLMOps tooling
    - Databases for storing unstructured and vector data
    - Preparing for AWS


### Chapter 3: Data Engineering
- In this chapter, we will study the following topics:
    - Designing the LLM Twin’s data collection pipeline
    - Implementing the LLM Twin’s data collection pipeline
    - Gathering raw data into the data warehouse

- Collect and curate the dataset
- From raw data, `Extract` -> `Transform` -> `Load` into MongoDB. (ETL)
    - crawling
    - standardizing data
    - load into data warehouse


### Chapter 4: RAG Feature Pipeline
- Retrieval-augmented generation (RAG)
- Chapter teaches you what RAG is and how to implement it. 
- The main sections of this chapter are:
    - Understanding RAG
    - An overview of advanced RAG
    - Exploring the LLM Twin’s RAG feature pipeline architecture
    - Implementing the LLM Twin’s RAG feature pipeline


### Chapter 5: Supervised Fine-Tuning
- SFT refines the model's capabilities (here model refers to pre-trained model that can predict the new sequence) learning to predict `instruction-answer` pair. 
- Makes the general ability of pre-trained LLMs of understanding language to specific application, or in this case more conversational. 
- In this chapter, the authors cover the following topics:
    - Creating a high-quality instruction dataset
    - SFT techniques
    - Implementing fine-tuning in practice


### Chapter 6: Fine-Tuning with Preference Alignment
- SFT cannot address a human's preference of how a conversation should be, therefore we use `preference alignment`, specifically the `Direct Preference Optimization (DPO)`.
- Authors cover the following topics in this chapter: 
    - Understanding preference datasets
    - How to create our own preference dataset
    - Direct preference optimization (DPO)
    - Implementing DPO in practice to align our model


### Chapter 7: Evaluating LLMs
- `no unified approach` to measuring a model's performance but there are patterns and recipes that we can adapt to specific use cases. 
- The chapter covers: 
    - Model evaluation
    - RAG evaluation
    - Evaluating TwinLlama-3.1-8B

### Chapter 8: Inference Optimization 
- Some tasks like document generation take hours and some tasks like code completion take a small amount of time, this is why optimization of the inference is quite important. The things that are optimized are the latency  (the speed of the generation of the first token), throughput (number of tokens generated per second), and memory footprint of the LLM. 
- The chapter covers: 
    - Model optimization strategies
    - Model parallelism
    - Model quantization

### Chapter 9: RAG Inference Pipeline
- Where the magic happens for the RAG system. 
- The chapter covers the following topics: 
    - Understanding the LLM Twin’s RAG inference pipeline
    - Exploring the LLM Twin’s advanced RAG techniques
    - Implementing the LLM Twin’s RAG inference pipeline


### Chapter 10: Inference Pipeline Deployment 
- The chapter covers: 
    - Criteria for choosing deployment types
    - Understanding inference deployment types
    - Monolithic versus microservices architecture in model serving
    - Exploring the LLM Twin’s inference pipeline deployment strategy
    - Deploying the LLM Twin service
    - Autoscaling capabilities to handle spikes in usage

### Chapter 11: MLOps and LLMOps
- This chapter covers: 
    - The path to LLMOps: Understanding its roots in DevOps and MLOps
    - Deploying the LLM Twin’s pipelines to the cloud
    - Adding LLMOps to the LLM Twin


    



    
