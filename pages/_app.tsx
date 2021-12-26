import React from "react";
import Head from "next/head";
import "../styles/global.css";
import Sidebar from "../components/sidebar";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { link } from "../utils/Link";
import { UserProvider } from "@auth0/nextjs-auth0";

const App = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    link: link(pageProps.accessToken) as ApolloLink,
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex">
        <UserProvider>
          <ApolloProvider client={client}>
            <Sidebar />
            <Component {...pageProps} />
          </ApolloProvider>
        </UserProvider>
      </div>
    </>
  );
};

export default App;
