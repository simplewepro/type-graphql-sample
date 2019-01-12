import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createConnection } from "typeorm";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";
// import * as resolvers from "./modules";

const startServer = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("server started on http://localhost:4000/graphql")
  );
};

startServer();
