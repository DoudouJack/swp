<template>
  <div id="app-container">
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
            <h1 class="logo">WHO OWES WHO {{user.uid}} </h1>
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
      token: '',
      user: ''
    }
  },
  mounted () {
    firebase.auth().currentUser.getIdToken(true).then(data => {
      this.token = data
      console.log(this.token)
      api.getTransactions(this.token)
        .then(response => {
          console.log('created: ' + response)
        })
    })
    this.user = firebase.auth().currentUser
    console.log('user')
    console.log('nix')
    console.log(this.user)
    console.log(this.user.displayName)
    console.log('nicht')
  },
  created () {
    firebase.auth().currentUser.getIdToken(true).then(data => {
      this.token = data
      console.log(this.token)
      api.getTransactions(this.token)
        .then(response => {
          console.log('created: ' + response)
        })
    })
    this.user = firebase.auth().currentUser
    console.log('user')
    console.log('nix')
    console.log(this.user)
    console.log(this.user.displayName)
    console.log('nicht')
  }
}
</script>

<style lang="scss">
</style>
