import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import VueStripeCheckout from 'vue-stripe-checkout';

const { STRIPE_TOKEN } = process.env;
const options = {
  key: 'pk_test_tjfZZ85IdjRekxJDj5njaLGC006cWcBAq4',
  locale: 'auto',
  currency: 'PHP',
};

if (STRIPE_TOKEN) Vue.use(VueStripeCheckout, options);