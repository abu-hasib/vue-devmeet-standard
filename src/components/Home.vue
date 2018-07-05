<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="primary"> Explore Meetup </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetups/new" class="primary"> Organize Meetups </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
         <v-progress-circular :size="70" :width="7" indeterminate color="purple" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
          v-for="slide in slides"
          :src="slide.src"
          :key="slide.id"
          @click="onLoadMeetup(slide.id)"
          >
          <div @click="onLoadMeetup(slide.id)" class="title text-xs-center" style="cursor: pointer">
            {{ slide.title }}
          </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    slides () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      console.log(id)
      console.log('onLoadMeetup CLicked ', id)
      this.$router.push('/meetups/' + id)
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
