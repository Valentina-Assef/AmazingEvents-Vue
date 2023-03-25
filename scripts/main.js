const { createApp } = Vue //Desestructuring: Rescatamos el createApp de Vue

createApp({

  data() {
    return {
      message: 'Hello Vue!', //Propiedades reactivas de Vue. Cambia el valor en todos los lugares que se use sin necesidad que yo le indique donde cambiarlo
    }
  },

  created(){
     this.message = 'Hola Valen!!' //con this le pido que me traiga el message de data
  },

  mounted(){

  }

  
}).mount('#app') //Metodo que se usara en el contenedor con id:app
