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

The search application was successful after experiencing issues at first with the items array being empty. The site gives users also feedback based on Network connection or whether or not the person being searched is found. The result is a list or card components, with information such as the UUID, name and sources.

## Reflection of the API
- There is an inconsistency between the search parameter and the response body. The "label" parameter is nested inside the "sources" array, which requires additional logic. A better solution would be to place the "label" as a top level property.
- Another formal weakness is the "source" property inside the "sources" array. In itself, the name is redundant and might lead to errors, that would otherwise be easy to avoid, due to the similar names. A better practice is naming the "source" key "uri".
- Additionally, the UUID parameter being a link is very unconventional. Usually, it consists of only hexadecimal values, which is not the case with the API used for this application. While the hexadecimal value is the very last part of the link, the overall scheme is quite confusing. In this case, I would create a UUID key with the last part of the link corresponding to that specific person and create another function such as "fetchPersonDetails" that adds the UUID to the API link. This makes the code as well as the API more dynamic.
- Missing from the API documentation is the Validation Error (422) messages. While the general existence of the 422 status code is documented, the exact response is not outlined. Instead of just having the structure of the JSON response body, a detailed description of the values would be much appreaciated.
- Another missing part of the documentation is explaining that the label parameter is nested inside the sources array. As pointed out above, the value would better be suited as a top level parameter.