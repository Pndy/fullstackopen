const { ApolloServer, gql } = require('apollo-server')
const { UserInputError } = require('apollo-server-errors')
const mongoose = require('mongoose')
const uuid = require('uuid');
require('dotenv').config()

const Book = require('./models/books')
const Author = require('./models/authors')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('MongoDB Error: ', err)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments({}),
    authorCount: () => Author.collection.countDocuments({}),
    allBooks: (root, args) => {

      let filters = {}
      if(args.author){ // Does not work yet
        filters = { ...filters, 'author.name': args.author }
      }
      if(args.genre){
        filters = { ...filters, genres: args.genre }
      }

      return Book.find(filters).populate('author')
    },
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if(!author){
        try{
          newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }catch(e){
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }
      }

      try{
        let newBook = new Book({ ...args, author: author })
        const savedBook = await newBook.save()
      }catch(e){
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      return savedBook
    },
    editAuthor: async (root, args) => {

      const author = await Author.findOne({ name: args.name })
      if(!author){
        return null
      }
      try{
      author.born = args.setBornTo
      const savedAuthor = await author.save()
      }catch(e){
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      return savedAuthor
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: root._id}).countDocuments()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
