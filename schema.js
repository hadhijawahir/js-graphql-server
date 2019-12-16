const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Hardcoded Data
const customers = [
    {id: '1', name: 'Hadhi Jawahir', email: 'hadhi@live.com', age: 23},
    {id: '2', name: 'Malith Jayasingha', email: 'mltjaya@gmail.com', age: 24},
    {id: '3', name: 'Janindu Ranapala', email: 'johnny@gmail.com', age: 25},
];

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // Resolver to get a particular customer by ID
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        },

        // Resolver to get all customers
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(){
                return customers;
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});