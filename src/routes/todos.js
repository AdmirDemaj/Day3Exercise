const { default: fastify } = require('fastify')
let todos = require('../ToDos')


const ToDo ={
        type:'object',
        properties: {
            id: {
                type:'string'
            },
            name:{
                type: 'string'
            },
            desc:{
                type:'string'
            }
        }
    }

    
const UpdateAndPost ={
    schema: {
        body: {
            type : "object",
            required: ["name", "desc"],
            properties: {
                name:{type: "string"},
                desc: {type: "string"},
            }
        },
        response: {
            201: ToDo
        }
    }
}




const getToDo = {
    schema:{
        response:{
            200: ToDo
        }
    }
}



const getToDos = {
    schema:{
        response:{
            
            200: {ToDo,
            type: 'array'}
        }
    }
}



const postToDo ={
   UpdateAndPost
}



const deleteToDo = {
    schema: {
        response:{
            200: {
                type: "object",
                properties: {
                    message: {type: "string"},
                }
            }
        }
    }
}


const updateToDo = {
    UpdateAndPost    
}



const ToDoRoute = (fastify, options, done) => {
    fastify.get('/',getToDos, function(request, reply){
        reply.send(todos)
    })


    fastify.get('/:id', getToDo, (request,reply) => {
        const {id} = request.params
        const todo = todos.find((todo) => todo.id === id)
    
        reply.send(todo)
    })


    fastify.post('/',postToDo, (request, reply) => {
        const {name, desc} = request.body
        const todo = {id: String(todos.length+1), name, desc}
        todos.push(todo)
        reply.code(201).send(todo)
    })


    fastify.delete('/:id', deleteToDo, (request, reply) => {
        const{id} = request.params
        todos = todos.filter((todo)=> todo.id !== id)
        reply.send(`ToDo with id ${id} got deleted`)
    })


    fastify.put('/:id', updateToDo, (request, reply) => {
        const{id} = request.params
        const{name, desc} = request.body
        const todo = todos.find((todo) => todo.id === id)
        todo.name = name
        todo.desc = desc
        reply.send(todo)
    })
    
    done()

}

module.exports = {ToDoRoute}