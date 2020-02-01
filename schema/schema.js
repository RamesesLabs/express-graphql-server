const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        organization: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        article: {}
    }
})

article{
    name
    genre
}