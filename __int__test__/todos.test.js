
const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Integretion tests for CRUD operations connected to test postgres ", async () =>{
    test("Should create an todo via POST route", async() => {
        const todo = {
            name: 'Test todo 2',
            description: 'This is a test todo',
            gross_amount: 20
            
        }
        const response = await app.inject({
            method: "POST",
            url: "/v2/",
            payload: todo
        })

        expext(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(todo)
    })
})
