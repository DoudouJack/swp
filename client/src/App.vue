<template>
  <div>
    <!-- <navbar></navbar> -->
<!--    <router-view></router-view>-->
<!--    <Header></Header>-->
    <Project></Project>
    <main class="py-4">
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
import Project from './components/Project'
import Footer from './components/Footer'
// import Header from './components/Header'

export default {
  components: {
    Footer,
    Project
    // Header
  }
}
/**
 * import navbar from './components/Navbar'
export default {
  components: {
    navbar
  }
}
 **/
</script>

<style lang="scss">

  $font-stack: 'Raleway', -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  $font-stack-heading:'Montserrat', -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
body{
  font-family: $font-stack;

  h1, h2, h3, h4, h5, h6 {
    font-family:  $font-stack-heading;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
