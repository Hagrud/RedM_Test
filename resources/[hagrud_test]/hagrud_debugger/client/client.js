on("hagrud:ClientError", (function_name, message, client_message) =>{
  console.error(`Error in ${function_name} : ${message}`);
  emit("chat:addMessage", {
    args: [`Erreur : ${client_message}`], 
    color: [255, 0, 0]
  })
})