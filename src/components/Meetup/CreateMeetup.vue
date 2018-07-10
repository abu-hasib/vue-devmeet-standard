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
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="blue-grey"
            class="white--text"
            @click="onPickFile">
            Upload
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
          <input 
          type="file" 
          name="" 
          id="" 
          style="display: none" 
          ref="inputFile" 
          accept="image/*"
          @change="onFilePicked">
          <v-layout row>
            <v-flex xs12 sm6 mt-4>
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
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm3 mb-2 offset-xs1 offset-lg0>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm3 mb-2 offset-xs1 offset-lg0>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 md12 offset-md0 offset-xs3>
              <v-btn 
              class="primary" 
              :disabled="!formIsValid"
              type="submit">Create Meetup</v-btn>
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
      time: new Date(),
      image: null
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
      if (!this.image) {
        return
      }
      const meetupData = {
        title: this.title,
        src: this.image,
        location: this.location,
        description: this.description,
        date: this.meetupSchedule
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile () {
      this.$refs.inputFile.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a vaild file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.src = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
