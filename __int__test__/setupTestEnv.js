
const {build} = require("../src/app")

const createTableSQL="CREATE TABLE IF NOT EXISTS todos ( id SERIAL, name VARCHAR(200),description VARCHAR(500), gross_amount NUMERIC, net_amount NUMERIC, exluded_vat_amount NUMERIC, PRIMARY KEY(id));";
 

const clearTableSQL = "DELETE FROM todos";

const insertFakeItemSQL = "INSERT INTO todos (name, description, gross_amount, net_amount, exluded_vat_amount) VALUES($1, $2, $3, $4, $5)";

module.exports = function setUpTestEnv(){
    const app = build({logger: true}, 
        {},
        {connectionString: 'postgres://postgres:postgres@localhost:5432/postgres_test'})

        beforeAll(async ()=> {
            await app.ready()
            await app.pg.query(createTableSQL)
            await app.pg.query(clearTableSQL)

        })

        beforeEach(async () => {
            await app.pg.query(insertFakeItemSQL,["Test Todo", "This is a test item", 20, 16.67, 3.33])
        })

        afterEach(async () =>{
            await app.pg.query(clearTableSQL)
        })

        afterAll(async () =>{
            app.close()
        })
        return app

    }
