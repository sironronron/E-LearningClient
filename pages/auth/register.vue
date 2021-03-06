<template>
	<div>
		<section class="section">
			<div class="container">

				<div v-if="mustVerifyEmail">
					<div class="text-center">
						<img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,w_250/v1573175311/Logos/logo-dark_uaqwbf.png" alt="E-Learning" class="img-fluid" />
						<h1 class="text-weight-light mt-3">Verify your e-mail address</h1>
						<h5 class="text-muted mt-2">You're almost done! A verification link is sent to your e-mail address (<b>{{ form.email }}</b>).</h5>
						<img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,w_120/v1573184488/Logos/email_urnhbj.svg" class="m-t-20" height="120" width="120" alt="">
					</div>
					<hr>
					<h6 class="text-muted text-center">
						Can't find the email? Click 
						<router-link :to="{ name: 'verification.resend', query: { email: form.email } }"> 
							here
						</router-link> 
						to resend e-mail verification link or visit the 
						<router-link :to="{ name: 'help-center.students' }">
							Help Center <fa icon="info-circle" fixed-width />
						</router-link>
					</h6>
				</div>

				<div v-else class="row justify-content-center">
					<div class="col-lg-4">

						<h6><b>Sign Up and Start Learning!</b></h6>
						<hr class="full-width-hr mb-4 mt-4">

						<form @submit.prevent="register" @keydown="form.onKeydown($event)">

							<!-- //name  -->
							<div class="form-group mb-3">
								<input type="text" name="name" v-model="form.name" :class="{ 'is-invalid' : form.errors.has('name') }" class="form-control rounded" placeholder="Full name">
								<has-error :form="form" field="name"></has-error>
							</div>

							<!-- //email  -->
							<div class="form-group mb-3">
								<input type="email" name="email" v-model="form.email" :class="{ 'is-invalid' : form.errors.has('email') }" class="form-control rounded" placeholder="Email Address">
								<has-error :form="form" field="email"></has-error>
							</div>

							<div class="form-group mb-3">
								<client-only>
									<password-strength class="m-b-0"
										v-model="form.password" 
										:strength-meter-only="false"
										:toggle="true"
										@feedback="showFeedback"
										name="password"
									/>
									<has-error :form="form" field="password"></has-error>
								</client-only>
							</div>
							
							<div class="form-group mb-3">
								<input type="password" name="password_confimration" v-model="form.password_confirmation" :class="{ 'is-invalid' : form.errors.has('password_confirmation') }" class="form-control rounded" placeholder="Password Confirmation">
								<has-error :form="form" field="password_confirmation"></has-error>
							</div>

							<p class="small">
								By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
							</p>

							<div class="text-center">
								<v-button :loading="form.busy" class="btn-block btn-lg">
									{{ $t('register') }}
								</v-button>
							</div>

							<div class="text-center mt-4">
								<h6>Register With</h6>
								<div class="row mt-4">
									<div class="col-lg mb-sm-2">
										<login-with-facebook class="btn-block"></login-with-facebook>
									</div>
									<div class="col-lg">
										<login-with-google class="btn-block"></login-with-google>
									</div>
								</div>
							</div>

						</form>

					</div>
				</div>

			</div>
		</section>
	</div>
</template>

<script>
	import Form from 'vform'
	import PasswordStrength from 'vue-password-strength-meter'

	export default {

		middleware: 'guest',

		components: {
			PasswordStrength
		},

		head () {
			return { 
				title: this.$t('register'),
				
				meta: [
					{ hid: 'description', name: 'description', content: "Start Learning now! Create your free account." },

					{ hid: 'og:url', name: 'og:url', content: 'http://192.168.2.112:3000' + this.$route.path },
					{ hid: 'og:title', name: 'og:title', content: 'Register now to Heroacademy' },
					{ hid: 'og:description', name: 'og:description', content: 'Start Learning now! Create your free account.' }
				]
			}
		},

		data: () => ({
			form: new Form({
				name: '',
				email: '',
				password: '',
				password_confirmation: '',
				role_id: 2
			}),
			mustVerifyEmail: false,
			suggs: '',
			warns: ''
		}),

		methods: {
			async register () {
				try {
					// Register the user.
					const { data } = await this.form.post('/register')

					// Must verify email fist.
					if (data.status) {
						this.mustVerifyEmail = true
						this.$swal({
							toast: true,
							position: 'bottom-end',
							timer: 5000,
							showConfirmButton: false,
							type: 'success',
							text: 'An e-mail is sent to you. Please check your inbox.'
						})
					} else {
						// Log in the user.
						const { data: { token } } = await this.form.post('/login')
						// Save the token.
						this.$store.dispatch('auth/saveToken', { token })
						// Update the user.
						await this.$store.dispatch('auth/updateUser', { user: data })
						// Redirect home.
						this.$router.push({ name: 'home' })
					}

				} catch (e) {
					return
				}
			},
			showFeedback ({suggestions, warning}) {
				this.suggs = suggestions
				this.warns = warning
			},
		}
	}
</script>

<style>

</style>