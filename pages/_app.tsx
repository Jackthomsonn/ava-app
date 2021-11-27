import React from "react";
import Head from "next/head";
import "../styles/global.css";
import Sidebar from "../components/sidebar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { link } from "../utils/Link";

const App = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex">
        <ApolloProvider client={client}>
          <Sidebar />
          <Component {...pageProps} />
        </ApolloProvider>
      </div>
    </>
  );
};

export default App;
