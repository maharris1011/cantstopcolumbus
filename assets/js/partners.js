//
// partners.js
//
// Contains all of the functions needed for interactivity using Vuejs
// on the partners page, including the main Vue instance and all Vue Components
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
