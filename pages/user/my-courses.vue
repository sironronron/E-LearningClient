<template>
	<div>
		<div class="jumbotron bg-gradient-default mb-0 rounded-0 pb-0 pt-lg-5">
			<section>
				<div class="container">
					<div>
						<h2 class="text-white">My Courses</h2>
						<ul class="list-unstyled pt-3">
							<li class="d-inline-block mr-4" v-for="tab in tabs" :key="tab.id">
								<router-link :to="{ name: tab.route }" class="page-header text-white">
									{{tab.name}}
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>

		<!-- // Main Body -->
		<section class="section-sm">
			<div class="container">

				<div class="filters row">
					<div class="col-lg-4">
						<h6 class="text-muted"><small>Search</small></h6>
						<form class="my-auto d-inline">
							<div class="input-group">
								<input aria-describedby="addon-right addon-left w-25" type="text" name="search" placeholder="Search for courses" class="form-inline form-control">
								<div class="input-group-prepend">
									<span class="input-group-text btn btn-outline-primary rounded-right">
										<fa icon="search" fixed-width />
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
				
				<div class="mt-4">
					<div v-if="courses.length != 0" class="row">
						<div class="col-lg-3 col-sm-6 item-col-lg-3 mb-4" v-for="course in courses" :key="course.id">
							<router-link :to="{ name: 'student.courses.learn', params: { slug: course.slug } }">
								<div class="card shadow-sm shadow--hover card-lift--hover rounded">
									<img :src="course.image" class="card-img-top border-bottom" alt="">
									<div class="card-body py-3">
										<div class="grid-course-name">
											<h6 class="text-capitalize">
												<strong>{{course.title}}</strong>
											</h6>
										</div>
										<p class="small text-dark"><small>{{course.user.name}}</small></p>
										<div class="progress mb-0" style="height: 3px;">
											<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="progress-bar bg-danger" style="width: 0%;">
											</div>
										</div>
										<small class="text-muted">3% Complete</small>
										<div>
											<div class="rating your-rating-box" style="position: unset; margin-top: -18px;">
												<fa icon="star" fixed-width style="color: #f4c150" />
												<fa icon="star" fixed-width style="color: #f4c150" />
												<fa icon="star" fixed-width style="color: #f4c150" />
												<fa icon="star" fixed-width style="color: #f4c150" />
												<fa icon="star" fixed-width style="color: #f4c150" />
												<p class="your-rating-text">
													<small>Edit Rating</small>
												</p>
											</div>
										</div>
									</div>
								</div>
							</router-link>
						</div>
					</div>
					<div v-else>
						<div class="mt-5 text-center">
							<h5>You don't have any Courses yet.</h5>
							<svg width="150" height="150"
                                xmlns="http://www.w3.org/2000/svg">
                                <image xlink:href="https://res.cloudinary.com/dl9phqhv0/image/upload/v1576466812/Online%20Learning%20Icon%20Pack/048-online_learning_rutn2d.svg" width="150" height="150"/>
                            </svg>
                           	<div>
                           		<router-link :to="{ name: 'home' }" class="btn btn-default text-capitalize rounded">
	                            	Start Learning
	                            </router-link>
                           	</div>
						</div>
					</div>
				</div>

			</div>			
		</section>

	</div>
</template>

<script>
	import axios from 'axios'

	export default {

		middleware: 'auth',

		head() {
			return { title: 'My Courses' }
		},

		async asyncData ({ error }) {
			try {
				let { data } = await axios.get('/student/account/my-courses/learning')
				return {
					courses: data.enrolled_courses
				}
			} catch (e) {
				return
			}
		},
		
		computed: {
			tabs() {
				return [
					{
						name: 'My Courses',
						route: 'student.courses'
					}
				]
			}
		}

	}

</script>

<style lang="scss" scoped>
	.jumbotron {
		padding-top: 2rem;
		padding-left: 2rem;
		padding-right: 2rem;
	}

	.page-header {
		padding: 0 0 5px;
		border-bottom: 6px solid hsla(0, 0%, 100%, 0);
		color: #fff;
		display: block;
	}

	.router-link-active {
		border-bottom: 5px solid red;
		cursor: text;
	}

	.page-header:hover {
		color: white;
		border-bottom: 5px solid red;
	}

	.your-rating-box {
		position: absolute;
	    right: 10px;
	    bottom: 3px;
	    margin-bottom: 0;
	    z-index: 1;
	    text-align: right;
	}
	.your-rating-text {
		margin-bottom: 0;
	    font-size: 13px;
	    color: #29303b;
	    margin-top: 2px;
	}
</style>