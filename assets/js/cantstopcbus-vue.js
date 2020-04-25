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

let transformPartner = (partner) => {
  return partner
}

let transformProject = (project) => {
  var retval = {
    website: project["Project Website"],
    text: project["Project Public Desc"],
    title: project.Title,
    impact: project["Primary Impact Area"][0]["Impact Area"]
  }
  let defaultLogo = "/assets/img/UX/cscbus_logo_square.svg"
  retval.logo = project.hasOwnProperty("Project Logo")
    ? project["Project Logo"][0].url
    : defaultLogo
  return retval
}

let matchTab = (tabName, projects) => {
  return projects.filter((project) => project.impact === tabName)
}

let projectImpacts = (projects) => {
  return projects
    .map((project) => project.impact)
    .filter((value, idx, self) => self.indexOf(value) === idx)
    .sort((a, b) => a >= b)
}

let partnerFilter = (all, attribute ) => {
  return all.filter((partner) => partner[attribute] === true && partner.Logo)
}

var cantstopcbus = new Vue({
  el: "#cantstopcbus-content",
  delimiters: ["{$", "$}"],
  data: {
    carouselProjects: [],
    allProjects: [],
    projectImpacts: [],
    partnerAllies: [],
    partnerAngels: [],
    partnerCommunity: [],
    partnerProfPartner: [],
    partnerInKind: [],
    partnerFeatured: []
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
          this.projectImpacts = projectImpacts(this.allProjects)
          this.carouselProjects = shuffle(this.allProjects).slice(0, 4)
        },
        (error) => {
          console.error(error)
        }
      )
    axios.get("https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/partners")
        .then((response) => {
          this.allPartners = response.data.map((partner) => transformPartner(partner))
          this.partnerAllies = partnerFilter(this.allPartners, "PubAlly")
          this.partnerAngels = partnerFilter(this.allPartners, "PubAngel")
          this.partnerCommunity = partnerFilter(this.allPartners, "PubCommPartner")
          this.partnerProfPartner = partnerFilter(this.allPartners, "PubProfPartner")
          this.partnerInKind = partnerFilter(this.allPartners, "PubInKind")
          this.partnerFeatured = partnerFilter(this.allPartners, "PubFeatured")          
        },
        (error) => {
          console.error(error)
        })
  },
  methods: {
    partnerCommunity: function () {
      return this.allPartners.filter((partner) => partner.pubComm === true && partner.Logo)
    }
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

Vue.component("partner-card", {
  props: ["item"],
  delimiters: ["{$", "$}"],
  template: `
    <a class="card-link text-info text-center mt-auto" :href="item.URL" target="_blank">
    <div class="card h-100">
      <div class="embed-responsive embed-responsive-21by9">
          <img :alt="item.Partner" class="sponsorlogo" :src="item.Logo[0].url" />
      </div>
      <div class="card-body d-flex flex-column">
        <p class="card-link text-info text-center mt-auto">{$ item.Partner $}</p>
      </div>
    </div>
    </a>
  `
})
