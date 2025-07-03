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


# Notes
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



## Chapter 1: Understanding
- The chapter covers the following topics: 
    - Understanding the LLM Twin concept
    - Planning the MVP of the LLM Twin product.
    - Building ML systems with feature/training/inference pipelines
    - Designing the system architecture of the LLM Twin
- The key of the LLM Twin stands in the following:
    - What data we collect
    - How we preprocess the data
    - How we feed the data into the LLM
    - How we chain multiple prompts for the desired results
    - How we evaluate the generated content
- We have to consider how to do the following (MLOps):
    - Ingest, clean, and validate fresh data
    - Training versus inference setups
    - Compute and serve features in the right environment
    - Serve the model in a cost-effective way
    - Version, track, and share the datasets and models
    - Monitor your infrastructure and models
    - Deploy the model on a scalable infrastructure
    - Automate the deployments and training
- In every software architecture, `Database`->`Business Logic`->`UI`. And, any layer can be as complex as required. But for ML, what do we require? Well, that is the `FTI` architecture. `Feature`->`Training`->`Inference`. 

![FTI Architecture](https://miro.medium.com/v2/resize:fit:596/1*qdXMJimcoCGK1xAvurNePw.png)

To conclude, the most important thing you must remember about the FTI pipelines is their interface:
- The feature pipeline takes in data and outputs the features and labels saved to the feature store.
- The training pipeline queries the features store for features and labels and outputs a model to the model registry. 
- The inference pipeline uses the features from the feature store and the model from the model registry to make predictions.

Requirements of the ML system from a purely technical perspective:
- Data
    - collect
    - standardize
    - clean the raw data
    - create instruct database for fine-tuning an LLM
    - chunk and embed the cleaned data. Store the vectorized data into a vector DB for RAG. 
- Training
    - Fine-tune LLMs of various sizes
    - Fine-tune on instruction datasets of multiple sizes. 
    - Switch between LLM types 
    - Track and compare experiments. 
    - Test potential production LLM candidates before deploying them. 
    - Automatically start the training when new instruction datasets are available. 
- Inference
    - A REST API interface for clients to interact with the LLM
    - Access to the vector DB in real time for RAG. 
    - Inference with LLMs of various sizes
    - Autoscaling based on user requests
    - Automatically deploy the LLMs that pass the evaluation step
- LLMOPs
    - Instruction dataset versioning, lineage, and reusability
    - Model versioning, lineage, and reusability
    - Experiment tracking
    - Continuous training, continuous integration, and continuous delivery (CT/CI/CD)
    - Prompt and system monitoring

![LLM Twin high-level architecture](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsubstackcdn.com%2Fimage%2Ffetch%2Ff_auto%2Cq_auto%3Agood%2Cfl_progressive%3Asteep%2Fhttps%253A%252F%252Fsubstack-post-media.s3.amazonaws.com%252Fpublic%252Fimages%252F06ee68fc-0e81-4e65-858a-2a7b2d2aedc2_1650x1650.png&f=1&nofb=1&ipt=c654edeca04d0587c3cc0437ffa43f40f2b2f1ac3b1ddf0d9f9dc8e4790620a9)


## Chapter2: Tooling and Installation
- The chapter covers: 
    - Python ecosystem and project installation
    - MLOps and LLMOps tooling
    - Databases for storing unstructured and vector data
    - Preparing for AWS
- Any Python project needs three fundamental tools: the Python interpreter, dependency management, and a task execution tool.
- Poetry is one of the most popular dependency and virtual environment managers within the Python ecosystem.
- An orchestrator is a system that automates, schedules, and coordinates all your ML pipelines. It ensures that each pipeline—such as data ingestion, preprocessing, model training, and deployment—executes in the correct order and handles dependencies efficiently. 
- ZenML is one such orchestrator. 
    - It orchestrates by `pipeline`s and `step`s. They are just python functions. Where steps are called in pipeline functions. Modular code should be written for this. 
    - ZenML transforms any step output into artifacts.
    - Any file produced during the ML lifecycle. 
- Experiment Tracker: 
    - Training ML models is an entirely iterative and experimental process. Therefore, an experiment tracker is required. 
    - CometML is one that helps us in this aspect. 
- Prompt monitoring
    - you cannot use standard logging tools as prompts are complex and unstructured chains.
    - Optik is simple to use prompt monitoring compared to other prompt monitoring tools.
- MongoDB, NoSQL dataset. 
- Qdrant, vector database. 
- For our MVP, AWS, it’s the perfect option as it provides robust features for everything we need, such as S3 (object storage), ECR (container registry), and SageMaker (compute for training and inference).

    
## Chapter 3: Data Engineering
In this chapter, we will study the following topics:
- Designing the LLM Twin’s data collection pipeline
- Implementing the LLM Twin’s data collection pipeline
- Gathering raw data into the data warehouse

An ETL pipeline involves three fundamental steps:
- We extract data from various sources. We will crawl data from platforms like Medium, Substack, and GitHub to gather raw data.
- We transform this data by cleaning and standardizing it into a consistent format suitable for storage and analysis.
- We load the transformed data into a data warehouse or database.

Collect and curate the dataset
- From raw data, `Extract` -> `Transform` -> `Load` into MongoDB. (ETL)
    - crawling
    - standardizing data
    - load into data warehouse



<!-- ZenML's `digital_data_etl` pipeline:  -->
## Chapter 4: RAG Feature Pipeline
- Retrieval-augmented generation (RAG)
- Naive RAG
    - Chunking 
    - Embedding
    - Vector DBs
- Chapter teaches you what RAG is and how to implement it. 
- The main sections of this chapter are:
    - Understanding RAG
    - An overview of advanced RAG
    - Exploring the LLM Twin’s RAG feature pipeline architecture
    - Implementing the LLM Twin’s RAG feature pipeline
- A RAG system is composed of three main modules independent of each other:
    - Ingestion pipeline: A batch or streaming pipeline used to populate the vector DB
    - Retrieval pipeline: A module that queries the vector DB and retrieves relevant entries to the user’s input
    - Generation pipeline: The layer that uses the retrieved data to augment the prompt and an LLM to generate answers

**Ingestion Pipeline**

- For the ingestion pipeline, first we need to collect the data.
- This can be from DBs, APIs, or web pages. And depending on the source, your cleaning step might be different. 
- The cleaned data is then chunked (depending on the model's input size)
- Then the chunks are embedded. 
- The chunks data along with it's metadata is taken by the loading module. 

So the flow for ingestion pipeline is: 
Collect->Clean->Chunk->Embed->Load

**Retrieval Pipeline**
- A retrieval pipeline uses the user input to output the similar chunks of data. 
- For this, first, the user input need to be translated to the same vector spaces as the chunks of data.
- Then we use distance formula to get the 'K' nearest elements to it. 
- Those elements is used to augment the prompt. 

Here, `cosine` distance formula is one of the most popular distance formula used to get the distance. But it is said that the distance formula depends on the data and the embedding model we have. `How do we decide on the best distance formula?` 

**Generation Pipeline**
- The final prompt results from a system and prompt template populated with the user’s query and retrieved context. You might have a single prompt template or multiple prompt templates, depending on your application. Usually, all the prompt engineering is done at the prompt template level.

Critical aspects affecting the accuracy of RAGs: 
- Embedding used,
- Similarity function used. 

**Embeddings**

- Algorithm for creating vector indexes: Random Projection, Hierarchial Navigable Small World (HNSW), Product Quantization (PQ), and Locality Sensitive Hashing (LSH). 

The vanilla RAG framework we just presented doesn’t address many fundamental aspects that impact the quality of the retrieval and answer generation, such as:

- Are the retrieved documents relevant to the user’s question?
- Is the retrieved context enough to answer the user’s question?
- Is there any redundant information that only adds noise to the augmented prompt?
- Does the latency of the retrieval step match our requirements?
- What do we do if we can’t generate a valid answer using the retrieved information?

Therefore, for RAG we need two things; 
- robust evaluation of retrieval
- retrieval limitation should be addressed in the algorithm itself. 


### Advanced RAG
The vanilla RAG design can be optimized at three different stages:
- Pre-retrieval 
- Retrieval
- Post-retrieval

#### **Pre-retrieval**
most of the `data indexing` techniques focus on better preprocessing and structuring the data to improve retrieval efficiency, such as: 
- Sliding Window
- Enhancing Data Granularity
- Metadata
- Optimizing index structures
- Small-to-big

For `query optimization`, 
- Query routing 
- Query rewriting
    - Paraphrasing
    - Synonym substitution
    - Sub-queries
    - Hypothetical document embeddings (HyDE)
- Query Expansion
    - Self-Query

#### **Retrieval Pipeline Optimization**
There are two ways 
- Improve the Embedding model
    - by fine-tuning the pre-trained model (very computationally costly, evan financially)
    - using Instruction models (less costly)
- Leveraging the DB's filter and search features


#### **Post-Retrieval Pipeline Optimization**
- Re-ranking
- Prompt compression

### Exploring LLM Twin's RAG feature pipeline




## Chapter 5: Supervised Fine-Tuning
- SFT refines the model's capabilities (here model refers to pre-trained model that can predict the new sequence) learning to predict `instruction-answer` pair. 
- Makes the general ability of pre-trained LLMs of understanding language to specific application, or in this case more conversational. 
- In this chapter, the authors cover the following topics:
    - Creating a high-quality instruction dataset
    - SFT techniques
    - Implementing fine-tuning in practice


## Chapter 6: Fine-Tuning with Preference Alignment
- SFT cannot address a human's preference of how a conversation should be, therefore we use `preference alignment`, specifically the `Direct Preference Optimization (DPO)`.
- Authors cover the following topics in this chapter: 
    - Understanding preference datasets
    - How to create our own preference dataset
    - Direct preference optimization (DPO)
    - Implementing DPO in practice to align our model


## Chapter 7: Evaluating LLMs
- `no unified approach` to measuring a model's performance but there are patterns and recipes that we can adapt to specific use cases. 
- The chapter covers: 
    - Model evaluation
    - RAG evaluation
    - Evaluating TwinLlama-3.1-8B

## Chapter 8: Inference Optimization 
- Some tasks like document generation take hours and some tasks like code completion take a small amount of time, this is why optimization of the inference is quite important. The things that are optimized are the latency  (the speed of the generation of the first token), throughput (number of tokens generated per second), and memory footprint of the LLM. 
- The chapter covers: 
    - Model optimization strategies
    - Model parallelism
    - Model quantization

## Chapter 9: RAG Inference Pipeline
- Where the magic happens for the RAG system. 
- The chapter covers the following topics: 
    - Understanding the LLM Twin’s RAG inference pipeline
    - Exploring the LLM Twin’s advanced RAG techniques
    - Implementing the LLM Twin’s RAG inference pipeline


## Chapter 10: Inference Pipeline Deployment 
- The chapter covers: 
    - Criteria for choosing deployment types
    - Understanding inference deployment types
    - Monolithic versus microservices architecture in model serving
    - Exploring the LLM Twin’s inference pipeline deployment strategy
    - Deploying the LLM Twin service
    - Autoscaling capabilities to handle spikes in usage

## Chapter 11: MLOps and LLMOps
- This chapter covers: 
    - The path to LLMOps: Understanding its roots in DevOps and MLOps
    - Deploying the LLM Twin’s pipelines to the cloud
    - Adding LLMOps to the LLM Twin
