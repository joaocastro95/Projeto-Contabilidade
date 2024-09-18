import express from 'express'

const app = express();
const PORT = 3000;


app.listen(PORT,() => {
  console.log("esta funfando 3000");
})

app.get('/', (req,res) => {
    res.send("ta dando otimo")
})

