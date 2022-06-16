const fastify = require ('fastify')
const fastifySwagger = require('@fastify/swagger')
const fastifyPostgres = require('@fastify/postgres')

const {ToDoRoute} = require('./routes/todos')
//const {itemRoute} = require('./routes/items')
const {todoRoute_v2} = require('./routes/v2/todos')


const build = (opts={}, optsSwagger={}, optsPostgres={}) => {
    const app = fastify(opts)
    app.register(fastifyPostgres,optsPostgres)
    app.register(fastifySwagger,optsSwagger)
    app.register(ToDoRoute, {prefix: '/v1'})
   // app.register(ToDoRoute, {prefix: '/v1'})
   app.register(todoRoute_v2, {prefix: '/v2'})
    return app
}

module.exports = {build}