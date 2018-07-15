<template>
  <v-dialog
    v-model="dialog"
    max-width="290">

    <v-btn
      slot="activator"
      color="secondary"
      dark>
        {{ registerStatus }}
    </v-btn>

    <v-card>
      <v-layout row wrap>
        <v-flex xs12>

          <v-card-title class="headline" v-if="userIsRegistered">Unregister for meetup?</v-card-title>
          <v-card-title class="headline" v-else> Register for meetup?</v-card-title>
          
          <v-card-text>
            You can always change your decision at any time.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              flat="flat"
              @click="dialog = false">
              Cancel
            </v-btn>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="onConfirm">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  props: ['meetupId'],
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    },
    registerStatus () {
      return this.userIsRegistered ? 'Unregister' : 'Register'
    }
  },
  methods: {
    onConfirm () {
      this.dialog = false
      if (!this.userIsRegistered) {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      } else {
        this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>
