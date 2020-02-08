var _dT = 1;
var _dR = 1;
var _ModeRot = false;

var _axe = 0;

var _lP = [0, 0, 0];
var _lR = [0, 0, 0];

var _oI = 0;

RegisterCommand("ed:obj", async ( source, args ) => {

  let name = args[0];
  
  let pos = _lP;
  let rot = _lR;
  if ( args.length == 4){
    pos = [ parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[3])];
    rot = [0, 0, 0];
    _lP = pos;
    _lR = rot;
  }

  if( pos[2] == 0){
    let coords = GetEntityCoords(PlayerPedId());
    let dir = GetEntityForwardVector(PlayerPedId());
    
    pos = [ coords[0] + dir[0], coords[1] + dir[1], coords[2] + dir[2] + 1];
    
  }

  let callback = (a, b) => { objCreated(a, b) };

  exports.hagrud_utility.spawnObject( name, pos, rot, false, callback, null );

})

RegisterCommand("ed:-", async ( source, args ) => {
  modifyPos(-1);
})

RegisterCommand("ed:+", async ( source, args ) => {
  modifyPos(+1);
})

RegisterCommand("ed:->", async ( source, args ) => {
  _axe = ( _axe + 1 ) % 3;
})

RegisterCommand("ed:@", async ( source, args ) => {
  _ModeRot = !_ModeRot;
})

RegisterCommand("ed:++", async ( source, args ) => {
  if ( _ModeRot ){
    _dR = _dR * 10;
  } else {
    _dT = _dT * 10;
  }
})

RegisterCommand("ed:--", async ( source, args ) => {
  if ( _ModeRot ){
    _dR = _dR / 10;
  } else {
    _dT = _dT / 10;
  }  
})

RegisterCommand("ed:==", async ( source, args ) => {
  if ( _ModeRot ){
    _dR = 1;
  } else {
    _dT = 1;
  }
})

function modifyPos( dir ){
  if(_oI != 0){
    if ( _ModeRot ){
      _lR[_axe] = _lR[_axe] + dir * _dR * 90;
    } else {
      _lP[_axe] = _lP[_axe] + dir * _dT;
    }
  }
  
  SetEntityCoords(_oI, _lP[0], _lP[1], _lP[2], 1, 0, 0, 0);
  SetEntityRotation(_oI, _lR[0], _lR[1], _lR[2], 0, true);
}

function objCreated( objId, args ){
  emitNet("js:chat", `objAdded ${objId}`, [255, 255, 0]);

  _oI = objId;
  _lP = GetEntityCoords(_oI);
  _lR = [0, 0, 0];
}

setTick( () => {
  if ( _oI != 0 ){
    
    let s = [..._lP];
    let t = [..._lP];
    s[_axe] = s[_axe] - 1;
    t[_axe] = t[_axe] + 1;
    
    let c = [0, 0, 0];
    
    if( _ModeRot ){
      c = [255, 255, 255];
      c[_axe] = 0;
    } else{
      c[_axe] = 255;
    }
    
    Citizen.invokeNativeByHash( 0x00000000, 0xB3426BCC, ...s, ...t, ...c, 255)

  }
})

    // s : 2 : coord -
    // z : 8 : coord +
    // a : 1 : next axes
    // e : 3 : rot / translation
    // q : 4 : increase gap
    // d : 6 : decrease gap
    // w : 5 : reset gap

