import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import winston from 'winston';
import expressWinston from 'express-winston';
// import graphqlHTTP from 'express-graphql';
import { graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
// import schema from './lib/graphql';

// // Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];
// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;
// The resolvers
const resolvers = {
  Query: { books: () => books },
};
// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const server = () => {
  // Config
  const APP_PORT = 3003;

  const app = express();

  app.use(cors());

  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        timestamp: true,
        json: false,
        colorize: true,
      }),
    ],
    meta: false,
    msg: '{{req.ip}} HTTP {{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms ',
    colorize: true,
  }));
  // const dev = process.env.NODE_ENV === 'development';

  app.use('/graphql', bodyParser.json(), graphiqlExpress({
    schema,
  }));
  app.get(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  );
  app.use('/', (req, res) => {
    res.json(req, res);
  });
  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        timestamp: true,
        json: false,
        colorize: true,
      }),
    ],
  }));

  app.listen(APP_PORT, '0.0.0.0', () => {
    console.log(`App listening on http://localhost:${APP_PORT}`);
  });
};

export default server();
