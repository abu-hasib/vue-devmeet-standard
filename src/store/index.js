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
        date: '2018-06-10',
        location: 'Madina',
        description: 'Simply awesome'
      },
      {
        src:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Jackson_Hall%2C_Kentucky_State_University.JPG/800px-Jackson_Hall%2C_Kentucky_State_University.JPG',
        id: 'dhi399und003',
        title: 'Meetup in Riyadh',
        date: '2018-06-7',
        location: 'Riyadh',
        description: 'Yes to road trip!'
      }
    ],
    user: {
      id: 'bdof83939',
      registeredMeetups: ['1178dkkkdkd']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetUpSlides.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        src: payload.src,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        id: 'fnokjdkpdpl223'
      }
      commit('createMeetup', meetup)
    }
  },
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
