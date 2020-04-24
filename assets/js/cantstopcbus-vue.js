//
// cantstopcbus.js
//
// Contains all of the functions needed for interactivity using Vuejs
// on the site, including the main Vue instance and all Vue Components
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
    title: project.Title
  }
  let defaultLogo = "/assets/img/UX/cscbus_logo_square.svg"
  let defaultCategory = "Everything Else"
  retval.category = project.hasOwnProperty("Category")
    ? project.Category[0].Category
    : defaultCategory
  retval.logo = project.hasOwnProperty("Project Logo")
    ? project["Project Logo"][0].url
    : defaultLogo
  return retval
}

let matchTab = (tabName, projects) => {
  return projects.filter((project) => project.category === tabName)
}

let projectCategories = (projects) => {
  return projects
    .map((project) => project.category)
    .filter((value, idx, self) => self.indexOf(value) === idx)
    .sort((a, b) => a >= b)
}

var cantstopcbus = new Vue({
  el: "#cantstopcbus-content",
  delimiters: ["{$", "$}"],
  data: {
    carouselProjects: [],
    allProjects: [],
    projectCategories: []
  },
  mounted() {
    axios
      .get(
        "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/projects"
      )
      .then(
        (response) => {
          this.allProjects = response.data.map((project) =>
            transformProject(project)
          )
          this.projectCategories = projectCategories(this.allProjects)
          this.carouselProjects = shuffle(this.allProjects).slice(0, 4)
        },
        (error) => {
          console.error(error)
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
          <img :src="project.logo" class="card-img-top align-self-center"/>
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
