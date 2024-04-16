<template>
    <div>
        <!-- Loader -->
        <div v-if="showLoader" class="terminal-loader">
          <div class="terminal-header">
            <div class="terminal-title">Status</div>
            <div class="terminal-controls">
              <div class="control close"></div>
              <div class="control minimize"></div>
              <div class="control maximize"></div>
            </div>
          </div>
          <div class="text">Loading...</div>
        </div>
        
        <div v-if="!showLoader" class="row">
            <div class="col col-md-5">
                <div class="card">
                    <div class="card-header text-bg-dark">REGISTRO DE USUARIOS</div>
                    <div class="catd-body">
                        <form id="frmRegistro" @reset.prevent.default="nuevoRegistro" @submit.prevent.default="guardarRegistro">
                            <div class="row p-1">
                                <div class="col col-md-3">NOMBRE</div>
                                <div class="col col-md-4">
                                    <!--v-select-categoria required v-model="inscripcion.categoria" 
                                        :options="categorias">Por favor seleccione una categoria</!--v-select-categoria-->
                                        <input v-model="registro.nombre" required type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-3">APELLIDO</div>
                                <div class="col col-md-5">
                                    <input v-model="registro.apellido" required type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-3">EDAD</div>
                                <div class="col col-md-8">
                                    <input v-model="registro.edad" required type="text" class="form-control" @input="soloNumeros">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-3">EMAIL</div>
                                <div class="col col-md-4">
                                    <input v-model="registro.email" required type="text" class="form-control">
                                </div>
                            </div>  
                            <div class="row p-1">
                                <div class="col col-md-3">CONTRASEÑA</div>
                                <div class="col col-md-4">
                                    <input v-model="registro.pass" required type="password" class="form-control">
                                </div>
                            </div>                       
                            
                            <div class="row p-3">
                                <div class="col d-flex justify-content-center">
                                    <button @click.prevent.default="guardarRegistro" class="btn btn-success">GUARDAR</button>
                                    <span style="margin-right: 30px;"></span>
                                    <button @click.prevent.default="nuevoRegistro" class="btn btn-warning">NUEVO</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col col-md-7">
                <div class="card text-bg-white">
                    <div class="card-header text-bg-dark">LISTADO DE USUARIOS</div>
                    <div class="card-body">
                        <form id="frmRegistro">
                            <table class="table table-white table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="nombre, apellido, edad, email, pass" type="search" v-model="valor" @keyup="buscarRegistro" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        
                                        <th>NOMBRE</th>
                                        <th>APELLIDO</th>
                                        <th>EDAD</th>
                                        <th>EMAIL</th>
                                        <th>PASS</th>
                                        <th></th>                                 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarRegistro(registro)" v-for="registro in registros" :key="registro.idRegistro">
                                        <td>{{registro.nombre}}</td>
                                        <td>{{registro.apellido}}</td>
                                        <td>{{registro.edad}}</td>
                                        <td>{{registro.email}}</td>
                                        <td>{{registro.pass}}</td>
                                        
                                        <td><button @click.prevent.default="eliminarRegistro(registro.idRegistro)" class="button">
                                            <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    <script>
    import axios from "axios";
    import alertify from "alertifyjs";
    
    export default {
        data() {
            return {
                showLoader: true,
                valor:'',
                registros:[],
                accion:'nuevo',
                registro:{
                    
                    idRegistro: new Date().getTime(),
                    nombre:'',
                    apellido:'',
                    edad:'',
                    email:'',
                    pass:'',
                    
                },
                isLoading: false
            }
        },
        mounted() {
            // Simula un tiempo de carga de 3 segundos
            setTimeout(() => {
                this.showLoader = false;
                this.abrirFormulario();
            }, 3000);
        },
        methods:{
            abrirFormulario() {
            // iniciar la carga de datos
            this.isLoading = true;
            // Simular una carga de datos
            setTimeout(() => {
                this.isLoading = false; // Ocultar la pantalla de carga después de un tiempo
            }, 2000); // Ejemplo: ocultar la pantalla de carga después de 2 segundos
        },
            buscarRegistro(e){
                this.listar();
            },
            soloNumeros(event) {
            const input = event.target;
                input.value = input.value.replace(/\D/g, '');
                if (input.value.length > 10) { //Longitud de 10
            input.value = input.value.slice(0, 10); // Limita el valor a 10 caracteres
        }
            },
            async eliminarRegistro(idRegistro){
                    if( confirm(`Esta seguro de eliminar la inscripcion?`) ){
                        this.accion='eliminar';
                        await db.registros.where("idRegistro").equals(idRegistro).delete();
                        axios({
                            url: 'registros',
                            method: 'DELETE',
                            data: {idRegistro}
                        }).then(resp=>{
                            if( resp.data.msg==='ok' ){
                                alertify.success('Inscripcion eliminada con exito');
                            }else{
                                alertify.error(`Error: ${resp.data.msg}`);
                            }
                        }).catch(err=>{
                            alertify.error(`Error: ${err}`);
                        })
                        this.nuevoRegistro();
                        this.listar();
                    }
            },
            modificarRegistro(registro){
                this.accion = 'modificar';
                this.registro = registro;
                this.codigoOriginal = registro.email;
            },
            async guardarRegistro() {
        // Eliminar espacios en blanco al inicio y al final de los campos
        this.registro.nombre = this.registro.nombre.trim();
        this.registro.apellido = this.registro.apellido.trim();
        this.registro.edad = this.registro.edad.trim();
        this.registro.email = this.registro.email.trim();
        this.registro.pass = this.registro.pass.trim();
    
        // Validar que no haya campos en blanco
        if (
            this.registro.nombre === '' ||
            this.registro.apellido === '' ||
            this.registro.edad === '' ||
            this.registro.email === ''||
            this.registro.pass === ''
        ) {
            alertify.error('Por favor llene todos los campos');
            return;
        }
    
        try {
            // Verificar si el código de inscripción ya existe
            let existingRegistro = null;
            if (this.accion === 'modificar') {
                existingRegistro = await db.registros
                    .where('email')
                    .equals(this.registro.email)
                    .and(registro => registro.idRegistro !== this.registro.idRegistro)
                    .first();
            } else {
                existingRegistro = await db.registros
                    .where('email')
                    .equals(this.registro.email)
                    .first();
            }
    
            // Si existe una inscripción con el mismo código y no es el mismo registro que se está modificando
            if (existingRegistro) {
                alertify.error('El email de usuario ya está en uso.');
                return;
            }
    
            // Guardar o actualizar la inscripción en IndexedDB
            let registroToSave = { ...this.registro }; // Copia superficial del objeto
            if (this.accion === 'modificar') {
                await db.registros.update(this.registro.idRegistro, registroToSave);
            } else {
                await db.registros.add(registroToSave);
            }
    
            // Guardar o actualizar la inscripción en el servidor
            let method = 'POST';
            if (this.accion === 'modificar') {
                method = 'PUT';
            }
    
            const resp = await axios({
                url: 'registros',
                method,
                data: registroToSave
            });
    
            if (resp.data.msg === 'ok') {
                alertify.success('Usuario guardado con éxito');
            } else {
                alertify.error(`Error: ${resp.data.msg}`);
            }
    
            // Limpiar el formulario y actualizar la lista de inscripciones
            this.nuevoRegistro();
            this.listar();
        } catch (error) {
            console.error('Error al guardar o actualizar el usuario:', error);
            alertify.error('Error al guardar o actualizar el usuario. Por favor, inténtelo de nuevo.');
        }
    },
            nuevoRegistro(){
                this.accion = 'nuevo';
                this.registro = {
                    idRegistro: new Date().getTime(),
                    nombre:'',
                    apellido:'',
                    edad:'',
                    email:'',
                    pass:''
                    
                }
            },
            async listar(){
                    let collections = db.registros.orderBy('nombre')
                    .filter(registro=>registro.nombre.includes(this.valor) ||
                        registro.apellido.toLowerCase().includes(this.valor.toLowerCase()) ||
                        registro.edad.toLowerCase().includes(this.valor.toLowerCase()) ||
                        registro.email.toLowerCase().includes(this.valor.toLowerCase()) ||
                        registro.pass.toLowerCase().includes(this.valor.toLowerCase()));
                    this.registros = await collections.toArray();
                    if( this.registros.length<=0 ){
                        let respuesta = await fetch('registros'),
                            data = await respuesta.json();
                        this.registros = data;
                        db.registros.bulkPut(data);
                    }
                }
        }
    }
    </script>
    <!-- Loader estilo -->
    <style>
    .fade-out {
      animation: fadeOutAnimation 1s forwards;
    }
    
    @keyframes fadeOutAnimation {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    
    @keyframes blinkCursor {
      50% {
        border-right-color: transparent;
      }
    }
    
    @keyframes typeAndDelete {
      0%,
      10% {
        width: 0;
      }
      45%,
      55% {
        width: 6.2em;
      }
      90%,
      100% {
        width: 0;
      }
    }
    
    .terminal-loader {
      border: 0.1em solid #333;
      background-color: #1a1a1a;
      color: #0f0;
      font-family: "Courier New", Courier, monospace;
      font-size: 1em;
      padding: 1.5em 1em;
      width: 12em;
      margin: 100px auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    
    .terminal-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1.5em;
      background-color: #333;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 0 0.4em;
      box-sizing: border-box;
    }
    
    .terminal-controls {
      float: right;
    }
    
    .control {
      display: inline-block;
      width: 0.6em;
      height: 0.6em;
      margin-left: 0.4em;
      border-radius: 50%;
      background-color: #777;
    }
    
    .control.close {
      background-color: #e33;
    }
    
    .control.minimize {
      background-color: #ee0;
    }
    
    .control.maximize {
      background-color: #0b0;
    }
    
    .terminal-title {
      float: left;
      line-height: 1.5em;
      color: #eee;
    }
    
    .text {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      border-right: 0.2em solid green; /* Cursor */
      animation: typeAndDelete 4s steps(11) infinite,
        blinkCursor 0.5s step-end infinite alternate;
      margin-top: 1.5em;
    }
    </style>
    <!-- Estilo de boton eliminar -->
    <style>
    .button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgb(20, 20, 20);
      border: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
      cursor: pointer;
      transition-duration: .3s;
      overflow: hidden;
      position: relative;
    }
    
    .svgIcon {
      width: 12px;
      transition-duration: .3s;
    }
    
    .svgIcon path {
      fill: white;
    }
    
    .button:hover {
      width: 140px;
      border-radius: 50px;
      transition-duration: .3s;
      background-color: rgb(255, 69, 69);
      align-items: center;
    }
    
    .button:hover .svgIcon {
      width: 50px;
      transition-duration: .3s;
      transform: translateY(60%);
    }
    
    .button::before {
      position: absolute;
      top: -20px;
      content: "Delete";
      color: white;
      transition-duration: .3s;
      font-size: 2px;
    }
    
    .button:hover::before {
      font-size: 13px;
      opacity: 1;
      transform: translateY(30px);
      transition-duration: .3s;
    }
    </style>