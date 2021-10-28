const { ApolloServer, gql } = require('apollo-server')
const { UserInputError, AuthenticationError } = require('apollo-server-errors')
const mongoose = require('mongoose')
const uuid = require('uuid');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Book = require('./models/books')
const Author = require('./models/authors')
const User = require('./models/users')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]
    allAuthors: [Author!]
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => {
      if(!currentUser){
        return null
      }
      return currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser){
        throw new AuthenticationError("Not authenticated")
      }

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
    editAuthor: async (root, args, { currentUser }) => {

      if(!currentUser){
        throw new AuthenticationError("Not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if(!author){
        return null
      }
      try{
        author.born = args.setBornTo
        const savedAuthor = await author.save()
        return savedAuthor
      }catch(e){
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      try{
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        const savedUser = await user.save()
        return savedUser
      }catch(err){
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if(!user || args.password !== 'password'){
        throw new UserInputError('Username or password incorrect')
      }

      const tokenData = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(tokenData, process.env.SECRET)
      return { value: token }
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: root._id}).countDocuments()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const token = auth.substring(7)
      try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const currentUser = User.findById(decodedToken.id)
        return {currentUser}
      }catch(e){
        return
      }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
