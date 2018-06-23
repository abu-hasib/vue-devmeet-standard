import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetUpSlides: [
      {
        src:
          'https://www.maxpixel.net/static/photo/1x/Islam-National-Museum-Saudi-Arabia-Riad-Arabia-2376472.jpg',
        id: '1178dkkkdkd',
        title: 'Meetup in Madina',
        date: new Date(),
        location: 'Madina',
        description: 'Simply awesome'
      },
      {
        src:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Jackson_Hall%2C_Kentucky_State_University.JPG/800px-Jackson_Hall%2C_Kentucky_State_University.JPG',
        id: 'dhi399und003',
        title: 'Meetup in Riyadh',
        date: new Date(),
        location: 'Riyadh',
        description: 'Yes to road trip!'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetUpSlides.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
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
    },
    signUserUp ({commit}, payload) {
      // use firebase
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
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
    },
    user (state) {
      return state.user
    }
  }
})
