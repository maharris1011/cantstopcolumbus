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
      interested: [],
      cocaffirmation: false,
    },
    pseudoConduct: false,
    passionList: [],
    positionList: [],
    activitiesList: [],
    chosenPassionList: [],
    chosenActivitiesList: [],
    chosenPositionList: [],
    modalInputs: [],
    type: null,
    imgURL: null,
    imgName: null,
  },
  mounted() {
    this.loadActivities()
    this.loadPassions()
    this.loadPositions()

    // this.$ref.fileTag
    //   .addEventListener("change", function () {
    //     changeImage(this)
    //   })

    //   [("dragenter", "dragover", "dragleave", "drop")].forEach((eventName) => {
    //     this.$ref.uploadBox.addEventListener(eventName, preventDefaults, false)
    //     document.body.addEventListener(eventName, preventDefaults, false)
    //   })

    //   [
    //     // Highlight drop area when item is dragged over it
    //     ("dragenter", "dragover")
    //   ].forEach((eventName) => {
    //     this.$ref.uploadBox.addEventListener(eventName, highlight, false)
    //   })
    //   [("dragleave", "drop")].forEach((eventName) => {
    //     this.$ref.uploadBox.addEventListener(eventName, unhighlight, false)
    //   })
    // this.$ref.uploadBox.addEventListener("drop", handleDrop, false)

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
        work: !!this.newVolunteer.work.trim(),
        other: !!this.newVolunteer.other.trim(),
        city: !!this.newVolunteer.city.trim(),
        state: !!this.newVolunteer.state.trim(),
        linkedin: !!this.urlValidate(this.newVolunteer.linkedin).trim(),
        twitter: !!this.newVolunteer.twitter.trim(),
        hours: !!this.newVolunteer.hours.trim(),
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
              // Skills: this.chosenPositionList,
              // Passions: this.chosenPassionList,
              // Activities: this.chosenActivitiesList,
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
      this.$refs.uploadBox.classList.add("highlightBox")
    },
    unhighlight: function (e) {
      this.$refs.unloadBox.classList.remove("highlightBox")
    },
    preventDefaults: function (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    handleDrop: function (e) {
      var dt = e.dataTransfer
      //var files = dt.files

      changeImage(e.dataTransfer)
      //handleFiles(files)
    },

    openPassionList: function () {
      /* passionList.forEach(function (passionWork, index) {
                  if(!this.chosenPassionList.includes(passionWork.id))
                  {
                      var text = "<button class=\"modalButton\" type=\"button\" id=\"" + passionWork.name + "\" @click=\"addPassionToChosen(" + passionWork + ")\" >"  + passionWork.name + "</button>"
                      this.modalInputs.push(text);
                      //this.$refs.modalButtonGroup.append(text);
                  }
              });*/
      this.type = "Passion"
    },
    addPassionToChosen: function (passion) {
      this.chosenPassionList.push(passion)
      //  var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + passion.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + passion + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePassion('" + passion + "', '" + id + "')\">&times;</span></button>"
      //  this.$refs.passionWorkButtonGroup.append(newButton);
      this.$refs.modal.modal("hide")
      clearChildren()
    },
    deletePassion: function (passion) {
      if (this.chosenPassionList.indexOf(passion) > -1) {
        this.chosenPassionList.splice(
          this.chosenPassionList.indexOf(position),
          1
        )
      }

      // var removeText = "chosen"+passion.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
      // console.log(removeText);
      // this.$refs.passionWorkButtonGroup.removeChild(this.$refs.removeText);
      //var child = document.getElementById(removeText)
      //
    },
    openPositionList: function () {
      this.type = "Position"
      /*positionList.forEach(function (position, index) {
                  if(!this.chosenPositionList.includes(position.id)){
                      console.log(position)
                      var text = "<button class=\"modalButton\" type=\"button\" id=\"" + position.name + "\" @click=\"addPositionToChosen(" + position + ")\" >"  + position.name + "</button>"
                      this.modalInputs.push(text);
                      //this.$refs.modalButtonGroup.append(text);
                  }
  
              });*/
    },
    addPositionToChosen: function (position) {
      console.log("Pushing " + position)
      this.chosenPositionList.push(position)
      console.log(position)
      //var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + position.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + position + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePosition('" + position + "', '" + id + "')\">&times;</span></button>"
      //this.$refs.positionButtonGroup.append(newButton);
      this.$refs.modal.modal("hide")
      clearChildren()
    },

    deletePosition: function (position) {
      console.log("DELETING POSITION" + this.position)
      console.log(chosenPositionList)
      console.log(index)
      if (this.chosenPositionList.indexOf(position) > -1) {
        this.chosenPositionList.splice(
          this.chosenPositionList.indexOf(position),
          1
        )
      }

      // var removeText = "chosen" + position.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
      //console
      // console.log(removeText);
      //var child = document.getElementById(removeText);
      //console.log(child);
      //  document.getElementById("positionButtonGroup").removeChild(child);
    },

    openActivitiesList: function () {
      this.type = "Activities"
      /* activitiesList.forEach(function (activity, index) {
                  if(!chosenActivitiesList.includes(activity.id))
                  {
                      var text = "<button class=\"modalButton\" type=\"button\" id=\"" + activity.name + "\" @click=\"addActivityToChosen('" + activity.name + "', '" + activity.id + "')\" >"  + activity.name + "</button>"
                      this.modalInputs.push(text);
                      //$("#modalButtonGroup").append(text)
                  }
              });*/
    },

    addActivityToChosen: function (activity) {
      chosenActivitiesList.push(activity)
      this.$refs.modal.modal("hide")
      clearChildren()
    },

    deleteActivity: function (activity) {
      console.log("DELETING ACTIVITY")
      console.log(activity)
      if (this.chosenActivitiesList.indexOf(activity) > -1) {
        this.chosenActivitiesList.splice(
          this.chosenActivitiesList.indexOf(activity),
          1
        )
      }
    },
    changeImage: function (input) {
      const reader = new FileReader()
      const file = input.files[0]

      reader.onload = (event) => {
        //this.product.image = event.target.result
        this.imgName = event.target.result.name
        this.imgURL = getDataUrl(event.target.result)
      }
      reader.readAsDataURL(file)
      // imgURL = file.src;

      /*reader.onload =  function(e) {
                               // console.log(e.target.result);
                  
                  img.src = e.target.result
                  img.url = e.target.result
                  console.log(img.url);
                  console.log(input.files[0].url)
                              
                              //.setAttribute('src', e.target.result);
  
                              /*let img = new Image()
                              img.src = e.target.result
                              img.onload = () => {
                                  console.log(img.height);
                                  
                                  console.log(parseInt(document.getElementById("upload_Box").style.height));
                                  console.log((img.height - parseInt(document.getElementById("upload_Box").style.height)));
                                  console.log(parseInt(document.getElementById("upload_Box").style.height) + (img.height - parseInt(document.getElementById("upload_Box").style.height)));
                                  //console.log(parseInt(document.getElementById("upload_Box").style.width) + (img.width - parseInt(document.getElementById("upload_Box").style.width)));
                                  let newHeight = parseInt(document.getElementById("upload_Box").style.height) + (img.height - parseInt(document.getElementById("upload_Box").style.height) + 100)
                                  let newWidth = parseInt(document.getElementById("upload_Box").style.width) + (img.width - parseInt(document.getElementById("upload_Box").style.width) + 150)
                                  document.getElementById("upload_Box").style.height = newHeight.toString() + "px";
                                  document.getElementById("upload_Box").style.width = newWidth.toString() + "px";
                              }
                                
  
                              
              
                             // console.log(input.files[0].height);
                               // console.log(document.getElementById("upload_Box").style.height);
                             // document.getElementById("upload_Box").style.height = document.getElementById("upload_Box").style.height + input.files[0].height;
                              
          }*/
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
