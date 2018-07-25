<template>
  <v-container fluid text-xs-center grid-list-xl>
    <v-layout row wrap fill-height>

    
    
        <v-flex xs12 v-if="loading">
          <v-progress-circular :size="70" :width="7" indeterminate color="purple" ></v-progress-circular>
        </v-flex>
        
        <v-parallax class="hidden-sm-and-up" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
          <v-flex xs12>
            <div>
              <p class="display-3 font-weight-thin">Work, Work, &amp; no <br> play makes a grumpy dev.</p>
              <p class="headline font-weight-thin font-italic">Share Ideas, Collaborate, Make new Friends, hack together.</p>
            </div>
          </v-flex>
      </v-parallax>
        
        <v-carousel>
          <v-carousel-item
            v-for="slide in slides"
            :src="slide.src"
            :key="slide.id"
            @click="onLoadMeetup(slide.id)"
            reverse-transition="fade"
            transition="fade">
          <div 
            @click="onLoadMeetup(slide.id)" 
            class="title text-xs-right" 
            style="cursor: pointer">
            {{ slide.title }}
          </div>
          </v-carousel-item>
        </v-carousel>
        
        <v-flex class="action-text hidden-xs-only white--text" xs12>
          <div>
            <p class="display-3 font-weight-thin">Work, Work &amp; no play <br> makes a grumpy dev.</p>
            <p class="headline font-weight-thin font-italic">Share Ideas, Collaborate, Make new Friends, hack together.</p>
          </div>
        </v-flex>

      

        <v-flex  class="actions hidden-xs-only" xs12 sm6 md6>
          <v-btn round large router to="/meetups" class="primary"> Explore Meetup </v-btn>
          <v-btn round outline large color="secondary" router to="/meetup/new" class="primary"> Organize Meetups </v-btn>
        </v-flex>

        <v-flex color="" class="hidden-sm-and-up" xs12 sm6 md6>
          <v-btn round large router to="/meetups" class="primary"> Explore Meetup </v-btn>
          <v-btn round outline large color="secondary" router to="/meetup/new" class="primary"> Organize Meetups </v-btn>
        </v-flex>


          <!-- <v-flex xs12 sm4 md2>
            <div class="headline text-xs-left">Join awesome <br> &amp; exciting meetups!</div>
          </v-flex> -->
          <v-layout row wrap class="purple darken-3 white--text p-2">
            <v-flex xs4 sm3 md2>
              <p class="display-1 ">Lagos</p>
            </v-flex>
            <v-flex xs4 sm3 md2>
              <p class="display-1">Jos</p>
            </v-flex>
            <v-flex xs4 sm3 md2>
              <p class="display-1">Abuja</p>
            </v-flex>
            <v-flex xs4 sm3 md2>
              <p class="display-1">Yobe</p>
            </v-flex>
            <v-flex xs4 sm3 md2>
              <p class="display-1">Kano</p>
            </v-flex>
            <v-flex xs4 sm3 md2>
              <p class="display-1">Minna</p>
            </v-flex>
        </v-layout>

      <v-parallax 
        src="https://image.ibb.co/ec1eoo/pencils_452238_1920.jpg"
        height="600"
        class="hidden-xs-only">

          <v-layout row wrap align-center>

          
            <v-flex xs12 sm6 md6>
              <v-card-title primary-title>
                <div>
                  <v-icon size="56px" class="">fas fa-quote-left</v-icon>
                </div>
                <div class="display-3 text-xs-left font-weight-light font-italic">Perhaps my favorite website right now,brings like minds like mine together and we share ideas.</div>
                <div class="text-xs-left">--Adamu Sanni</div>
                <div class="text-xs-left">@codersanthem</div>
              </v-card-title>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-card>
                <v-card-media
                  class="white--text"
                  height="400px"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Agile_Brazil_2014_conference_entrance.jpg">
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">Looking back: Agile Brazil 2014</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
              </v-card>
            </v-flex>
          </v-layout>
      </v-parallax>
      
      <v-parallax 
        src="https://image.ibb.co/ec1eoo/pencils_452238_1920.jpg" class="hidden-sm-and-up"
        height="900">



            <v-flex xs12 sm5 md5>
              <v-card-title primary-title>
                <div>
                  <v-icon size="64px" large class="mb-3">fas fa-quote-left</v-icon>
                </div>
                <div class="display-3 text-xs-left">Perhaps my favorite website right now</div>
                <div class="text-xs-left">--Adamu Sanni</div>
                <div class="text-xs-left">@codersanthem</div>
              </v-card-title>
            </v-flex>

            <v-flex xs12 sm7 md7>
              <v-card>
                <v-card-media
                  class="white--text mt-5"
                  height="350px"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Agile_Brazil_2014_conference_entrance.jpg">
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">Looking back: Agile Brazil 2014</span>
                      </v-flex>
                </v-card-media>
              </v-card>
            </v-flex>
      </v-parallax>
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

<style lang="stylus">
  .title {
    position: absolute;
    bottom: 50px;
    right: 1%;
    background: rgba(0,0,0,.5);
    color: white;
    padding: 20px;
  }
  .action-text {
    position:absolute;
    top: 10%;
    left: 7%;
    z-index: 9999;
    text-align: start;
  }
  .actions {
    position:absolute;
    top: 28%;
    left: 5%;
    z-index: 9999;
  }

  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .5s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
