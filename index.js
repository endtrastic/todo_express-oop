import express from 'express'
import bodyParser from 'body-parser'


const app = express()
app.use(bodyParser.json())


app.get('/json-test', (req, res) =>{
    res.send({
        message: 'Json test workds'
    })
})

const port = 3007;
app.listen(port, () => {
  console.log(`Server is connected at: http://localhost:${port}/json-test`);
});