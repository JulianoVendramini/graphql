const { ApolloServer } = require("apollo-server")
const { typeDefs, resolvers } = require("./src/graphql/schemas")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError:(error) => {
        if(error.message.startsWith("User already")) {
            return new Error(error.message)
        }
    }
})

server.listen(3333)