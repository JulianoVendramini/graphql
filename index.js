const { ApolloServer } = require("apollo-server")
const { typeDefs, resolvers } = require("./src/graphql/schemas")

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(3333)