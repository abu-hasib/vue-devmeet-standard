<template>
  <v-content>
    
  
 <v-container fluid fill-height>


   <v-layout align-center justify-center mt-5 mb-5>
     <v-flex xs12 sm8 md4>
      <v-layout v-if="error" row>
        <v-flex>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>
    <v-card class="elevation-12" >
      <v-toolbar dark color="primary">
        <v-toolbar-title>Hangouts</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-form @submit.prevent="onSignin">
          <v-text-field
            name="email"
            prepend-icon="person"
            label="Email"
            type="email"
            id="email"
            v-model="email"
            required></v-text-field>
          <v-text-field
            name="password"
            label="Password"
            prepend-icon="lock"
            id="password"                    
            v-model="password"
            type="password"
            required></v-text-field>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit"
                color="primary"
                :disabled="loading"
                :loading="loading">
                Login
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-card-actions>
        </v-form>
        
      </v-card-text>
    </v-card>
    </v-flex>
   </v-layout>
 </v-container>
</v-content>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    email: '',
    password: '',
    drawer: null
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin () {
      // use Vuex
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
