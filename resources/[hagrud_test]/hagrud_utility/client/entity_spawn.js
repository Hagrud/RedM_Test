exports('spawnPed', (model_name, coords, callback, callback_args) => { spawnPed(model_name, coords, callback, callback_args) });

exports('spawnObject', (model_name, coords, rotation = [0, 0, 0], onGround = true, callback = null, callback_args = null) => { spawnObject(model_name, coords, rotation, onGround, callback, callback_args) });


function spawnPed(model_name, coord, callback, callback_args){

	let model_hash = GetHashKey(model_name)

		// First check if model exist
	if( !IsModelValid(model_hash)){
		
		emitNet("js:chat", `unvalid model`, [255, 255, 0])
		// TODO ERROR INVALID MODEL
		
		return;
	}
	
		// Load model
	RequestModel( model_hash )
	
		// Generate callback function
	let func = async (a) => { createAndUpdatePed(a) } 
	let args = new Map([["hash", model_hash], 
					["x" , coord[0]], 
					["y" , coord[1]], 
					["z" , coord[2]], 
					["rot" , coord[3]],
					["callback", callback],
					["callback_args", callback_args]])
	
		// wait the model and run the callback
	waitModelAndRun( model_hash, func, args, callback, callback_args)

}

function spawnObject(model_name, coord, rotation, onGround, callback, callback_args){
	
	let model_hash =  GetHashKey(model_name)

	if( !IsModelValid(model_hash)){
		
		emitNet("js:chat", `unvalid model`, [255, 255, 0])
		// TODO ERROR INVALID MODEL
		
		return;
	}
	
	try{

	RequestModel( model_hash )
	
	
	let func = async (a) => { createObject(a) }
	let args = new Map([["hash", model_hash], 
					["x" , coord[0]], 
					["y" , coord[1]], 
					["z" , coord[2]],
					["pitch", rotation[0]],
					["roll", rotation[1]],
					["yaw", rotation[2]],
					["rot" , coord[3]],
					["callback", callback],
					["callback_args", callback_args],
					["onGround", onGround]])
					
					
					
	waitModelAndRun( model_hash, func, args, callback, callback_args)
	}catch ( error ){
		emitNet("js:chat", `error : ${error} `, [255, 125, 0])
	}

}

async function waitModelAndRun(hash, func, args){

	if(HasModelLoaded( hash )){
		func(args)
	}else{
		setTimeout(async (a, b, c) => {waitModelAndRun(a, b, c)}, 100, hash, func, args)
	}
}

function createAndUpdatePed( args ){
		// Create Ped
	let pedId = CreatePed( args.get("hash"), args.get("x"), args.get("y"), args.get("z"), args.get("rot"), true, true, true, true)
	
		// select a random outfit (prevent invisible peds)
		// Je sais pas pourquoi SetRandomOutfitVariation ne marche pas
	Citizen.invokeNativeByHash(0x283978A1, 0x5512B2FE, pedId, true)

		// run callback function
	args.get("callback")(pedId, args.get("callback_args"))
	
}

function createObject( args ){
	
	let hash = args.get("hash")
	let pos_x = args.get("x")
	let pos_y = args.get("y")
	let pos_z = args.get("z")
	let pitch = args.get("pitch")
	let roll = args.get("roll")
	let yaw = args.get("yaw")
	
	let callback = args.get("callback")
	let callback_args = args.get("callback_args")
	
	try{
		let obj = CreateObject( hash, pos_x, pos_y, pos_z, true, false, true, true, true)
		SetEntityRotation(obj, pitch, roll, yaw)
		
		if(args.get("onGround")){
			PlaceObjectOnGroundProperly(obj)
		}
		
		if ( callback != null){
			callback(obj, callback_args)
		}
		
	} catch ( error ){
		emitNet("js:chat", `error : ${error} `, [255, 125, 0])
	}
}