const { createApp } = Vue //Desestructuring: Rescatamos el createApp de Vue

const app = createApp({

  data() {
    return { //Propiedades reactivas de Vue. Cambia el valor en todos los lugares que se use sin necesidad que yo le indique donde cambiarlo
      apiLocation: "../data/amazing.json",
      events: [],
    }
  },

  created(){ //con this le pido que me traiga el message de data
     this.getData 
  },

  mounted(){

  },

  methods:{
    getData(){
      fetch(this.apiLocation)
        .then(response => response.json())
        .then(dataApi => {
          this.events = dataApi
        })
    }
  },

  computed:{

  }

  
}).mount('#app') //Metodo que se usara en el contenedor con id:app
