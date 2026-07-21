
//////////conexion de un api 
//constantes paramandar a llamar sus paqutes(importar)
const express =require("express");
const morgan =require("morgan");
/////////////// nuev aconstante para que mabdar a llamr los paquetes instaladoos de (npm install mongose)
// 20 de julio del 2026
const mongoose=require("mongoose");

//Acceder a los metodos de expresas dentro de la constante anterior
const app=express();

//////////////////////////////// Va poder recibir formato json-15 DE JULIO DEL 2026
app.use(express.json());


//PUERTO QUE SE OCUPARA PARA EL SERVIDOR
const PORT=3000;
app.use(morgan("dev"));

///// conexion con la base de datos desde mongo// 20 de julio del 2026

mongoose.connect("mongodb://127.0.0.1:27017/escuela")
.then(()=>{
    console.log("Conectado correctamentea MongoDB");
})
.catch((error)=>{
    console.log("Error al conectarse con MongoDB; ",error);
});
///CREACION DE de esquema de alumnos , con sus elemenetos
const alumnoSchema= new mongoose.Schema(
    {
        nombre:{type:String, required:true, trim:true},
        carrera:{type:String, required:true, trim:true},
        semestre:{type:Number,required:true, min:1}
    },{
        timestamps:true
    }
);

const Alumno=mongoose.model("Alumno",alumnoSchema,"alumnos");
//nueva ruta --20 de julio del 2026
app.get("/alumnos",async(req,res)=>{
    try{
        const alumnos=await Alumno.find();
        res.json(alumnos);
    }catch(error){
        res.status(500).json({
            mensaje:"Error al obtener los alumnos",
            error:error
        });
    }
});

///////////////////////////////////creacion de un arreglo-15 DE JULIO DEL 2026


app.get("/alumnos/:id",async(req,res)=>{
    try{
        const id=req.params.id;
    const alumno=await Alumno.findById(id);
    if(!alumno){
        return res.status(404).json({
            mensaje:"Alumno no encontrado"
        });
    }
    res.json(alumno);
    }catch(error){
       res.status(500).json({
            mensaje:"Error al obtener los alumnos",
            error:error
        });
    }
});
/*app.get("/alumnos/:id",(req,res)=>{
    const id=Number(req.params.id);
    const alumno=alumnos.find(alumno=> alumno.id===id);

    if(!alumno){
        return res.status(404).json({
            mensaje:"Alumno no encontrado"
        });
    }
    res.json(alumno);
});*/
//////////////***************POST****agregar nuevo alumno*****************************15 de julio del 2026** */
app.post("/alumnos",async (req,res)=>{
       try{
         const{nombre,carrera,semestre}=req.body;
        if(!nombre || !carrera|| !semestre){
            return res.status(404).json({
                mensaje:"Faltan datos del estudiante"
            });
        }

       const nuevoAlumno =new Alumno({
            nombre,carrera,semestre
       });
       const alumnoGuardado=await nuevoAlumno.save();
        res.json({
            mensaje:"Alumno Registrado correctamente",
            alumno:alumnoGuardado
        });

       }catch(error){
            res.status(500).json({
            mensaje:"Error al agregar alumno",
            error:error
        });
       }
});
///////////////////////////////PUT///-actualizar alumno/////////////////15 de julio del 2026
app.put("/alumnos/:id",async(req,res)=>{
    try{
        const id=req.params.id;
         const{nombre,carrera,semestre}=req.body;

        if(!nombre || !carrera|| !semestre){
            return res.status(404).json({
                mensaje:"Faltan datos del estudiante"
            });
        }
       const alumnoActualizado=await Alumno.findByIdAndUpdate(
            id,
            {nombre,carrera,semestre},
            {new:true,runValidators:true}
       );
       if(!alumnoActualizado){
            return res.status(404).json({
                mensaje:"Alumno no encontrado"
            });
       }
        res.json({
            mensaje:"Alumno actualizado correctamente",
            alumno:alumnoActualizado
        });
    }catch(error){
        res.status(500).json({
            mensaje:"Error al Actualizar alumno",
            error:error
        });
    }
    
});
///////////////////16 de julio del2026///DELETE  , ELIMINACION D
app.delete("/alumnos/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const alumnoEliminado=await Alumno.findByIdAndDelete(
            id
        );
        if(!alumnoEliminado){
            return res.status(404).json({
                mensaje:"Alumno no encontrado"
            });
       }
    res.json({
        mensaje:"Alumno Eliminado correctamente",
        alumno:alumnoEliminado
    });
    }catch(error){
        res.status(500).json({
            mensaje:"Error al Eliminar alumno",
            error:error
        });
    }
});

/////////////////////////////////////////////fn 15 DE JULIO DEL 2026///////////////////


app.get("/",(req,res)=>{
    res.send("Hola mundo");
});

app.get("/mensaje",(req,res)=>{
    res.send("Mensaje desde Express");
});

app.get("/pagina",(req,res)=>{
    const nombre="Mileydy";
    res.send(`
            <style>
                .p1{
                    color:red;
                    background:blue;
                }
            </style>
            <h1>Mi pagina WEB</h1>
            <p class="p1">Creada con Express</p>
            <p> Hola ${nombre}</p>
            
        `);
});
// creacion de la pagina /alumno en donde devuelve en formato json
//app.get("/alumno",(req,res)=>{
   // res.json({
       /*     nombre:"Mileydy",
            carrera:"ISC",
            semestre:9
  });
//});*/
// paginas de materias en donde devuelve json
app.get("/materias",(req,res)=>{
    res.json([
        {nombre:"NoSQL", hora:"8:00-11:00"},
        {nombre:"Programcion web", hora:"14:00-17:00"},
        {nombre:"Ing Software", hora:"6:00-8:00"},

    ]);
});
// colocar una variable en la pagina , para colocar el nombre 
app.get("/mensaje/:nombre",(req,res)=>{
    res.send(`Hola ${req.params.nombre}`);
});
app.get("/suma/:a/:b",(req,res)=>{
    const a= parseInt(req.params.a);//constante de numero 
    const b= Number(req.params.b);
    res.send(`Resultado: ${a+b}`);
});
app.get("/multiplicar/:a/:b",(req,res)=>{
    const a=Number(req.params.a);
    const b=Number(req.params.b);
    res.send(`Resultado:${a*b}`);
});

app.get("/aleatorio",(req,res)=>{
    const numero=Math.floor(Math.random()*100)+1;
    res.send(`Numero Aleatorio: ${numero}`);
});
//assignar el puerto a la pagina desde localhost
app.listen(PORT,()=>{
    console.log("Servidor iniciado en http://localhost:"+PORT);
});