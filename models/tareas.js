const Tarea=require('./tarea')
/*
_listado:
        {'uuid-1234567-45677':{id:12, descripcion:jasdjljlasdlasdj,completadoEn:75576565}},
        {'uuid-1234567-45677':{id:12, descripcion:jasdjljlasdlasdj,completadoEn:75576565}},
        {'uuid-1234567-45677':{id:12, descripcion:jasdjljlasdlasdj,completadoEn:75576565}}

*/

class Tareas {
    _listado={};
     
    
    //creo un getter
    get listadoArr() {
        const listado=[];
        //

        //Object.keys() devuelve una lista o arreglo con los ID enumerables de un arreglo que se le envia como parametro. por ejemplo:
        
            // {
            //     'dab18506-2de4-479b-880a-5d5995a3c840':
            //     {
            //         id:'dab18506-2de4-479b-880a-5d5995a3c840',
            //         desc:'Hacer mantequillas',
            //         completadoEn:null
            //     },
            //     'f2e07fb4-6af1-460e-8303-6f411752e68b':
            //     {
            //         id:'f2e07fb4-6af1-460e-8303-6f411752e68b',
            //         desc:'ir al crossfit',
            //         completadoEn:null
            //     }
            // }    
        //El Object.keys devolvera lo siguiente:
        //'dab18506-2de4-479b-880a-5d5995a3c840'
        //'f2e07fb4-6af1-460e-8303-6f411752e68b'

        Object.keys(this._listado).forEach(key=>{
                // Aqui obtengo la tarea por medio de su id y lo grabo en la variable tarea
                // Lo que obtengo es lo siguiente:
                // {
                // id:'dab18506-2de4-479b-880a-5d5995a3c840',
                // desc:'Hacer mantequillas',
                // completadoEn:null
                // },
                // {
                // id:'dab18506-2de4-479b-880a-5d5995a3c840',
                // desc:'Ir al Crossfit',
                // completadoEn:null
                // }
                const tarea=this._listado[key];
                //el contenido de la variable lo asigno al array listado[]
                listado.push(tarea);
            });  
        return listado;
        };



    constructor()
    {
        this._listado={};
    }

    borrarTarea(id='')
    {
        if (this._listado[id])
        {
            delete this._listado[id];
        }
    }




    cargarTareasFromFile(tareas=[]) {

        tareas.forEach(tarea =>{
            //Comienzo a llenar el arreglo _listado
            this._listado[tarea.id]=tarea;
        })

    }


    crearTarea(desc=''){
        const tarea=new Tarea(desc)
        //Grabamos la tarea junto con la propiedad uuid en el listado y quedara algo asi:
        //_listado={"uuid-1234567-45677":{"uuid-1234567-45677":"Nombre de tarea"}}
        this._listado[tarea.id]=tarea;
    }

    //listadoCompleto(tareas=[])
    listadoCompleto()
    {
       
        //console.log(this.listadoArr);
        console.log('\n')
        let contTarea=1;
        let status="";
        let id='';
        this.listadoArr.forEach(tarea =>{
            
            id=`${contTarea}`.green

            // if(!tarea.completadoEn)
            // {
            //     status="Pendiente".red
            // }
            // else
            // {
            //     status= "Completada".green
            // } 
            //Operacion ternaria
            status=(!tarea.completadoEn) ? "Pendiente".red : status= "Completada".green
            //contTarea=`${contTarea+1}`.green;
            console.log(`${id} ${tarea.desc} :: ${status}`);
            ++contTarea;
        })

    }

    listadoTareasPorStatus(completado=true)
    {


        console.log('\n')
        let contTarea=1;
        let status="";
        let id='';
        let descTarea='';
        let fechaCompletado='';
        this.listadoArr.forEach(tarea =>{
            
            if (completado)
            {
                if (tarea.completadoEn)
                {
                    id=`${contTarea}.`.green
                    descTarea=`${tarea.desc}`
                    fechaCompletado=`${tarea.completadoEn}`.green

                    //tambien puedo usar ${contTarea.toString().green}
                    console.log(`${id} ${descTarea} :: ${fechaCompletado}`);
                    ++contTarea;
                }
                
            }
            else
            {
                
                if (!tarea.completadoEn)
                {
                    id=`${contTarea}.`.red
                    descTarea=`${tarea.desc}`
                    console.log(`${id} ${descTarea} `);
                    ++contTarea;
                }
            }   
            //console.log(`${id} ${descTarea} `);
            


            //++contTarea;
        })

    }


    toggleCompletadas(ids=[]){
    ids.forEach( id =>{

        const tarea=this._listado[id];
        //Pregunto si no esta completada
        if (!tarea.completadoEn)
        {
            tarea.completadoEn=new Date().toISOString();
        }

    }

    );
    
    //Si yo desmarco una tarea como completada o sea que queda pendiente, la tarea va a seguir apareciendo en tareas completadas para eso hay que ejecutar la siguiente funcion.
    //Llamo al getter
    this.listadoArr.forEach(tarea => {
        //el arreglo ids tiene las tareas marcadas como completadas.
        //Busco en el listado de tareas marcadas como completada, cada una de las tareas de listadoArr
        //SI no esta en el listdado ids de completados, marco el campo completadoEn=null
        if (!ids.includes(tarea.id))
        {
            //Primero recupero la tarea del _listado segun el id de la tarea que esta marcada como completada
            const tareaParaModificar=this._listado[tarea.id];
            //actualizo en null, el campo completadoEn de la tarea 
            tareaParaModificar.completadoEn=null;
        }
    


    })

    

    }

}

module.exports=Tareas;