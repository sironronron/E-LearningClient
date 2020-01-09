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
            <template v-if="sections.length != 0">
                <div class="my-5">
                    <section class="p-4 rounded bg-secondary mb-3" v-for="(section, index) in sections" :key="`${section.id}-section`">
                        <h6 class="mb-4">Section {{index + 1}} : &nbsp; <b>{{section.title}}</b></h6>
                        <div v-for="(lesson, index) in lessons" :key="`${index}-lesson`">
                            <div v-if="lesson.course_section_id == section.id" class="p-3 bg-white border rounded mb-2">
                                <h6 class="mb-0"><fa icon="play-circle" v-if="lesson.lesson_type === 'VIDEO'" /> <span class="text-muted">
                                    Lesson {{index + 1}}</span><span class="font-weight-bold"> : {{lesson.title}}</span> 
                                </h6>
                            </div>
                        </div>
                    </section>
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
            <add-section-modal :course_id="course_id" v-if="showAddSectionModal" @close="closeSectionModal" @clicked="saveNewSection"></add-section-modal>
        </transition>

        <transition name="fade">
            <add-lesson-modal :course_id="course_id" v-if="showAddLessonModal" @close="closeLessonModal" @clicked="saveNewLesson"></add-lesson-modal>
        </transition>

        <transition name="fade">
            <add-quiz-modal :course_id="course_id" v-if="showAddQuizModal" @close="closeQuizModal"></add-quiz-modal>
        </transition>

    </div>
</template>

<script>
    let myBody = null

    import axios from 'axios'

    // Modals
    import AddSectionModal from './add_section'
    import AddLessonModal from './add_lesson'
    import AddQuizModal from './add_quiz'

    export default {

        props: ['course_id'],

        components: {
            AddSectionModal, AddLessonModal, AddQuizModal
        },

        data: () => ({

            // Curriculum types
            sections: [],
            lessons: [],

            // Modals 
            showAddSectionModal: false,
            showAddLessonModal: false,
            showAddQuizModal: false,

            isLoading: false

        }),

        created() {
            this.getCurriculums()
        },

        methods: {

            getCurriculums: function () {
                axios.get(`/instructor/courses/${this.$route.params.slug}/edit`)
                .then((res) => {
                    this.sections = res.data.sections
                    this.lessons = res.data.lessons
                })
            },

            openSectionModal: function () {
                this.showAddSectionModal = true

                // Add Class to bdy
                myBody.classList.toggle('modal-open')
            },

            closeSectionModal: function () {
                this.showAddSectionModal = false
                myBody.classList.remove('modal-open')
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
            saveNewSection(value) {
                this.sections.push({
                    id: value.id,
                    title: value.title,
                    slug: value.slug
                })
            },

            // Save New Lesson
            saveNewLesson(value) {
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

            // Save New Quiz
            saveNewQuiz(value) {
                //
            }

        },

        mounted: function () {
            myBody = document.getElementsByTagName('body')[0]
        }

    }
</script>

<style>

</style>