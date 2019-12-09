<template>
    <div id="app-container">
        <section id="header" class="visible-container">
            <div class="header-container container-fluid">
                <div id="account-nav">
                    <div class="avatar-container">
                        <!--<img class="avatar" src="../../public/img/noimg.jpeg">-->
                    </div>
                    <div class="dropdown account-dropdown">
                        <div class="dropdown-inner account-dropdown-inner">
                            <ul class="menu-list vertical">
                                <li>Mein Account</li>
                                <li>Log out</li>
                                <li>Einstellungen</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="body">

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
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <span>Activities</span><i class="fas fa-plus-circle icon-right"></i>
                        </div>
                    </div>
                </div>

                <div class="container-fluid activities-container">
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
                </div>

            </article>

        </section>

        <section id="footer" class="visible-container">
            <div class="footer-container container-fluid">
                <nav id="footer-nav">
                    <ul class="menu-list horizontal">
                        <li>Hilfe erhalten</li>
                        <li>Datenschutz</li>
                        <li>Impressum</li>
                        <li>Allgemeine Geschäftsbedingungen</li>
                    </ul>
                </nav>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'temp'
  /**
 * data: {
        transactions: [] // initialize empty array
    },
    mounted() { // when the Vue app is booted up, this is run automatically.
        var dataURL = '127.0.0.1/transactions';
        var self = this;// create a closure to access component in the callback below
        $.getJSON(dataURL, function(data) {
            self.posts = data;
        }) */

}
</script>

<style lang="scss">

    $innergap: 20px;
    $outergap: 20px;
    $background: #f3f3f3;
    $border-radius: 7px;
    $bordercolor: red;
    $border-width: 3px;
    $border-style: solid;

    body{
        padding: 15px;
    }

    div{
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

    img{
        max-height:100%;
        width: auto;
    }

    h3{
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;
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
</style>
