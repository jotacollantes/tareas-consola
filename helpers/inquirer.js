const inquirer=require('inquirer');
require('colors');

const preguntas=[
    {
        type:'list',
        name:'opcion',
        messages: 'Que desea hacer ?',
        choices: [
            {
                value:'1', 
                name:`${'1.'.green} Crear tarea`
            },

            {
                value:'2', 
                name:`${'2.'.green} Listar tareas`
            },

            {
                value:'3', 
                name:`${'3'.green} Listar tareas completadas`
            },
            {
                value:'4', 
                name:`${'4'.green} Listar tareas pendientes`
            },
            {
                value:'5', 
                name:`${'5'.green} Completar tarea(s)`
            },
            {
                value:'6', 
                name:`${'6'.green} Borrar tarea`
            },
            {
                value:'0', 
                name:`${'0'.green} Salir`
            },
        
        ]
    }
    ]
const inquirerMenu= async() => {
    //console.clear();
    console.log('================================='.green);
    console.log('===== Seleccione una opcion ====='.white);
    console.log('=================================\n'.green);
    //const opt=await inquirer.prompt(preguntas);
    //Desestructuro la matriz preguntas para obtener el value
    const {opcion}=await inquirer.prompt(preguntas);
    return opcion;
}

const pausa=async()=>{
    const question=[
        {
            type:'input',
            name:'enter',
            message:`Presione ${'Enter'.green} para continuar`
        }
    ] 
    console.log('\n');
    const enter=await inquirer.prompt(question);
   
    return enter;
}

const leerInput=async(mensaje) =>{

    const question=[
        {
            type:'input',
            name:'desc',
            message: mensaje,
            validate(value) {
                //Pregunta por la longitud del value
                if(value.length===0) 
                {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        },
    ];
    //Me interesa la descripcion por eso hay que desestructurar el elemento desc
    //La estructura del question es Similar a la de un input del html donde hay el type, el name y el value, en este caso vamos a tomar el elemendo desc que esta dentro de la propiedad name del enquire.
    const {desc}=await inquirer.prompt(question);
    return desc;

}

const listadoTarreasBorrar = async(tareas=[]) => {

    // {
    //     value:tarea.id, 
    //     name:`${'1.'.green} Crear tarea`
    // }
    // aqui se construyen las tareas, con la funcion map que es parecido a un bucle forEach me permite transformas los elementos que vienen en el arreglo modificandolos a mi necesidades a diferencia del forEach se hara la trasnformacion a todos los elementos de la lista pero sin iterar. los elementos modificados tienen que ir dentro del return.
    


     let i=0;
    const choices =tareas.map( (tarea) =>{
        ++i;
        return {
            value:tarea.id,
            name:`${i.toString().green}   ${tarea.desc}` 
            
        }
        
    });
        //Añadimos un objeto adicional al inicio del arreglo
        choices.unshift(
            {
                value:'0',
                name: '0.'.green + 'Cancelar'.green
            }
        )

    const preguntas=[
        {
            type:'list',
            name:'id',
            messages: 'Borrar',
            //choices : choices
            choices
        }
        ];
    const {id}=await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question=[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    //Ok va a devolver true o false
    const {ok} = await inquirer.prompt(question);
    return ok;
}


const mostrarListadoChecklist = async(tareas=[]) => {

    // {
    //     value:tarea.id, 
    //     name:`${'1.'.green} Crear tarea`
    // }
    // aqui se construyen las tareas, con la funcion map que es parecido a un bucle forEach me permite transformas los elementos que vienen en el arreglo modificandolos a mi necesidades a diferencia del forEach se hara la trasnformacion a todos los elementos de la lista pero sin iterar. los elementos modificados tienen que ir dentro del return.
    


     let i=0;
    const choices =tareas.map( (tarea) =>{
        ++i;
        return {
            value:tarea.id,
            name:`${i.toString().green}   ${tarea.desc}` ,
            //Añadimos una propiedad nueva
            //Usamos operador ternario para validad el completadoEn
            checked: (tarea.completadoEn)? true : false
            
        }
        
    });
        //Añadimos un objeto adicional al inicio del arreglo
     

    const preguntas=[
        {
            type:'checkbox',
            name:'ids',
            message: 'Selecciones',
            //choices : choices
            choices
        }
        ];
    const {ids}=await inquirer.prompt(preguntas);
    return ids;
}



module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTarreasBorrar,
    confirmar,
    mostrarListadoChecklist
}