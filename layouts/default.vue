<template>
	<transition name="layout" mode="out-in">
		<div class="layout">
			<div>
				<navbar />
			</div>

			<div>
				<nuxt />
			</div>

			<div class="mt-5">
				<footer class="bg-white border-top" style="border-bottom: solid 5px #bc4e9c">
					<section class="section-sm">
						<div class="container">
							<div class="row">
								<div class="col-lg-6">
									<img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,w_150/v1573175311/Logos/logo-dark_uaqwbf.png" alt="E-Learning" class="img-fluid" />
								</div>
								<div class="col-lg-6">
									<ul class="nav justify-content-md-end footer-menu">
										<li class="nav-item">
											<router-link class="nav-link" :to="{ name: 'privacy.policy' }">Privacy policy</router-link>
										</li>
										<li class="nav-item">
											<router-link class="nav-link" :to="{ name: 'terms.conditions' }">Terms &amp; condition</router-link>
										</li>
										<li class="nav-item">
											<router-link :to="{ name: 'help-center.student' }" class="nav-link">
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
    import Navbar from '~/components/Navbar'
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
