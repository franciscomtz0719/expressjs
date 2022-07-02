const express = require('express')
const app = express()

const fsPromises = require('fs/promises')
const ruta = "ejercicio.txt"

const openFile = async () =>{

    const archivoAbierto = await fsPromises.readFile(ruta,'utf8')
    console.log(archivoAbierto)
    return archivoAbierto
}



app.get('/ejercicio', (request, response) =>{
    openFile()
    .then((archivoAbierto)=>{
        console.log('texto ejemplo 2')
        console.log(archivoAbierto)
        response.send( archivoAbierto  )
    })
    .catch((err)=>{
        response.send(err)
    })

})


app.listen(8080, ()=>{
    console.log('ya estamos escuchando nuestro servidor express ejercicio')
})