require('colors');

const mostrarMenu=()=>{

    return new Promise((resolve)=>
    {
        console.clear();

        console.log('================================='.green);
        console.log('===== Seleccione una opcion ====='.green);
        console.log('=================================\n'.green);

        console.log(`${'1.'.green} Crear Tareas`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir`);

        // Crear la interfaz para pedir datos al usuario, usa paquetes propios de Nodejs
        const readline= require('readline').createInterface({
            input:process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion: ',(answer)=>{
            //console.log({answer});
            //console.log(answer);
            readline.close();
            //Aqui en el reslve envio lo que la persona escribio
            resolve(answer);
        })
    })
}

const pausa= ()=>{

    return new Promise((resolve)=>{
        const readline= require('readline').createInterface({
        input:process.stdin,
        output: process.stdout
        });

        readline.question(`\n Presione ${'Enter'.green} para continuar\n`,(answer)=>{
            //console.log({answer});
            //console.log(answer);
            readline.close();
            resolve();
        })
    })

    
}



module.exports ={
    mostrarMenu,
    pausa
};