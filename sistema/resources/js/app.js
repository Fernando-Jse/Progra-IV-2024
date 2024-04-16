import './bootstrap';
import { createApp } from 'vue';
import Dexie from 'dexie';
import registros from './components/Registrocomponent.vue';
window.db = '';

const app = createApp({
    components:{
        registros,
    },
    data(){
        return{
            forms:{
                registro:{mostrar:false},               
            }
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        },
        funcdb(){
            db = new Dexie("db_facturacion");
            db.version(2).stores({
                registros: 'idRegistro, nombre, apellido, edad, email, pass',
            });
        }
    },
    created(){
        this.funcdb();
    }
});
app.mount('#app');
