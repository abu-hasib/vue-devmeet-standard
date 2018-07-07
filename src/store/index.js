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
    user: null,
    loading: false,
    error: false
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetUpSlides.push(payload)
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetUpSlides = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then((meetup) => {
        commit('setLoading', false)
        const meetups = []
        const obj = meetup.val()
        for (let key in obj) {
          meetups.push({
            id: obj[key].creatorId,
            title: obj[key].title,
            description: obj[key].description,
            src: obj[key].src,
            date: obj[key].date
          })
        }
        commit('setLoadedMeetups', meetups)
      })
      .catch((error) => {
        commit('setLoading', false)
        console.log(error)
      })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        src: payload.src,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
      .then((createdMeetup) => {
        console.log(createdMeetup)
        const key = createdMeetup.key
        commit('createMeetup', {
          ...meetup,
          id: key
        }
      )
      }).catch((err) => {
        console.log(err)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      // use firebase
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
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
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
