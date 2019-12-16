<template>
  <div>
  <!-- **************** START FOOTER ELEMENT MIT RECHTLICHEM UND HILFE ****************  -->
  <section id="footer" class="visible-container dark">
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
  </div>
  <!-- **************** ENDE FOOTER ELEMENT MIT RECHTLICHEM UND HILFE ****************  -->
</template>

<script>
export default {
  name: 'Footer'
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
