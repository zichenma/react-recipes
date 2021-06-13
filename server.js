const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
require('dotenv').config({path: 'variables.env'});



// connect to database

mongoose.connect(process.env.MONGO_URI, {autoIndex: false})
.then(() => console.log('DB connected'))
.catch(err => console.error(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Initialize application
const PORT = process.env.PORT || 4444;

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));


const getUser = async (token) => {
    let currentUser = null;
    if (token != "null") {
        try {
           currentUser = await jwt.verify(token, process.env.SECRET);
        } catch (error) {
            console.log(error);
        }
    }
    return currentUser;
}



const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async ({req}) => {
        const token = req.headers['authorization'];
        const user = await getUser(token);
        return {
            Recipe,
            User,
            currentUser: user,
        }
    }
});


server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)


