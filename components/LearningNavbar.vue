<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-gradient-default" style="height: 60px;">
		<div class="container-fluid">
			<router-link :to="{ name: 'welcome' }" class="navbar-brand">
				<img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,w_172/v1574062722/Logos/logo-light_gwp73l.png" alt="E-Learning" class="m-t-5 img-fluid" />
			</router-link>

			<button :aria-label="$t('toggle_navigation')" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false">
				<fa icon="bars" fixed-width />
			</button>

			<div id="navbarToggler" class="collapse navbar-collapse">
				<ul class="navbar-nav navbar-nav-hover border-left pl-3">
					<li class="nav-item">
						<span class="text-white">
							{{courseTitle.title}}
						</span>
					</li>
				</ul>

				<ul class="navbar-nav ml-auto navbar-nav-hover">
					<li class="nav-item">
						<a href="#" class="btn btn-outline-neutral btn-sm p-2 text-capitalize rounded">
							<fa icon="share-square" fixed-width /> Share
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	import axios from 'axios'

	export default {

		props: ['courseTitle'],

		data: function () {
			return {
				appName: process.env.appName,
			}
		},
		
	}
</script>

<style scoped>

</style>
