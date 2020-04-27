const app = new Vue({
    el:'#volunteer',
    delimiters: ["{$", "$}"],
    data: {
      chosenPassionList:[],
       chosenActivitiesList:[null],
        chosenPositionList:null,
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
        fileTag: null
   },
   mounted: function () {
    console.log("Hi")
    this.creatingListsMounted();
    


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
          
            console.log(this.chosenPassionList)
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
        clearChildren: function() { 
            //this.$refs.modalButtonGroup.empty();
            this.type=null;
        }, 
        highlight: function(e) {
            this.$refs.uploadBox.classList.add('highlightBox')
         },
        unhighlight: function(e) {
            this.$refs.unloadBox.classList.remove('highlightBox')
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
            
            /* passionList.forEach(function (passionWork, index) {
                 if(!this.chosenPassionList.includes(passionWork.id))
                 {
                     var text = "<button class=\"modalButton\" type=\"button\" id=\"" + passionWork.name + "\" @click=\"addPassionToChosen(" + passionWork + ")\" >"  + passionWork.name + "</button>"
                     this.modalInputs.push(text);
                     //this.$refs.modalButtonGroup.append(text);
                 }
             });*/
             this.type='Passion';
         },
         addPassionToChosen: function(passion){
             console.log("HI");
             console.log(passion);
             this.chosenPassionList.push(passion);
           //  var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + passion.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + passion + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePassion('" + passion + "', '" + id + "')\">&times;</span></button>"
           //  this.$refs.passionWorkButtonGroup.append(newButton);
             this.$refs.modal.modal("hide");
             clearChildren();
         },
         deletePassion: function(passion){
             console.log("FUNCTION CLICKED");
             console.log(passion);
             if (this.chosenPassionList.indexOf(passion) > -1) {
                 this.chosenPassionList.splice(this.chosenPassionList.indexOf(position), 1);
             }
             
            // var removeText = "chosen"+passion.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
            // console.log(removeText);
            // this.$refs.passionWorkButtonGroup.removeChild(this.$refs.removeText);
             //var child = document.getElementById(removeText)
             //
         },
         openPositionList: function() {
             
             this.type='Position';
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
             this.chosenPositionList.push(position);
             console.log(position)
             //var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" + position.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + "\" >"  + position + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deletePosition('" + position + "', '" + id + "')\">&times;</span></button>"
             //this.$refs.positionButtonGroup.append(newButton);
             this.$refs.modal.modal("hide");
             clearChildren();
         },
 
         deletePosition: function(position){
             console.log("DELETING POSITION" + this.position)
             console.log(chosenPositionList);
             console.log(index);
             if (this.chosenPositionList.indexOf(position) > -1) {
                 this.chosenPositionList.splice(this.chosenPositionList.indexOf(position), 1);
             }
             
            // var removeText = "chosen" + position.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
             //console
            // console.log(removeText);
             //var child = document.getElementById(removeText);
             //console.log(child);
           //  document.getElementById("positionButtonGroup").removeChild(child);
         },
 
         openActivitiesList: function() {
             this.type="Activities"
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
           /*var newButton = '<button class="modalButton" type="button" id="chosen"' 
                            + activity.replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')  + '" >"'
                            + activity + "<span aria-hidden=\"true\" style=\"float:right;\" onclick=\"deleteActivity('" + activity + "')\">&times;</span></button>"
            //var newButton = "<button class=\"modalButton\"  type=\"button\" id=\"chosen" */
            //$("#activitiesButtonGroup").append(newButton);
            this.$refs.modal.modal("hide");
            clearChildren();
        },

        deleteActivity: function(activity){
            console.log("DELETING ACTIVITY");
            console.log(activity);
            if (this.chosenActivitiesList.indexOf(activity) > -1) {
                this.chosenActivitiesList.splice(this.chosenActivitiesList.indexOf(activity), 1);
            }
            
         //   var removeText = "chosen" + activity.toString().replace(/\s/g, "").replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
         //   var child = document.getElementById(removeText)
         //   document.getElementById("activitiesButtonGroup").removeChild(child);
        },
        changeImage: function(input) {
            const reader = new FileReader();
            const file = input.files[0];

            reader.onload  = (event) => {
                //this.product.image = event.target.result
                this.imgName = event.target.result.name
                this.imgURL = getDataUrl(event.target.result)
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
    },

    
})