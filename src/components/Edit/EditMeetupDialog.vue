<template>
  <v-dialog max-width="500px" v-model="dialog" persistent>
     <v-btn slot="activator" fab color="secondary">
       <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title
                class="headline grey lighten-2"
                primary-title>
                Edit Meetup
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                v-model="editedTitle"
                label="Title"
                id="title"
                required></v-text-field>
              </v-card-text>
              <v-card-text>
                <v-text-field
                v-model="editedDescription"
                label="Description"
                id="description"
                multi-line
                required></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click="onSaveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>  
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.dialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>
