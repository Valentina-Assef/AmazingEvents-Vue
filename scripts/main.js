const { createApp } = Vue //Desestructuring: Rescatamos el createApp de Vue

const app = createApp({
  data() {
    return { //Propiedades reactivas de Vue. Cambia el valor en todos los lugares que se use sin necesidad que yo le indique donde cambiarlo
      apiUrl: '../data/amazing.json',
      events: [],
    }
  },

  //Cuando recien se esta creando la app
  created(){ //con this le pido que me traiga
     this.getData()
  },

  mounted(){

  },

  methods:{
    getData(){
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(dataApi => {
            this.events = dataApi.events
        })
    }
  },

  computed:{

  }

  
}).mount('#app') //Metodo que se usara en el contenedor con id:app
