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
    projects: [],
    partners: [],
    people: []
  },
  methods: {
    projectsForCategory: function (category) {
      return this.allProjects.filter((project) => project.category === category)
    },
    partnerFilter: function (attribute) {
      return this.allPartners().filter(
        (partner) => partner[attribute] === true && partner.Logo
      )
    },
    peopleFilterByType: function (type) {
      return this.people.filter((person) => {
        return person[type] === true
      }).sort()
    }
  },
  computed: {
    carouselProjects: function () {
      return shuffle(this.allProjects).slice(0, 4)
    },
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
    },
    // Partners
    allPartners: function () {
      return this.partners
    },
    professionalPartners: function () {
      return this.partnerFilter("PubProfPartner")
    },
    allies: function () {
      return this.partnerFilter("PubAlly")
    },
    angels: function () {
      return this.partnerFilter("PubAngel")
    },
    communityPartners: function () {
      return this.partnerFilter("PubCommPartner")
    },
    featuredPartners: function () {
      return this.partnerFilter("PubFeatured")
    },
    inKindPartners: function () {
      return this.partnerFilter("PubInKind")
    },
    // Team Members
    navigators: function () {
      return this.peopleFilterByType("PubNavigator")
    },
    organizers: function () {
      return this.peopleFilterByType("PubOrganizer")
    },
    projectLeads: function () {
      return this.peopleFilterByType("PubProject")
    },
    special: function () {
      return this.peopleFilterByType("PubSpecial")
    },
    success: function () {
      return this.peopleFilterByType("PubSuccess")
    },
    impact: function () {
      return this.peopleFilterByType("PubImpact")
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

    axios
      .get(
        "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/partners"
      )
      .then(
        (response) => {
          this.partners = response.data
        },
        (error) => {
          console.error(`unable to retrieve partners ${error}`)
        }
      )

    axios
      .get(
        "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/volunteers"
      )
      .then(
        (response) => {
          this.people = response.data
        },
        (error) => {
          console.error(`unable to retrieve volunteers ${error}`)
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

Vue.component("person-card", {
  props: ["item"],
  delimiters: ["{$", "$}"],
  template: `
    <div class="card h-100">
      <div class="embed-responsive embed-responsive-1by1">
        <img :alt="item['Full Name']" 
             class="card-img2-top embed-responsive-item" 
             :src="item['Photo Upload'][0].url" />
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{$ item['Full Name'] $}</h5>
        <p>{$ item['Team Page Byline'] $}</p>
        <a class="card-link text-info text-left mt-auto" :href="item.LinkedIn" target="_blank">
          <i class="fab fa-linkedin" style="font-size:36px"></i>
        </a>
      </div>
    </div>
  `
})
