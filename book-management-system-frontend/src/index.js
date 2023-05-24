import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink, 
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import App from "./App";
import "./styles/global.css";




const MY_URI = "http://localhost:4000/graphql";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        books: {
          keyArgs: false,
          merge(existing = [], incoming) {

            return [...existing, ...incoming.books];
          },
        },
      },
    },
  },
});


const httpLink = createHttpLink({
  uri: MY_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(httpLink)
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
 
);
