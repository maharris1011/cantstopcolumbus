//
// moreaboutus.js
//
// Contains all of the functions needed for interactivity using Vuejs
// on the "More about us" page, including the main Vue instance and all Vue Components
//
//

var cantstopcbus = new Vue({
  el: "#cantstopcbus-content",
  delimiters: ["{$", "$}"],
  data: {
    projects: [],
    partners: [],
    people: []
  },
  methods: {
    partnerFilter: function (attribute) {
      return this.allPartners.filter(
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

