export async function leerDatos(query) {

    try {

        const QUERY = await fetch(query);
        const DATA = await QUERY.json();
        return DATA;
    }
    catch (error) {
        
        console.log(error);
    }

}

export async function datosCompletosId(queryId) {
    try {
        const QUERY_ID = await fetch(queryId);
        const DATA_ID = await QUERY_ID.json();
        return DATA_ID;
    }
    catch(error){

        console.log(error);
    }
    
}

