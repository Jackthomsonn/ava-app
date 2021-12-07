import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { OperationDefinitionNode } from "graphql";
import { HttpLink, split } from "@apollo/client";

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://localhost:3001/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = (token) =>
  new HttpLink({
    uri: "http://localhost:3001/graphql",
    credentials: "same-origin",
    headers: {
      authorization: token,
    },
  });

export const link = (token: string) =>
  process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(
            query
          ) as OperationDefinitionNode;
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httplink(token)
      )
    : httplink;
