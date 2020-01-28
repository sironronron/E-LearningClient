<template>
    <div class="m-0">
        <div class="section_header">Course content</div>
        <div class="section_content">
            <div>
                <div class="accordion course__curriculum-accordion" id="accordionExample">
                    <div class="card border-0 lecture__group-wrapper bg-transparent" v-for="(section, index) in sections" :key="index">
                        <div class="" id="headingOne">
                            <div class="lecture__group-title-2 clearfix mb-0" data-toggle="collapse" :data-target="`#collapse-${index}`" :aria-expanded="index == 0 ? 'true' : 'false'" aria-controls="collapseOne">
                                <a class="text-capitalize text-dark" type="button">
                                    Section {{ index + 1 }}: {{ section.title }}
                                </a>
                                <div>
                                    <span class="text-uppercase text-muted small"><small>0 / {{ section.lessons.length }} &nbsp; Completed</small></span>
                                </div>
                            </div>
                        </div>

                        <div :id="`collapse-${index}`" class="collapse" :class="{ 'show' : index == 0 }" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body p-0 bg-white">
                                <div class="lecture-list-2">
                                    <ul class="list-unstyled mb-0">
                                        <template v-for="(lesson, index) in section.lessons">
                                            <a href="#" :key="`${index}-lesson`">
                                                <li v-if="lesson.course_section_id == section.id" class="lecture has-preview lesson-hover">
                                                    <div class="d-flex">
                                                        <div>
                                                            <checkbox name="check">
                                                            </checkbox>
                                                        </div>
                                                        <div class="ml-3">
                                                            <span class="lecture-title">{{ index + 1 }}.  {{lesson.title}}</span>
                                                            <div v-if="lesson.lesson_type === 'VIDEO'">
                                                                <small><fa icon="play-circle" fixed-width /> {{ lesson.duration }}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'sections', 'lessons',
        ],
    }
</script>

<style lang="scss" scoped>
    .section_header {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5em;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        border: 1px solid #dedfe0;
    }

    .section_content {
        z-index: 1;
        background-color: #fff;
        border: 1px solid #e8e9eb;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .lesson-hover:hover {
        background: #d4e9ee;
    }
</style>