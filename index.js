const express = require('express')
const app = express()

app.get('/hola', (request, response) =>{
    response.write('hola desde mi enpoint /hola')
    response.end()
})
app.get('/adios', (request, response) =>{
    response.send('estamos haciendo un post desde aqui')
})

app.listen(8080, ()=>{
    console.log('ya estamos escuchando nuestro servido express')
})