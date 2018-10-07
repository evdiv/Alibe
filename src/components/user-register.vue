<template>
    <b-row>
        <b-col cols='8' offset="2">
            <h3>Register</h3>
            <p>For using this tool, you need to register first</p>

            <b-alert v-if="showSuccess" show variant="success">
                Your account has been created
            </b-alert>

            <b-card bg-variant="light">
                <form @submit.prevent>
                    <b-form-group label="Name" label-size="md">
                        <b-form-input v-model="name"
                                    type="text"
                                    placeholder="Your name">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Title" label-size="md">
                        <b-form-input v-model="title"
                                    type="text"
                                    placeholder="Your Title">
                        </b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Email" label-size="md">
                        <b-form-input v-model="email"
                                    type="email"
                                    placeholder="your@mail.com">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Description" label-size="md">
                        <b-form-textarea v-model="description"
                                        placeholder="Short Description of your business"
                                        :rows="3"
                                        :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>                    

                    <b-form-group label="Password" label-size="md">
                        <b-form-input v-model="password"
                                    type="password"
                                    placeholder="min 6 characters">
                        </b-form-input>
                    </b-form-group>


                    <b-form-group align="right">
                        <b-button variant="success" 
                                @click="signUp">Register
                        </b-button>
                    </b-form-group>
                </form>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            title: '',
            email: '',
            description: '',
            password: '',
            showSuccess: false
        }
    },
    methods: {
        signUp() {

        }
    }
}
</script>

<style>

</style>
