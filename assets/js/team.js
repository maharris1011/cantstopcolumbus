//
// team.js
//
// Contains all of the functions needed for interactivity using Vuejs
// on the people page, including the main Vue instance and all Vue Components
//
//

var cantstopcbus = new Vue({
  el: "#cantstopcbus-content",
  delimiters: ["{$", "$}"],
  data: {
    people: []
  },
  methods: {
    peopleFilterByType: function (type) {
      return this.people.filter((person) => {
        return person[type] === true
      }).sort()
    }
  },
  computed: {
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
