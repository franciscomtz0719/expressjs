const express = require("express");
const fsPromises = require("fs/promises");
const app = express()


app.get("/koders-modulo", async (request, response) => {
    const koders = await fsPromises.readFile("koders.json", "utf-8")
    const kodersJson = JSON.parse(koders)
    let studentModule = []
    
    kodersJson.alumnos.forEach(students =>{
        if (students.modulo === 'React'){

             studentModule.push( {
                name: students.name,
                modulo : students.modulo,
            })
            
        }
    })
    response.json(studentModule)

})


app.listen(8080, () => {
  console.log("Ya estamos escuchando desde nuestro servidor express");
})