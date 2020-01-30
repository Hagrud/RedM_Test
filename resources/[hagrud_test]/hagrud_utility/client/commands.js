// Contient des commandes pour aider à placer les objets

	// Fait spawn un objet au sol devant le joueur
RegisterCommand("obj", async ( source, args ) => {

	let model_name = args[0]
	let coords = GetEntityCoords(PlayerPedId())
	let dir = GetEntityForwardVector(PlayerPedId())

	coords = [coords[0] + dir[0], coords[1] + dir[1], coords[2] + 1]

	
	emitNet("js:chat", `place model : ${model_name} `, [255, 125, 0])


	try{
		exports.hagrud_utility.spawnObject( model_name, coords)
	} catch ( error ) {
			emitNet("js:chat", `error : ${error} `, [255, 125, 0])
	}
})

	// Met des cartes sur la table de poker (du saloon de saint-denis)
RegisterCommand("hg:table", async (source, args) => {
	
	let model_card = "P_POKERHAND07X"
	let model_money = "P_MONEYSTACK03X"
	
	let height = 53.175
	
	let center = [2630.71, -1226.27]
	let radius = 0.7
	
	let nPlayers = 6
	let dAngle = 0.6 // en radian
	
	for( i = 0; i < nPlayers; i++){
		
		let angle = i*2*Math.PI/nPlayers + dAngle
		
		let x = Math.cos(angle)*radius
		let y = Math.sin(angle)*radius
		
		let coord = [center[0] + x, center[1] + y, height]
		let rotation = [0, 0, angle*180/Math.PI + 90]
		
		exports.hagrud_utility.spawnObject(model_card, coord, rotation, false)	

	} 
})

	// Fait spawn un objet aux coordonnées voulues
RegisterCommand("objs_s", async ( source, args ) => {

	let model_name = args[0]
	
	coords = [parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[3])]
	rots = [0, 0, parseFloat(args[4])]
	
	let callback = (obj, args) => { 
		loop_texture(obj, 0, 10)
	}
	
	emitNet("js:chat", `place model : ${model_name} `, [255, 125, 0])

	try{
		exports.hagrud_utility.spawnObject( model_name, coords, rots, false, null)
	} catch ( error ) {
			emitNet("js:chat", `error : ${error} `, [255, 125, 0])

	}
})
