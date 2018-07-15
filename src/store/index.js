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
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserForMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    createMeetup (state, payload) {
      state.loadedMeetUpSlides.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetUpSlides.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      if (payload.location) {
        meetup.location = payload.location
      }
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
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
      .push(payload)
      .then(data => {
        commit('setLoading', false)
        commit('registerUserForMeetup', {id: payload, fbKey: data.key})
      })
      .catch(error => {
        commit('setLoading', false)
        console.error(error)
      })
    },
    unregisterUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
      .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unregisterUserForMeetup', payload)
      }).catch(error => {
        commit('setLoading', false)
        console.error(error)
      })
    },
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then((meetup) => {
        commit('setLoading', false)
        const meetups = []
        const obj = meetup.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            src: obj[key].imageUrl,
            location: obj[key].location,
            date: obj[key].date,
            creatorId: obj[key].creatorId
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
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let key
      let imageUrl
      firebase.database().ref('meetups').push(meetup)
      .then((createdMeetup) => {
        console.log(createdMeetup)
        key = createdMeetup.key
        return key
      })
      .then(key => {
        const filename = payload.src.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.src)
      }).then(fileData => {
        console.log('Image data: ', fileData.ref.getDownloadURL())
        // imageUrl = fileData.getMetadata().downloadURLs[0]
        fileData.ref.getDownloadURL().then(function (downloadURL) {
          imageUrl = downloadURL
          console.log('File available at', downloadURL)
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
      })
      .then(() => {
        commit('createMeetup', {
          ...meetup,
          src: imageUrl,
          id: key
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      }).catch(error => {
        console.error(error)
        commit('setLoading', false)
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
            registeredMeetups: [],
            fbKeys: {}
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
            registeredMeetups: [],
            fbKeys: {}
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
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      })
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
