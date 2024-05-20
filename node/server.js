const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http,{
        allowEIO3:true,
        cors:{
            origin:['http://localhost'],
            credential:true
        }
    }),
    { MongoClient, ObjectId } = require('mongodb'),
    url = 'mongodb://127.0.0.1:27017',
    client = new MongoClient(url),
    dbname = 'chatUGB',
    port = 3001;
app.use(express.json());

async function conectarMongoDb(){
    await client.connect();
    return client.db(dbname);
}
app.get('/', (req, resp)=>{
    resp.sendFile(__dirname + '/index.html');
});
app.get('/usuarios/listar',async(req, resp)=>{
    let db = await conectarMongoDb(),
        collection=db.collection('usuarios');
    let result = await collection.find({
        $or: [
            {nombre: new RegExp(req.query.valor, 'i')},
            {usuario: new RegExp(req.query.valor, 'i')}
        ]
    }).toArray();
    resp.send(result);
});
app.post('/usuarios/guardar',async(req, resp)=>{
    let db = await conectarMongoDb(),
        collection=db.collection('usuarios'),
        result = {};
    if( req.body.accion == 'nuevo' ){
        result = await collection.insertOne(req.body.usuario);
    }else if( req.body.accion == 'modificar' ){
        result = await collection.updateOne({ _id: new ObjectId(req.body.idUsuario) }, { $set: req.body.usuario });
    }else if( req.body.accion == 'eliminar' ){
        result = await collection.deleteOne({ _id: new ObjectId(req.body.idUsuario) });
    }
    resp.send(result);
});
http.listen(port, event=>{
    console.log("Server ejecutado en el puerto", port);
});