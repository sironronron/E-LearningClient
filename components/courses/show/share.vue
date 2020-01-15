<template>
    <transition name="fade" mode="out-in">
        <modal header="Share this course">
            <template slot="header">
                <h5 class="modal-title">Share this course</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="close" @click="$emit('close')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </template>
            <template slot="form">
                <div class="modal-body">
                    
                    <!-- // Copy input -->
                    <form class="mx-2 my-auto d-inline">
					    <div class="input-group">
						    <input aria-describedby="addon-right addon-left" type="text" name="search" v-model="url" placeholder="Search for courses" class="form-inline form-control rounded-left">
						    <div class="input-group-prepend">
							    <button type="button" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError" class="input-group-text btn btn-outline-danger rounded-right" >
                                    <template v-if="!onSuccess">
                                        <fa :icon="['far', 'copy']" fixed-width /> &nbsp; Copy
                                    </template>
                                    <template v-else-if="onSuccess == true">
                                        <fa icon="check" fixed-width /> &nbsp; Copied!
                                    </template>
							    </button>
						    </div>
					    </div>
				    </form>

                    <div class="row justify-content-between">
                        <div class="col-lg-2"></div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-2"></div>
                    </div>

                </div>
            </template>
        </modal>
    </transition>
</template>

<script>

    export default {

        name: 'ShareButtons',

        data: function () {
            return {
                url: '',
                message: '',

                onSuccess: false,
                onError: false
            }
        },

        created: function () {
            var currentUrl = window.location.pathname
            this.url = 'http://localhost:3000' + currentUrl
        },

        methods: {
            onCopy: function (e) {
                this.onSuccess = true
                this.message = 'Copied!'
            },

            onError: function (e) {
                this.onError = true
                this.message = 'Copy failed'
            }
        }

    }
</script>

<style>

</style>