# Book Management System

This is a Book Management System application built using React, Ant Design, Node.js, Prisma, Apollo Client, and JavaScript. The application allows performing CRUD (Create, Read, Update, Delete) operations on books. It includes JWT (JSON Web Token) authentication and provides search functionality by book title and author with pagination.

## Project Structure

The project contains two folders, `backend` and `frontend`.

### Backend

Inside the `backend` folder (`book-management-system-backend`), you will find the following files and folders:

- `server.js`: Express server file.
- `graphql`: Contains resolvers and GraphQL schemas.
- `prisma`: Prisma schemas and migrations.
- `utils`: Files utilized for backend validations, such as JWT.

### Frontend

Inside the `frontend` folder (`book-management-system-frontend`), you will find the following files and folders:

- `public`: Contains the public files, including the tab icon.
- `src`:
  - `index.js`: Initializes the Apollo Client.
  - `App.js`: Handles routing with React Router.
  - `api`: Contains queries and mutations for GraphQL.
  - `components`: Reusable components.
  - `pages`: Available pages for navigation.
  - `styles`: Styling files.
  - `utils`: Reusable functions.

## Installation and Running the Project Locally

1. After downloading the project, navigate to the `backend` folder (`book-management-system-backend`).
2. Create a `.env` file in this folder with the following environment variables:
  `DATABASE_URL`="mysql://yourDbUser:yourDbPassword@yourDbURL/youDbName"
  `JWT_SECRET`=yourDesiredPass
  
  3. Run the following command to install dependencies, this should also migrate the tables:
  npm install
  
  4. Start the server: node server.js
  5. Open a different terminal window and navigate to the `frontend` folder (`book-management-system-frontend`).
  6. Run the following command to install dependencies: npm install
  7. 7. Start the frontend: npm start
  
  
The project should now be up and running. You can test the functionalities, but for some operations, you may need to register and login.

## Notes and Additional Comments

- Passwords are encrypted using bcrypt.
- Ant Design was chosen for some components due to its ease of implementation and the availability of necessary tools for this project.
- The project utilizes Apollo Client, and one of the standout features is the `useQuery` hook, which helps optimize websites.
- Overall, the development experience was enjoyable, and the project provided an opportunity to learn more about Apollo Client and its capabilities.

  
