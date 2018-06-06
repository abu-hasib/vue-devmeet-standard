<template>
  <v-container>
    <v-layout row  mb-2>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Create New Meetup</h1>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-form ref="form" @submit.prevent="onCreateMeetup">
          <v-text-field
          v-model="title"
          label="Title"
          id="title"
          required
          ></v-text-field>
          <v-text-field
          v-model="location"
          label="Location"
          id="location"
          required
          ></v-text-field>
          <v-text-field
          v-model="src"
          label="Image URL"
          id="src"
          required
          ></v-text-field>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="src" alt="" height="180px">
            </v-flex>
          </v-layout>
          <v-text-field
          v-model="description"
          label="Description"
          id="description"
          multi-line
          required
          ></v-text-field>
          <v-layout row mb-2>
            <v-flex xs12 class="text-md-left text-xs-center">
              <h2>Choose a Date and Time</h2>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm3 mb-2 offset-xs1 offset-lg0>
              <v-date-picker v-model="date"></v-date-picker>
              <p> {{date}} </p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm3 mb-2 offset-xs1 offset-lg0>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
              <p> {{time}} </p>              
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 md12 offset-md0 offset-xs3>
              <v-btn 
              class="primary" 
              :disabled="!formIsValid"
              type="submit">Create Meetup</v-btn>
              {{meetupSchedule}}
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      src: '',
      description: '',
      date: null, // always set date to null
      time: new Date()
    }
  },
  computed: {
    formIsValid () {
      return this.name !== '' && this.location !== '' && this.src !== '' && this.description !== ''
    },
    meetupSchedule () {
      const date = new Date(this.date)
      if (Object.prototype.toString.call(this.time) === '[object String]') {
        const hours = this.time.match(/^(\d+)/)[1]
        const mins = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(mins)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
        console.log(typeof this.time)
      }
      console.log(date)
      return date
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        src: this.src,
        location: this.location,
        description: this.description,
        date: this.meetupSchedule
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>
