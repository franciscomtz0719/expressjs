/**
 * Crear endpoints donde tengamos un path param con el id para elegir a 
 * que koder le vamos a agregar una nueva key con sus hobbies
 * 
 * 
 * Ruta -> POST -> /koders/:id -> 1
 * 
 * Body : {
 *  hobby : "tenis"
 * }
 * 
 * Tenemos:
 * {
    "id": 1,
    "name": "Abraham",
    "gen": "19Js",
    "modulo": "Backend",
    "edad": 20
  },
  Que espero: 
  {
    "id": 1,
    "name": "Abraham",
    "gen": "19Js",
    "modulo": "Backend",
    "edad": 20
    "hobbies": ["tenis", "futbol", ""]
  },
 */

const { response, json } = require("express")
const express = require("express")
const fsPromises = require ("fs/promises")
const app = express()
app.use(express.json())

app.post("/koders/:id", async (request, response) =>{

  const {id} = request.params
  const {name, modulo , gen, edad, hobbie} =request.body
  const koders = await fsPromises.readFile("koders.json", "utf8")
  const kodersJson = JSON.parse(koders)
  const alumnos = kodersJson.alumnos
  const newAlumnos = [...alumnos]
  const koderEncontrado = alumnos.filter((koder)=>{
    return koder.id === parseInt(id)
  })

  let newId = newAlumnos.length + 1

  if(!koderEncontrado.length) {
    response.json( `El koder con id ${id} no fue encontrado y fue agregado el koder ${name} con el id ${newId}`)
    newAlumnos.push({
      id: newId,
      name: name,
      modulo: modulo,
      gen : gen,
      edad: edad,
      hobbie: hobbie
    })

    kodersJson.alumnos = newAlumnos
    await fsPromises.writeFile("koders.json", JSON.stringify(kodersJson, "\n", 4))
    
  }else{

    if (!koderEncontrado[0].hobbie){
      let objHobbie = {hobbie: hobbie}

      // Object.assign(koderEncontrado[0],objHobbie)

      let koderHob = koderEncontrado[0]
      koderHob["hobbie"] = hobbie
      
      console.log(koderEncontrado[0])
      
      await fsPromises.writeFile("koders.json", JSON.stringify(kodersJson, "\n", 4))
      
      response.json(koderEncontrado)
      
    }else{
      
      koderEncontrado[0].hobbie.push(String(hobbie))
      console.log(koderEncontrado[0])
    }
    
    // koderEncontrado.forEach(element =>{

    //   let objHobbie = {hobbie: hobbie}

    //   if (!element.hobbie){
    //     Object.assign(element ,objHobbie )
    //     return
    //   }



   // })

  
   await fsPromises.writeFile("koders.json", JSON.stringify(kodersJson, "\n", 4))
       
   response.json(koderEncontrado)


    
  }


})

app.listen(8080, () =>{
  console.log('estamos escuhando desde servido express')
})