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
      upcomingEvents: [],
      backupUpcomingEvents: [],
      pastEvents: [],
      backupPastEvents: [],
    }
  },

  //Cuando recien se esta creando la app
  created(){ 
     this.getData() //con this le pido que me traiga cosas
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
            this.upcomingList(this.events)
            this.backupUpcomingEvents = this.upcomingEvents
            this.pastList(this.events)
            this.backupPastEvents = this.pastEvents

        })
        .catch(error => console.log(error.message))
    },

    categoriesList(array){
      array.forEach(element =>{
        if(!this.categories.includes(element.category)){
          this.categories.push(element.category)
        }
      })
    },

    upcomingList(array){
      let currentDate = new Date()
      array.forEach(element =>{
        let eventDate = new Date(element.date);
        if ((!this.upcomingEvents.includes(element)) && (eventDate.getTime() > currentDate.getTime())) {
          this.upcomingEvents.push(element)
        }
      })
    },

    pastList(array){
      let currentDate = new Date()
      array.forEach(element =>{
        let eventDate = new Date(element.date);
        if ((!this.pastEvents.includes(element)) && (eventDate.getTime() < currentDate.getTime())) {
          this.pastEvents.push(element)
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
    },

    combinedFilterUpcoming(){
      let firstFilter = this.backupUpcomingEvents.filter(evento => evento.name.toLowerCase().includes(this.text.toLowerCase()));
      if(!this.selectedCategories.length){
        this.upcomingEvents = firstFilter
      } else {
        this.upcomingEvents = firstFilter.filter(evento => this.selectedCategories.includes(evento.category))
      }
    },

    combinedFilterPast(){
      let firstFilter = this.backupPastEvents.filter(evento => evento.name.toLowerCase().includes(this.text.toLowerCase()));
      if(!this.selectedCategories.length){
        this.pastEvents = firstFilter
      } else {
        this.pastEvents = firstFilter.filter(evento => this.selectedCategories.includes(evento.category))
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
