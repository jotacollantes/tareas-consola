
require('colors');
const { guardarDB,leerDB } = require('./helpers/guardarArchivos');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu, pausa,leerInput,listadoTarreasBorrar,confirmar,mostrarListadoChecklist } = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//console.clear()

const main=async() => {

    

    let opt='';
    const tareas=new Tareas();
    const tareasDB=leerDB();

    if (tareasDB){
        tareas.cargarTareasFromFile(tareasDB);
    }
    //await pausa();
    do {
        //Va a esperar hasta que el usuario ingrese una opcion. ese proceso lo ejecuta la funcion mostrarMenu que devuelve una promesa
        //opt = await mostrarMenu();
        //Ahora usaremos imquirerMenu para imprimir menu
        opt = await inquirerMenu();
        //console.log({opt});
       
        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripcion: ');
                //console.log(desc)
                tareas.crearTarea(desc);
                break;
            case '2':
                
                //Llamo al getter
                //console.log(tareas.listadoArr)
                //tareas.listadoCompleto(tareasDB);
                tareas.listadoCompleto();
                break;
            case '3':
                //Listar Completadas
                
                tareas.listadoTareasPorStatus(true);
                break;
            case '4':
                
                //Listar Pendientes
                 tareas.listadoTareasPorStatus(false);
                 break;
            case '5':
                const ids= await mostrarListadoChecklist(tareas.listadoArr)
                //console.log(ids)
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                //id de la tarea a borrar
                const id=await listadoTarreasBorrar(tareas.listadoArr)
                if (id !=='0')
                {
                    const ok= await confirmar("Esta Seguro ?");
                    //OK devuelve true o false
                    //console.log({ok})
                    //Preguntar si esta seguro.
                    if (ok)
                    {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada con exito");
                    }
                }
               break;
            // default:
            //     break;
        }
        guardarDB(tareas.listadoArr);
        
        //Si la opcion es diferente de 0 espera la promesa del metodo pausa que en este caso es el Enter para continuar, caso contrario si opet es igual a 0 no se cumple la condicion del while y se sale del bucle.
        //if(opt!=='0')await pausa();
        await pausa();
    } while (opt!=='0');
    
    //pausa();
}

main ()