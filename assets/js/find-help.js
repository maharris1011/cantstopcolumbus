//
// find-help.js
//
// Contains all of the functions needed for interactivity using Vuejs
// on the find-help page, including the main Vue instance and all Vue Components
//
//

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
    projectsForCategory: function (category) {
      return this.allProjects.filter((project) => project.category === category)
    }
  },
  computed: {
    projectCategories: function () {
      return this.allProjects
        .map((project) => project.category)
        .filter((value, idx, self) => self.indexOf(value) === idx)
        .sort((a,b) => a >= b)
    },
    allProjects: function () {
      return this.projects.map((project) => {
        return transformProject(project)
      })
    }
  },
  created() {
    axios
      .get("https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/projects")
      .then((response) => {
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
    <div class="card my-2 col-sm-6 col-lg-3">
      <div style="height: 50%; padding-top:2em;">
        <div class="d-flex p-1 h-100">
          <img :src="project.logo" class="p-2 card-img-top align-self-center limit-width"/>
        </div>
        <div class="card-body">
          <a :href="project.website" target="_blank">
            <h5 class="card-title">{$ project.title $}</h5>
          </a>
          <p style="padding-bottom: 2em;" class="card-text">{$ project.text $}</p>
        </div>
      </div>
    </div>
    `
})
