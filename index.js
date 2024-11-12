// Easier to change the port when it is used by someone else
const port = 3007;
import express from 'express'
import bodyParser from 'body-parser'
import todoRoutes from './routes/todos.js'


const app = express()
app.use(bodyParser.json())

app.use(express.urlencoded({extended: true}))

app.use('/todos', todoRoutes)

app.listen(port, () => {
  console.log(`Server is connected at: http://localhost:${port}/`);
});