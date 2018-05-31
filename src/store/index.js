import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetUpSlides: [
      {
        src:
          'https://www.maxpixel.net/static/photo/1x/Islam-National-Museum-Saudi-Arabia-Riad-Arabia-2376472.jpg',
        id: '1178dkkkdkd',
        title: 'Meetup in Madina',
        date: '2018-06-10'
      },
      {
        src:
          'https://cdn.pixabay.com/photo/2017/04/03/04/48/riyadh-2197496_960_720.jpg',
        id: 'dhi399und003',
        title: 'Meetup in Riyadh',
        date: '2018-06-7'
      }
    ],
    user: {
      id: 'bdof83939',
      registeredMeetups: ['1178dkkkdkd']
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetUpSlides.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return meetupId => {
        return state.loadedMeetUpSlides.find(meetup => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
