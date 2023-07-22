import { ApolloServer } from '@apollo/server';
import { Neo4jGraphQL } from "@neo4j/graphql";
import {getDriver} from "../config/noe4j.config.js";
import {typeDefs} from "./typeDefs.js";

/**
 * @param httpServer
 * @returns {ApolloServer<BaseContext>}
 */
export const getGraphQLServer=async () => {
    const driver=getDriver()
    const neoSchema = new Neo4jGraphQL({ typeDefs, driver  });
   return new ApolloServer({
        schema: await neoSchema.getSchema(),
    })
}




