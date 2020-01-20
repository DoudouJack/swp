<template>
  <div v-if="user" id="app-container">
    <!-- **** START ADD PERSON MODAL -->
  <div class="modal fade" id="addPerson" tabindex="-1" role="dialog" aria-labelledby="Add Person" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Person hinzufügen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="">
            <input placeholder="E-Mail Adresse oder Telefonnummer" type="text" name="activityName" v-model="usersToBeAdded" required pattern="(?:[^@]+@[^\.]+\..{2}|^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{8}$)"><br>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
          <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="addMember()" >Speichern</button>
        </div>
      </div>
    </div>
  </div>
  <!-- **** END ADD PERSON MODAL -->
  <!-- **************** START BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
    <section id="body">
      <div class="row">
        <div class="projects col-8">
    <!-- **** START ADD PROJECT MODAL -->
    <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="Settings" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Projekt Hinzufügen</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input placeholder="Projektname" type="text" name="projectName" v-model="projectName" required pattern=".{3,}$"><br>
            <input placeholder="E-Mail Adresse oder Telefonnummer mit Komma getrennt" type="text" name="projectMembers" v-model="projectMember" required pattern="(?:[^@]+@[^\.]+\..{2}|^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{8}$)"><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbruch</button>
            <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="postProject()">Speichern & Schließen</button>
          </div>
        </div>
      </div>
    </div>
    <!-- **** END ADD PROJECT MODAL -->

    <span>{{activityResponse}}</span>
    <span>{{projectResponse}}</span>
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
            <span>{{pdata.member.length}} Persons</span><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addPerson" @click="projectClick=pdata._id"></i>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>November 2018 | 500€</span>
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
                <span class="activity-desc" > {{ adata.date }} – Du hast {{adata.amount}} {{adata.currency}} gezahlt</span>
              </div>
              <div class="col-6">
                <div class="activity-open-amount">
                                      <span class="amount-positive">
                                          {{ adata.splitAmount }} {{adata.currency}}
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
              <h5 class="modal-title">Aktivität hinzufügen</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="">
                <input placeholder="Name der Aktivität" type="text" name="activityName" v-model="actName" required pattern=".{2,}$"><br>
                <input placeholder="Betrag in Euro" type="number" name="activityAmount" v-model="actAmount" required pattern="+{1,}$"><br>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbruch</button>
              <button type="submit" class="btn btn-primary" @click="postActivity()" data-dismiss="modal">Speichern & Schließen</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- **** END ADD ACTIVITIY MODAL -->
  </div>

  <!-- **************** ENDE BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
        </div>
        <sections class="activities col-4">
          <div class="balance inner container data-row col-12">
            <div class="row">
              <div class="col-6">
            <h3 class="balance-heading">Balance: </h3>
              </div>
              <div class="col-6">
            <div id="status" class="trigger limit">
            <span class="status-amount amount-you-get">34€</span><span class="status-amount amount-you-owe">40€</span>
          </div>
              </div>
            </div>

          </div>
          <div class="activities-inner-container data-row col-12">
            <h3 class="notification-heading">Last Transactions</h3>
            <div class="sidebar-notifications-container">
              <!-- START: NOTOFICATION ELEMENT - TODO: mit Transaktionen füllen -->
              <article class="notification">
                <p class="notification-content-container">
                  <span class="actor-a">Victor</span> send <span class="ator-b">you</span> <span class="amount">10€</span>
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
      token: '',
      projectData: [],
      activitiesData: [],
      actName: '',
      actAmount: '',
      activityResponse: '',
      projectResponse: '',
      actMember: '',
      projectName: '',
      projectAmount: '',
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
        projectPayType: true
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
        projectID: this.activityClick
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
</style>
