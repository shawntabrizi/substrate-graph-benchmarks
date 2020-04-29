# Benchmarking Database Operations

This page will cover how we benchmark database operations in the Substrate runtime.

## Overview

Database operations in the Substrate runtime are well understood to have a significant overhead on the overall execution of extrinsics.
Measuring the performance of the database can depend on many variables, and Substrate even supports swapping the database layer with other backends for potential optimization.
As such, we have isolated the weight of database operations separate from the rest of the

## Assumptions
