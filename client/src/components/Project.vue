<template>
  <div>
    <!-- **** START ADD PERSON MODAL -->
  <!-- TODO: Wie machen: In Projekt Template auslagen und ID Dynamisch generieren? Oder mittels gloabler Variable dynamisch Inhalt generieren? -->
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
            <input placeholder="E-Mail Adresse oder Telefonnummer" type="text" name="activityName"><br>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbruch</button>
          <button type="submit" class="btn btn-primary" data-dismiss="modal">Speichern & Schließen</button>
        </div>
      </div>
    </div>
  </div>
  <!-- **** END ADD PERSON MODAL -->
  <!-- **************** START BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
  <section id="body">

    <!-- **************** START PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
    <article class="data-row">
      <div class="container-fluid data-row-container">
        <div class="row">
          <div class="col-9">
            <h2 class="data-row-title">Urlaub Mallorca</h2>
          </div>
          <div class="col-3">
            <span>2 Personen</span><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addPerson"></i>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>November 2018 | 500€</span>
          </div>
        </div>
      </div>

      <!-- **************** ENDE PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
    </article>

    <div v-for="pdata in projectData" v-bind:key="pdata">
    <!-- **************** START PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
    <article class="data-row">
      <div class="container-fluid data-row-container">
        <div class="row">
          <div class="col-9">
            <h2 class="data-row-title">{{pdata.title}}</h2>
          </div>
          <div class="col-3">
            <span>2 Personen</span><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addPerson"></i>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>November 2018 | 500€</span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- **************** ENDE PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
    </article>
    <div class="container-fluid activities-container" id="#activity">
    <div class="row row-activities-headline">
      <div class="col icon-heading">
        <div class="headline-wrapper">
          <h3>Activities</h3><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addActivity"></i>
        </div>
      </div>
    </div>
    <article class="activity" v-for="adata in activitiesData" v-bind:key="adata">
      <div class="row">
        <div class="col-6">
          <h4 class="activitiy-header">
            {{adata.title}}
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
    </div>

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
                <input placeholder="Name der Aktivität" type="text" name="activityName" v-model="actName"><br>
                <input placeholder="Betrag in Euro" type="number" name="activityAmount" v-model="actAmount"><br>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbruch</button>
              <button type="submit" class="btn btn-primary" @click="postPost()" data-dismiss="modal">Speichern & Schließen</button>
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

export default {
  name: 'Project',
  data: function () {
    return {
      projectData: [],
      activitiesData: [],
      actName: '',
      actAmount: '',
      response: ''
    }
  },
  mounted () {
    axios.get('http://127.0.0.1:8081/projects')
      .then(response => {
        this.projectData = response.data.data
      })
    axios.get('http://127.0.0.1:8081/activities')
      .then(response => {
        this.activitiesData = response.data.data
      })
  },
  methods: {
    getActivities () {
      axios.get('http://127.0.0.1:8081/activities')
        .then(response => {
          this.activitiesData = response.data.data
        })
    },
    convertDate (date) {
      let ret = date.format('dd.mm.YYYY hh:MM:ss')
      return ret
    },
    postPost () {
      axios.post('http://127.0.0.1:8081/createActivity', {
        title: this.actName,
        description: this.actName,
        member: ['u1', 'u2'],
        amount: this.actAmount,
        currency: 'EUR',
        projectID: 'p1'
      })
        .then(response => {
          this.response = response
          this.getActivities()
        })
        .catch(e => {
          this.error.push(e)
        })
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
</style>
