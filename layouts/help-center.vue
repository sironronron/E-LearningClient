<template>
    <transition name="layout" mode="out-in">
        <div class="layout">
            <div>
                <navbar />
            </div>

            <!-- Flash Notification -->
            <div class="flash" v-if="flash.success">
                <div class="toast toast--green">
                    <div class="uk-child-width-expand@s" uk-grid>
                        <div class="uk-width-expand">
                            <div class="toast__content">
                                <p class="toast__message">{{ flash.success }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flash" v-if="flash.error">
                <div class="toast toast--red">
                    <div class="uk-child-width-expand@s" uk-grid>
                        <div class="uk-width-expand">
                            <div class="toast__content">
                                <p class="toast__message">{{ flash.error }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End Flash Notification -->

            <div>
                <nuxt />
            </div>

            <div>
                <footer class="bg-white border-top mt-5" style="border-bottom: solid 5px #bc4e9c">
                    <section class="section-sm">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6">
                                    <svg width="150" height="35"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <image xlink:href="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,w_150/v1573175311/Logos/logo-dark_uaqwbf.png" width="150" height="35"/>
                                    </svg>
                                </div>
                                <div class="col-lg-6">
                                    <ul class="nav justify-content-md-end footer-menu">
                                        <li class="nav-item">
                                            <a class="nav-link" href="">About</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="">Privacy policy</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="">Terms &amp; condition</a>
                                        </li>
                                        <li class="nav-item">
                                            <router-link class="nav-link" :to="{ name: 'help-center.student' }">
                                                Help Center
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </footer>
            </div>

    </div>
    </transition>
</template>

<script>
    import Navbar from '~/components/HelpNavbar'
    import Flash from '../helpers/flash'

    export default {
        components: {
            Navbar, Flash
        },

        data: () => ({
            flash: Flash.state
        })
    }
</script>

<style scoped>
    .footer-menu .nav-link {
        padding: 6px 0;
        font-size: 13px;
    }
    .footer-menu .nav-item:not(:last-child) {
        margin-right: 20px;
    }
</style>