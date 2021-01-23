const { gql } = require('apollo-server-express');
const fetch = require("node-fetch");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
    type Launch {
        flight_number: Int,
        mission_name: String,
        upcoming: Boolean,
        launch_year: String,
        launch_date_local: String,
        rocket: Rocket
    }
    type Rocket {
        rocket_id: String,
        rocket_name: String,
        rocket_type: String,
    }
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        launches: [Launch]
    }
`;

/** Resolvers define the technique for fetching the types defined in the
    schema. This resolver retrieves books from the "books" array above. */
    const resolvers = {
        Query: {
            launches: async () => {
                const response = await fetch("http://api.spacexdata.com/v3/launches");
                const data = await response.json();
                return data;
              }
          }
        }
module.exports = {
    typeDefs,
    resolvers
}