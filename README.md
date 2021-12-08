# Share the Ball

The Final Project of "8th Wonder" (Alpha 32, Team 8)

## Project Setup
To get the project up and running, follow these steps:
### 1. Setting up the server
- Go inside the `server` folder.
- Run `npm install` to restore all dependencies.
- Run `npm start` to start the server.

### 2. Setting up the client
- Go inside the `client` folder.
- Run `npm install` to restore all dependencies.
- Run `npm start` to start the client.
- To view the application in action with some mock content, log in with `username: CrossoverKing1` and `password: 123456`
- Enjoy our application.

## Project Guidelines

### Module Structure

- The project has the following folders: common, context, services, hoc, elements, components, views.
- common contains constants.js file - to avoid magic values;
- context contains a single AppContext;
- The services folder splits up to sub-folders according to the contents of their expected responses;
- components are complex compositions of elements;
- elements are simple and are used as building blocks;
- views are compositions of components and/or elements - they take most of/the whole screen;

### Services

- Services are named with the task they complete + the word 'request' at the end;
- They are written with async/await syntax;
- They return the result of data.json();
- Their URLs are stored in the constants file;

### Components 

- Components that need preloaded content have state and get that content via useEffect with empty dependancy array, that calls the appropriate fetch request from services;
- Components that have additional functionalities have their own functions that call their appropriate request (requests are not used directly in components - onSubmit, onClick, etc.);
- Functions in components continue the trend of using async/await;
- Division of components depends on their complexity and the readability of their code;
- Buttons are abstracted in separate file only if they are reusable and/or hold complex logic;
- Avatar is a reusable element so it is abstracted in separate file;
- A WithResize high-order component will apply different dimensions to avatar for respective use cases;

### Misc

- Write helpful comments that serve to guide your teammates in your code;
- When in doubt, call your teammates;
- Plan ahead;





