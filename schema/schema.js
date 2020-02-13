const graphql = require('graphql');
const _ = require('lodash');
const Article = require('../models/article');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// dummy data
// var articles = [    
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorid: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: '3' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];


const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent);
                // return _.find(authors, { id: parent.authorid });
                return Author.findById(parent.authorid);
            }
        }
    })    
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve(parent, args){
                // return _.filter(articles, { authorId: parent.id });
                return Article.find({ authorid: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        article: {
            type: ArticleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                // console.log(typeof(args.id));
                // return _.find(articles, { id: args.id });
                return Article.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                // console.log(typeof(args.id));
                // return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            }
        },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve(parent,args){
                // return articles
                return Article.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Author.find({});
            }
        }
    }
})

// Sample Query in GraphiQL
// {
//     article(id:"2"){
//         name
//         genre   
//     }
// }

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addArticle: {
            type: ArticleType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let article = new Article({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return author.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});