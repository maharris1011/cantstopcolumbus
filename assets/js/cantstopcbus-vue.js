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
    impact: project["Primary Impact Area"][0]["Impact Area"]
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
  },
  methods: {
    matchTab: function (tabName) {
      return this.allProjects().filter((project) => project.impact === tabName)
    },
    partnerFilter: function (attribute) {
      return this.allPartners().filter((partner) => partner[attribute] === true && partner.Logo)
    },
    projectImpacts: function () {
      return this.allProjects()
        .map((project) => project.impact)
        .filter((value, idx, self) => self.indexOf(value) === idx)
        .sort((a, b) => a >= b)
    },
    carouselProjects: function () {
      return shuffle(this.allProjects()).slice(0, 4)
    },
    allPartners: function () {
      return this.partners
    },
    allProjects: function () {
      return this.projects.map((project) => {
        return transformProject(project)
      })
    }
  },
  created: function () {
    axios
      .get(
        "https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/projects"
      )
      .then(
        (response) => {
          this.projects = response.data
        },
        (error) => {
          console.error(error)
        }
      )
    axios.get("https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/partners")
        .then((response) => {
          this.partners = response.data
        },
        (error) => {
          console.error(error)
        })
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


var example1 = new Vue({
  el: '#volunteer',
  delimiters:["{$", "$}"],
  data: {
    chosenPassionList: []
  },
  methods: {
    pF: function () {
      console.log(this.chosenPassionList)
      return this.chosenPassionList
    },
  }

})

const app = new Vue({
  el:'#volunteer',
  delimiters: ["{$", "$}"],
  data: {
    
    chosenPassionList:[],
        //{name: null, id: null}
     // ],
     //chosenActivitiesList:[null],
     /* chosenPositionList:null,
      firstName:null,
      lastName:null,
      primEmail:null,
      phone:null,
      work:null,
      other:null,
      city:null,
      state:null,
      linkedin:null,
      twitter:null,
      hours:null,
      misc:null,
      mentoring:null,
      contributing:null,
      remote:null,
      errors:[],
      pseudoConduct:false,
      passionList:[],
      positionList:[],
      activitiesList:[],
      objItem: {
           name: null,
           id: null
      },
      modalInputs: [],
      type:null,
      imgURL: null,
      imgName: null,
      submitted : false,
      fileTag: null*/
      
     /* var copyFirstName = document.getElementById("firstName"),
          copyLastName = document.getElementById("lastName"),
          copyPrimEmail = document.getElementById("primEmail"),
          copyPhone = document.getElementById("phone"),
          copyWork = document.getElementById("work"),
          copyOther = document.getElementById("other"),
          copyCity = document.getElementById("city"),
          copyState = document.getElementById("state"),
          copyLinkedIn = document.getElementById("linkedin"),
          copyTwitter = document.getElementById("twitter"),
          copyHours = document.getElementById("hours"),
          copyMisc = document.getElementById("misc"),
          var passionList = []//=['Access to Information', 'Education', 'Elderly & At-Risk Populations', 'Emergency Services', 'Employment', 'Financial Support', 'Food & Hunger', 'General Aid', 'Healthcare \\\ Medical Resources', 'K-12 Education', 'Mental Health', 'Minority, Immigrant & Refugee Resources', 'Mobility', 'Non-Profit Support', 'Small Business', 'Other (describe below)'];
          var positionList = []//=['3D Printing', 'Animation', 'Audio Editing', 'Business Analysis', 'Community Volunteering', 'Copywriting', 'Crafting', 'Data - Product Analytics', 'Data - Synthesis', 'Data - Visualization', 'Data Entry', 'Digitial Strategy', 'DIY', 'E-Commerce', 'Education - K-12', 'Education - Post-Secondary', 'Education - Pre-K', 'Epidemiology', 'Graphic Design', 'Healthcare', 'Hustle', 'Internet Research', 'Language - Spanish', 'Legal', 'Marketing', 'Non-Profit Volunteering', 'Performing Arts/Music', 'Personal /// Professional Network - Government', 'Personal /// Professional Network - Health', 'Personal /// Professional Network - Other', 'Personal /// Professional Network - Students', 'Podcast Production/Hosting', 'Process Engineering', 'Product Management', 'Project Management', 'Real Estate Development', 'Recruiting', 'Social Media', 'Tech - .NET', 'Tech - Android Development', 'Tech - Backend Development', 'Tech - C++', 'Tech - Database', 'Tech - Excel', 'Tech - Flask', 'Tech - Frontend Development', 'Tech - GIS', 'Tech - HTML///CSS', 'Tech - Information Security', 'Tech - Infrastructure', 'Tech - iOS Development', 'Tech - Java', 'Tech - JavaScript', 'Tech - Microcontrollers', 'Tech - Node', 'Tech - Python', 'Tech - QA', 'Tech - R', 'Tech - Rails', 'Tech - React', 'Tech - Redux', 'Tech - Spring Boot', 'Tech - SquareSpace', 'Tech - Swift', 'Tech - TensorFlow', 'Tech - VBA', 'Tech - Vue.js', 'Tech - WordPress Development', 'UI Design', 'UX Design', 'UX Research', 'Video Editing', 'Visual Arts', ];
          var activitiesList = []//=['Research and Data Collection', 'Administration and Documentation', 'Coding and Tech Development', 'Project and/or Product Management', 'Organizing and/or Hosting Virtual Programming', 'Recruiting New Members and Skillsets', 'Ideation and Solution Discovery', 'External Communications (Social Media, PR, Copywriting, etc)', 'Graphic Design', 'Fundraising and Forming Community Partnerships'];


          var chosenPassionList=[];
          var chosenActivitiesList=[];
          var chosenPositionList=[];    
          */
  //  }
 },
  watch:{

  } ,
  methods: {
      pF: function () {
        console.log(this.chosenPassionList)
        return this.chosenPassionList
      },
    
          checkForm: function (e) {
              this.submitted = true;
              this.errors = [];

              if (!this.firstName) {
                  this.errors.push("First Name required.");
              }
              if (!this.lastName) {
                  this.errors.push("Last Name required.");
              }            
              if (!this.primEmail) {
                  this.errors.push('Email required.');
              } else if (!this.validEmail(this.primEmail)) {
                  this.errors.push('Valid email required.');
              }
              if (!this.pseudoConduct) {
                  this.errors.push("Conduct Agremment required.");
              }
              if (!this.errors.length) {
                          var interested=[];
                          console.log(copyMentoring);
                          if(this.mentoring){
                              console.log("MENTORING");
                              interested.push("Mentoring")
                          }

                          if(this.contributing){
                              interested.push("Contributing")
                          }

                          if(this.remote){
                              interested.push("Giving a remote talk")
                          }
                          axios.post(`https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/volunteers`, {
                              body: JSON.stringify({
                                      /*"Business":copyName.value,
                                      "Promo":copyText.value,
                                      "Website": copySite.value*/
                                      "First Name": this.firstName,
                                      "Last Name": this.lastName,
                                      "Primary Email": this.primEmail,
                                      "Phone": this.phone,
                                      "Website 1": this.work,
                                      "Website 2": this.other,
                                      "City": this.city,
                                      "State": this.state,
                                      "LinkedIn": this.linkedin,
                                      "Twitter": this.twitter,
                                      "Available hours/week": this.hours,
                                      "Talent notes": this.misc,
                                      "Skills": this.chosenPositionList,
                                      "Passions": this.chosenPassionList,
                                      "Activities": this.chosenActivitiesList,
                                      "Photo Upload": [
                                          {
                                          "url": this.imgURL
                                          }
                                      ],
                                      "I am interested in contributing my skills to ...": interested,
                                      "COC Affirmation": true,
                                      })
                              })
                          .then(response => {
                              if(response.status == '200')
                              {
                                  e.target.classList.add('was-validated');
                                  window.location.pathname = '/volunteer-success.html';
                                  return true;
                              }
                          })
                          .catch(e => {
                               this.errors.push(e)
                               e.stopPropagation()
                              })

                          //
                      }
                      else {
                          e.preventDefault();
                      }
                      e.target.classList.add('was-validated');
              },
      
      changeConductValue: function(event){
          this.$ref.pseudoConduct.checked = event.target.checked
      },
      urlValidate: function(event){
          var string = $(this).val();
              if (!string.match(/^https?:/) && string.length) {
                  string = "http://" + string;
                  $(this).val(string)
              }
      },
      validEmail: function (email) {
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      },
      creatingListsMounted: function(){
        
        //console.log(this.chosenPassionList)
          axios.get('https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/skills').then(response => {
              for (var item in response.data) {
                  var object = {name: item["Skill"], id: item["id"]}
                  this.positionList.push(object);
              }
           });

           axios.get('https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/categories').then(response => {
              for (var item in response.data) {
                  var object = {name: item["Category"], id: item["id"]}
                  this.passionList.push(object);
              }
           });

           axios.get('https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/activities').then(response => {
              for (var item in response.data) {
                  var object = {name: item["Activity"], id: item["id"]}
                  this.activitiesList.push(object);
              }
           });
      },
      handleBlur: function(e) {
          console.log("Hi")
          console.log('blur', e.target.placeholder)
          if (e.target.value.length > 0)
              {
                  console.log(e.target.id);
                  var string = "label[for='" +e.target.id + "']";
                  console.log(string);
                  if($(string).length){
                      console.log("Success")
                      $(string)[0].classList.add("stateField")
                  }
                  
              }
              //console.log($("label[for='firstName']"));
          // console.log($("label[for='firstName']")[0].classList);
          // $("label[for='firstName']")[0].classList.add("stateField")
          else if(e.target.value.length <= 0){
              var string = "label[for='" +e.target.id + "']";
                  console.log(string);
                  if($(string).length){
                      console.log("Success")
                      $(string)[0].classList.remove("stateField")
                  }
          }
        },

  },
  mounted: function () {
      // `this` points to the vm instance
     // console.log(document.querySelector('#firstName'))
     // this.chosenPassionList = [];
     // console.log(this.chosenPassionList);
      //this.creatingListsMounted();
      


     /* this.$ref.fileTag.addEventListener("change", function() {
                  changeImage(this);
      });

      ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                  this.$ref.uploadBox.addEventListener(eventName, preventDefaults, false)   
                  document.body.addEventListener(eventName, preventDefaults, false)
      })

                  // Highlight drop area when item is dragged over it
      ;['dragenter', 'dragover'].forEach(eventName => {
                      this.$ref.uploadBox.addEventListener(eventName, highlight, false)
      })

      ;['dragleave', 'drop'].forEach(eventName => {
                      this.$ref.uploadBox.addEventListener(eventName, unhighlight, false)
      })

      this.$ref.uploadBox.addEventListener('drop', handleDrop, false)
*/
   

  }, 
  
  })




//forimage

/*
var app = new Vue({
  el: '#app',
  delimiters:["{$", "$}"],
  data: {
    variableAtParent: 'DATA FROM PARENT!'
  }
})

Vue.component('child-comp', {
  props: ['message'], // declare the props
  delimiters:["{$", "$}"],
  template: '<p>At child-comp, using props in the template: {$ message $}</p>',
  mounted: function () {
    console.log('The props are also available in JS:', this.message);
  }
}) */