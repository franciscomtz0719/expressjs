const express = require('express')
const fsPromises = require("fs/promises")
const app = express()


// app.get("/koders/:id", async (request, response) => {

//     // Destructuracion
//     const { id } = request.params
//     const { mod, gen } = request.query
//     const koders = await fsPromises.readFile("koders.json", "utf8")
  
//     const kodersJson = JSON.parse(koders)
//     const koderEncontrado = kodersJson.alumnos.filter((koder) => {
//         return koder.id === parseInt(id)
//       })
    
//       if(!koderEncontrado.length) {
//         response.json("El koder no fue encontrado")
//         return;
//       }
    
//       response.json(koderEncontrado[0])
//     })
// app.listen(8080, () =>{
//     console.log('estamos escuhando desde servido express')
// })

app.get("/koders/:name", async (request, response) => {
    // Destructuracion
  
    const { mod} = request.query 
    const { name } = request.params
    console.log("mod", mod)
    const koders = await fsPromises.readFile("koders.json", "utf-8")
    const kodersJson = JSON.parse(koders) 

    const koderEncontrado = kodersJson.alumnos.filter((koder) => {

        if(koder.modulo === mod && koder.name === name){
            return koder
        }
           
      })
    
      if(!koderEncontrado.length) {
        response.json("El koder no fue encontrado")
        return;
      }
    

    response.json(koderEncontrado) 
  });

  app.listen(8080, () =>{
        console.log('estamos escuhando desde servido express')
    })