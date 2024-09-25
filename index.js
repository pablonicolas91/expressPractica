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

app.get("/materiasCursadas", (req, res)=> {
    res.send(materiasCursadas)
    console.log(materiasCursadas)
})

app.get("/materiasCursadas/:codIdentificacion", (req,res) =>{
    const { codIdentificacion: codID } = req.params
    const objetoConId = materiasCursadas.filter((el) => el.codIdentificacion == codID)

    if (!objetoConId.length > 0) {
        res.send({code:404, message:`Error, no existe materia ${codID}`})
    }    
    else {
        res.send(objetoConId)
        console.log(objetoConId)
    }
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

app.on("Error", (error) => {
    console.log("Se generó error ", error)
})