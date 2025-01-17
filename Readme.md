# Frontend Assignment


## Assignment

You are required to fetch the details of the highly-rated kickstarter projects by implementing an AJAX call to their APIs.

Use the web API (link : https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json) ) to fetch the details of specific projects.

## Minimum Requirements

1. Create a table and list the following three attributes for all the projects:
    * S.No.
    * Percentage funded
    * Amount pledged

1. Ensure that the UI is aesthetically pleasing to gain extra points.
1. Implement pagination with maximum 5 records per page.
1. UX should remain like you would see on an ecommerce website (Amazon, Flipkart, etc.) and edge cases should not break.
1. Take care of last page.

### Expected Output format

| **S.No.** | **Percentage funded** | **Amount pledged** |
|-----------|-----------------------|--------------------|
| 0         | 186                   | 15283              |


## Good to have

1. Unit tests.
1. Accessibility.


## Steps for submission

1. Fork this repo.
1. Do changes to the above assignment.
1. Email the assignment back to us with:
    1. Link of the open source repo.
    1. Link of the assignment hosted online. (You can use any free tools to host this assignment, eg. vercel, netlify or heroku). It should be accessible online for atleast 7 days.


## Frameworks Allowed
1. React/Vanilla JS for JavaScript
1. No framework for CSS. Only Raw CSS is allowed.

## Note

1. Result on platforms like codesandbox, replit are not accepted. 
1. Private unaccessible links will lead to rejection.


## Solution
### Installation

To install and run the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/sushil-kamble/frontend-assignment.git
    ```
2. Navigate to the project directory:
    ```sh
    cd fe-assignment
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm run start
    ```
5. Test the application:
    ```sh
    npm run test
    ```

### Features

- Fetch and display highly-rated Kickstarter projects.
- Display project details in a table format.
- Industry level Pagination with a maximum of 5 records per page with a option to show 10/15/20 record.
- Sorting functionality for table columns.
- Persistent state for pagination and sorting, even after page refresh. (by using url query params).
- Error handling for failed API requests.
- Responsive and aesthetically pleasing UI.
- Unit tests for key components.

### Technologies Used

- **React 19**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Jest**: JavaScript testing framework with a focus on simplicity.
- **React Testing Library**: A library for testing React components.
- **CSS Modules**: A CSS file in which all class and animation names are scoped locally by default.
- **Fetch API**: A modern interface for making HTTP requests in the browser.
- **Create React App**: A comfortable environment for learning React and a best practice for building a single-page application.
- **Vercel**: Platform for deploying web applications.

### Live Demo
[https://frontend-assignment-pearl-iota.vercel.app/](https://frontend-assignment-pearl-iota.vercel.app/)