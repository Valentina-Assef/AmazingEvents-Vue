const { createApp } = Vue //Desestructuring: Rescatamos el createApp de Vue

const app = createApp({
  data() { //Propiedades reactivas de Vue. Cambia el valor en todos los lugares que se use sin necesidad que yo le indique donde cambiarlo
    return { 
      apiUrl: '../data/amazing.json',
      events: [],
      backupEvents: [],
      text: '',
      categories: [],
      selectedCategories: [],
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
            this.backupEvents = this.events
            this.categoriesList(this.events)
        })
        .catch(error => console.log(error.message))
    },

    categoriesList(array){
      array.forEach(element =>{
        if(!this.categories.includes(element.category)){
          this.categories.push(element.category)
        }
      })
    }

  },

  computed:{
    combinedFilter(){
      let firstFilter = this.backupEvents.filter(evento => evento.name.toLowerCase().includes(this.text.toLowerCase()));
      if(!this.selectedCategories.length){
        this.events = firstFilter
      } else {
        this.events = firstFilter.filter(evento => this.selectedCategories.includes(evento.category))
      }
    }

    //NOTA: Como hubiesen quedado los filtros independientes
    /* filterByText(){
        //this.text = document.querySelector('input').value //Ya no es necesario definirlo porque le agregue el v-model al input del html
      this.events = this.backupEvents.filter(evento => evento.name.toLowerCase().includes(this.text.toLowerCase()));
    },

    filterByCategory(){
      if(!this.selectedCategories.length){
        this.events = this.backupEvents
      } else {
        this.events = this.backupEvents.filter(evento => this.selectedCategories.includes(evento.category))
      }
    } */
  },

  
}).mount('#app') //Metodo que se usara en el contenedor con id:app
