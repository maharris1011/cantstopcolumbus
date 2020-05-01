var app = new Vue({
  el: "#cantstopcbus-content",
  delimiters: ["{$", "$}"],
  data: {
    newVolunteer: {
      firstName: null,
      lastName: null,
      primEmail: null,
      phone: null,
      work: null,
      other: null,
      city: null,
      state: null,
      linkedin: null,
      twitter: null,
      hours: null,
      misc: null,
      chosenPassionList: [],
      chosenActivitiesList: [],
      chosenPositionList: [],
      interested: [],
      cocaffirmation: false,
      photo: null
    },
    potentialInterests: ["Contributing", "Mentoring", "Giving a remote talk"],
    passionList: [],
    positionList: [],
    activitiesList: [],
    imgURL: null,
    imgName: null
  },
  mounted() {
    this.loadActivities()
    this.loadPassions()
    this.loadPositions()
  },
  watch: {},
  computed: {
    validation: function () {
      return {
        firstName: !!this.newVolunteer.firstName.trim(),
        lastName: !!this.newVolunteer.lastName.trim(),
        primEmail: this.validEmail(this.newVolunteer.primEmail),
        phone: !!this.newVolunteer.phone.trim(),
        // work: !!this.newVolunteer.work.trim(),
        // other: !!this.newVolunteer.other.trim(),
        city: !!this.newVolunteer.city.trim(),
        state: !!this.newVolunteer.state.trim(),
        // linkedin: !!this.urlValidate(this.newVolunteer.linkedin).trim(),
        // twitter: !!this.newVolunteer.twitter.trim(),
        hours: !!this.newVolunteer.hours.trim(),
        cocaffirmation: this.newVolunteer.cocaffirmation === true
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    onDrop: function (e) {
      e.stopPropagation()
      e.preventDefault()
      var files = e.dataTransfer.files
      this.createFile(files[0])
    },
    onChange(e) {
      var files = e.target.files
      this.createFile(files[0])
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file")
        return
      }

      var img = new Image()
      var reader = new FileReader()
      var vm = this.newVolunteer
      vm.img = file

      reader.onload = function (e) {
        vm.photo = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeFile(e) {
      e.stopPropagation()
      e.preventDefault()
      this.newVolunteer.photo = null;
      this.newVolunteer.img = null;
    },
    objItem: function (name, id) {
      return {
        name: name,
        id: id
      }
    },
    addVolunteer: function () {
      if (this.isValid) {
        this.postToAPI(this.newVolunteer)
        Object.keys(this.newVolunteer).forEach((key) => {
          this.newVolunteer[key] = ""
        })
      } else {
        console.log(
          `invalid volunteer ${this.isValid} ${JSON.stringify(this.newVolunteer)}`
        )
      }
    },
    mapToIds: function (list) {
      return list.map((elem) => elem.id)
    },
    postToAPI: function (volunteer) {
      let vol = JSON.stringify({
        "First Name": volunteer.firstName,
        "Last Name": volunteer.lastName,
        "Primary Email": volunteer.primEmail,
        Phone: volunteer.phone,
        "Website 1": volunteer.work,
        "Website 2": volunteer.other,
        City: volunteer.city,
        State: volunteer.state,
        LinkedIn: volunteer.linkedin,
        Twitter: volunteer.twitter,
        "Available hours/week": parseInt(volunteer.hours),
        "Talent notes": volunteer.misc,
        Skills: this.mapToIds(volunteer.chosenPositionList),
        Passions: this.mapToIds(volunteer.chosenPassionList),
        Activities: this.mapToIds(volunteer.chosenActivitiesList),
        photo: volunteer.photo,
        "I am interested in contributing my skills to ...":
          volunteer.interested,
        "COC Affirmation": volunteer.cocaffirmation
      })

      let config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      }

      axios
        .post(
          `https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/volunteers`,
          vol,
          config
        )
        .then((response) => {
          if (response.status == "200") {
            window.location.pathname = "/volunteer-success.html"
          }
        })
        .catch((e) => {
          console.log(`error creating volunteer ${e}`)
        })
    },
    urlValidate: function (url) {
      if (url == null) {
        return url
      }
      if (!url.match(/^https?:/) && url.length) {
        url = "https://" + url
      }
      return url
    },
    loadPositions: function () {
      axios
        .get(
          "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/skills"
        )
        .then((response) => {
          this.positionList = response.data.map((skill) =>
            this.objItem(skill.Skill, skill.id)
          )
        })
      return true
    },
    loadPassions: function () {
      axios
        .get(
          "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/categories"
        )
        .then((response) => {
          this.passionList = response.data.map((cat) =>
            this.objItem(cat.Category, cat.id)
          )
        })
    },
    loadActivities: function () {
      axios
        .get(
          "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/activities"
        )
        .then((response) => {
          this.activitiesList = response.data.map((activity) =>
            this.objItem(activity.Activity, activity.id)
          )
        })
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    highlight: function (e) {
      e.target.addClass("highlightBox")
    },
    unhighlight: function (e) {
      e.target.removeClass("highlightBox")
    },
    preventDefaults: function (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    handleDrop: function (e) {
      console.log(`e.target = ${e.target}`)
      // changeImage(e.target.dataTransfer.files[0])
    },
    addToChosen(list, choice) {
      list.push(choice)
    },
    deleteFromChosen(list, choice) {
      list = list.filter((elem) => elem !== choice)
    }
  }
})

Vue.component("modal-choices", {
  props: ["modalId"],
  delimiters: ["{$", "$}"],
  template: `
    <div class="modal fade" ref="modal" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable volunteerModal" role="document">
        <div class="modal-content volunteerModal" id="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Choose an Option Below</h5>
            <button type="button" data-dismiss="modal" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body justify-content-center" id="modalBody">
            <slot name="body">
            </slot>
          </div>
          <slot name="footer">
            <button class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </slot>
        </div>
      </div>
    </div>
    `
})
