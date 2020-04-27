//
// volunteer.js
//
// Contains all of the functions needed for interactivity using Vuejs
// on the volunteer page, including the main Vue instance and all Vue Components
//
//


var cantstopcbus = new Vue({
    el:'#volunteer',
    delimiters: ["{$", "$}"],
    data: () => {
        let defaultLists = [];
      return {
        chosenPassionList:defaultLists,
        chosenActivitiesList: defaultLists,
         chosenPositionList:defaultLists,
         passionList:defaultLists,
         positionList:defaultLists,
         activitiesList:defaultLists,
 
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
         modalInputs:defaultLists,
         type:null,
         imgURL: null,
         imgName: null,
         submitted : false,
         fileTag: null
      }
      
   },
   mounted: function () {
       
    console.log("Hi")
    this.creatingListsMounted();
    setTimeout(() => {
        console.log('timeout ', this.$refs);
      }, 0)


    /*this.fileTag.addEventListener("change", function() {
                changeImage(this);
    });

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.$ref.upload_Box.addEventListener(eventName, preventDefaults, false)   
                document.body.addEventListener(eventName, preventDefaults, false)
    })

                // Highlight drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(eventName => {
                    this.$ref.upload_Box.addEventListener(eventName, highlight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
                    this.$ref.upload_Box.addEventListener(eventName, unhighlight, false)
    })

    this.$ref.upload_Box.addEventListener('drop', handleDrop, false)
*/
 

}, 
    methods: {
        pF: function () {
          console.log(this.chosenPassionList)
          return this.chosenPassionList
        },
      
            checkForm: function (e) {
                let component = this;
                this.submitted = true;
                this.errors = [];
  
                if (!component.firstName) {
                    this.errors.push("First Name required.");
                }
                if (!component.lastName) {
                    this.errors.push("Last Name required.");
                }            
                if (!component.primEmail) {
                    this.errors.push('Email required.');
                } else if (!component.validEmail(component.primEmail)) {
                    component.errors.push('Valid email required.');
                }
                if (!component.pseudoConduct) {
                    component.errors.push("Conduct Agremment required.");
                }
                if (!component.errors.length) {
                            var interested=[];
                            console.log(copyMentoring);
                            if(component.mentoring){
                                console.log("MENTORING");
                                interested.push("Mentoring")
                            }
  
                            if(component.contributing){
                                interested.push("Contributing")
                            }
  
                            if(component.remote){
                                interested.push("Giving a remote talk")
                            }
                            axios.post(`https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/volunteers`, {
                                body: JSON.stringify({
                                        /*"Business":copyName.value,
                                        "Promo":copyText.value,
                                        "Website": copySite.value*/
                                        "First Name": component.firstName,
                                        "Last Name": component.lastName,
                                        "Primary Email": component.primEmail,
                                        "Phone": component.phone,
                                        "Website 1": component.work,
                                        "Website 2": component.other,
                                        "City": component.city,
                                        "State": component.state,
                                        "LinkedIn": component.linkedin,
                                        "Twitter": component.twitter,
                                        "Available hours/week": component.hours,
                                        "Talent notes": component.misc,
                                        "Skills": component.chosenPositionList,
                                        "Passions": component.chosenPassionList,
                                        "Activities": component.chosenActivitiesList,
                                        "Photo Upload": [
                                            {
                                            "url": component.imgURL
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
                                component.errors.push(e)
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
            this.$refs.pseudoConduct.checked = event.target.checked
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
            let component = this;
            console.log(component.positionList)
            axios.get('https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/skills').then(response => {
                response.data.map(function(value, key) {
                    component.positionList.push({name: value["Skill"], id: value["id"]});
                  });
             });
  
             axios.get('https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/categories').then(response => {
                response.data.map(function(value, key) {
                    component.passionList.push({name: value["Category"], id: value["id"]});
                  });
             });
  
             axios.get('https://wduc7ys73l.execute-api.us-east-1.amazonaws.com/dev/activities').then(response => {
                response.data.map(function(value, key) {
                    component.activitiesList.push({name: value["Activity"], id: value["id"]});
                  });
             });
        },
        clearChildren: function() { 
            let component = this;
            //this.$refs.modalButtonGroup.empty();
            component.type=null;
        }, 
        highlight: function(e) {
            let component = this;
            component.$refs.upload_Box.classList.add('highlightBox')
         },
        unhighlight: function(e) {
            let component = this;
            component.$refs.upload_Box.classList.remove('highlightBox')
        },
        preventDefaults: function(e) {
            e.preventDefault()
            e.stopPropagation()
        },
        handleDrop: function (e) {
            var dt = e.dataTransfer
                            //var files = dt.files

            changeImage(e.dataTransfer);
                        //handleFiles(files)
        },
        openPassionList: function() {
            let component = this;
            /* passionList.forEach(function (passionWork, index) {
                 if(!this.chosenPassionList.includes(passionWork.id))
                 {
                     var text = "<button class=\"modalButton\" type=\"button\" id=\"" + passionWork.name + "\" @click=\"addPassionToChosen(" + passionWork + ")\" >"  + passionWork.name + "</button>"
                     this.modalInputs.push(text);
                     //this.$refs.modalButtonGroup.append(text);
                 }
             });*/
             component.type='Passion';
         },
         addPassionToChosen: function(passion){
             console.log("HI");
             console.log(passion);
             let component = this;
             component.chosenPassionList.push(passion);
           //  var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + passion.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + passion + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePassion('" + passion + "', '" + id + "')\">&times;</span></button>"
           //  this.$refs.passionWorkButtonGroup.append(newButton);
             component.$refs.modal.modal("hide");
             clearChildren();
         },
         deletePassion: function(passion){
            let component = this;
             console.log("FUNCTION CLICKED");
             console.log(passion);
             if (component.chosenPassionList.indexOf(passion) > -1) {
                component.chosenPassionList.splice(component.chosenPassionList.indexOf(position), 1);
             }
             
            // var removeText = "chosen"+passion.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
            // console.log(removeText);
            // this.$refs.passionWorkButtonGroup.removeChild(this.$refs.removeText);
             //var child = document.getElementById(removeText)
             //
         },
         openPositionList: function() {
            let component = this;
            component.type='Position';
             /*positionList.forEach(function (position, index) {
                 if(!this.chosenPositionList.includes(position.id)){
                     console.log(position)
                     var text = "<button class=\"modalButton\" type=\"button\" id=\"" + position.name + "\" @click=\"addPositionToChosen(" + position + ")\" >"  + position.name + "</button>"
                     this.modalInputs.push(text);
                     //this.$refs.modalButtonGroup.append(text);
                 }
 
             });*/
         },
         addPositionToChosen: function(position){
             console.log("Pushing " + position);
             let component = this;
             component.chosenPositionList.push(position);
             console.log(position)
             //var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + position.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + position + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePosition('" + position + "', '" + id + "')\">&times;</span></button>"
             //this.$refs.positionButtonGroup.append(newButton);
             component.$refs.modal.modal("hide");
             clearChildren();
         },
 
         deletePosition: function(position){
             console.log("DELETING POSITION" + this.position)
             console.log(chosenPositionList);
             console.log(index);
             let component = this;
             if (component.chosenPositionList.indexOf(position) > -1) {
                component.chosenPositionList.splice(component.chosenPositionList.indexOf(position), 1);
             }
             
            // var removeText = "chosen" + position.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
             //console
            // console.log(removeText);
             //var child = document.getElementById(removeText);
             //console.log(child);
           //  document.getElementById("positionButtonGroup").removeChild(child);
         },
 
         openActivitiesList: function() {
            let component = this;
            component.type="Activities"
            /* activitiesList.forEach(function (activity, index) {
                 if(!chosenActivitiesList.includes(activity.id))
                 {
                     var text = "<button class=\"modalButton\" type=\"button\" id=\"" + activity.name + "\" @click=\"addActivityToChosen('" + activity.name + "', '" + activity.id + "')\" >"  + activity.name + "</button>"
                     this.modalInputs.push(text);
                     //$("#modalButtonGroup").append(text)
                 }
             });*/
         },
         addActivityToChosen: function(activity){
            chosenActivitiesList.push(activity);
            let component = this;
           /*var newButton = '<button class="modalButton" type="button" id="chosen"' 
                            + activity.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + '" >"'
                            + activity + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deleteActivity('" + activity + "')\">&times;</span></button>"
            //var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" */
            //$("#activitiesButtonGroup").append(newButton);
            component.$refs.modal.modal("hide");
            clearChildren();
        },

        deleteActivity: function(activity){
            console.log("DELETING ACTIVITY");
            console.log(activity);
            let component = this;
            if (component.chosenActivitiesList.indexOf(activity) > -1) {
                component.chosenActivitiesList.splice(component.chosenActivitiesList.indexOf(activity), 1);
            }
            
         //   var removeText = "chosen" + activity.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
         //   var child = document.getElementById(removeText)
         //   document.getElementById("activitiesButtonGroup").removeChild(child);
        },

        changeImage: function(input) {
            const reader = new FileReader();
            const file = input.files[0];
            let component = this;

            reader.onload  = (event) => {
                //this.product.image = event.target.result
                component.imgName = event.target.result.name
                component.imgURL = getDataUrl(event.target.result)
            }
            reader.readAsDataURL(file);
        },

        getDataUrl:function (img) {
            var canvas = document.createElement('canvas')
            var ctx = canvas.getContext('2d')

            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            // If the image is not png, the format
            // must be specified here
            return canvas.toDataURL("image/jpg");
        } 
    }    
})