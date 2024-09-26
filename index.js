import express from "express"

const app = express()
const PORT = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())


const materiasCursadas = [
    {
        codIdentificacion: "TP2",
        nombre: "Taller de programacion 2",
        cuatrimestre: 3
    },
    {
        codIdentificacion: "PNT2",
        nombre: "Programacion en nuevas tecnologias 2",
        cuatrimestre: 3
    },
    {
        codIdentificacion: "P2",
        nombre: "Programacion 2",
        cuatrimestre: 3
    }

]
//GET SIN PARAMETROS
app.get("/materiasCursadas", (req, res)=> {
    res.send(materiasCursadas)
    console.log(materiasCursadas)
})
//GET CON PARAMETROS
app.get("/materiasCursadas/:codID", (req,res) =>{
    const { codID } = req.params
    const objetoConId = materiasCursadas.filter((el) => el.codIdentificacion == codID)

    if (!objetoConId.length > 0) {
        res.send({code:404, message:`Error, no existe materia ${codID}`})
    }    
    else {
        res.send(objetoConId)
        console.log(objetoConId)
    }
})

//POST
app.post("/materiasCursadas", (request, response) => {
    const nuevaMateria = request.body
    const matBuscada = materiasCursadas.find( m => m.codIdentificacion == nuevaMateria.codIdentificacion)
    if (matBuscada == null) {
        console.log("Nueva Materia agregada:", nuevaMateria)
        materiasCursadas.push(nuevaMateria)
        response.send(nuevaMateria)
    }
    else {
       response.send({code:505, message: "Ya hay un elemento con este id"})
    }
})

//DELETE
app.delete("/materiasCursadas/:codId", (req, res)=> {
    const { codId } = req.params
    const indexMateria = materiasCursadas.findIndex((mat) => mat.codIdentificacion == codId)
    
    if (!(indexMateria == -1)){
        materiasCursadas.splice(indexMateria, 1)
        res.send({message:"Materia eliminada exitosamente", id: codId})
        console.log("\nMaterias restantes",materiasCursadas)
    } 
 
    else res.send({code: 404, mensaje: "No exista elemento con ese id"})
    
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

app.on("Error", (error) => {
    console.log("Se generó error ", error)
})