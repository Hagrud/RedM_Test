exports('checkIfPlayerLookAtPed', (pedId, maxRange) => 
  {return getFirstPedOnLookRay(maxRange) == pedId });

var _so = [0,0,0];
var _t = [0,0,0];

function getFirstPedOnLookRay(maxRange){
  
  let lv = getLookVector();
  
  let s = GetGameplayCamCoord(); // source
  
  let t = [s[0] + lv[0] * maxRange,
    s[1] + lv[1] * maxRange, s[2] + lv[2] * maxRange]; // cible
  
  
    // Debug on affiche le point ciblé pendant 5 secondes
  _so = s;
  _t = t;
  setTimeout( (t) => { if(t == _t) { _t = [0,0,0]}}, 5000, t);
  
  
  let ray = StartShapeTestRay( ...s, ...t,
      4, // On cherche que des Ped : 1 map, 2 veh, 4 peds, 16 obj, ...
      PlayerPedId()); // On ignore le joueur
      
  let pedInfo = GetShapeTestResult(ray);
    
  return pedInfo[4];
}

function getFirstObjectOnLookRay(maxRange){
  // TODO 
}

function getFirstMissionEntityOnLookRay(maxRange){
  // TODO
}

  // On va calculer la position regardé par le joueur 
  // (la distance est calculée par rapport a la caméra)
function getLookVector(){
  
  let [Pitch, Roll, Yaw] = GetGameplayCamRot(0);

    // on passe les angles en radian et on arrange un peu les données pour aller 
	// dans la bonne direction
  let tx = Roll * Math.PI/180;
  let ty = -Pitch * Math.PI/180;
  let tz = Yaw * Math.PI/180 + Math.PI/2;

    // matrices de rotations à utiliser pour calculer le vecteur
  let rotx = [
  [1,            0,             0, 0],
  [0, Math.cos(tx), -Math.sin(tx), 0],
  [0, Math.sin(tx),  Math.cos(tx), 0],
  [0,            0,             0, 1]];
  
  let roty = [
  [  Math.cos(ty), 0, Math.sin(ty), 0],
  [             0, 1,            0, 0],
  [ -Math.sin(ty), 0, Math.cos(ty), 0],
  [             0, 0,            0, 1]];
  
  let rotz = [
  [ Math.cos(tz), -Math.sin(tz), 0, 0],
  [ Math.sin(tz),  Math.cos(tz), 0, 0],
  [            0,             0, 1, 0],
  [            0,             0, 0, 1]];

    // on calcul le vecteur final
  let r = [1, 0, 0, 1];
  r = vecMatMult4( r, rotx);
  r = vecMatMult4( r, roty);
  r = vecMatMult4( r, rotz);

  return r;
  
}

  // fonction qui marche que pour vec4 et matrice 4x4
function vecMatMult4(a, B){
  return [ 
    a[0]*B[0][0] + a[1]*B[0][1] + a[2]*B[0][2] + a[3]*B[0][3], 
    a[0]*B[1][0] + a[1]*B[1][1] + a[2]*B[1][2] + a[3]*B[1][3], 
    a[0]*B[2][0] + a[1]*B[2][1] + a[2]*B[2][2] + a[3]*B[2][3], 
    a[0]*B[3][0] + a[1]*B[3][1] + a[2]*B[3][2] + a[3]*B[3][3]];
}

  // DEBUG : on trace une ligne entre le joueur (pas la caméra) et le point 
  // ciblé lors de la recherche 
setTick(() => {
  
  if(_t[0] != 0){
    
      // DRAW_LINE
    Citizen.invokeNativeByHash( 0x00000000, 0xB3426BCC, _so[0], _so[1], _so[2],
      _t[0], _t[1], _t[2], 0, 0, 255, 255);
  }
  
})