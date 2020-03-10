<template>
	<div>
		<div class="jumbotron py-4 bg-default rounded-0">
			<div class="container">
				<h6 class="text-muted"><router-link :to="{ name: 'welcome' }" class="text-muted"><fa icon="home" fixed-width /> </router-link> / Shopping Cart</h6>
				<h3 class="text-white mb-0">Shopping Cart</h3>
			</div>
		</div>


		<section class="section">
			<div class="container">
				
                <div class="row">
                    <div class="col-lg-9">
                        <h5>{{cartItems.length}} Course in cart</h5>
                        <div class="p-3 border rounded">
                            <div v-for="(item, key) in cartItems" :key="key">
                                <div class="search_body pt-2 pb-3 pl-2 pr-3 border-bottom">
                                    <router-link :to="{ name: 'course.show', params: { slug: item.course.slug } }">
                                        <div class="row justify-content-between">
                                            <div class="col-lg-auto">
                                                <img :src="item.course.image" class="search_image img-fluid" alt="">
                                            </div>
                                            <div class="col-lg-6">
                                                <h5 class="font-weight-500 text-dasrk">{{item.course.title}}</h5>
                                                <div class="rating-row">
                                                    <span class="course-badge best-seller mr-2">{{item.course.level}}</span>
                                                    <small class="mr-2">
                                                        <span class="text-other">{{item.course.lessons_count}} Lectures &#9679;</span>
                                                        <span class="text-other">{{ item.course.students_count }} Students enrolled &#9679;</span>
                                                        <span class="text-other">All Levels</span>
                                                    </small>
                                                </div>
                                                <p class="text-muted mt-2" style="font-size: 13px !important;">{{item.course.excerpt}} | By {{ item.course.user.name }}</p>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="float-right">
                                                    <template v-if="!item.course.free_course">
                                                        <div v-if="item.course.has_discount == 0">
                                                            <h6 class="font-weight-bold text-right">₱{{item.course.price | numeral('0,0.00')}}</h6>
                                                        </div>
                                                        <div v-if="item.course.has_discount == 1">
                                                            <h6 class="font-weight-bold text-right">₱{{item.course.discount | numeral('0,0.00')}}</h6>
                                                            <h6 class="text-muted float-right"><strike>₱{{item.course.price | numeral('0,0.00')}}</strike></h6>
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <p class="mb-0 text-dark text-right">Free Course</p>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <h5 class="text-muted">Total: </h5>
                        <h1 class="font-weight-bold">₱{{ cart.total_price | numeral('0,0.00') }}</h1>
                        <div class="mt-2">
                            <router-link :to="{ name: 'cart.checkout' }" class="btn btn-danger text-capitalize btn-block rounded btn-lg">
                                Checkout
                            </router-link>
                        </div>
                    </div>
                </div>

			</div>
		</section>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
    import axios from 'axios'

	export default {
		
		middleware: 'auth',

		head() {
			return { title: 'My Cart' }
        },

		async asyncData({ error }) {
			try {
				let { data } = await axios.get(`/cart/cartItems/all`)
				return {
                    cart: data.cart,
					cartItems: data.cartItems
				}
			} catch (e) {
				error({ statusCode: 404, message: 'Woops, something went wrong!'})
			}
        },
	}

</script>

<style lang="scss" scoped>
hr {
        border-top: 0.25rem solid rgba(0, 0, 0, 0.1);
    }

    .search {
        &_image {
            width: 210px;
            height: 118px;
            object-fit: cover;
        }
        &_body {
            cursor: pointer;
        }
        &_body:hover {
            background: whitesmoke;
        }
    }
    .course-header-wrap .course-badge {
        font-size: 9px !important;
    }
    .course-badge.best-seller {
        background: #f4c150;
    }
    .course-header-wrap > div > span {
        margin-right: 12px;
        margin-bottom: 7px;
        font-size: 15px;
    }
    .course-badge {
        color: #29303b;
        box-shadow: 0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1);
        pointer-events: none;
        border-radius: 3px;
        font-size: 9px;
        padding: 1px 8px;
        font-weight: 700;
        position: relative;
        line-height: 1.5;
        text-align: center;
        text-transform: uppercase;
        display: inline-block;
    }
    .course-badge:after {
        border-radius: 3px;
        right: -4px;
        background: inherit;
        content: "";
        height: 11px;
        position: absolute;
        top: 2px;
        transform: rotate(45deg);
        width: 11px;
        z-index: 0;
        display: block;
    }
    .dropdown-menu-ratings {
        width: 253px;
    }
</style>