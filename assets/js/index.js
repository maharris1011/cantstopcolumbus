//
// index.js
//
// Contains all of the functions needed for interactivity using Vuejs
// on the home page, including the main Vue instance and all Vue Components
//
//

let swap = (array, i, j) => {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
  return array
}

let shuffle = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    array = swap(array, i, j)
  }
  return array
}

let transformProject = (project) => {
  var retval = {
    website: project["Project Website"],
    text: project["Project Public Desc"],
    title: project.Title,
    category: project.Category[0].Category
  }
  let defaultLogo = "/assets/img/UX/cscbus_logo_square.svg"
  retval.logo = project.hasOwnProperty("Project Logo")
    ? project["Project Logo"][0].url
    : defaultLogo
  return retval
}

var cantstopcbus = new Vue({
  el: "#cantstopcbus-content",
  delimiters: ["{$", "$}"],
  data: {
    projects: []
  },
  methods: {
  },
  computed: {
    carouselProjects: function () {
      return shuffle(this.allProjects).slice(0, 4)
    },
    allProjects: function () {
      return this.projects.map((project) => {
        return transformProject(project)
      })
    },
    afterBirthdate: function () {
      var birthdate = new Date('2021-03-15')
      var today = new Date()
      return today >= birthdate
    }
  },
  created() {
    axios
      .get(
        "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/projects"
      )
      .then(
        (response) => {
          this.projects = response.data
        },
        (error) => {
          console.error(`unable to retrieve projects ${error}`)
        }
      )
  }
})

Vue.component("project-card", {
  props: ["project"],
  delimiters: ["{$", "$}"],
  template: `
    <div class="col-sm-6 col-lg-3 d-flex align-items-stretch">
      <div class="card my-1">
        <div class="row h-100 align-items-center">
          <div class="col-sm-12">
            <img :src="project.logo" class="card-img-top"/>
          </div>
        </div>
        <div class="card-body">
          <a :href="project.website" target="_blank">
            <h5 class="card-title">{$ project.title $}</h5>
          </a>
          <p class="card-text">{$ project.text $}</p>
        </div>
      </div>
    </div>
    `
})
