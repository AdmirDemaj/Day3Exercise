const fastify = require ('fastify')
const fastifySwagger = require('@fastify/swagger')

const {ToDoRoute} = require('./routes/todos')


const build = (opts={}, optsSwagger={}) => {
    const app = fastify(opts)
    app.register(fastifySwagger,optsSwagger)
    app.register(ToDoRoute)
    return app
}

module.exports = {build}