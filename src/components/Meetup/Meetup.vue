<template>
    <v-container>
        <!-- <v-layout v-if="loading">
            <v-flex xs12>
                <v-progress-circular :size="70" :width="7" indeterminate color="purple" v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout> -->
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title primary-title>
                        <div class="headline">{{ meetup.title }}</div>
                        <v-spacer></v-spacer>
                        <edit-meetup-dialog v-if="userIsCreator" :meetup="meetup"></edit-meetup-dialog>
                    </v-card-title>
                        <v-card-media
                        :src="meetup.src"
                        height="400px">
                        </v-card-media>
                        <v-card-text>
                            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
                            <div>{{ meetup.description }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <register-meetup-dialog :meetupId="meetup.id"></register-meetup-dialog>
                        </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (this.userIsAuthenticated) {
        console.log(this.meetup.id)
        return this.$store.getters.user.id === this.meetup.creatorId
      } else {
        return false
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .title {
    bottom: 50px;
    background: rgba(0,0,0,.5);
    color: white;
    padding: 20px;
  }
</style>