<template>
  
</template>

<script>
	import axios from 'axios'
	import MostPopular from '../../../components/courses/category/popular.vue'
	import Trending from '../../../components/courses/category/trending.vue'
	import CategoryCourses from '../../../components/courses/category/all_courses.vue'

	export default {

		components: {
			MostPopular, Trending, CategoryCourses
		},

		head() {
			return { title: this.category.name }
		},

		data: () => ({
			isMostPopular: true,
			isTrending: false,
		}),

		async asyncData({ params, error }) {
			try {
				let { data } = await axios.get(`/course/category/${params.slug}`)
				return {
					category: data.category,
					featuredCourse: data.featuredCourse,
					countCourses: data.countCourses
				}
			} catch (e) {
				error({ statusCode: 404, message: 'Page not found' })
			}
		},

		methods: {
			showMostPopular() {
				this.isMostPopular = true
				this.isTrending = false
			},

			showTrending() {
				this.isTrending = true
				this.isMostPopular = false
			},
		},

		computed: {
			promotions() {
				return [
					{
						icon: 'history',
						title: 'Go at your own pace',
						text: "Enjoy lifetime access to courses on Academy's website"
					},
					{
						icon: 'check',
						title: 'Learn from industry experts',
						text: 'Select from top instructors around the world'
					},
					{
						icon: 'play',
						title: 'Find video courses on almost any topic',
						text: 'Build your library for your career and personal growth'
					}
				]
			}
		}

	}

</script>

<style>

</style>