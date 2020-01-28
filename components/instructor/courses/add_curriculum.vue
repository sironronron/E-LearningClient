<template>
    <div>

           <!-- // Add buttons -->
        <div class="text-center">
            <button v-if="!showAddSectionModal" class="btn btn-outline-primary rounded btn-sm ml-1" @click.prevent="openSectionModal"><fa icon="plus" /> Add Section</button>

            <button v-if="!showAddLessonModal" class="btn btn-outline-primary rounded btn-sm ml-1" @click.prevent="openLessonModal"><fa icon="plus" /> Add Lesson</button>

            <button v-if="!showAddQuizModal" class="btn btn-outline-primary rounded btn-sm ml-1" @click.prevent="openQuizModal"><fa icon="plus" /> Add Quiz</button>
        </div>

        <div v-if="!isLoading">
            <!-- // Sections & Lesson  -->
            <template v-if="sectionsNew.length != 0">
                <div class="my-5">
                    <draggable class="drag-area" :list="sectionsNew" :options="{ animation: 200, handle: '.drag-me' }" :element="'div'" :noTransitionOnDrag="false" @change="update">
                        <section class="p-4 rounded bg-secondary mb-3 course__section" v-for="(section, index) in sectionsNew" :key="`${section.id}-section`">
                            <!-- // Section description -->
                            <div class="d-inline-flex">
                                <h6 class="mb-4">Section {{index + 1}} : &nbsp; <b>{{section.title}}</b> </h6> 
                            </div>
                            
                            <!-- // Draggable -->
                            <div class="d-inline-flex float-right">
                                <span class="my-handle">
                                    <span class="drag-me">
                                        <fa class="mt-1" icon="grip-vertical" fixed-width style="cursor: move;" />
                                    </span>
                                </span> 
                            </div>

                            <draggable class="drag-area" :list="lessonsNew" :options="{ animation: 200, handle: '.my-lessons-handle' }" :element="'div'" :noTransitionOnDrag="false" @change="updateLessonsOrder">
                                <!-- // Lessons -->
                                <div v-for="(lesson, index) in lessonsNew" :key="`${index}-lesson`" class="course__section-lesson">
                                    <div v-if="lesson.course_section_id == section.id" class="p-3 bg-white border rounded mb-2">
                                        <span class="float-right my-lessons-handle">
                                            <fa icon="grip-vertical" fixed-width style="cursor: move;" />
                                        </span> 
                                        <h6 class="mb-0" style="line-height: 1.5rem;"><fa icon="play-circle" v-if="lesson.lesson_type === 'VIDEO'" /> <span class="text-muted">
                                            Lesson {{index + 1}}</span><span class="font-weight-bold"> : &nbsp; {{lesson.title}}</span>
                                        </h6>
                                        <div v-if="lesson.lesson_provider === 'HTML5'" class="mt-3">
                                            <client-only>
                                                <vue-plyr>
                                                    <video :poster="lesson.thumbnail" :src="lesson.video_url">
                                                        <source :src="lesson.video_url" type="video/mp4" >
                                                    </video>
                                                </vue-plyr>
                                            </client-only>
                                        </div>
                                    </div>
                                </div>
                            </draggable>
                            <hr v-if="quizzes.length != ''">
                            <!-- // Quizzes -->
                            <div v-for="(quiz, index) in quizzes" :key="`${index}-quiz`">
                                <div v-if="quiz.course_curriculum_section_id == section.id" class="p-3 bg-white border rounded mb-2">
                                    <h6 class="mb-0">
                                        <fa icon="clipboard-list" fixed-width />
                                        <span class="text-muted">Quiz {{index + 1 }}</span>
                                        <span class="font-weight-bold"> : {{quiz.title}}</span>
                                    </h6>
                                </div>
                            </div>
                        </section>
                    </draggable>
                </div>
            </template>

            <template v-else>
                <div class="my-5">
                    <div class="text-center">
                        <img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,h_130/v1576466809/Online%20Learning%20Icon%20Pack/042-book_iscdda.svg" class="img-fluid" width="130" height="130" alt="">
                        <h6>You don't have any curriculums yet.</h6>
                    </div>
                </div>
            </template>
        </div>

        <div v-else>
            <div class="my-5 text-center">
                <img src="https://res.cloudinary.com/dl9phqhv0/image/upload/v1574394025/Loader/ajax-loader_sln1xw.gif" alt="">
            </div>
        </div>

        <!-- // Modals -->
        <transition name="fade">
            <add-section-modal :course_id="course_id" v-if="showAddSectionModal" @close="closeSectionModal" @clicked="saveNewSection" v-click-outside="closeSectionModal"></add-section-modal>
        </transition>

        <transition name="fade">
            <add-lesson-modal :course_id="course_id" v-if="showAddLessonModal" @close="closeLessonModal" @clicked="saveNewLesson"></add-lesson-modal>
        </transition>

        <transition name="fade">
            <add-quiz-modal :course_id="course_id" v-if="showAddQuizModal" @close="closeQuizModal" @clicked="saveNewQuiz"></add-quiz-modal>
        </transition>

    </div>
</template>

<script>
    let myBody = null

    import Form from 'vform'
    import axios from 'axios'

    // Modals

        // Section Cruds
        import AddSectionModal from './add_section'
        import EditSectionModal from './edit_section.vue'
        // End

    import AddLessonModal from './add_lesson'
    import AddQuizModal from './add_quiz'

    // Draggable
    import draggable from 'vuedraggable'

    export default {

        props: ['course_id', 'sections', 'lessons', 'quizzes'],

        components: {
            AddSectionModal, AddLessonModal, AddQuizModal,
            draggable, EditSectionModal
        },

        data: function() {
            return {

                // Modals 
                // Section Create, Update, Edit, Delete
                showAddSectionModal: false,
                showEditSectionModal: false,
                showAddLessonModal: false,
                showAddQuizModal: false,

                isLoading: false,

                hover: false,

                // Draggables
                sectionsNew: this.sections,
                lessonsNew: this.lessons,

                editingSection: false
            }
        },  

        methods: {

            async update () {
                this.sectionsNew.map((section, index) => {
                    section.order_index = index + 1
                })

                await axios.put(`/instructor/courses/section/order_index/${this.course_id}`, {
                    sections: this.sectionsNew
                }).then((res) => {
                    console.log(res)
                })
            },

            async updateLessonsOrder () {
                this.lessonsNew.map((lesson, index) => {
                    lesson.order_index = index + 1
                })

                await axios.put(`/instructor/courses/section/lesson/order_index/${this.course_id}`, {
                    lessons: this.lessonsNew
                }).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            },

            // Section Crud
            openSectionModal: function () {
                this.showAddSectionModal = true

                // Add Class to bdy
                 myBody.classList.toggle('modal-open')
            },

            closeSectionModal: function () {
                this.showAddSectionModal = false
                myBody.classList.remove('modal-open')
            },

            editSection: function () {
                this.editingSection = !this.editingSection
            },

            openLessonModal: function () {
                this.showAddLessonModal = true

                // Add Class to Body
                myBody.classList.toggle('modal-open')
            },

            closeLessonModal: function () {
                this.showAddLessonModal = false
                myBody.classList.remove('modal-open')
            },

            openQuizModal: function () {
                this.showAddQuizModal = true

                // Add Class to Body
                myBody.classList.toggle('modal-open')
            },
            
            closeQuizModal: function () {
                this.showAddQuizModal = false
                myBody.classList.remove('modal-open')
            },

            // Save New Section
            saveNewSection: function (value) {
                this.sections.push({
                    id: value.id,
                    title: value.title,
                    slug: value.slug
                })
            },

            // Save New Lesson
            saveNewLesson: function (value) {
                this.lessons.push({
                    course_section_id: value.course_section_id,
                    lesson_image: value.lesson_image,
                    title: value.title,
                    lesson_type: value.lesson_type,
                    lesson_provider: value.lesson_provider,
                    thumbnail: value.thumbnail,
                    video_url: value.video_url,
                    duration: value.duration,
                    lesson_attachment: value.lesson_attachment,
                    summary: value.summary,
                    id: value.id
                })
            },

            saveNewQuiz: function (value) {
                this.quizzes.push({
                    id: value.id,
                    title: value.title,
                    instruction: value.course_id,
                    course_id: value.course_id,
                    course_curriculum_section_id: value.course_curriculum_section_id,
                })
            },

            updateDataSection: function(value) {
                // Code here
            },

            toggleHoverSection: function () {
                this.hoverSection = !this.hoverSection
            }
        },

        watch: {
            $route(newVal, oldVal) {
                this.showEditSectionModal = newVal.meta && newVal.meta.showEditSectionModal
                myBody.classList.toggle('modal-open')
            }
        },

        mounted: function () {
            myBody = document.getElementsByTagName('body')[0]
        },

        directives: {

            clickOutside: {
                bind: function (el, binding, vnode) {
                    el.eventSetDrag = function () {
                        el.setAttribute('data-dragging', 'yes')
                    }
                }
            }
            
        }


    }
</script>

<style lang="scss" scoped>
    .my-lessons-handle {
        display: none;
    }
    .edit-button {
        display: none !important;
    }
    .my-handle {
        display: none;
    }
    .course__section:hover .my-handle {
        display: block;
    }
    .course__section-lesson:hover .my-lessons-handle {
        display: block;
    }
    .modal-route {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba($color: #000000, $alpha: 0.5);
        .modal-content {
            width: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
        }
    }
</style>