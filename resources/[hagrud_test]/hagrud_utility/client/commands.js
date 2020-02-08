// Contient des commandes pour aider à placer les objets

  // Fait spawn un objet au sol devant le joueur
RegisterCommand("hg:obj", async ( source, args ) => {

  let modelName = args[0];
  let coords = GetEntityCoords(PlayerPedId());
  let dir = GetEntityForwardVector(PlayerPedId());

  coords = [coords[0] + dir[0], coords[1] + dir[1], coords[2] + 1];

  
  emitNet("js:chat", `place model : ${modelName} `, [255, 125, 0]);


  try{
    exports.hagrud_utility.spawnObject( modelName, coords);
  } catch ( error ) {
      emitNet("js:chat", `error : ${error} `, [255, 125, 0]);
  }
})

  // Met des cartes sur la table de poker (du saloon de saint-denis)
RegisterCommand("hg:table", async (source, args) => {
  
  let modelCard = "P_POKERHAND07X";
  let modelMoney = "P_MONEYSTACK03X";
  
  let height = 53.175;
  
  let center = [2630.71, -1226.27];
  let radius = 0.7;
  
  let nPlayers = 6;
  let dAngle = 0.6; // en radian
  
  for( i = 0; i < nPlayers; i++){
    
    let angle = i*2*Math.PI/nPlayers + dAngle;
    
    let x = Math.cos(angle)*radius;
    let y = Math.sin(angle)*radius;
    
    let coord = [center[0] + x, center[1] + y, height];
    let rotation = [0, 0, angle*180/Math.PI + 90];
    
    exports.hagrud_utility.spawnObject(modelCard, coord, rotation, false);

  } 
})

  // Fait spawn un objet aux coordonnées voulues
RegisterCommand("hg:objc", async ( source, args ) => {

  let modelName = args[0];
  
  coords = [parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[3])];
  rots = [0, 0, 0];
    
  emitNet("js:chat", `place model : ${modelName} `, [255, 125, 0]);

  try{
    exports.hagrud_utility.spawnObject( modelName, coords, rots, false);
  } catch ( error ) {
      emitNet("js:chat", `error : ${error} `, [255, 125, 0]);

  }
})