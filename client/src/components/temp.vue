<template>
    <div id="app-container">
        <section class="off-screen-elements">

            <!-- **** START ADD ACTIVITIY MODAL -->
            <div class="modal fade" id="addActivity" tabindex="-1" role="dialog" aria-labelledby="Add Activity" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add-activity-modal-lable">Aktivität hinzufügen</h5>
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

        <!-- **** START SETTINGS MODAL -->
        <div class="modal fade" id="settings" tabindex="-1" role="dialog" aria-labelledby="Settings" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="settings-modal-lable">Einstellungen</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbruch</button>
                        <button type="submit" class="btn btn-primary" data-dismiss="modal">Speichern & Schließen</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- **** END SETTINGS MODAL -->

        <!-- **** END ADD ACTIVITIY MODAL -->
        <!-- **************** START HEADER ELEMENT MIT ACCOUNT & EINSTELLUNGEN ****************  -->
        <!-- TODO: Auslagern in eigenes Template -->
        <section id="header" class="visible-container">
            <div class="header-container container-fluid">
                <div id="account-nav" class="limit">
                    <div class="avatar-container limit">
                        <img class="avatar" src="../../public/img/noimg.jpeg">
                    </div>
                    <div class="dropdown account-dropdown">
                        <div class="dropdown-inner account-dropdown-inner dark">
                            <ul class="menu-list vertical">
                                <li><a href="/">Mein Account</a></li>
                                <li><a href="/">Log out</a></li>
                                <li class="clickable" data-toggle="modal" data-target="#settings">Einstellungen</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- **************** ENDE HEADER ELEMENT MIT ACCOUNT & EINSTELLUNGEN ****************  -->

        <!-- **************** START BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->
        <section id="body">

            <!-- **************** START PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->
            <article class="data-row">
                <div class="container-fluid data-row-container">
                    <div class="row">
                        <div class="col-9">
                            <h3 class="data-row-title">Urlaub Mallorca</h3>
                        </div>
                        <div class="col-3">
                            <span>2 Personen</span><i class="fas fa-plus-circle icon-right"></i>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <span>November 2018 | 500€</span>
                            <p>{{ response }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col icon-heading">
                            <h3>Activities</h3><i class="fas fa-plus-circle icon-right clickable" data-toggle="modal" data-target="#addActivity"></i>
                        </div>
                    </div>
                </div>

                <!--<span>
                <div id="transactions" class="container-fluid data-row-container">
                  <h4> Test Ed: Transactions an sich wollen wir nicht so auspucken, aber für den Beispiel <br> siehe el "transactions" und use of v-for loop mit v-bind:key </h4>
                  <span>{{transactionsData}}</span>
                  <div v-for="tdata in transactionsData" v-bind:key="tdata">
                    Transaction ID: {{tdata.transactionID}} -
                    Date of Payment : {{ tdata.dateOfPayment }} -
                    User ID: {{tdata.userID}}
                  </div>
                  <h4> End of Test </h4>
                </div>-->

                <div class="container-fluid activities-container">

                <!-- **************** START TRANSAKTION ELEMENT :: ZUM LOOPEN ****************  -->
                <article class="activity">
                        <div class="row">
                            <div class="col-6">
                                <h4 class="activitiy-header">
                                    Restaurant Montag
                                </h4>
                                <span class="activity-desc">NOV 10 – Du hast 50€ gezahlt</span>
                            </div>
                            <div class="col-6">
                                <div class="activity-open-amount">
                                    <span class="amount-positive">
                                        25€
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>
                    <!-- **************** START TRANSAKTION ELEMENT :: ZUM LOOPEN ****************  -->

                    <article class="activity" v-for="adata in activitiesData" v-bind:key="adata">
                      <div class="row">
                        <div class="col-6">
                          <h4 class="activitiy-header">
                            {{adata.title}}
                          </h4>
                          <span class="activity-desc" > {{adata.date}} – Du hast {{adata.amount}} {{adata.currency}} gezahlt</span>
                        </div>
                        <div class="col-6">
                          <div class="activity-open-amount">
                                      <span class="amount-positive">
                                        <!-- Hier unten sollte zB die methode das tun was sie soll, wenn ich auskommentiere geht das komplett weg-->
                                          25€ <!--{{ splitAmount(adata.amount) }}-->
                                      </span>
                          </div>
                        </div>
                      </div>
                    </article>
                    <!-- **************** ENDE PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->

                </div>

            </article>
            <!-- **************** ENDE PROJEKT ELEMENT :: ZUM LOOPEN ****************  -->

        </section>
        <!-- **************** ENDE BODY ELEMENT MIT TRANSAKTIONSÜBERSICHT ****************  -->

        <!-- **************** START FOOTER ELEMENT MIT RECHTLICHEM UND HILFE ****************  -->
        <section id="footer" class="visible-container">
            <div class="footer-container container-fluid">
                <nav id="footer-nav">
                    <ul class="menu-list horizontal">
                        <li><a href="/">Hilfe erhalten</a></li>
                        <li><a href="/">Datenschutz</a></li>
                        <li><a href="/">Impressum</a></li>
                        <li><a href="/">Allgemeine Geschäftsbedingungen</a></li>
                    </ul>
                </nav>
            </div>
        </section>
        <!-- **************** ENDE FOOTER ELEMENT MIT RECHTLICHEM UND HILFE ****************  -->

    </div>
</template>

<script>
/* eslint-env jquery */
import axios from 'axios'

export default {
  name: 'temp',
  el: '#transactions',
  data: function () {
    return {
      transactionsData: [],
      activitiesData: [],
      actName: '',
      actAmount: '',
      response: ''
    }
  },
  mounted () {
    axios.get('http://127.0.0.1:8081/transactions')
      .then(response => {
        this.transactionsData = response.data.data
      })
    axios.get('http://127.0.0.1:8081/activities')
      .then(response => {
        this.activitiesData = response.data.data
      })
  },
  methods: {
    /*    convertDate (date) {
      date.format('dd.mm.YYYY hh:MM:ss')
      return date
    }, */
    splitAmount (amount) {
      var members
      members = this.activitiesData.member
      var count
      count = members.length
      var splitted
      splitted = this.activitiesData.amount / count
      return splitted
    },
    postPost () {
      axios.post('http://127.0.0.1:8081/createActivity', {
        activityID: 'a3',
        title: this.actName,
        description: this.actName,
        member: ['u1', 'u2'],
        amount: this.actAmount,
        currency: 'EUR',
        projectID: 'p1'
      })
        .then(response => {
          this.response = response
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  }

}

</script>

<style lang="scss">

    $color1: #6495E3;
    $text-light: #f9f9f9;
    $innergap: 20px;
    $outergap: 20px;
    $background: #f3f3f3;
    $background-alt: $color1;
    $border-radius: 7px;
    $bordercolor: red;
    $border-width: 3px;
    $border-style: solid;
    $shadow: 0 0 30px -5px #999;

    body{
        padding: 15px;
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
        background: $background;
        padding: $innergap;
        padding-bottom: $innergap;
        margin-bottom: $outergap;
    }
    i{
        vertical-align: top;
    }
    img{
        max-height:100%;
        width: auto;
    }

    h3{
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;
    }
    .clickable{
        cursor: pointer;
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
    .header-container{
        height:80px;
    }
    #account-nav{
        display: inline-block;
    }
    .dropdown {
        position: absolute;
        width: 250px;
        width: fit-content;
        height: auto;
        padding-top: 15px;
        z-index: 9999;
    }
    .dropdown-layover{

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
            border-bottom-color: #629c4f;
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
        li{
            border-bottom: 1px solid $background;
            padding: 5px 0;
            &:last-of-type{
                border: none;
            }
        }

    }

    #account-nav .dropdown{
        display: none;
    }
    #account-nav:hover .dropdown{
        display: block;
    }

    img.avatar{
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }

    .data-row{
        padding-top: $innergap;
        padding-bottom: $innergap;
        background: $background;
        margin: $outergap auto;
        -webkit-border-radius: $border-radius;
        -moz-border-radius: $border-radius;
        border-radius: $border-radius;
        .data-row-container{

        }
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
