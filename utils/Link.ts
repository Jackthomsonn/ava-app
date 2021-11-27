import ws from "ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { OperationDefinitionNode } from "graphql";
import { HttpLink, split } from "@apollo/client";

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `wss://dev-api-ju3zlkmukq-uc.a.run.app/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  uri: "https://dev-api-ju3zlkmukq-uc.a.run.app/graphql",
  credentials: "same-origin",
});

export const link = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(
          query
        ) as OperationDefinitionNode;
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httplink
    )
  : httplink;
