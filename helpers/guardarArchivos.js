const fs=require('fs');
const archivo='./db/data.json';

const guardarDB= (data)=>{
    
    //JSON.stringify guarda los datos como una cadela de texto con estructura json ya que desde la invocacion viene como un arrary[]
    fs.writeFileSync(archivo,JSON.stringify(data));
}
const leerDB=()=>{
    if (!fs.existsSync(archivo)){
        return null;
    }
    const info=fs.readFileSync(archivo,{encoding:'utf-8'})
    //hago lo contrario del stringify y lo convierto en una estructura de objeto JSON
    const data=JSON.parse(info);
    //console.log(data);
    return data;

}
module.exports={
    guardarDB,
    leerDB,
}