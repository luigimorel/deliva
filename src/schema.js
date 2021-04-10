const graphql = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const Dish = require('./models/dishes');
const Chef = require('./models/chef');
const Customer = require('./models/customer');
const Order = require('./models/order');
const Rider = require('./models/riders');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
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
        rating: { type: GraphQLInt },
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
            type: GraphQLDateTime,
        },
        estimatedDeliveryTime: {
            type: GraphQLDateTime,
        },
        orderCost: {
            type: GraphQLInt,
        },
        deliveryLocation: {
            type: GraphQLString,
        },
        deliveryDistance: {
            type: graphql.GraphQLInt,
        },
        delivered: {
            type: GraphQLBoolean,
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
            type: GraphQLString,
        },
        location: {
            type: GraphQLString,
        },
        phoneNumber: {
            type: GraphQLString,
        },
        emailAddress: {
            type: GraphQLSchema,
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

const RiderType = new GraphQLObjectType({
    name: 'Rider',
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
        orderDelivered: {
            type: GraphQLString,
        },
        phoneNumber: {
            type: GraphQLInt,
        },
    }),
});

// Root query
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
        customer: {
            type: CustomerType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Customer.findById(args.id);
            },
        },
        customers: {
            type: CustomerType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Customer.find({});
            },
        },
        riders: {
            type: RiderType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Rider.find({});
            },
        },
        rider: {
            type: RiderType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Rider.findById(args.id);
            },
        },
        order: {
            type: OrderType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Order.findById(args.id);
            },
        },
        orders: {
            type: OrderType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Order.find({});
            },
        },
    },
});

// Mutations
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
                type: new GraphQLNonNull(GraphQLInt),
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
                type: new GraphQLNonNull(GraphQLDateTime),
            },
            orderCost: {
                type: GraphQLNonNull(GraphQLInt),
            },
            orderId: {
                type: GraphQLNonNull(GraphQLInt),
            },
            customerId: {
                type: GraphQLNonNull(GraphQLInt),
            },
            estimatedDeliveryTime: {
                type: GraphQLNonNull(GraphQLDateTime),
            },
            deliveryDistance: {
                type: GraphQLNonNull(GraphQLInt),
            },
            delivered: {
                type: GraphQLNonNull(GraphQLBoolean),
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
            return order.save();
        },
    },
    addCustomer: {
        args: {
            firstName: {
                type: GraphQLNonNull(GraphQLString),
            },
            lastName: {
                type: GraphQLNonNull(GraphQLString),
            },
            order: {
                type: GraphQLNonNull(GraphQLString),
            },
            location: {
                type: GraphQLNonNull(GraphQLString),
            },
            phoneNumber: {
                type: GraphQLNonNull(GraphQLString),
            },
            emailAddress: {
                type: GraphQLNonNull(GraphQLString),
            },
            customerId: {
                type: GraphQLNonNull(GraphQLInt),
            },
        },
        resolve(parent, args) {
            let customer = new Customer({
                firstName: args.firstName,
                lastName: args.lastName,
                order: args.order,
                location: args.order,
                phoneNumber: args.phoneNumber,
                emailAddress: args.emailAddress,
                customerId: args.customerId,
            });
            return customer.save();
        },
    },
    addRider: {
        args: {},
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
