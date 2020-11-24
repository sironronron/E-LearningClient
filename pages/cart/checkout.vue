<template>
    <div>
        <div class="jumbotron py-4 bg-default rounded-0">
			<div class="container">
				<h6 class="text-muted">
                    <router-link :to="{ name: 'welcome' }" class="text-muted"><fa icon="home" fixed-width /></router-link> /
                    <router-link :to="{ name: 'cart' }" class="text-muted">Shopping Cart</router-link>
                    / Checkout
                </h6>
				<h3 class="text-white mb-0">Checkout</h3>
			</div>
		</div>

        <section class="section">
            <div class="container">

                <div class="row">
                    <!-- // Card Details -->
                    <div class="col-lg-8">
                        <card class="p-5 rounded shadow-sm">
                            
                        </card>
                    </div>
                    <!-- // Checkout Summary -->
                    <div class="col-lg-4">
                        <card class="p-3 rounded shadow-sm">
                            <h3 class="font-weight-bold">Summary</h3>
                            <ul class="list-unstyled mt-4">
                                <li>Original Price: <span class="float-right">₱{{cart.total_price}}</span></li>
                                <hr class="my-3">
                                <li class="h4"><span class="font-weight-bold">Total</span>: <span class="float-right font-weight-bold">₱{{cart.total_price}}</span></li>
                            </ul>
                            <!-- <button @click="submit" class="btn btn-danger text-capitalize btn-block btn-lg">Pay ₱{{cart.total_price}}</button> -->
                            <pay-pal
                                amount="10.00"
                                currency="PHP"
                                :client="credentials"
                                env="sandbox">
                            >

                            </pay-pal>
                        </card>
                    </div>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
    import axios from 'axios'
    import PayPal from 'vue-paypal-checkout'

    export default {

        components: {
            PayPal
        },

        head() {
            return { title: 'Checkout' }
        },

        data: function () {
            return {
               credentials: {
                   sandbox: 'ARF5pyAaE2idOKbrLB6i7jv6cUZ8x15g9S6WdrT1AW5W4aM0KmRTRSTlFqIi7ucjmi_kSr0nscOKSkFl'
               }
            }
        },

        async asyncData({ error }) {
            try {
                let { data } = await axios.get('/stripe')
                return {
                    cart: data.cart
                }
            } catch (e) {
                return
            }
        },

        methods: {
            
        }
    }
</script>

<style>

</style>