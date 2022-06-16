
const vatCalculator = require('../../utils/vatCalculator')


const todos = require("../todos");

const ToDo ={
    type:'object',
    properties: {
        id: {
            type:'string'
        },
        name:{
            type: 'string'
        },
        description:{
            type:'string'
        },
        gross_amount: {
            type: 'number'
        }
        
    }
}
   
const postToDo ={
        schema: {
            body: {
                type : "object",
                required: ["name", "description", "gross_amount"],
                properties: {
                    name:{type: "string"},
                    description: {type: "string"},
                    gross_amount: {type: 'number'}
                    
                }
            },
            response: {
                201: ToDo
            }
        }
    }




const todoRoute_v2 = async(fastify, options, done) => {


    fastify.get('/', async (request, reply) => {
        try{
            const {rows} = await fastify.pg.query("SELECT * FROM todos")
            reply.send(rows)
        }catch(error){
            reply.send(error)
        
        } 
        
    })

    fastify.get('/:id', async(request, reply) => {
        try{
    const {id} = request.params
    const {rows} = await fastify.pg.query("SELECT * FROM todos WHERE id=$1", [id])
    reply.send(rows[0])
        }catch{
    reply.send(error)
        }
    })



 fastify.post('/',postToDo, async(request, reply)=>{
        try{
            const client = await fastify.pg.connect();

            const{name, description, gross_amount} = request.body;

            const netAmount = vatCalculator.calculateNetAmount(gross_amount)

            const vatAmount = vatCalculator.calculateVAT(netAmount)

            const {rows} = await fastify.pg.query("INSERT INTO todos (name, description, gross_amount, net_Amount, excluded_vat_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, description, gross_amount, netAmount, vatAmount]);

            reply.code(201).send(rows[0]);

        }catch(err){
            reply.send(err);
        }finally{
            client.release();
        }

    })

    fastify.put('/:id', async(request, reply)=> {
        try{
    const {id} = request.params
    const{name, description} = request.body
    const{rows} = await fastify.pg.query("UPDATE todos SET name=$1, description=$2 WHERE id=$3 RETURNING *", [name, description, id] )
    
    reply.send(rows[0])
        }catch(error){
    reply.send(error)
        }
    })

    fastify.delete('/:id', async(request, reply) => {
        try{
    const{id} = request.params
    await fastify.pg.query("DELETE FROM todos WHERE id=$1", [id])
    
    reply.send(`Item with id ${id} has been deleted`)
        }catch(error) {
            reply.send(error)
    
        }
    })

 done();
}


module.exports = {todoRoute_v2}

