<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title primary-title>
                        <div class="headline">{{ meetup.title }}</div>
                    </v-card-title>
                        <v-card-media
                        :src="meetup.src"
                        height="400px">
                        </v-card-media>
                        <v-card-text>
                            <div class="info--text">{{ meetup.date }} - Where it is going to take place</div>
                            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius officiis, ratione ex iusto, fuga itaque veniam delectus, optio numquam animi ipsam architecto? Odio voluptates totam incidunt delectus ipsa velit blanditiis.</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="success">Register</v-btn>
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
    }
  }
}
</script>
