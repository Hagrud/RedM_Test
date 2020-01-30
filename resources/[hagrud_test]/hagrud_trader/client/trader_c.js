var ped_trader

var trader_postion = [ 2639.94, -1224.87, 53.3804 ]

var trader_animation = "WORLD_HUMAN_SHOPKEEPER_MALE_A"
var trader_activated_animation = "WORLD_HUMAN_SHOPKEEPER_CATALOG"

	// Indique si le trader est déja actif ou non
var trader_tick_id = -1


RegisterCommand("hg:create_trader", async (source, args) => {

	let trader_model_name = "S_M_M_SDTICKETSELLER_01"
	let obj0_model_name = "P_BOTTLECRATE01X"
	let obj1_model_name = "P_CS_PLATESTEW01X"
	let obj2_model_name = "P_CS_SACKCORN01X"


	let spawn_coords_and_orientation = [ 2639.94, -1224.87, 53.3804 , 90]
	
		// On immobilise le ped après sa création pour qu'il reste sur place
	let callback = (pedId, args) => { 
		ped_trader = pedId
		setTimeout( async (pedId) => {
			FreezeEntityPosition(pedId, true)
			exports.hagrud_utility.animatePed(trader_animation, pedId)}, 1000, pedId) }


		// create the ped
	exports.hagrud_utility.spawnPed( trader_model_name, 
									 spawn_coords_and_orientation, 
									 callback, null)

		// create the objects
	exports.hagrud_utility.spawnObject( obj0_model_name, [2638.8, -1223.8, 53.4], [0,0,0], false )
	exports.hagrud_utility.spawnObject( obj1_model_name, [2638.8, -1224.8, 53.42], [0,0,0], false )
	exports.hagrud_utility.spawnObject( obj2_model_name, [2638.8, -1225.8, 53.3], [0,0,0], false )
			// SetEntityAsMissionEntity ça les rend persistant (et on va aussi l'utiliser pour le raycast !)
})

	// active le vendeur si le joueur de regarde et qu'il est a moins de 5m
RegisterCommand("ask", async (source, args) => {
		
	if(trader_tick_id == -1){
		let isTraderTargeted = exports.hagrud_utility.checkIfPlayerLookAtPed(ped_trader, 5)
	
		if(isTraderTargeted){
			traderInteraction(args[0])
		}
	}

	
})

function traderInteraction(interaction){
	
	exports.hagrud_utility.animatePed(trader_activated_animation, ped_trader)
	emitNet("js:chat", `Trader: Hello`, [255, 125, 0])
	
	trader_tick_id = setTick(() => { 

		let coord = GetEntityCoords(PlayerPedId())
		let dist = Vdist(coord[0], coord[1], coord[2], trader_postion[0], trader_postion[1], trader_postion[2])

			// temps qu'on est à moins de 10 metres on affiche les prix des ressources
		if(dist < 10){
			showTraderPrice()
		}else{
			
			exports.hagrud_utility.animatePed(trader_animation, ped_trader)
			emitNet("js:chat", `Trader: Bye`, [255, 125, 0])
			
			
			let tmp = trader_tick_id
			trader_tick_id = -1
			clearTick(tmp)
		}
	})
}

function showTraderPrice(){
	exports.hagrud_utility.drawText( 2638.8, -1223.8, 53.7 , "vin")
	exports.hagrud_utility.drawText( 2638.8, -1224.8, 53.7 , "Soupe")
	exports.hagrud_utility.drawText( 2638.8, -1225.8, 53.7 , "Maïs")
}