exports('drawText', (x, y, z, word) => { drawText(x, y, z, word) });

	// affiche un texte a la position 3D dans le jeu
function drawText(x, y, z, word){
	let [onScreen, xs, ys] = GetScreenCoordFromWorldCoord(x, y, z);
	
	if(onScreen){
		
		let cam = GetGameplayCamCoord();
			
		let dist = GetDistanceBetweenCoords( ...cam, x, y, z, true)
		let fov = (1 / GetGameplayCamFov()) * 100
		let scale = (1 / dist) * fov
		
		SetTextScale(0.0, 0.35)
        SetTextFontForCurrentCommand(0)
		
        SetTextColor(255, 255, 255, 255)      
		SetTextCentre(1)
		let text_id = CreateVarString(10, "LITERAL_STRING", word)
        DisplayText(text_id, xs, ys)
				
	}
}