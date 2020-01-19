<template>
  <div v-if="user" id="app-container">
    <!-- **** START ADD PERSON MODAL -->
  <div class="modal fade" id="addPerson" tabindex="-1" role="dialog" aria-labelledby="Add Person" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add a member</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="">
            <input placeholder="Email or phone" type="text" name="users" v-model="usersToBeAdded"><br>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="addMember()" >Add</button>
        </div>
      </div>
    </div>
  </div>
  <!-- **** END ADD PERSON MODAL -->
  <!-- **************** START BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
  <section id="body">
    <div class="row-add-project clickable"  data-toggle="modal" data-target="#addProject">
      <div class="icon-heading">
        <div>
          <h3>Add Project</h3><i class="fas fa-plus-circle icon-right white"></i>
        </div>
      </div>
    </div>
    <!-- **** START ADD PROJECT MODAL -->
    <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="Settings" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input placeholder="Project" type="text" name="projectName" v-model="projectName"><br>
            <input placeholder="Date" type="date" name="projectDate" v-model="projectDate"><br>
            <input placeholder="Email or phone, separated with comma" type="text" name="projectMembers" v-model="projectMember"><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="postProject()">Add</button>
          </div>
        </div>
      </div>
    </div>
    <!-- **** END ADD PROJECT MODAL -->
<!--
    <span>{{activityResponse}}</span>
    <span>{{projectResponse}}</span>-->
    <div v-for="pdata in projectData" v-bind:key="pdata">
    <!-- **************** START PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
    <article class="data-row">
      <div class="container-fluid data-row-container">
        <div class="row">
          <div class="col-9">
            <h2 class="data-row-title">{{pdata.title}}
<!--              {{pdata._id}}-->
            </h2>
          </div>
          <div class="col-3">
            <span>{{pdata.member.length}} member(s)</span><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addPerson" @click="projectClick=pdata._id"></i>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span> {{ pdata.date }} #placeholder| {{ pdata.amount}} #placeholder</span>
            <span></span>
          </div>
        </div>
        <div class="container-fluid p-0 activities-container" id="#activity">
          <div class="row row-activities-headline">
            <div class="col icon-heading">
              <div class="headline-wrapper">
                <h3>Activities</h3><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addActivity" @click="activityClick=pdata._id"></i>
              </div>
            </div>
          </div>
          <!-- BLOCK FOR ACTIVITIES TO BE LOOPED -->
          <article class="activity indented" v-for="adata in activitiesData" v-bind:key="adata">
            <div v-if="pdata._id == adata.projectID" class="row">
              <div class="col-6">
                <h4 class="activitiy-header">
                  {{adata.title}}
<!--                  {{adata.projectID}}-->
                </h4>
                <span class="activity-desc" > {{ adata.date }} – You paid {{adata.amount}} {{adata.currency}}</span>
              </div>
              <div class="col-6">
                <div class="activity-open-amount">
                                      <span class="amount-positive">
                                          {{ adata.splitAmount }} #placeholder {{adata.currency}}
                                      </span>
                </div>
              </div>
            </div>
          </article>
          <!-- END BLOCK FOR ACTIVITIES TO BE LOOPED -->
        </div>
      </div>

      <!-- **************** ENDE PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
    </article>

    <section class="off-screen-elements">

      <!-- **** START ADD ACTIVITIY MODAL -->
      <div class="modal fade" id="addActivity" tabindex="-1" role="dialog" aria-labelledby="Add Activity" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Activity</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="">
                <input placeholder="Activity" type="text" name="activityName" v-model="actName"><br>
                <input placeholder="Date" type="date" name="activityDate" v-model="actDate"><br>
                <input placeholder="Amount Paid" type="number" name="activityAmount" v-model="actAmount"><br>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" @click="postActivity()" data-dismiss="modal">Add</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- **** END ADD ACTIVITIY MODAL -->
  </div>

  <!-- **************** ENDE BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
  </section>
  </div>
</template>

<script>
import axios from 'axios'
import * as firebase from 'firebase'
import { api } from '../helpers/api'
import { mapGetters } from 'vuex'

export default {
  name: 'Project',
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user'
    })
  },
  data: function () {
    return {
      token: '',
      projectData: [],
      activitiesData: [],
      actName: '',
      actAmount: '',
      actDate: '',
      activityResponse: '',
      projectResponse: '',
      actMember: '',
      projectName: '',
      projectAmount: '',
      projectDate: '',
      response: '',
      projectMember: '',
      activityClick: '',
      activitiesByProject: '',
      usersToBeAdded: '',
      projectClick: ''
    }
  },
  mounted () {
    this.getActivities()
    this.getProjects()
  },
  created () {
    firebase.auth().currentUser.getIdToken(true).then(data => {
      this.token = data
      api.getTransactions(this.token)
        .then(response => {
          console.log(response)
        })
    })
  },
  methods: {
    /*    TEMPLATE TO FOLLOW WHEN TOKEN USE IS IMPLEMENTED IN BACKEND
    getActivities (token) {
      axios.get('http://127.0.0.1:8081/activities', { headers:
          { authorization: `${token}` } })
        .then(activityResponse => {
          this.activitiesData = activityResponse.data.data
        })
    }, */
    getActivities () {
      axios.get('http://127.0.0.1:8081/activities')
        .then(activityResponse => {
          this.activitiesData = activityResponse.data.data
        })
    },
    getProjects () {
      axios.get('http://127.0.0.1:8081/projects')
        .then(projectResponse => {
          this.projectData = projectResponse.data.data
        })
    },
    postProject () {
      axios.post('http://127.0.0.1:8081/createProject', {
        title: this.projectName,
        description: this.projectName,
        member: this.projectMember.split(','),
        activity: '',
        projectPayType: true,
        date: this.projectDate
      })
        .then(response => {
          this.response = response
          this.getProjects()
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    postActivity () {
      axios.post('http://127.0.0.1:8081/createActivity', {
        title: this.actName,
        description: this.actName,
        member: ['u1'],
        amount: this.actAmount,
        currency: 'EUR',
        projectID: this.activityClick,
        date: this.actDate
      })
        .then(response => {
          this.response = response
          this.getActivities()
          this.getActivitiesByProject(this.activityClick)
          this.addActivityToProject()
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    getActivitiesByProject (id) {
      var act
      var activitiesByProject
      for (act in this.activitiesData) {
        if (act.projectID === id) {
          activitiesByProject.push(act._id)
        }
      }
      this.activitiesByProject = activitiesByProject
    },
    addActivityToProject () {
      axios.post('http://127.0.0.1:8081/updateProject', {
        _id: this.activityClick,
        activity: this.activitiesByProject
      })
    },
    addMember () {
      var user
      var users = this.usersToBeAdded.split(',')
      for (user in users) {
        axios.post('http://127.0.0.1:8081/addMember', {
          member: user,
          id: this.projectClick
        })
          .then(response => {
            this.getProjects()
          })
      }
    }
  }
}
</script>

<style lang="scss">

  /*VARIABLES*/
  $color1: #6495E3;
  $text-light: #f9f9f9;
  $innergap: 20px;
  $outergap: 20px;
  $background: #ececec;
  $white: #fbfbfb;
  $background-dark: #343944;
  $background-alt: $color1;
  $border-radius: 7px;
  $bordercolor: #cacaca;
  $border-width: 3px;
  $border-style: solid;
  $shadow: 0 0 30px -5px #4a3939;

  body{
    padding: 15px;
    background: $background;
  }

  div.limit{
    height: 100%;
  }
  .fa, .fas, .fab{
    font-family: FontAwesome;
    font-style: normal;
  }
  .icon-right{
    margin-left: 5px;
  }
  .visible-container>.container-fluid{
    -webkit-border-radius: $border-radius;
    -moz-border-radius: $border-radius;
    border-radius: $border-radius;
    background: $white;
    padding: $innergap;
    padding-bottom: $innergap;
    margin-bottom: $outergap;
  }

  img{
    max-height:100%;
    width: auto;
  }
  input{
    width: 100%;
    mac-width: 500px;
  }

  h2{
    text-transform: uppercase;
  }
  h3{
    font-size: 22px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .headline-wrapper{
    border-bottom: $border-width solid $bordercolor;
  }

  /*LINKS & BUTTONS*/

  i{
    display: inline-block;
  }
  .clickable{
    cursor: pointer;
  }
  i.clickable{
    transition: transform .6s ease-in-out;
    &:hover{
      transform: rotate(180deg);
    }
  }
  a{
    &:hover{
      text-decoration: none;
    }
  }
  .dark{
    h1,h2,h3,h4,h5,h6,p,span,a,li{
      color: $text-light;
    }
  }
  article.activity{
    padding-top: 20px;
  }
  .activitiy-header{
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
  }

  /*HEADER STYLING*/

  #header .header-container{
    height:80px;
    background: $background-dark;
  }
  #account-nav{
    display: inline-block;
  }

  /*DROPDOWNS*/

  .dropdown {
    position: absolute;
    width: 250px;
    width: fit-content;
    height: auto;
    padding-top: 15px;
    z-index: 9999;
  }
  .dropdown-inner{
    position: relative;
    background: #629c4f;
    -webkit-border-radius: $border-radius;
    -moz-border-radius: $border-radius;
    border-radius: $border-radius;
    padding: 15px;
    box-shadow: $shadow;
    background: $background-alt;
    &:after{
      content: '';
      position: absolute;
      top: 0;
      left: 0%;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom-color: $background-alt;
      border-top: 0;
      margin-left: 10px;
      margin-top: -10px;
    }
  }
  .dropdown .menu-list{
    font-size: 14px;
    list-style-type: none;
    list-style-position: outside;
    padding: 0;
    text-align: left;
    margin-bottom: 0;
    li{
      border-bottom: 1px solid $background;
      padding: 5px 0;
      &:last-of-type{
        border: none;
      }
    }

  }
  .trigger .dropdown{
    visibility: hidden;
    opacity: 0;
    transform: translatey(-20px);
    transition: .3s ease-in-out, opacity .25s ease-in-out;
  }
  .trigger:hover .dropdown{
    visibility: visible;
    opacity: 1;
    transform: translatey(0);
  }

  img.avatar{
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  /*MAIN DATA*/

  .data-row{
    padding-top: $innergap;
    padding-bottom: $innergap;
    background: $white;
    margin: $outergap auto;
    -webkit-border-radius: $border-radius;
    -moz-border-radius: $border-radius;
    border-radius: $border-radius;
    .data-row-container{
    }
  }
  .row-activities-headline{
    margin-top: $innergap;
  }

  /*FOOTER*/
  #footer .footer-container{
    background: $background-dark;
  }
  #footer-nav ul{
    font-size: 12px;
  }
  .menu-list.horizontal{
    list-style-type: none;
    padding:0;
    margin: 0;
    li{
      display: inline-block;
      &::after{
        content:"·";
        padding: 0 5px;
      }
    }
    li:last-of-type::after{
      content: none;
    }
  }

  .icon-heading{
    h3{
      display: inline-block;
      ~i{
        font-size: 24px;
      }
    }
    i{

    }
  }

  .indented{
    padding-left: $innergap;
  }
</style>
