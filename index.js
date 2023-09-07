import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {


    games() {
      return db.games;
    },

    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },

    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },

    authors() {
      return db.authors;
    },

    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },

// above -  resolver for the etry point but if we want to fetch neted data we have create new objects 

Game:{
  // for fetching single game wtih reviews 
  reviews(parent){
return db.reviews.filter((r)=> r.game_id === parent.id)
  }
}


};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at port : ", 4000);



// if i want to fetch single game with their reviews 

// query GameQuery($id:ID!){
//   game(id:$id){
//     title,
//     reviews{
//       rating
//       content
//     }
//   }
// }