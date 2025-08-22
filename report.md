# Assessment Task Report

## Introduction

This report summarizes the findings and progress of the assessment task.

## Objectives

- Application for searching persons from an API.
- Input field passing on the "label" parameter.
- Result view containing "label", "uuid" and  a list "sources".

## Methodology

The project began by setting up a git repository. Then, a React 18 application was chosen as the sites framework and initialized using a Vite TypeScript template.

The logic was built upon React's components and hooks, specifically "useState" for managing the search term, loading state, errors and results. "useEffect" was used for handling API calls. Fetching was made asynchronoulsy to the API. Unfortunately, access to the API was not possible from the localhost server, so a proxy was installed to circumvent the network errors. Finally, interfaces  were created to ensure type safety and matching the structure of the json response.

The application uses components, such as the PersonCard and ResultList component to keep the code clear and customizable in the future. The components use "tsx" syntax and the application was styled using Tailwind.

## Results

The search application was successful after experiencing issues at first with the items array being empty.

## Conclusion


