// server receive error message only from himself

on("hagrud:ServerError", (function_name, error_description) => {
  console.error(`Error in ${function_name} : ${error_description}`);
})

on("hagrud:ClientInvalidInput", (source, function_name, error_description, client_message) => {
  console.log(`Client Invalid Input by ${source} reported in ${function_name} : ${error_description}`)
  emitNet("chat:addMessage", source, {
    args: [`Entrée non valide : ${client_message}`], 
    color: [128, 0, 128]
  })
})


on("hagrud:ErrorFromClientInput", (source, function_name, error_description, client_message) => {
  console.error(`Error in ${function_name} after client ${source} input : ${error_description}`)
  emitNet("chat:addMessage", source, {
    args: [`Erreur suite à l'entrée : ${client_message}`], 
    color: [255, 165, 0]
  })
})


