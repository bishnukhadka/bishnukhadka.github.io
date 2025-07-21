---
title: "Chapter Notes: LLM Engineer's Handbook - RAG Feature Pipeline"
date: 2025-07-04
permalink: /post/2025/07/rag-feature-pipeline
category: 
    - LLM
tags:
    - LLM, RAG
---

Book: 
- [Amazon link](https://www.amazon.com/LLM-Engineers-Handbook-engineering-production/dp/1836200072)

## Chapter 4: RAG Feature Pipeline
- Retrieval-augmented generation (RAG) Feature Pipeline: Qdrant vector DB for online serving and ZenML artifacts for offline training. 
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

To implement the RAG feature pipeline, we have two design choice: 

|Batch Pipeline|Streaming Pipeline|
|---|---|
| regular interval  | continuous   |
| simple    |   complex| 
|when data processing is not critical | when it is critical |
| handles large data efficiently | handles single data points | 

**Core steps for RAG feature pipeline**
- Data Extraction 
- Cleaning
- Chunking
- Embedding
- Data Loading: Embedding + Metadata + Chunks

**Change data capture (CDC)**
- a strategy that allows you to optimally keep two or more data storage types in sync without computing and I/O overhead. 
- It captures any CRUD operation done on the source DB and replicates it on a target DB. 
- Optionally, you can add preprocessing steps in between the replication.

The CDC (Change Data Capture) pattern addresses these issues using two main strategies:
- Push: The source DB actively sends changes to targets, enabling real-time updates. A messaging system buffers changes to prevent data loss if targets are unavailable.
- Pull: The source DB logs changes, and targets fetch them periodically. This reduces source load but introduces delays; a messaging buffer ensures reliability.

The main CDC patterns that are used in the industry:
- Time-stamp based: overhead to the source as we have to query the whole table/dataset. 
- Trigger based: same overhead. 
- Log-based: no overhead to the source system, however since logs are not standardized, we have to implement vendor-wise implementations. 


**Why is the data stored in two snapshots?**
- After the data is cleaned: For fine-tuning LLMs
- After the documents are chunked and embedded: For RAG

