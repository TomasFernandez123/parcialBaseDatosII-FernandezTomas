//Fernandez Tomas Division 132
//1 use cafeteria;

db.cafes_especiales.drop();

db.cafes_especiales.insertMany([
    {
        tipo: "espresso",
        ingredientes: ["chocolate", "vainilla-canela"],
        peso: 220,
        intensidad: "alta",
        precios: [
            { tipo: "efectivo", precio: 500 },
            { tipo: "tarjeta", precio: 550 }
        ],
        contiene_leche: true,
        tostador: { localidad: "San Justo", nombre: "Tostadora Justo", cuit: "20-12345678-9" }
    },
    {
        tipo: "filtrado",
        ingredientes: ["caramelo"],
        peso: 250,
        intensidad: "media",
        precios: [
            { tipo: "efectivo", precio: 480 },
            { tipo: "tarjeta", precio: 520 }
        ],
        contiene_leche: false,
        tostador: { localidad: "Lanús", nombre: "Café Sur", cuit: "20-22334455-7" }
    },
    {
        tipo: "cold brew",
        ingredientes: ["vainilla-canela", "chocolate"],
        peso: 240,
        intensidad: "media",
        precios: [
            { tipo: "efectivo", precio: 520 },
            { tipo: "tarjeta", precio: 570 }
        ],
        contiene_leche: false,
        tostador: { localidad: "San Telmo", nombre: "Cold Beans", cuit: "27-87654321-0" }
    },
    {
        tipo: "descafeinado",
        ingredientes: ["caramelo", "vainilla-canela"],
        peso: 200,
        intensidad: "baja",
        precios: [
            { tipo: "efectivo", precio: 470 },
            { tipo: "tarjeta", precio: 510 }
        ],
        contiene_leche: true,
        tostador: { localidad: "Morón", nombre: "Descafeinados SA", cuit: "30-99887766-5" }
    },
    {
        tipo: "espresso",
        ingredientes: ["chocolate"],
        peso: 210,
        intensidad: "media",
        precios: [
            { tipo: "efectivo", precio: 490 },
            { tipo: "tarjeta", precio: 530 }
        ],
        contiene_leche: false,
        tostador: { localidad: "San Martín", nombre: "Espresso King", cuit: "33-11223344-1" }
    },
    {
        tipo: "cold brew",
        ingredientes: ["vainilla-canela"],
        peso: 230,
        intensidad: "alta",
        precios: [
            { tipo: "efectivo", precio: 510 },
            { tipo: "tarjeta", precio: 560 }
        ],
        contiene_leche: false,
        tostador: { localidad: "Santos Lugares", nombre: "Cold Saints", cuit: "30-55554444-2" }
    },
    {
        tipo: "filtrado",
        ingredientes: ["chocolate", "caramelo"],
        peso: 180,
        intensidad: "media",
        precios: [
            { tipo: "efectivo", precio: 460 },
            { tipo: "tarjeta", precio: 500 }
        ],
        contiene_leche: true,
        tostador: { localidad: "Luján", nombre: "Filtro Fino", cuit: "20-33445566-3" }
    },
    {
        tipo: "descafeinado",
        ingredientes: ["vainilla-canela", "caramelo"],
        peso: 260,
        intensidad: "alta",
        precios: [
            { tipo: "efectivo", precio: 500 },
            { tipo: "tarjeta", precio: 540 }
        ],
        contiene_leche: false,
        tostador: { localidad: "San Miguel", nombre: "NoCafe", cuit: "27-76543210-9" }
    },
    {
        tipo: "espresso",
        ingredientes: ["chocolate"],
        peso: 195,
        intensidad: "alta",
        precios: [
            { tipo: "efectivo", precio: 480 },
            { tipo: "tarjeta", precio: 530 }
        ],
        contiene_leche: true,
        tostador: { localidad: "Ramos Mejía", nombre: "Espresso Express", cuit: "20-11112222-5" }
    },
    {
        tipo: "cold brew",
        ingredientes: ["caramelo", "vainilla"],
        peso: 265,
        intensidad: "media",
        precios: [
            { tipo: "efectivo", precio: 530 },
            { tipo: "tarjeta", precio: 580 }
        ],
        contiene_leche: false,
        tostador: { localidad: "Avellaneda", nombre: "Frío Brew", cuit: "30-44332211-6" }
    }
]);

//2 Buscar cuántos cafés contienen chocolate entre sus ingredientes. 
db.cafes_especiales.aggregate([{$match : {ingredientes: 'chocolate'}}, {$count : 'Cafes con chocolate'}])

//3 Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes.
db.cafes_especiales.find({$and: [{tipo: {$eq: 'cold brew'}}, {ingredientes: /vainilla/i}]}).count() //Lo pense asi por si encuentra vainilla-canela lo tome como que existe vainilla tambien.

//4 Listar tipo y peso de los cafés que tienen una intensidad “media”. 
db.cafes_especiales.aggregate([{$match : {intensidad : 'media'}}, {$project : {_id:0, tipo:1, peso:1}}])

//5 Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.
db.cafes_especiales.aggregate([{$match : {peso : {$gte: 200, $lte: 260}}}, {$project : {_id:0, tipo:1, peso:1, intensidad:1}}])

//APROBACION DIRECTA

//6 Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san” y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera descendente. 
db.cafes_especiales.find({"tostador.localidad" : /san/i }).sort({peso: -1})

//7 Mostrar la sumar del peso de cada tipo de Café. 
db.cafes_especiales.aggregate([{$group : {_id : '$tipo', sumaPesos : {$sum : '$peso'}}},{$project: {_id:0, tipo:'$_id', sumaPesos:1}}])

//8 Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.
db.cafes_especiales.updateMany( {intensidad: {$eq: 'alta'}} , {$push: {ingredientes : 'whisky'}} )

//9 Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive. 
db.cafes_especiales.updateMany({peso: {$gte: 200, $lte: 260}}, {$inc: {peso: 10}})

//10 Eliminar los cafés cuyo peso sea menor o igual a 210. 
db.cafes_especiales.deleteMany({peso: {$lte: 210}})