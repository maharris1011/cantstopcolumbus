var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    pseudoConduct: false,
    passionList: [],
    positionList: [],
    activitiesList: [],
    modalInputs: [],
    type: null,
    imgURL: null,
    imgName: null,
  },
  mounted() {
    this.loadActivities()
    this.loadPassions()
    this.loadPositions()


    // [("dragenter", "dragover", "dragleave", "drop")].forEach((eventName) => {
    //   this.$ref.uploadBox.$on(eventName, this.preventDefaults)
    //   document.body.$on(eventName, this.preventDefaults)
    // })

    // ["dragenter", "dragover"].forEach((eventName) => {
    //   this.$ref.uploadBox.$on(eventName, this.highlight)
    // })

    // ["dragleave", "drop"].forEach((eventName) => {
    //   this.$ref.uploadBox.$on(eventName, this.unhighlight)
    // })

    // this.$ref.uploadBox.$on("drop", this.handleDrop)

    // this.$el.querySelectorAll(".volunteerField").forEach((button) => {
    //   button.addEventListener("change", (e) => {
    //     if (e.target.value.length > 0 && $(this)[0].nodeName == "INPUT") {
    //       console.log(e.target.id)
    //       var string = "label[for='" + e.target.id + "']"
    //       console.log(string)
    //       if ($(string).length) {
    //         console.log("Success")
    //         $(string)[0].classList.add("stateField")
    //       }
    //     } else if (e.target.value.length <= 0) {
    //       var string = "label[for='" + e.target.id + "']"
    //       console.log(string)
    //       if ($(string).length) {
    //         console.log("Success")
    //         $(string)[0].classList.remove("stateField")
    //       }
    //     }
    //   })
    // })
  },
  watch: {},
  computed: {
    validation: function() {
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
        // hours: !!this.newVolunteer.hours.trim(),
        cocaffirmation: this.newVolunteer.cocaffirmation === true,
      }
    },
    isValid: function() {
      var validation = this.validation;
      return Object.keys(validation).every(function(key) {
        return validation[key];
      });
    }
  },  
  methods: {
    objItem: function(name, id) {
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
        console.log(`invalid volunteer ${this.isValid} ${JSON.stringify(this.newVolunteer)}`)
      }
    },
    postToAPI: function (volunteer) {
      console.log(`posting ${JSON.stringify(volunteer)}`)
      return true
      axios
        .post(
          `https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/volunteers`,
          {
            body: JSON.stringify({
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
              "Available hours/week": volunteer.hours,
              "Talent notes": volunteer.misc,
              Skills: this.chosenPositionList,
              Passions: this.chosenPassionList,
              Activities: this.chosenActivitiesList,
              // "Photo Upload": [
              //   {
              //     url: this.imgURL
              //   }
              // ],
              "I am interested in contributing my skills to ...": volunteer.interested,
              "COC Affirmation": volunteer.cocaffirmation
            })
          }
        )
        .then((response) => {
          if (response.status === "200") {
            e.target.classList.add("was-validated")
            window.location.pathname = "/volunteer-success.html"
            return true
          }
        })
        .catch((e) => {
          this.errors.push(e)
          e.stopPropagation()
        })
    },
    changeConductValue: function (event) {
      this.$ref.pseudoConduct.checked = event.target.checked
    },
    urlValidate: function (url) {
      if (!url.match(/^https?:/) && url.length) {
        url = "http://" + url
      }
      return url
    },
    loadPositions: function () {
      axios
        .get(
          "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/skills"
        )
        .then((response) => {
          this.positionList = response.data.map((skill) => this.objItem(skill.Skill, skill.id))
        })
      return true
    },
    loadPassions: function () {
      axios
        .get(
          "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/categories"
        )
        .then((response) => {
          this.passionList = response.data.map((cat) => this.objItem(cat.Category, cat.id))
        })
    },
    loadActivities: function () {
      axios
        .get(
          "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/activities"
        )
        .then((response) => {
          this.activitiesList = response.data.map((activity) => this.objItem(activity.Activity, activity.id))
        })
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    clearChildren: function () {
      //this.$refs.modalButtonGroup.empty();
      this.type = null
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
    changeImage: function (e) {
      this.newVolunteer.photo = e.target.files[0]
    },
    getDataUrl: function (img) {
      var canvas = document.createElement("canvas")
      var ctx = canvas.getContext("2d")

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // If the image is not png, the format
      // must be specified here
      return canvas.toDataURL("image/jpg")
    }
  }
})
