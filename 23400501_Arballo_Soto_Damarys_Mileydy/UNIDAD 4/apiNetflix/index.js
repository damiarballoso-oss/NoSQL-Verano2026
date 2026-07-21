//Mandar a llamar los paquetes instalados
const express= require("express");//permite crer el servidor y las rutas
const morgan = require("morgan");//mueestra en la terminal las peticiones 
const mongoose=require("mongoose");//comunicacion entre el codigo java y la base de dtaos MongoDB

const app=express();
app.use(express.json());
app.use(morgan("dev"));
const PORT=3000;

//Conexion al servidor externo 
mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix")
.then(()=>{
    console.log("Conectado correctamentea MongoDB atlas(servidor externo)");
})
.catch((error)=>{
    console.log("Error al conectarse con MongoDB(servidor externo); ",error);

});
//CREACION DEL ESQUEMA FIJO DE LO CUAL SE 
// VALIDA QUE TIPO DE DATOS SE DEBEN DE VALIDAR U QUE DOCUMENTOS UTLIZAR
const peliculaSchema=new mongoose.Schema({
    titulo:{type:String, required:true},
    genero: { type: String, required: true, trim: true },
    año: { type: Number, required: true },
    duracion: { type: Number, required: true },
    idioma: { type: String, required: true, trim: true },
    calificacion: { type: Number, required: true },
    nc: { type: String, required: true }
}, {
    timestamps: true
});
const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");
const serieSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    genero: { type: String, required: true, trim: true },
    año: { type: Number, required: true },
    temporadas: { type: Number, required: true },
    episodios: { type: Number, required: true },
    idioma: { type: String, required: true, trim: true },
    calificacion: { type: Number, required: true },
    nc: { type: String, required: true }
},{
    timestamps: true
});
const Serie = mongoose.model("Serie", serieSchema, "series");


// ================= RUTAS PELICULAS =================

// GET todas las peliculas
app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las peliculas", error });
    }
});

// GET pelicula por id
app.get("/peliculas/:id", async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) {
            return res.status(404).json({ mensaje: "Pelicula no encontrada" });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la pelicula", error });
    }
});
// GET pelicula por nc
app.get("/peliculas/nc/:nc", async (req, res) => {
    try {
        const pelicula = await Pelicula.find({ nc: req.params.nc });
        if (!pelicula) {
            return res.status(404).json({ mensaje: "Pelicula no encontrada" });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar la pelicula", error });
    }
});

///////////==========================================RUTAS SERIES
//GET de todas las series
app.get("/series",async(req,res)=>{
    try{
            const series=await Serie.find();
            res.json(series);

    }catch(error){
        res.status(500).json({
            mensaje:"Error al obtener todas las series de la base de datos Netflix",
            error:error
        });
    }
});

// GET serie por id
app.get("/series/:id", async (req, res) => {
    try {
        const serie = await Serie.findById(req.params.id);
        if (!serie) {
            return res.status(404).json({ mensaje: "Serie no encontrada" });
        }
        res.json(serie);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la serie", error });
    }
});





//conexion del puert
app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});