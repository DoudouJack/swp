<template>
  <div v-if="user" id="app-container">
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

  <!-- **************** START HEADER ELEMENT MIT ACCOUNT & EINSTELLUNGEN *****************  -->
    <section id="header" class="visible-container">
      <div class="header-container dark container-fluid">
        <div class="row">
          <div class="col-6 header-left">
            <h1 class="logo">WHO OWES WHO</h1>
          <!--  <div class="row-add-project clickable"  data-toggle="modal" data-target="#addProject">
              <div class="icon-heading">
                <div>
                  <h3>Add Project</h3><img class="icon-right" src="../../public/img/icons/plus.png">
                </div>
              </div>
            </div> -->
          </div>

          <div class="col-6 header-right">

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
                  <ul class="menu-list vertical">

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
  <!-- **************** ENDE HEADER ELEMENT MIT ACCOUNT & EINSTELLUNGEN ****************  -->
  </div>
</template>

<script>

import * as firebase from 'firebase'
import { api } from '../helpers/api'
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user'
    })
  },
  data: function () {
    return {
      token: ''
    }
  },
  created () {
    firebase.auth().currentUser.getIdToken(true).then(data => {
      this.token = data
      api.getTransactions(this.token)
        .then(response => {
          console.log(response)
        })
    })
  }
}
</script>

<style lang="scss">

  /*VARIABLES*/
  $color1: #2a71c1;
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
      opacity: .6;
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
      display: none;
      width: 100px;
      margin-left: 20px;
    }
    .fixed-amount-checkbox:checked ~ .fixed-amount-input {
      display: inline-block;
    }

    /*RULES*/
    body{
      background: $background;
    }
    #body{
      padding: 0 5%;
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
    }
    h3{
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
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
    article.activity{
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
      &.notification-dropdown{
        width: 300px;
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
        right: 15px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-bottom-color: $background-alt;
        border-top: 0;
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
</style>
