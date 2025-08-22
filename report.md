# Assessment Task Report

## Introduction

This report summarizes the findings and progress of the assessment task.

## Objectives

- Application for searching persons from an API.
- Input field passing on the "label" parameter.
- Result view containing "label", "uuid" and  a list "sources".

## Methodology

The project began by setting up a git repository. Then, a React 18 application was chosen as the sites framework and initialized using a Vite TypeScript template.

The logic was built upon React's components and hooks, specifically "useState" for managing the search term, loading state, errors and results. "useEffect" was used for handling API calls. Fetching was made asynchronoulsy to the API. Finally, interfaces  were created to ensure type safety and matching the structure of the json response.

## Results

The search application was unsuccessful, as the API requests were yielding no results. The "items" array inside the json was empty, making the application impossible to finish.

Because of this, a local json file was created to help debugging and see if the website works as intended even if the API did not.

## Conclusion


