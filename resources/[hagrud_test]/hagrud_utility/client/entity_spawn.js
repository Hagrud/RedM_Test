exports('spawnPed', (modelName, coords, callback = null, callbackArgs = []) => 
  {spawnPed(modelName, coords, callback, callbackArgs)});

exports('spawnObject', (modelName, coords, rotation = [0, 0, 0], onGround = true, callback = null, callbackArgs = []) => 
  {spawnObject(modelName, coords, rotation, onGround, callback, callbackArgs)});

function spawnPed(modelName, coord, callback, callbackArgs){

  let modelHash = GetHashKey(modelName);

    // First check if model exist
  if( !IsModelValid(modelHash)){
    
    emitNet("js:chat", `unvalid model`, [255, 255, 0]);
    // TODO ERROR INVALID MODEL
    
    return;
  }
  
    // Load model
  RequestModel( modelHash );
  
    // Generate callback function
  let func = async (a) => { createAndUpdatePed( ...a ) }
  
  let args = [modelHash, ...coord, callback, callbackArgs];
  
    // wait the model and run the callback
  waitModelAndRun( modelHash, func, args);

}

function spawnObject(modelName, coord, rotation, onGround, callback, callbackArgs){
  
  let modelHash =  GetHashKey(modelName);

  if( !IsModelValid(modelHash)){
    
    emitNet("js:chat", `unvalid model`, [255, 255, 0]);
    // TODO ERROR INVALID MODEL
    
    return;
  }
  
  try{

    RequestModel( modelHash );
  
  
    let func = async (a) => { createObject( ...a ) }
    let args = [modelHash, ...coord, ...rotation, onGround, callback, callbackArgs];

    waitModelAndRun( modelHash, func, args, callback, callbackArgs);
  }catch ( error ){
    emitNet("js:chat", `error : ${error} `, [255, 125, 0]);
  }

}

async function waitModelAndRun(hash, func, args){
  try{
    if(HasModelLoaded( hash )){
      func( args );
    }else{
      setTimeout(async (a, b, c) => {waitModelAndRun(a, b, c)}, 100, hash, func, args);
    }
  } catch ( error ){
    emitNet("js:chat", `error : ${error} `, [255, 125, 0]);
  }
}

function createAndUpdatePed( modelHash, px, py, pz, yaw, callback, callbackArgs ){
    // Create Ped
  let pedId = CreatePed( modelHash, px, py, pz, yaw, true, true, true, true);
  
    // select a random outfit (prevent invisible peds)
    // Je sais pas pourquoi SetRandomOutfitVariation ne marche pas
  Citizen.invokeNativeByHash(0x283978A1, 0x5512B2FE, pedId, true);

    // run callback function
  callback(pedId, ...callbackArgs);
  
}

function createObject( modelHash, px, py, pz, pitch, roll, yaw, onGround, callback, callbackArgs ){
    
  try{
    let obj = CreateObject( modelHash, px, py, pz, true, false, true, true, true);
    SetEntityRotation(obj, pitch, roll, yaw);
    
    if( onGround ){
      PlaceObjectOnGroundProperly(obj);
    }
    
    if ( callback != null){
      callback(obj, ...callbackArgs);
    }
    
  } catch ( error ){
    emitNet("js:chat", `error : ${error} `, [255, 125, 0]);
  }
}