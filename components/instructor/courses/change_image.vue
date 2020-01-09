<template>
    <div>

        <form @submit.prevent="change">
            <!-- // If Image exists -->
            <template v-if="form.image == ''">
                <div>
                    <img :src="image.image" class="img-fluid rounded shadow-sm img_preview" alt="">
                </div>
            </template>
            <template v-else>
                <div>
                    <img :src="form.imagePreview" class="img-fluid rounded shadow-sm img_preview" alt="">
                </div>
            </template>
            <input class="mt-3" type="file" name="image" accept="image/*" @change="selectFile">
            <v-button :loading="form.busy" class="btn-sm">
                Change Image
            </v-button>
        </form>


    </div>
</template>

<script>
    import axios from 'axios'
    import Form from 'vform'

    if (process.client) {
        let objectToFormData = document.createElement('script')
        objectToFormData.setAttribute('src', "https://cdn.rawgit.com/cretueusebiu/412715093d6e8980e7b176e9de663d97/raw/aea128d8d15d5f9f2d87892fb7d18b5f6953e952/objectToFormData.js")
        document.head.appendChild(objectToFormData)
    }

    export default {

        data: () => ({
            image: [],
            progress: 0,
            form: new Form({
                image: '',
                imagePreview: '',
            })
        }),

        created() {
            this.getImage()
        },

        methods: {
            selectFile(e) {
                const file = e.target.files[0]
                this.form.image = file
                this.form.imagePreview = URL.createObjectURL(file)
            },

            async change() {
                let _this = this
                try {
                    const { data } = await this.form.submit('post', `/instructor/courses/${this.image.id}/updateImage`, {
                        transformRequest: [function (data, headers) {
                            return objectToFormData(data)
                        }],
                    })
                    this.$swal({
                        type: 'success',
                        text: data.message
                    })
                } catch (e) {
                    return
                }
            },
            
            getImage: function () {
                axios.get(`/instructor/courses/${this.$route.params.slug}/editImage`)
                .then((res) => {
                    this.image = res.data.image
                }).catch((err) => {
                    console.log(err)
                })
            }
        }

    }

</script>

<style scoped>
    .img_preview {
        height: 135px;
        width: 240px;
        object-fit: cover;
    }
</style>