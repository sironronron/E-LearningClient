<template>
    <div>
        <div class="mt-4">
            <template v-if="user">
                <div>
                    <button class="btn btn-danger btn-lg text-capitalize btn-block border rounded" :class="{ 'btn-loading' : busy }" :disabled="busy" @click="addToCart">
                        Add to cart
                    </button>
                    <button class="btn btn-neutral btn-danger btn-lg text-capitalize btn-block text-dark rounded border">
                        Buy Now
                    </button>
                </div>
            </template>
            <template v-else>
                <div>
                    <button class="btn btn-danger btn-lg text-capitalize btn-block border rounded" @click="openLoginModal">
                        Add to cart
                    </button>
                </div>
            </template>
        </div>

        <!-- // Modal -->
        <transition name="fade" mode="out-in">
            <modal-login v-if="showLoginModal" @close="closeLoginModal"></modal-login>
        </transition>

    </div>
</template>

<script>
    let myBody = null

    import axios from 'axios'
    import { mapGetters } from 'vuex'
    import ModalLogin from '../../auth/modal_login'

    export default {

        components: {
            ModalLogin
        },

        name: 'AddToCart',

        props: ['course_id', 'price'],

        data: () => ({
            showLoginModal: false,
            busy: false
        }),

        computed: mapGetters({
            user: 'auth/user'
        }),

        methods: {
            // Add to cart
            async addToCart () {
                this.busy = true
                try {
                    let { data } = await axios.post('/cart/store', {
                        course_id: this.course_id,
                        price: this.price
                    })
                    this.busy = false
                    this.$swal({
                        type: 'success',
                        text: data.message
                    })
                } catch (e) {
                    this.$swal({
                        type: 'error',
                        text: 'Course is already in your cart.'
                    })
                }
            },

            openLoginModal: function () {
                this.showLoginModal = true

                // Add class to body
                myBody.classList.toggle('modal-open')
            },

            closeLoginModal: function () {
                this.showLoginModal = false
                myBody.classList.remove('modal-open')
            }
        },

        mounted: function () {
            myBody = document.getElementsByTagName('body')[0]
        }

    }
</script>

<style>

</style>