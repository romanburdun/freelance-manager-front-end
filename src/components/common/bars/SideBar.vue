<template>
    <div>
        <div class="mobile_bar">
            <md-menu @click="toggleMenu()"  fillColor="white" class="icon-2x"></md-menu>
            <h1 class="logo">Freelance manager</h1>

        </div>
        <nav class="side_nav" :class="[darkMode ? 'dark' : '', isOpen ? 'open': '']" @click="closeMenu()">
            <div class="logo">
                <h1>Freelance manager</h1>
            </div>
            <div class="nav_menu dark">
                <ul>
                    <router-link tag="li" to="/dashboard"><md-dashboard/> Dashboard</router-link>
                    <router-link tag="li" to="/projects"><md-camera-image/> Projects</router-link>
                    <router-link tag="li" to="/clients-platforms"><md-agroup/> Clients & Platforms</router-link>
                    <router-link tag="li" to="/finance"><md-finance/>Finance</router-link>
                    <router-link tag="li" to="/productivity"><md-mapclock/> Productivity</router-link>
                    <router-link tag="li" to="/profile"><md-aco/> Profile</router-link>
                </ul>
            </div>

            <div class="control-wrapper">
                <div class="input_group">

                    <label class="switch">
                        <input type="checkbox" @change="toggleDarkMode">
                        <span class="slider round"></span>
                    </label>
                    <h4 class="text">{{darkMode ? 'Dark mode': 'Light mode'}}</h4>
                </div>
            </div>
        </nav>
        <div class="backdrop" :class="[darkMode ? 'dark' : '', isOpen ? 'backdrop_visible': '']"></div>
    </div>

</template>

<script>
    import AccountCircleOutlineIcon from 'vue-material-design-icons/AccountCircleOutline';
    import MonitorDashboardIcon from 'vue-material-design-icons/MonitorDashboard.vue';
    import CameraImageIcon from 'vue-material-design-icons/CameraImage.vue';
    import AccountGroupIcon from 'vue-material-design-icons/AccountGroup';
    import FinanceIcon from 'vue-material-design-icons/Finance';
    import MapClockIcon from 'vue-material-design-icons/MapClock'
    import MenuIcon from 'vue-material-design-icons/Menu'
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'Sidebar',
        components: {
            'md-dashboard': MonitorDashboardIcon,
            'md-camera-image': CameraImageIcon,
            'md-agroup': AccountGroupIcon,
            'md-finance': FinanceIcon,
            'md-mapclock': MapClockIcon,
            'md-menu': MenuIcon,
            'md-aco': AccountCircleOutlineIcon,
        },
        data() {
            return {
                isOpen: false,
            }
        },
        methods: {
            ...mapActions ([
                'toggleDarkMode'
            ]),
            toggleMenu() {
                this.isOpen = !this.isOpen;
            },

            closeMenu() {
                this.isOpen = false
            }
        },
        computed: {
            ...mapGetters(['darkMode'])
        }
    }

</script>

<style lang="scss">


    .backdrop {
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        transition: all 0.4s ease-out;
        z-index: 899;
    }

    .backdrop_visible {
        display: block;
        transition: all 0.4s ease-in;
    }

    .open {
        left: 0;
        transition: left 0.8s ease-in;
    }

    .side_nav {
        top: 0;
        left: -1000px;
        position: fixed;
        background: $background;
        height: 100%;
        transition: left 0.8s ease-out;
        width: 60%;
        padding-top: 9rem;
        z-index: 900;
        box-shadow: $shadows;
        @media(min-width: 768px) {
            left: 0;
            position: fixed;
            padding-top: 0;
            height: 100%;
            display: block;
            width: 30%;
            transition: none;
        }

        @media(min-width: 1366px) {
            width: 20%;
        }
        .logo {

            display: none;
            padding-top: 3rem;
            padding-bottom: 4rem;
            h1 {
                font-family: 'Galada';
                font-size: 1.3rem;
                @media(min-width: 1440px) {
                    font-size: 1.8rem;
                }
                text-align: center;
                font-weight: 100;
                color: $logo;
            }
            @media(min-width: 768px) {
                display: block;
            }
        }
        .nav_menu {

            display: flex;
            width: 100%;
            margin: 0 auto;
            justify-content: center;
            ul {

                width: 80%;
                display: flex;
                flex-flow: column;
                list-style: none;

                li {
                    padding: 1rem 1rem;
                    color: $primary;
                    font-family: 'Roboto';
                    font-size: 1.2rem;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;



                    &:hover {
                        cursor: pointer;
                        box-shadow: $shadows;
                        background: lighten($primary, 40%);
                        transition: all 0.2s ease-in;
                    }
                }

                li.router-link-active,
                li.router-link-exact-active {

                    color: $primary;
                    background: $background;
                    box-shadow: $shadows;
                }
            }
        }

        .control-wrapper {
            padding-left: 3.5rem;
            margin-top: 6rem;
            .input_group {
                flex-flow: row;
                justify-content: normal;
                .text {
                    font-weight: 100;
                    font-family: "Roboto";
                }
            }
        }
    }

    .open {
        left: 0;
        transition: left 0.3s ease-in;
    }

    .material-design-icon.icon-2x {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
        cursor: pointer;
    }

    .material-design-icon.icon-2x > .material-design-icon__svg {
        height: 2rem;
        width: 2rem;
        fill: $background;
    }
    .mobile_bar {
        position: fixed;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        height: 3rem;
        width: 100%;
        z-index: 10000;
        background: $primary;
        @media(min-width: 768px) {
            display: none;
        }

        .logo {

            font-family: 'Galada';
            font-weight: normal;
            font-size: 1.3rem;
            margin: 0.6rem auto 0;
            color: $background;
        }
    }

</style>
