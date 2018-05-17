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
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
          v-for="(slide, id) in slides"
          :src="slide.src"
          :key="id">
          <div class="title text-xs-center">
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
  data () {
    return {
      slides: [
        {
          src: 'https://www.maxpixel.net/static/photo/1x/Islam-National-Museum-Saudi-Arabia-Riad-Arabia-2376472.jpg',
          id: 'nfof23hbhek',
          title: 'Meetup in Madina'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2017/04/03/04/48/riyadh-2197496_960_720.jpg',
          id: 'dhi399und003',
          title: 'Meetup in Riyadh'
        }
      ]
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
