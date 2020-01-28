<template>
	<transition name="fade" mode="out-in">
        <modal :form_action="update" @keydown="form.onKeydown($event)" header="Edit section">
            <template slot="header">
                <h5 class="modal-title">Add new section</h5>
                <router-link type="button" class="close" data-dismiss="modal" aria-label="Close" to="../">
                    <span aria-hidden="true">&times;</span>
                </router-link>
            </template>
            <template slot="form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="title" class="col-form-label">Title</label>
                        <input type="text" name="title" :class="{ 'is-invalid' : form.errors.has('title') }" v-model="form.title" class="form-control rounded">
                        <h6 class="text-muted"><small>Provide a Section Name</small></h6>
                        <has-error :form="form" field="title" />
                    </div>
                </div>
                <div class="modal-footer">
                    <v-button :loading="form.busy" class="btn btn-primary rounded btn-sm">Save changes</v-button>
                </div>
            </template>
        </modal>
    </transition>
</template>

<script>
	import axios from 'axios'
	import Form from 'vform'

	export default {

		data: () => ({
			section: [],

			form: new Form({
				title: ''
			})
		}),

		created() {
			this.getSectionData()

			this.form.fill(this.section)
		},

		methods: {
			// Get section editable data
			async getSectionData() {
				await axios.get(`/instructor/courses/section/edit_section/${this.$route.params.id}/get`)
				.then((res) => {
					this.section = res.data.section
					this.form.title = this.section.title
				}).catch((err) => {
					console.log(err)
				})
			},

			async update () {
				let { data } = await this.form.patch(`/instructor/courses/section/edit_section/${this.$route.params.id}/patch`)
				this.$swal({
					type: 'success',
					text: data.message
				})
				this.$router.push({ name: 'instructor.courses.edit', params: { slug: this.$route.params.slug } })
			}
		},

	}
</script>

<style lang="scss" scoped>

</style>