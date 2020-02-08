onNet("hagrud:teleport", (coords) => {
  
  emit("chat:addMessage", {
    args: [`teleport order receive to ${coords[0]}, ${coords[1]}, ${coords[2]}`],
    color: [0, 0, 255]
  });
  
  let player = PlayerPedId();
  SetEntityCoords(player, coords[0], coords[1] + 1, coords[2], 1, 0, 0, 0);
})

RegisterCommand("hg:teleport", async (source, args) => {
  let argc = args.length;
  
  let serverId = GetPlayerServerId(source);
  
  switch(argc) {
    case 1:
      emitNet("hagrud:teleport_to_location", serverId, args[0]);
      break;
    case 3:
      let px = args[0];
      let py = args[1];
      let pz = args[2];
      
      if(isNaN(px) || isNaN(py) || isNaN(pz)){
        ErrorMessage("/teleport", "Les arguments doivent être des nombres");
      } else{
        emitNet("hagrud:teleport_to_pos", serverId, [px, py, pz]);
      }
    
      break;
    default:
      ErrorMessage("/teleport", "utilisation : /teleport x y z");
      ErrorMessage("/teleport", "utilisation : /teleport location_name");
  }

  return;
})

RegisterCommand("hg:save_place", async (source, args) => {
  let argc = args.length;
    
  if( argc == 1 ){
    let locationName = args[0];
    let nameLength = locationName.length;
    
    if(nameLength > 0 && nameLength < 100){
      
      let player = PlayerPedId();
      let coords = GetEntityCoords( player );
            
      let px,py,pz;
      [px, py, pz] = coords;
              
      let serverId = GetPlayerServerId(source);
      emitNet("hagrud:save_place", serverId, locationName, [px, py, pz]);
      
    } else {
      ErrorMessage("/saveplace", "utilise un nom de taille adaptée");
    }
    
  } else {
    ErrorMessage("/saveplace", "utilisation : /saveplace location_name");
  }
  return;
})

function ErrorMessage(funcName, message){
  let argString = [funcName, message].join(" :: ");
  emit("chat:addMessage", {
    args: [argString],
    color: [255, 0, 0]
  });
}