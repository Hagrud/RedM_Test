exports('animatePed', (animationName, pedId, timer = 0, callback = null, callbackArgs = null) => { animatePed(animationName, pedId, timer, callback, callbackArgs) })


function animatePed(animationName, pedId, timer, callback, callbackArgs){
	
	let hash = GetHashKey(animationName)
	
	TaskStartScenarioInPlace( pedId, hash, 0, true)

	if(callback != null){
		setTimeout( (a, b) => { a(b) }, timer, callback, callbackArgs)
	}
	
}



