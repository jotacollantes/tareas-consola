
//v4 es la funcion pero la renombro a uuidv4
const {v4: uudiv4} = require('uuid');

class Tarea {
    id='';
    desc='';
    completadoEn=null;

    constructor(desc){
        this.id= uudiv4();
        this.desc = desc;
        this.completadoEn=null;
    }
}
module.exports=Tarea;