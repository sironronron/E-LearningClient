<template>
    <div>
        <client-only>
			<offline-alert/>
		</client-only>
         <!-- Title Page -->
        <h4 class="mb-0 m-t-8 font-weight-400"><img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,h_60/v1576222206/Logos/online-learning_osijg7.svg" style="width: 60px; height: 60px;" alt=""> &nbsp; Add New Course</h4>

        <div class="mt-3">
            <div class="row">
                <div class="col-lg-12">
                    <card class="shadow-sm">
                        <h4 class="header-title mb-3">
                            Course adding form
                            <router-link :to="{ name: 'instructor.courses' }" class="btn btn-outline-secondary btn-rounded btn-sm float-right">
                                <fa icon="backspace" fixed-width class="mr-2" />
                                Back to course list
                            </router-link>
                        </h4>
                        <div class="flex-column flex-md-row">
                            <div class="nav-wrapper" style="margin-right: -15px; margin-left: -15px;">
                                <ul role="tablist" class="nav nav-pills nav-fill">
                                    <li class="nav-item">
                                        <a @click.prevent="step = 1" data-toggle="tab" role="tab" href="#basic" :class="{ 'active' : step == 1 }" class="nav-link shadow-none border-bottom border-top">
                                            <div>
                                                <fa icon="pen-nib" fixed-width class="mr-1" />
                                                Basic
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a @click.prevent="step = 2" data-toggle="tab" role="tab" href="#requirements" :class="{ 'active' : step == 2 }" class="nav-link shadow-none border">
                                            <div>
                                                <fa icon="clipboard-list" fixed-width class="mr-1" />
                                                Requirements
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a @click.prevent="step = 3" data-toggle="tab" role="tab" href="#outcomes" :class="{ 'active' : step == 3}" class="nav-link shadow-none border">
                                            <div>
                                                <fa icon="poll-h" fixed-width class="mr-1" />
                                                Outcomes
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a @click.prevent="step = 4" data-toggle="tab" role="tab" href="#pricing" :class="{ 'active' : step == 4 }" class="nav-link shadow-none border">
                                            <div>
                                                <fa icon="dollar-sign" fixed-width class="mr-1" />
                                                Pricing
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a @click.prevent="step = 5" data-toggle="tab" role="tab" href="#media" :class="{ 'active' : step == 5 }" class="nav-link shadow-none border">
                                            <div>
                                                <fa icon="photo-video" fixed-width class="mr-1" />
                                                Media
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a @click.prevent="step = 6" data-toggle="tab" role="tab" href="#seo" :class="{ 'active' : step == 6 }" class="nav-link shadow-none border">
                                            <div>
                                                <fa icon="tags" fixed-width class="mr-1" />
                                                SEO
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a @click.prevent="step = 7" data-toggle="tab" role="tab" href="#finish" :class="{ 'active' : step == 7 }" class="nav-link shadow-none border-bottom border-top">
                                            <div>
                                                <fa icon="check-circle" fixed-width class="mr-1" />
                                                Finish
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content mt-4">
                                <form @submit.prevent="save" @keydown="form.onKeydown($event)">

                                    <!-- // Basic Course Information -->
                                    <div v-if="step == 1" id="basic" aria-expanded="true">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">

                                                <div class="form-group row mb-4">
                                                    <label for="title" class="col-form-label col-lg-2">Course Title <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <input type="text" name="title" v-model="form.title" :class="{ 'is-invalid' : form.errors.has('title') }" class="form-control rounded" placeholder="Course Title">
                                                        <has-error :form="form" field="title"></has-error>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4">
                                                    <label for="excerpt" class="col-form-label col-lg-2">Excerpt <small class="text-danger">*</small></label>
                                                    <div class="col-lg-10">
                                                        <textarea name="excerpt" cols="30" rows="3" v-model="form.excerpt" :class="{ 'is-invalid' : form.errors.has('excerpt') }" class="form-control rounded" placeholder="Short Description for your Course"></textarea>
                                                        <has-error :form="form" field="excerpt"></has-error>
                                                    </div>
                                                </div>

                                                <div class="form-gorup row mb-4">
                                                    <label for="description" class="col-form-label col-lg-2">Description <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <client-only>
                                                            <froala id="edit" name="description" :tag="'textarea'" :config="config" :class="{ 'is-invalid' : form.errors.has('description') }" v-model="form.description"></froala>
                                                            <has-error :form="form" field="description"></has-error>
                                                        </client-only>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4">
                                                    <label for="category_id" class="col-form-label col-lg-2">Category <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <select name="category_id" :class="{ 'is-invalid' : form.errors.has('category_id') }" class="form-control rounded" v-model="form.category_id">
                                                            <option value="" data-select2-id="2">Select a category</option>
                                                            <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                                                        </select>
                                                        <has-error :form="form" field="category_id"></has-error>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4">
                                                    <label for="level" class="col-lg-2 col-form-label">Level <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <select name="level" v-model="form.level" :class="{ 'is-invalid' : form.errors.has('level') }" class="form-control rounded">
                                                            <option value="">Select Level</option>
                                                            <option value="BEGINNER">Beginner</option>
                                                            <option value="ADVANCE">Advance</option>
                                                            <option value="INTERMEDIATE">Intermediate</option>
                                                        </select>
                                                        <has-error :form="form" field="level"></has-error>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4" :class="{ 'is-invalid has-danger' : form.errors.has('top_course') }">
                                                    <label for="top_course" class="col-lg-2 col-form-label">Top Course</label>
                                                    <div class="col-lg-10">
                                                        <checkbox v-model="form.top_course"  name="top_course">
                                                            Check if Top Course
                                                        </checkbox>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- // Course Requirements -->
                                    <div v-if="step == 2" id="requirements" aria-expanded="true">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">

                                                <div class="form-group row mb-2" v-for="(requirement, index) in form.requirements" :key="requirement.id">
                                                    <label for="description" class="col-lg-2 col-form-label">Requirement {{index + 1}} <span class="text-danger">*</span></label>
                                                    <div class="col-lg-9">
                                                        <input type="text" name="description" v-model="requirement.description" :class="{ 'is-invalid' : form.errors.has(`requirements.${index}.description`) }" class="form-control rounded" placeholder="Place your requirement">
                                                    </div>
                                                    <div class="col-lg-1">
                                                        <a href="#" class="close-button text-muted" @click.prevent="remove('requirements', index)">
                                                            <fa icon="times" fixed-width />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <div class="col-lg-2"></div>
                                                    <div class="col-lg-9">
                                                        <button class="btn btn-outline-default btn-block rounded" @click.prevent="addRequirement" style="border: 1px solid #172F4D ;border-style: dashed solid;"><fa icon="plus-circle" /> Requirement</button>
                                                    </div>
                                                </div>

                                                <hr>

                                                <div class="form-group row mb-3" v-for="(who, index) in form.whos" :key="who.id">
                                                    <label for="description" class="col-lg-2 col-form-label">For Who? {{index + 1}} <span class="text-danger">*</span></label>
                                                    <div class="col-lg-9">
                                                        <input type="text" name="description" v-model="who.description" :class="{ 'is-invalid' : form.errors.has(`whos.${index}.description`) }" class="form-control rounded" placeholder="Who needs to learn this?">
                                                        <has-error :form="form" :field="`whos.${index}.description`"></has-error>
                                                    </div>
                                                    <div class="col-lg-1">
                                                        <a href="#" class="close-button text-muted" @click.prevent="remove('whos', index)">
                                                            <fa icon="times" fixed-width />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <div class="col-lg-2"></div>
                                                    <div class="col-lg-9">
                                                        <button class="btn btn-outline-default btn-block rounded" @click.prevent="addWho" style="border: 1px solid #172F4D ;border-style: dashed solid;"><fa icon="plus-circle" /> For Who</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- // Course Outcomes -->
                                    <div v-if="step == 3" id="outcomes" aria-expanded="true">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">

                                                <div class="form-group row mb-3" v-for="(outcome, index) in form.outcomes" :key="outcome.id">
                                                    <label for="description" class="col-lg-2 col-form-label">Outcome {{index + 1}} <span class="text-danger">*</span></label>
                                                    <div class="col-lg-9">
                                                        <input type="text" name="description" v-model="outcome.description" :class="{ 'is-invalid' : form.errors.has(`outcomes.${index}.description`) }" class="form-control rounded" placeholder="Place your outcome">
                                                    </div>
                                                    <div class="col-lg-1">
                                                        <a href="#" class="close-button text-muted" @click.prevent="remove('outcomes', index)">
                                                            <fa icon="times" fixed-width />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <div class="col-lg-2"></div>
                                                    <div class="col-lg-9">
                                                        <button class="btn btn-outline-default btn-block rounded" @click.prevent="addOutcome" style="border: 1px solid #172F4D ;border-style: dashed solid;"><fa icon="plus-circle" /> Outcome</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- // Course Pricing -->
                                    <div v-if="step == 4" id="pricing" aria-expanded="true">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">

                                                <div class="form-group row mb-4" :class="{ 'is-invalid has-danger' : form.errors.has('free_course') }">
                                                    <label for="top_course" class="col-lg-2 col-form-label"></label>
                                                    <div class="col-lg-10">
                                                        <checkbox v-model="form.free_course" name="free_course">
                                                            Check if Free Course
                                                        </checkbox>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4">
                                                    <label for="price" class="col-lg-2 col-form-label">Price <span class="text-danger">*</span> (PHP) </label>
                                                    <div class="col-lg-10">
                                                        <input type="number" name="price" v-model="form.price" :class="{ 'is-invalid' : form.errors.has('price') }" class="form-control rounded" step=".01" :disabled="form.free_course == true" placeholder="Enter Course Price">
                                                        <has-error :form="form" field="price"></has-error>
                                                    </div>
                                                </div>

                                                <div v-if="form.free_course == false">
                                                    <div class="form-group row mb-4" :class="{ 'is-invalid has-danger' : form.errors.has('has_discount') }">
                                                        <label for="has_discount" class="col-lg-2 col-form-label"></label>
                                                        <div class="col-lg-10">
                                                            <checkbox v-model="form.has_discount"  name="has_discount">
                                                                Check if this Course has Discount
                                                            </checkbox>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row mb-4">
                                                        <label for="discount" class="col-lg-2 col-form-label">Discount <span class="text-danger">*</span> (PHP) </label>
                                                        <div class="col-lg-10">
                                                            <input type="number" name="discount" v-model="form.discount" :class="{ 'is-invalid' : form.errors.has('discount') }" class="form-control rounded" step=".01" :disabled="form.has_discount == false" placeholder="Enter Course Discount Price">
                                                            <has-error :form="form" field="discount"></has-error>
                                                            <small v-if="form.has_discount" class="text-muted">This course has <span id="discounted_percentage" class="text-danger">{{discountPercentage}}%</span> Discount</small>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <!-- // Course Media -->
                                    <div v-if="step == 5" id="media" aria-expanded="true">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">

                                                <div class="form-group row mb-4">
                                                    <label for="overview_provider" class="col-form-label col-lg-2">Overview Provider <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <select name="course_overview_provider" v-model="form.course_overview_provider" :class="{ 'is-invalid' : form.errors.has('course_overview_provider') }" class="custom-select form-control rounded">
                                                            <option value="">Select Provider</option>
                                                            <option value="YOUTUBE">Youtube</option>
                                                            <option value="VIMEO">Vimeo</option>
                                                            <option value="HTML5">HTML5</option>
                                                        </select>
                                                        <has-error :form="form" field="course_overview_provider"></has-error>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4">
                                                    <label for="overview_url" class="col-form-label col-lg-2">Overview Url <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <input type="text" name="course_overview_url" v-model="form.course_overview_url" :class="{ 'is-invalid' : form.errors.has('course_overview_url') }" class="form-control rounded" placeholder="Video Url">
                                                        <has-error :form="form" field="course_overview_url"></has-error>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4">
                                                    <label for="image" class="col-form-label col-lg-2">Image <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <input type="file" name="image" accept="image/*" @change="selectFile">
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- // Course SEO -->
                                    <div v-if="step == 6" id="seo" aria-expanded="true">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">

                                                <div class="form-group row mb-4">
                                                    <label for="keywords" class="col-lg-2 col-form-label">Meta Keywords <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <input type="text" name="meta_keywords" v-model="form.meta_keywords" :class="{ 'is-invalid' : form.errors.has('meta_keywords') }" class="form-control rounded" placeholder="Separate your keywords with comma">
                                                        <has-error :form="form" field="meta_keywords"></has-error>
                                                    </div>
                                                </div>

                                                <div class="form-group row mb-4">
                                                    <label for="description" class="col-lg-2 col-form-label">Meta Description <span class="text-danger">*</span></label>
                                                    <div class="col-lg-10">
                                                        <textarea name="meta_description" v-model="form.meta_description" :class="{ 'is-invalid' : form.errors.has('meta_description') }" cols="30" rows="5" class="form-control rounded" placeholder="Place an up to 120 words"></textarea>
                                                        <has-error :form="form" field="meta_description"></has-error>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- // Course Finished -->
                                    <div v-if="step == 7" id="finish" aria-expanded="true">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">
                                                
                                                <div class="text-center mb-5">
                                                    <h5><fa icon="check-double" fixed-width /></h5>
                                                    <h4>Thank you!</h4>
                                                    <h6 class="text-muted">You're just one click away.</h6>
                                                    <v-button :loading="form.busy" class="mt-1">
                                                        Submit
                                                    </v-button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- // Prev and Next Button -->
                                    <div class="row justify-content-center mt-3">
                                        <div class="col-lg-auto">
                                            <!-- // Previous button -->
                                            <button v-if="step <= 1" class="btn btn-sm btn-default" disabled>
                                                <fa icon="arrow-left" fixed-width /> 
                                            </button>
                                            
                                            <button v-else class="btn btn-sm btn-default" @click.prevent="prev()">
                                                <fa icon="arrow-left" fixed-width /> 
                                            </button>
                                        </div>
                                        <div class="col-lg-auto">
                                            <!-- // Next Button -->
                                            <button v-if="step >= 7" disabled class="btn btn-sm btn-default" @click.prevent="next()">
                                                <fa icon="arrow-right" fixed-width /> 
                                            </button>

                                            <button v-else class="btn btn-sm btn-default" @click.prevent="next()">
                                                <fa icon="arrow-right" fixed-width /> 
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>



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

        middleware: 'auth',

        scrollToTop: false,

        head() {
            return { title: 'Create Course' }
        },

        async asyncData () {
            let { data } = await axios.get('/instructor/courses/create')
            return {
                categories: data.categories,
            }
        },

        data: () => ({
            step: 1,
            form: new Form({
                title: '',
                excerpt: '',
                description: '',
                category_id: '',
                level: '',
                top_course: false,
                image: '',
                requirements: [
                    {
                        description: ''
                    }
                ],
                outcomes: [
                    {
                        description: ''
                    }
                ],
                whos: [
                    {
                        description: ''
                    }
                ],
                free_course: true,
                price: '',
                has_discount: false,
                discount: '',
                meta_keywords: '',
                meta_description: '',
                course_overview_provider: '',
                course_overview_url: ''
            }),
            percentage: '',
            config: {
            },
        }),

        methods: {
            selectFile(e) {
                const file = e.target.files[0]
                this.form.image = file
            },

            async save() {
                try {
                    const { data } = await this.form.submit('post', '/instructor/courses', {
                        transformRequest: [function (data, headers) {
                            return objectToFormData(data)
                        }]
                    })
                    .then((res) => {
                        this.$router.push({ name: 'instructor.courses' })
                        this.$swal({
                            toast: true,
                            position: 'bottom-end',
                            timer: 5000,
                            showConfirmButton: false,
                            type: 'success',
                            text: res.data.message
                        })
                    })
                    .catch((err) => {
                        this.$swal({
                            toast: true,
                            position: 'bottom-end',
                            timer: 5000,
                            showConfirmButton: false,
                            type: 'warning',
                            text: 'Please fill up the required fields.'
                        })
                    })
                } catch (e) {
                    return
                }
            },

            addRequirement: function () {
                this.form.requirements.push({
                    description: ''
                })  
            },

            addOutcome: function () {
                this.form.outcomes.push({
                    description: ''
                })
            },

            addWho: function () {
                this.form.whos.push({
                    description: ''
                })
            },

            remove: function (type, index) {
                if (this.form[type].length > 1) {
                    this.form[type].splice(index, 1)
                }
            },

            next: function () {
                this.step++
            },

            prev: function () {
                this.step--
            },
            
        },

        computed: {
            discountPercentage() {
                return this.percentage = ((1 - (this.form.discount / this.form.price)) * 100).toFixed(0)
            }
        }

    }

</script>

<style scoped>
    .card .header-title {
        margin-bottom: .5rem;
        text-transform: uppercase;
        letter-spacing: .02em;
        font-size: .875rem;
        margin-top: 0;
    }
    .col-form-label {
        padding-top: calc(.45rem + 1px);
        padding-bottom: calc(.45rem + 1px);
        margin-bottom: 0;
        font-size: 13px;
        line-height: 1.5;
    }
    .nav-pills .nav-item:not(:last-child) {
        padding-right: 0 !important;
    }
    
</style>>
