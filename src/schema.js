const graphql = require('graphql');
const { GraphQLDate, GraphQLTime } = require('graphql-iso-date');

const Dish = require('./models/dishes');
const Chef = require('./models/chef');
const Customer = require('./models/customer');
const Order = require('./models/order');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const DishType = new GraphQLObjectType({
    name: 'Dish',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        country: {
            type: GraphQLString,
        },
        tasty: {
            type: GraphQLBoolean,
        },
        chefs: {
            type: ChefType,
            resolve(parent, args) {
                return Chef.findById(parent.chefsId);
            },
        },
    }),
});

const ChefType = new GraphQLObjectType({
    name: 'Chef',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        dish: {
            type: new GraphQLList(DishType),
            resolve(parent, args) {
                return Dish.find({
                    chefsId: parent.id,
                });
            },
        },
    }),
});

const OrderType = new GraphQLObjectType({
    name: ' Order',
    fields: () => ({
        timeOrderPlaced: {
            type: GraphQLTime,
        },
        estimatedDeliveryTime: {
            type: GraphQLTime,
        },
        orderCost: {
            type: GraphQLFloat,
        },
        deliveryLocation: {
            type: GraphQLString,
        },
        deliveryDistance: {
            type: GraphQLFloat,
        },
        customer: {
            type: CustomerType,
            resolve(parent, args) {
                return Customer.findById(parent.customerId);
            },
        },
    }),
});

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        order: {
            type: String,
        },
        location: {
            type: GraphQLString,
        },
        order: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return Order.find({
                    orderId: parent.id,
                });
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType ',
    fields: {
        dish: {
            type: DishType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Dish.findById(args.id);
            },
        },
        chefs: {
            type: ChefType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Chef.findById(args.id);
            },
        },
        dishes: {
            type: new GraphQLList(DishType),
            resolve(parent, args) {
                return Dish.find({});
            },
        },
        chefs: {
            type: new GraphQLList(ChefType),
            resolve(parent, args) {
                return Chef.find({});
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDish: {
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                country: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                tasty: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                },
            },
            resolve(parent, args) {
                let dish = new Dish({
                    name: args.name,
                    country: args.country,
                    tasty: args.tasty,
                });
                return dish.save();
            },
        },
    },
    addChef: {
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString),
            },
            rating: {
                type: new GraphQLNonNull(GraphQLFloat),
            },
        },
        resolve(parent, args) {
            let chef = new Chef({
                name: args.name,
                rating: args.rating,
            });
            return chef.save();
        },
    },
    addOrder: {
        args: {
            timeOrderPlaced: {
                type: new GraphQLNonNull(GraphQLTime),
            },
            orderCost: {
                type: GraphQLNonNull(GraphQLFloat),
            },
            orderId: {
                type: GraphQLNonNull(GraphQLFloat),
            },
            customerId: {
                type: GraphQLNonNull(GraphQLFloat),
            },
            estimatedDeliveryTime: {
                type: GraphQLNonNull(GraphQLTime),
            },
            deliveryDistance: {
                type: GraphQLNonNull(GraphQLFloat),
            },
            deliveryLocation: {
                type: GraphQLNonNull(GraphQLString),
            },
        },
        resolve(parent, args) {
            let order = new Order({
                timeOrderPlaced: args.timeOrderPlaced,
                orderCost: args.orderCost,
                orderId: args.orderId,
                customerId: args.customerId,
                estimatedDeliveryTime: args.estimatedDeliveryTime,
                deliveryDistance: args.deliveryDistance,
                deliveryLocation: args.deliveryLocation,
            });
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
