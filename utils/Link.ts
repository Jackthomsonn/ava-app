import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { OperationDefinitionNode } from "graphql";
import { HttpLink, split } from "@apollo/client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { WS_URI, API_URI } = publicRuntimeConfig;

const wsLink = process.browser
  ? new WebSocketLink({
      uri: WS_URI,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = (token) =>
  new HttpLink({
    uri: API_URI,
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
