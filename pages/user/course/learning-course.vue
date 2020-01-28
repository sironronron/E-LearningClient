<template>
	<div>
		<div class="jumbotron bg-gradient-default mb-0 rounded-0 pb-0 pt-lg-5">
			<section>
				<div class="container">
					<div>
						<h2 class="text-white">{{ course.title }}</h2>
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

		<section class="section-sm">
			<div class="container">
				
				<div class="row">
					<div class="col-lg-8">
						<!-- // Course Overview/Preview -->
						<client-only>
                            <!-- // Youtube -->
                            <vue-plyr v-if="course.course_overview_provider === 'Youtube'">
                                <div class="plyr__video-embed">
                                    <iframe
                                        :src="`https://www.youtube.com/embed/${course.course_overview_url}?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`"
                                        allowfullscreen allowtransparency allow="autoplay">
                                    </iframe>
                                </div>
                            </vue-plyr>

                            <vue-plyr v-else-if="course.course_overview_provider === 'Vimeo'">
                                <div class="plyr__video-embed">
                                    <iframe
                                        :src="`https://player.vimeo.com/video/${course.course_overview_url}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`"
                                        allowfullscreen allowtransparency allow="autoplay">
                                    </iframe>
                                </div>
                            </vue-plyr>

                            <!-- https://www.w3schools.com/html/mov_bbb.mp4 -->
                            <!-- video element -->
                            <vue-plyr v-else-if="course.course_overview_provider === 'HTML5'">
                                <video :poster="course.image" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer.mp4">
                                    <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" size="576">
                                    <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4" size="720">
                                    <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4" size="1080">
                                    <track kind="captions" label="English" srclang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer.vtt" default>
                                </video>
                            </vue-plyr>
                        </client-only>

                        <ul class="list-unstyled pt-3">
                        	<!-- // Overview -->
							<li class="d-inline-block mr-4" v-for="(link, key) in links" :key="key">
								<router-link :to="{ name: link.route }" class="page-header text-dark" >
									{{ link.name }}
								</router-link>
							</li>
						</ul>

						<div class="mt-5">
							<router-view />
						</div>
					</div>
					<div class="col-lg-4">
						<!-- // Course Section and Lessons -->
                    	<right-sidebar :sections="sections" :lessons="lessons"></right-sidebar>
					</div>
				</div>

			</div>
		</section>

	</div>
</template>

<script>
	import axios from 'axios'

	if (process.client) {
        let Youtube = document.createElement('script')
        Youtube.setAttribute('src', "https://www.youtube.com/iframe_api")
    }

    // Components
    import RightSidebar from '~/components/courses/enrolled/right_sidebar'

	export default {

		components: {
			RightSidebar
		},

		middleware: 'auth',
		
		head() {
			return { title: this.course.title }
		},

		async asyncData({ params, error }) {
			try {
				let { data } = await axios.get(`/student/account/my-courses/learning/${params.slug}/show`)
				return {
					course: data.showCourse,
					sections: data.sections,
					lessons: data.lessons,
				}	
			} catch (e) {
				error({ statusCode: 404, message: "Woops, something is wrong!"})
			}
		},

		computed: {
			tabs: function () {
				return [
					{
						name: 'My Courses',
						route: 'student.courses'
					}
				]
			},

			links: function () {
				return [
					{
						name: 'Overview',
						route: 'student.courses.learn'
					},
					{
						name: 'Q & A',
						route: 'student.courses.learn.qanda'
					},
					{
						name: 'Announcements',
						route: 'student.courses.learn.announcements'
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