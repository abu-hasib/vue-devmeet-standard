<template>
  <v-content>

    <v-container fluid fill-height>
      <v-layout align-center justify-center mt-5 mb-5>
        <v-flex xs12 sm8 md4>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <app-alert @dismissed="onDismissed" v-if="error" :text="error.message"></app-alert>
            </v-flex>
          </v-layout>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Hangouts</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form                 @submit.prevent="onSignup">
                <v-text-field
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  v-model="email"
                  required></v-text-field>
                <v-text-field
                name="password"
                label="Password"
                id="password"                    
                v-model="password"
                type="password"
                required></v-text-field>
                <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"                    
                v-model="confirmPassword"
                type="password"
                :rules='[comparePasswords]'
                required></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    color="primary"
                    type="submit"
                    :disabled="loading"
                    :loading="loading">
                    Sign up
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
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
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
    onSignup () {
      // use Vuex
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
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
