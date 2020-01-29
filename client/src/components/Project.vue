<template>
  <div id="app-container">

    <section class="off-screen-elements">
      <!-- **** START SETTINGS MODAL -->
      <div class="modal fade" id="settings" tabindex="-1" role="dialog" aria-labelledby="Settings" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Settings</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-check"><input type="checkbox" class="form-check-input" id="darkTheme"><label class="form-check-label" for="darkTheme">Dark Theme?</label></div>
              <div class="form-check"><input type="checkbox" class="form-check-input" id="deleteAccount"><label class="form-check-label" for="darkTheme">Delete Account? </label></div>
              <div class="form-check">
                Preferred Currency
                <select>
                  <option value="euro">EURO</option>
                  <option value="dollar">DOLLAR</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbruch</button>
              <button type="submit" class="btn btn-primary" data-dismiss="modal">Speichern & Schließen</button>
            </div>
          </div>
        </div>
      </div>
      <!-- **** END SETTINGS MODAL -->
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
                <input placeholder="Email or phone" type="text" name="activityName" v-model="usersToBeAdded" required pattern="(?:[^@]+@[^\.]+\..{2,10}|^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{8}$)"><br>
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
              <input placeholder="Project" type="text" name="projectName" v-model="projectName" required pattern=".{3,}$"><br>
<!--              <input placeholder="Date" type="data-date-min-view-mode-2" name="projectDate" v-model="projectDate"><br>-->
              <select name="projectMonth" v-model="projectMonth">
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select name="projectYear" v-model="projectYear">
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option selected value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <input placeholder="Email or phone, separated with comma" type="text" name="projectMembers" v-model="projectMember" required pattern="(?:[^@]+@[^\.]+\..{2,10}|^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{8}$)"><br>
              <input class="fixed-amount-checkbox" type="checkbox" name="projectType" value="false" v-model="projectType">

              <div class="tooltip"><span>Fixed amount project?</span>
                <span class="tooltiptext">For projects that have a fixed volumen, e.g. a birthday gift</span>
              </div>

              <input type="number" step="0.1" required pattern="^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$" class="fixed-amount-input" placeholder="Betrag"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="postProject()">Add</button>
            </div>
          </div>
        </div>
      </div>
      <!-- **** END ADD PROJECT MODAL -->
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
                <input placeholder="Activity" type="text" name="activityName" v-model="actName" required pattern=".{2,}$"><br>
                <input placeholder="Date" type="date" name="activityDate" v-model="actDate" required><br>
                <input placeholder="Amount Paid" type="number" step="0.01" name="activityAmount" v-model="actAmount" required pattern="^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$"><br>
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

    <!-- **************** START HEADER ELEMENT MIT ACCOUNT & EINSTELLUNGEN *****************  -->
    <section id="header" class="visible-container">
      <div class="header-container dark container-fluid">
        <div class="row">
          <div class="col-6 header-left hidden-sm">
            <h1 class="logo">WHO OWES WHO</h1>
            <!--  <div class="row-add-project clickable"  data-toggle="modal" data-target="#addProject">
                <div class="icon-heading">
                  <div>
                    <h3>Add Project</h3><img class="icon-right" src="../../public/img/icons/plus.png">
                  </div>
                </div>
              </div> -->
          </div>

          <div class="col-md-6 col-sm-12 header-right">

            <!--<div id="status" class="trigger limit">
                <span class="status-amount amount-you-get">34€</span><span class="status-amount amount-you-owe">40€</span>
            </div>-->

            <div id="add-project" class="trigger limit">
              <div class="avatar-container limit">
                <div class="limit clickable"  data-toggle="modal" data-target="#addProject">
                  <a><img class="avatar" src="../../public/img/icons/plus.png"></a>
                </div>
              </div>
            </div>

            <div id="notifications" class="trigger limit">
              <div class="avatar-container limit">
                <img class="avatar" src="../../public/img/icons/alert.png">
              </div>
              <div class="dropdown notification-dropdown">
                <div class="dropdown-inner account-dropdown-inner dark">
                  <div class="notification-switch-container">
                    <label class="switch">
                      <input id="notifications-switch" v-model="notificationSettings" type="checkbox" checked @click="updateSettings()">
                      <span class="slider"></span>
                    </label>
                    <span class="notification-switch-label">Push notifications?</span>
                  </div>
                  <ul class="menu-list vertical">
                    <article class="notification">
                      <p class="notification-content-container">
                        <span class="actor-a">Victor</span> send <span class="ator-b">you</span> <span class="amount">10€</span>
                        <span>{{ notifications }}</span>
                      </p>
                      <p class="notification-date-container">
                        <span class="date">12.02.2020</span>
                      </p>
                    </article>
                    <!-- ENDE NOTIFICATION ELEMENT -->
                    <article class="notification">
                      <p class="notification-content-container">
                        <span class="actor-a">You</span> sent <span class="ator-b">Lisa</span> <span class="amount">200€</span>
                      </p>
                      <p class="notification-date-container">
                        <span class="date">12.02.2020</span>
                      </p>
                    </article>
                    <!-- <li class="clickable" data-toggle="modal" data-target="#notification-modal">Alle ansehen</li> -->
                  </ul>
                </div>
              </div>
            </div>

            <div id="account-nav" class="trigger limit">
              <div class="avatar-container limit">
                <img class="avatar" src="../../public/img/icons/user.png">
              </div>
              <div class="dropdown account-dropdown">
                <div class="dropdown-inner account-dropdown-inner dark">
                  <ul class="menu-list vertical">
                    <li><a href="/">My Account</a></li>
                    <li><a href="/">Log out</a></li>
                    <li class="clickable" data-toggle="modal" data-target="#settings">Settings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="logout-nav" class="trigger limit">
              <div class="avatar-container limit">
                <a href="/logout">
                  <img class="avatar" src="../../public/img/icons/exit.png">
                </a>
              </div>
            </div>

          </div>

          <!--        <div class="row-add-project clickable"  data-toggle="modal" data-target="#addProject">
                    <div class="icon-heading">
                      <div>
                        <h3>Projekt hinzufügen</h3><i class="fas fa-plus-circle icon-right white"></i>
                      </div>
                    </div>
                  </div>-->
        </div>
      </div>
    </section>

    <section id="body">
      <div class="row">
        <!-- **************** START BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
        <div v-if="!user" class="login-container">
          <div class="overlay-login"></div>
            <div class="card">
              <div class="card-header">Login</div>
              <div class="card-body">
                <div v-if="error" class="alert alert-danger">{{error}}</div>
                <form action="#" @submit.prevent="submit">
                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                    <div class="col-md-6">
                      <input
                              id="email"
                              type="email"
                              class="form-control"
                              name="email"
                              value
                              required
                              autofocus
                              v-model="form.email"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                    <div class="col-md-6">
                      <input
                              id="password"
                              type="password"
                              class="form-control"
                              name="password"
                              required
                              v-model="form.password"
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                      <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        </div>
        <sections class="activities col-md-4 col-sm-12">
          <div v-if="user" class="balance inner container data-row col-12">
            <div class="row">
              <div class="col-md-6 col-sm-auto">
                <h3 class="balance-heading">Balance:</h3>
              </div>
              <div class="col-6">
                <div id="status" class="trigger limit">
                  <span class="status-amount amount-you-get">34€</span><span class="status-amount amount-you-owe">40€</span>
                </div>
              </div>
            </div>

          </div>
          <div v-if="user" class="activities-inner-container data-row col-12 hidden-sm">
            <h3 class="notification-heading">Last Transactions</h3>
            <div class="sidebar-notifications-container">
              <!-- START: NOTOFICATION ELEMENT -- TODO: mit Transaktionen füllen -->
              <article class="notification">
                <p class="notification-content-container">
                  <span class="actor-a">Victor</span> send <span class="actor-b">you</span> <span class="amount">10€</span>
                </p>
                <p class="notification-date-container">
                  <span class="date">12.02.2020</span>
                </p>
              </article>
              <!-- ENDE NOTIFICATION ELEMENT -->
              <article class="notification">
                <p class="notification-content-container">
                  <span class="actor-a">You</span> sent <span class="ator-b">Lisa</span> <span class="amount">200€</span>
                </p>
                <p class="notification-date-container">
                  <span class="date">12.02.2020</span>
                </p>
              </article>
            </div>
          </div>
        </sections>
        <!-- **************** ENDE BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
        <div class="projects col-md-8 col-sm-12 order-md-first">
<!--
    <span>{{activityResponse}}</span>
    <span>{{projectResponse}}</span>-->
    <div v-for="pdata in projectData" v-bind:key="pdata">
    <!-- **************** START PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
    <article v-if="user" class="data-row">
      <div class="container-fluid data-row-container">
        <div class="row">
          <div class="col-lg-9 col-md-8 col-sm-12">
            <h2 class="data-row-title">{{pdata.title}}
<!--              {{pdata._id}}-->
            </h2>
          </div>
          <div class="col-md-4 col-lg-3 col-sm-12">
            <span>{{pdata.member.length}} member(s)</span><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addPerson" @click="projectClick=pdata._id"></i>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span> {{ pdata.date }} | {{ pdata.projectAmount}} €</span>
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
              <div class="col-md-6 col-sm-12">
                <h4 class="activitiy-header">
                  {{adata.title}}
<!--                  {{adata.projectID}}-->
                </h4>
                <span class="activity-desc" > {{ adata.date }} – You paid {{adata.amount}} {{adata.currency}}</span>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="activity-open-amount">
                                      <span class="amount-positive">
                                          Green: {{ adata.greenAmount }} Red: {{ adata.redAmount }} {{adata.currency}}
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

    <!-- **** END ADD ACTIVITIY MODAL -->
  </div>
        </div>
      </div>
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
      form: {
        email: '',
        password: ''
      },
      projectMonth: '',
      projectYear: '',
      error: null,
      user: '',
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
      projectClick: '',
      projectType: 'true',
      notifications: [],
      notificationSettings: true
    }
  },
  mounted () {
    this.getActivities()
    this.getProjects()
    this.getNotifications()
    this.getNotificationSettingsStatus()
    firebase.auth().currentUser.getIdToken(true).then(data => {
      this.token = data
      console.log(this.token)
      api.getTransactions(this.token)
        .then(response => {
          console.log(response)
        })
    })
    this.user = firebase.auth().currentUser
    console.log(this.user.uid)
    console.log(this.user)
    console.log(this.user.displayName)
    console.log('test')
  },
  created () {
    firebase.auth().currentUser.getIdToken(true).then(data => {
      this.token = data
      console.log(this.token)
      api.getTransactions(this.token)
        .then(response => {
          console.log(response)
        })
    })
    this.user = firebase.auth().currentUser
    console.log(this.user.uid)
    console.log(this.user)
    console.log(this.user.displayName)
    console.log('test')
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
      axios.get('http://127.0.0.1:8081/activities', { params:
          { userID: this.user.uid } })
        .then(activityResponse => {
          this.activitiesData = activityResponse.data.data
          console.log(activityResponse)
        })
    },
    getProjects () {
      axios.get('http://127.0.0.1:8081/projects', { params:
          { userID: this.user.uid } })
        .then(projectResponse => {
          this.projectData = projectResponse.data.data
        })
    },
    getNotifications () {
      axios.get('http://127.0.0.1:8081/getNotificationsForUser', { params:
          { userID: this.user.uid } })
        .then(notificationResponse => {
          this.notifications = notificationResponse.data
        })
    },
    getNotificationSettingsStatus () {
      axios.get('http://127.0.0.1:8081/getNotificationSetting', { params:
          { userID: this.user.uid } })
        .then(notificationSettingsResponse => {
          this.notificationSettings = notificationSettingsResponse.data
        })
    },
    postProject () {
      axios.post('http://127.0.0.1:8081/createProject', {
        title: this.projectName,
        description: this.projectName,
        member: this.projectMember.split(','),
        activity: '',
        projectPayType: this.projectType,
        date: this.projectMonth + ' ' + this.projectYear,
        creator: this.user.uid
      })
        .then(response => {
          this.response = response
          this.getProjects()
          console.log('nix')
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    postActivity () {
      axios.post('http://127.0.0.1:8081/createActivity', {
        title: this.actName,
        description: this.actName,
        member: this.user.uid,
        amount: this.actAmount,
        currency: 'EUR',
        projectID: this.activityClick,
        date: this.actDate,
        creator: this.user.uid
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
      axios.post('http://127.0.0.1:8081/addActivity', {
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
            this.response = response
            this.getProjects()
          })
      }
    },
    submit () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          // this.$router.replace({ name: 'home' })
          this.checkAuth()
          this.getActivities()
          this.getProjects()
          this.getNotifications()
          this.getNotificationSettingsStatus()
        })
        .catch(err => {
          this.error = err.message
        })
    },
    checkAuth () {
      firebase.auth().currentUser.getIdToken(true).then(data => {
        this.token = data
        console.log(this.token)
        api.getTransactions(this.token)
          .then(response => {
            console.log(response)
          })
      })
      this.user = firebase.auth().currentUser
      console.log(this.user.uid)
      console.log(this.user)
      console.log(this.user.displayName)
      console.log('test')
    },
    updateSettings () {
      axios.post('http://127.0.0.1:8081/notificationsTurnOn', {
        userID: this.user.uid,
        on: this.notificationSettings
      })
      // this.getNotificationSettingsStatus()
    }
  }
}

</script>

<style lang="scss">

  /*VARIABLES*/
  $color1: #3e5f8e;
  $background: #f0f4f9;
  $background-dark: #364458;
  $background-alt: $color1;
  $color-success: #05b69f;
  $color-error: #e24a46;
  $text-light: #f3f3f3;
  $text-muted: #36445861;
  $innergap: 20px;
  $outergap: 20px;
  $white: #fbfbfb;
  $border-radius: 0px;
  $bordercolor: #cacaca;
  $border-width: 3px;
  $border-style: solid;
  $shadow: 0 0 20px #36445859;
  $transition-time: .3s;

  /*DARK THEME VARIABLES*/
  /* IF DARK THEME ENABLED
  $background: lighten($background-dark, 10%);
  $white: $background-dark;
  p, h1, h2, h3, h4, span{
    color: $text-light;
  }
  */

  /*MIXINS*/
  @mixin iconAnimation() {
    transform: rotate(180deg);
  }

  /*FORMS*/
  input {
    margin-bottom: 5px;
    border-width: 0 0 3px 0;
    outline: none;
    border-color: $color-error;
    transition: border .3s ease-in-out;
  }
  input[type="checkbox"] {
    width: auto;
  }
  input:valid {
    border-color: $color-success;
  }
  input ~ label{
    padding-left: 10px;
  }
  select {
    color: $color-success;
    background: $text-light;
  }

  /*MODAL*/
  .modal-content {
    border-radius: 0;
    box-shadow: $shadow;
    border: 5px solid $background-dark;
    background:  $background-dark;
    color: $text-light
  }
  .modal-header, .modal-footer{
    border: none;
  }

  .modal-backdrop {
    background: white;
    &.show {
      opacity: .7;
    }
  }
  .modal input{
    background: none;
    color: $text-light;
    &::placeholder{
      color: darken($text-light, 50%);
    }
  }
  button.close {
    color: $text-light;
    opacity: 1;
    :hover{
      color: $color-error;
    }
  }
  .btn-primary{
    background: $color-success;
  }
  .fixed-amount-input{
    opacity: 0;
    width: 0px;
    margin-left: 20px;
    transition: $transition-time;
  }
  .fixed-amount-checkbox:checked ~ .fixed-amount-input {
    opacity: 1;
    width: 53px;
  }

  /*RULES*/
  body{
    background: $background;
  }
  #body{
    padding: 0 5%;
  }
  div#app-container {
    min-height: calc(100vh - 122px);
  }
  div{
    max-height: 100%;
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
  .row{
    height: 100%;
  }
  .hidden-sm{
    @media(max-width: 767px){
      display: none;
    }
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
    font-size: 1.8em;
    @media(max-width: 1000px){
      font-size: 1.5em !important;
    }
  }
  h3{
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    @media(max-width: 1000px){
      font-size: 17px;
    }
  }
  .headline-wrapper{
    border-bottom: $border-width solid $bordercolor;
  }

  /*LINKS & BUTTONS*/

  i{
    display: inline-block;
    color: $color-success;
  }
  .clickable, .clickable i, i.clickable{
    cursor: pointer;
    transition: transform .6s ease-in-out;
  }
  i.clickable{
    &:hover{
      @include iconAnimation();
    }
  }
  .clickable:hover i{
    @include iconAnimation();
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
  article.activity>.row{
    padding-top: 20px;
  }
  .activitiy-header{
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
  }

  /*HEADER STYLING*/
  h1.logo {
    font-weight: 900;
    font-size: 31px;
    position: relative;
    top: 4px;
    color: #00ddc1;
    display: inline;
    text-shadow: -1px 2px 1px hsl(2, 73%, 58%), -2px 3px 1px #F44336;
  }

  #header .header-container{
    height:80px;
    background: $background-dark;
    padding-left: 5%;
    padding-right: 5%;
  }
  #account-nav, #notifications, #logout-nav, #add-project, #status{
    display: inline-block;
    position: relative;
  }
  .header-left{
    text-align: left;
  }
  .header-right{
    text-align: right;
  }
  #notifications, #account-nav, #add-project, #status{
    margin-right: $outergap;
  }
  span.status-amount {
    vertical-align: middle;
    font-size: 22px;
    font-family: montserrat;
    @media(max-width: 1000px){
      font-size: 17px !important;
    }
  }
  #status .amount-you-owe{
    color: $color-error;
    padding-left: 10px;
  }
  #status .amount-you-get{
    color: $color-success;
    padding-right:  10px;
    border-right: $border-width $border-style $bordercolor;
  }

  /*DROPDOWNS*/

  .dropdown {
    position: absolute;
    width: 200px;
    height: auto;
    padding-top: 15px;
    z-index: 9999;
    right: -5px;
    @media(max-width:1000px){
      right: -60px;
      width: 150px;
    }
    &.notification-dropdown{
      width: 300px;
      right: -100px;
      @media(max-width: 1000px){
        width: 250px;
      }
    }
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
      right: 110px;
      @media(max-width: 1000px) {
        right: 110px;
      }
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom-color: $background-alt;
      border-top: 0;
      margin-top: -10px;
    }
  }
  #account-nav .dropdown-inner:after{
    right: 15px;
    @media(max-width: 1000px) {
      right: 70px;
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

  /*NOTIFICATIONS*/
  .notification-content-container{
    margin: 0;
  }
  .notification-date-container{
    margin-top: -5px;
    color: $text-muted;
  }
  .notification {
    border-bottom: 1px solid $text-muted;
    padding-top: 10px;
  }
  .notification:last-of-type{
    border-bottom: none;
  }
  .notification-heading{
    margin-bottom: $outergap;
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
    -webkit-box-shadow: $shadow;
    -moz-box-shadow: $shadow;
    box-shadow: $shadow;
    .data-row-container{
    }
  }
  .row-activities-headline{
    margin-top: $innergap;
  }

  /*FOOTER*/
  #footer{
    margin-top: $outergap;
  }
  #footer .footer-container{
    background: $background-dark;
    padding-right: 5%;
    padding-left: 5%;
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
        &.white{
          color: $white;
        }
      }
    }
    i{

    }
  }
  .row-add-project {
    display: inline-block;
    vertical-align: sub;
  }

  /*BALANCE*/
  .balance-heading{
    top: 6px;
    position: relative;
  }
  /*LOGIN*/
  .login-container .card {
    max-width: 490px;
    margin: auto;
    background: $background-dark;
    color: $text-light;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    margin: 10vh auto;
  }
  .login-container{
    width: 100%;
  }
  .overlay-login {
    position: absolute;
    left: 0;
    top: 0;
    background-color: white;
    opacity: .7;
    width: 100%;
    height: 100%;
  }

  /* SWITCHES / NOTIFICATION SWITCH */
  /*SWITCH*/
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    float: left;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-error;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: $color-success;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .notification-switch-container {
    height: 50px;
    border-bottom: 3px solid $text-light;
  }

  span.notification-switch-label {
    top: 6px;
    position: relative;
    padding-left: 15px;
    font-size: 15px;
  }
  /*TOOLTIPS*/
  .tooltip {
    position: relative;
    display: inline-block;
    opacity: 1;
    padding-left: 10px;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 180px;
    background-color: $color1;
    color: $text-light;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -90px;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: $color1 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
