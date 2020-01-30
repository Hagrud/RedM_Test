// Events
onNet("hagrud:save_place", ( sourceId, locationName, coords) => {
	console.log("server receive hagrud:save_place")
	
	if( typeof(locationName) == "string"){
		
		if(locationName.length < 100){
			
			if( coords instanceof Array && coords.length == 3){
				addLocation( sourceId, locationName, coords);
			}else{		
				emit("hagrud:ErrorFromClientInput", sourceId, `onNet("hagrud:save_place" ...)`, `coords are not valids : '${coords}'`, `Erreur dans le traitement des coordonnées`)
			}
	
		} else {
			emit("hagrud:ErrorFromClientInput", sourceId, `onNet("hagrud:save_place" ...)`, `name is too long`, `Le nom est trop long`)
		}
		
	} else {
		emit("hagrud:ErrorFromClientInput", sourceId, `onNet("hagrud:save_place" ...)`, `name is not a string`, `Erreur dans le traitement du nom`)
	}
	
	return;
})

onNet("hagrud:teleport_to_location", (sourceId, locationName) => {
	console.log("server receive hagrud:teleport_to_location")
	
	if( locationName.length < 100){
		teleportToLocation(sourceId, locationName);
	}else{
		emit("hagrud:ClientInvalidInput", sourceId, `onNet("hagrud:teleport_to_location" ...)`, `name is too long`, `Le nom est trop long`)
	}
	
	return;
})

onNet("hagrud:teleport_to_pos", (sourceId, coords) => {
	console.log("server receive hagrud:teleport_to_pos")
	
	teleportTo(sourceId, coords);

	return;
})

// Fonctions

/*
 * Teleport ${player} to the position given in the format {"px" : px, "py" : py, "pz" : pz}
 */
function teleportTo( sourceId, pos ){
	if ( pos instanceof Array && pos.length == 3 ) {
		let px = pos[0]
		let py = pos[1]
		let pz = pos[2]
		
		// TELEPORT (player, px, py, pz)
		console.log(`Teleport ${sourceId} to ${px}, ${py}, ${pz}`)
		emitNet("hagrud:teleport", sourceId, pos);
		
	} else {
		emit("hagrud:ErrorFromClientInput", sourceId, `teleportTo`, `coords are not valids : '${coords}'`, `Erreur dans le traitement des coordonnées`)
	}
	return;
}

/*
 * Teleport the player to a location previously registred in the database
 */
function teleportToLocation ( sourceId, loc ){
	if(exports["mysql-async"]["is_ready"]()){

		let sql_request = `SELECT px, py, pz FROM tp_locations WHERE nom = '${loc}'`;

		exports["mysql-async"]["mysql_fetch_all"](
			sql_request, {}, function(res) {
				if(res.length > 0){
					teleportTo( sourceId, [ res[0]['px'], res[0]['py'], res[0]['pz'] ] )
				}else{
					emit("hagrud:ClientInvalidInput", sourceId, `teleportToLocation`, `location '${loc}' does not exist`, `La position est inconnue`)				
				}
			})

	}else{
		emit("hagrud:ServerError", `teleportToLocation`, `mysql-async is not ready`)				
	}
	return;
}

/*
 * Add a new location to the database
 */ 
function addLocation( player, loc, coords){

	if(exports["mysql-async"]["is_ready"]()){
				
		let sql_request = `REPLACE INTO tp_locations (nom, px, py, pz) VALUE ("${loc}", ${coords[0]}, ${coords[1]}, ${coords[2]})`
		
		exports["mysql-async"]["mysql_fetch_all"](
			sql_request, {}, function(res) {
				console.log(res)
			})
		
	}else{
		emit("hagrud:ServerError", `addLocation`, `mysql-async is not ready`)				
	}
}

