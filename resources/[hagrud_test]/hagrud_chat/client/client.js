RegisterCommand("js:chat", async (source, args) => {
  let argString = args.join(" ");
  emitNet("js:chat", (argString ? argString : "Nothing..."), [0, 255, 0]);
  return;
})


// A partir d'ici on place les petites commandes qui servent juste a debug

  // Donne un révolver au joueur 
RegisterCommand("hg:arme", async ( source, args ) => {
  
  let player = PlayerPedId();

  try {
    GiveWeaponToPed_2( player , 0x7BBD1FF6, 50, true, true);
  }catch(error) {
    emitNet("js:chat", `error : ${error}`, [255, 125, 0]);
  }
  
  return;
})

  // lance le scenario sur le ped du joueur
RegisterCommand("hg:anim", async ( source, args ) => {
  
  let anim = args[0];
  
  emitNet("js:chat", `run task : ${anim} exist ?`, [255, 125, 0]);

  hash = GetHashKey(anim);
  TaskStartScenarioInPlace( PlayerPedId(), hash, 0, true);
})

  // Arrete les animations du joueur
RegisterCommand("unanim", async ( source, args ) => {
  ClearPedTasks( PlayerPedId() );
})