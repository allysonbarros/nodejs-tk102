var tk102 = require ('./tk102');

tk102.on ('track', function(data){
  console.log ('\nDados Recebidos do GPS:\n');
  console.dir (data, {
    colors: String (process.env.TERM).match (/color$/)
  });
});

tk102.on ('listening', function (lst) {
  var client;

  console.log("--------------------------------------------------------");
  console.log("\t.: GPS Tracking - TK102 :.\n");
  console.log(" O Servidor está pronto para receber as conexões!");
  console.log(' Pressione CTRL+C para sair.');
  console.log("--------------------------------------------------------");
});

tk102.createServer ({
  ip: "0.0.0.0",
  port: 64000
});
