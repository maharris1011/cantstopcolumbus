
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
        alert("Select an image")
        return
      }
      var img = new Image()
      var reader = new FileReader()
      var vm = this.newVolunteer

      reader.onload = function (e) {
        vm.photo = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeFile() {
      this.newVolunteer.photo = ""
    },
    objItem: function (name, id) {
      return {
        name: name,
        id: id
      }
    },
    toggleModal(interest) {
      this.showModal = !this.showModal
      this.type = interest
      if (!this.showModal) {
        $("#myModal").modal("hide")
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
          `invalid volunteer ${this.isValid} ${JSON.stringify(
            this.newVolunteer
          )}`
        )
      }
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
        "Available hours/week": volunteer.hours,
        "Talent notes": volunteer.misc,
        Skills: volunteer.chosenPositionList,
        Passions: volunteer.chosenPassionList,
        Activities: volunteer.chosenActivitiesList,
        photo: volunteer.photo,
        // "Photo Upload": [
        //   {
        //     url: this.imgURL
        //   }
        // ],
        "I am interested in contributing my skills to ...":
          volunteer.interested,
        "COC Affirmation": volunteer.cocaffirmation
      })
      console.log(`posting ${vol}`)
      return true
      axios
        .post(
          `https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/volunteers`,
          {
            body: vol
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
    clearChildren: function () {
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
    },

    addPassionToChosen: function (passion) {
      console.log("HI")
      console.log(passion)
      this.newVolunteer.chosenPassionList.push(passion)

      //  var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + passion.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + passion + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePassion('" + passion + "', '" + id + "')\">&times;</span></button>"
      //  this.$refs.passionWorkButtonGroup.append(newButton);
      this.toggleModal(null)
    },
    deletePassion: function (passion) {
      console.log("FUNCTION CLICKED")
      console.log(passion)
      if (this.newVolunteer.chosenPassionList.indexOf(passion) > -1) {
        this.newVolunteer.chosenPassionList.splice(
          this.newVolunteer.chosenPassionList.indexOf(passion),
          1
        )
      }
    },
    addPositionToChosen: function (position) {
      console.log("Pushing " + position)
      this.newVolunteer.chosenPositionList.push(position)
      console.log(position)
      //var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + position.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + position + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePosition('" + position + "', '" + id + "')\">&times;</span></button>"
      //this.$refs.positionButtonGroup.append(newButton);
      //this.$refs.modal.modal("hide");
      this.toggleModal(null)
    },

    deletePosition: function (position) {
      if (this.newVolunteer.chosenPositionList.indexOf(position) > -1) {
        this.newVolunteer.chosenPositionList.splice(
          this.newVolunteer.chosenPositionList.indexOf(position),
          1
        )
      }
    },

    addActivityToChosen: function (activity) {
      this.newVolunteer.chosenActivitiesList.push(activity)
      /*var newButton = '<button class="modalButton" type="button" id="chosen"' 
                         + activity.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + '" >"'
                         + activity + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deleteActivity('" + activity + "')\">&times;</span></button>"
         //var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" */
      //$("#activitiesButtonGroup").append(newButton);
      //this.$refs.modal.modal("hide");
      this.toggleModal(null)
    },

    deleteActivity: function (activity) {
      console.log("DELETING ACTIVITY")
      console.log(activity)
      if (this.newVolunteer.chosenActivitiesList.indexOf(activity) > -1) {
        this.newVolunteer.chosenActivitiesList.splice(
          this.newVolunteer.chosenActivitiesList.indexOf(activity),
          1
        )
      }
    },
    clearChildren: function () {
      this.type = null
    }
  }
})
