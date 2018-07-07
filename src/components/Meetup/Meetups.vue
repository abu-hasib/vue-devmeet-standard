<template>
    <v-container>
        <v-layout wrap row>
            <v-flex xs12>
                <v-card class="info mb-2" 
                v-for="meetup in meetups" 
                :key="meetup.id">
                    <v-container fluid="">
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                :src="meetup.src"
                                height="130px">
                                </v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline white--text">{{ meetup.title }}</div>
                                        <div>{{ meetup.date | date }}</div>
                                    </div>
                                </v-card-title>
                                <v-actions>
                                    <v-btn flat :to="'/meetup/' + meetup.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
