//MILEYDY , CONEXION AL SERVIDOR ATRAVEZ DE UN PUERTO DE LOCALHOST

const express =require("express");
const morgan= require("morgan");
const app=express();
const PORT=3000;
app.use(morgan("dev"));
//
app.get("/par/:numero",(req,res)=>{
    const numero=Number(req.params.numero);
    if(numero % 2===0){
        res.send(`El Numero ${numero} es par`);
    }else{
        res.send(`El Numero ${numero} es impar`);
    }
});
//
app.get("/edad/:edad",(req,res)=>{
    const edad=parseInt(req.params.edad);
    if (edad<18){
        res.send("Eres menor de edad");
    }else{
        res.send("Eres mayor de edad");
    }
});
//EJERCCIO 3 CALCULADORRA
app.get("/calculadora/:operacion/:a/:b",(req,res)=>{
    const a =Number(req.params.a);
    const b=Number(req.params.b);
   
    switch (req.params.operacion) {
        case "suma": res.send(`Resultado:${a+b}`); break;
        case "resta": res.send(`Resultado:${a-b}`); break;
        case "multiplicacion": res.send(`Resultado:${a*b}`); break;
        case "division": res.send(`Resultado:${a/b}`); break;
    
        default:
            break;
    }
});
//EJERCIO 4 tabla de multiplicar
app.get("/tabla/:numero",(req,res)=>{
    const numero=Number(req.params.numero);
    res.send(`${numero} x1=${numero*1}<br>,
            ${numero} x2=${numero*2}<br>,
            ${numero} x3=${numero*3}<br>,
            ${numero} x4=${numero*4}<br>,
            ${numero} x5=${numero*5}<br>,
            ${numero} x6=${numero*6}<br>,
            ${numero} x7=${numero*7}<br>,
            ${numero} x8=${numero*8}<br>,
            ${numero} x9=${numero*9}<br>,
            ${numero} x10=${numero*10}
        
        `);
});
//EJEERCICIO 5 CALIFICACIÓN

app.get("/calificacion/:nota",(req,res)=>{
    const nota=Number(req.params.nota);

    if(nota>=90){
        res.send("EXELENTE");
    }else
     if(nota>=80){
        res.send("MUY BIEN");
    }else
    if(nota>=70){
        res.send("APROBADO");
    }else
    {
        res.send("REPROBADO");
    }


});



app.get("/",(req,res)=>{
    res.send("Hola mundo");
});
app.listen(PORT,()=>{
    console.log("Servidor Iniciado en http://localhost:"+PORT);
});