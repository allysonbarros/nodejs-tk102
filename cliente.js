var net = require ('net');
var DmsCoordinates = require("dms-conversion").default;
var coordenadas = [
    {"latitude": -5.638118, "longitude": -35.419796},
    {"latitude": -5.638176, "longitude": -35.419495},
    {"latitude": -5.638219, "longitude": -35.419289},
    {"latitude": -5.638027, "longitude": -35.419249},
    {"latitude": -5.637728, "longitude": -35.41919},
    {"latitude": -5.637693, "longitude": -35.41901},
    {"latitude": -5.637731, "longitude": -35.418878},
    {"latitude": -5.637760, "longitude": -35.418766},
    {"latitude": -5.637811, "longitude": -35.418484},
    {"latitude": -5.637872, "longitude": -35.418235},
    {"latitude": -5.637936, "longitude": -35.417991},
    {"latitude": -5.637976, "longitude": -35.417819},
    {"latitude": -5.638187, "longitude": -35.417795},
    {"latitude": -5.638315, "longitude": -35.417771},
    {"latitude": -5.638577, "longitude": -35.417733},
    {"latitude": -5.638478, "longitude": -35.418077},
    {"latitude": -5.638352, "longitude": -35.418699},
    {"latitude": -5.638275, "longitude": -35.419077},
    {"latitude": -5.638187, "longitude": -35.419458},
    {"latitude": -5.638118, "longitude": -35.41980}
];

var client = net.connect(64000, function () {
    console.log("--------------------------------------------------------");
    console.log("\t.: GPS Tracking - TK102 :.\n");
    console.log(" Conectado ao Servidor do TK102!");
    console.log(' Pressione CTRL+C para sair.');
    console.log("--------------------------------------------------------");

    setInterval(function(){
        coordenada_atual = coordenadas.shift();
        latitude = coordenada_atual.latitude;
        longitude = coordenada_atual.longitude;

        // Convertendo de DD para o formato DMS.
        let dmsCoords = new DmsCoordinates(latitude, longitude);
        let dmsArrays = dmsCoords.getDmsArrays();

        let lat1 = '0' + dmsArrays.latitude[0].toString();
        let lat2 = dmsArrays.latitude[1].toString();
        let lat3 = dmsArrays.latitude[2].toString().replace('.', '').substr(0, 4);
        let lat4 = dmsArrays.latitude[3].toString();
        let lat = lat1 + lat2 + '.' + lat3 + ',' + lat4;

        let long1 = '0' + dmsArrays.longitude[0].toString();
        let long2 = dmsArrays.longitude[1].toString();
        let long3 = dmsArrays.longitude[2].toString().replace('.', '').substr(0, 4);
        let long4 = dmsArrays.longitude[3].toString();
        let long = long1 + long2 + '.' + long3 + ',' + long4;

        let data_atual = new Date().toISOString().substr(0, 19).replace('T', ' ');
        let dia = data_atual.substr(5, 2);
        let mes = data_atual.substr(8, 2);
        let ano = data_atual.substr(2, 2);
        let hora = data_atual.substr(11, 2);
        let minuto = data_atual.substr(14, 2);
        let segundos = data_atual.substr(17, 2);
        let milisegundos = '000';

        let gps = ano + mes + dia + hora + minuto + segundos +',084991260424,GPRMC,' + hora + minuto + segundos + '.' + milisegundos.substr(0,3) + '000,A,'+ lat +','+ long +',0.00,140.75,080717,,,A*65,F,, imei:013777006342768,10,52.8,F:4.28V,1,139,21404,724,02,14A4,11CB';
        console.log("Enviando os dados do GPS para o Servidor:")
        console.log(gps + '\r\n');
        client.write(gps + '\r\n');

        // Inserindo a coordenada atual no array.
        // coordenadas.push(coordenada_atual);
    }, 1000 * 5);
});
