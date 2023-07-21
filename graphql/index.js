import { ApolloServer } from "@apollo/server";

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const typeDefs = `#graphql


type Query {
  
}

type Mutation{

}



`;


const resolvers = {
    Query: {

    },

    Mutation: {

    },
};


export  function graphql(httpServer){
    return new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

}




