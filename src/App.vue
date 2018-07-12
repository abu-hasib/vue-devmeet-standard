<template>
  <v-app>

    <v-toolbar class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">Hangouts</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
        v-for="item in menuItems"
        :key="item.title"
        class="hidden-xs-only"
        :to="item.link"
        flat>
          <v-icon left>{{ item.icon }}</v-icon> {{ item.title }}
        </v-btn>
        <v-btn 
        v-if="isAuthenticated"
        class="hidden-xs-only"
        flat
        @click="logout">
          <v-icon left>exit_to_app</v-icon> Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      :mini-variant="mini"
      dark
      absolute>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>



    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {
          icon: 'vpn_key', title: 'Sign up', link: '/signup'
        },
        {
          icon: 'lock_open', title: 'Sign in', link: 'signin'
        }
      ]
      if (this.isAuthenticated) {
        menuItems = [
          {
            icon: 'supervisor_account', title: 'Meetups', link: '/meetups'
          },
          {
            icon: 'explore', title: 'Organize', link: '/meetup/new'
          },
          {
            icon: 'perm_identity', title: 'Profile', link: '/profile'
          }
        ]
      }
      return menuItems
    },
    isAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  name: 'App'
}
</script>
