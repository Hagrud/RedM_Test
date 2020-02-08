var _pedTrader;

var _traderPostion = [ 2639.94, -1224.87, 53.3804 ];

var _traderAnimation = "WORLD_HUMAN_SHOPKEEPER_MALE_A";
var _traderActivatedAnimation = "WORLD_HUMAN_SHOPKEEPER_CATALOG";

  // Indique si le trader est déja actif ou non
var _traderTickId = -1;


RegisterCommand("hg:create_trader", async (source, args) => {

  let traderModelName = "S_M_M_SDTICKETSELLER_01";
  let obj0_modelName = "P_BOTTLECRATE01X";
  let obj1_modelName = "P_CS_PLATESTEW01X";
  let obj2_modelName = "P_CS_SACKCORN01X";


  let spawnCoordsAndOrientation = [ 2639.94, -1224.87, 53.3804 , 90];
  
    // On immobilise le ped après sa création pour qu'il reste sur place
  let callback = ( pedId ) => { 
    _pedTrader = pedId;
    setTimeout( async (pedId) => {
      FreezeEntityPosition(pedId, true);
      exports.hagrud_utility.animatePed(_traderAnimation, pedId)}, 1000, pedId)}


    // create the ped
  exports.hagrud_utility.spawnPed( traderModelName, spawnCoordsAndOrientation, callback);

    // create the objects
  exports.hagrud_utility.spawnObject( obj0_modelName, [2638.8, -1223.8, 53.4], [0,0,0], false );
  exports.hagrud_utility.spawnObject( obj1_modelName, [2638.8, -1224.8, 53.42], [0,0,0], false );
  exports.hagrud_utility.spawnObject( obj2_modelName, [2638.8, -1225.8, 53.3], [0,0,0], false );
      // SetEntityAsMissionEntity ça les rend persistant 
	  // (et on va aussi l'utiliser pour le raycast !)
})

  // active le vendeur si le joueur de regarde et qu'il est a moins de 5m
RegisterCommand("ask", async (source, args) => {
    
  if(_traderTickId == -1){
    let isTraderTargeted = 
	  exports.hagrud_utility.checkIfPlayerLookAtPed(_pedTrader, 5);
  
    if(isTraderTargeted){
      traderInteraction(args[0]);
    }
  }

  
})

function traderInteraction(interaction){
  
  exports.hagrud_utility.animatePed(_traderActivatedAnimation, _pedTrader);
  emitNet("js:chat", `Trader: Hello`, [255, 125, 0]);
  
  _traderTickId = setTick(() => { 

    let coord = GetEntityCoords(PlayerPedId());
    let dist = Vdist( ...coord, ..._traderPostion);

      // temps qu'on est à moins de 10 metres on affiche les prix des ressources
    if(dist < 10){
      showTraderPrice();
    }else{
      
      exports.hagrud_utility.animatePed(_traderAnimation, _pedTrader);
      emitNet("js:chat", `Trader: Bye`, [255, 125, 0]);
      
      
      let tmp = _traderTickId;
      _traderTickId = -1;
      clearTick(tmp);
    }
  })
}

function showTraderPrice(){
  exports.hagrud_utility.drawText( 2638.8, -1223.8, 53.7 , "vin");
  exports.hagrud_utility.drawText( 2638.8, -1224.8, 53.7 , "Soupe");
  exports.hagrud_utility.drawText( 2638.8, -1225.8, 53.7 , "Maïs");
}