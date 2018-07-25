<template>
  <v-app id="inspire">

    
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
          v-if="isAuthenticated"
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

    <v-toolbar class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">Hangout</router-link>
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

    <v-content>
      <main>
          <router-view></router-view>
      </main>
      <v-footer
      dark
      height="auto">
        <v-card
          flat
          tile
          class="secondary white--text text-xs-center">
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-3 white--text"
              icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            &copy;2018 — <strong>Hangout</strong>
          </v-card-text>
        </v-card>
      </v-footer>

    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      mini: false,
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
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

<style>
  #inspire {
    height: 100vh;
  }
</style>
