<template>
  <v-app app>
    <template v-if="true">
      <v-content>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <app-drawer class="app--drawer"></app-drawer>
        <div>
          <router-view></router-view>
        </div>
      </v-content>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <login></login>
          <!-- <router-view :key="$route.fullpath"></router-view> -->
        </keep-alive>
      </transition>
    </template>
     <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>    
  </v-app>
</template>

<script>
import Login from '@/views/Login.vue'
import AppToolbar from '@/components/AppToolbar';
import AppDrawer from '@/components/AppDrawer';
import AppEvents from  './event';


export default {
  name: 'App',
  components: {
    AppToolbar,
    AppDrawer,
    AppEvents,
    Login
  },
  created () {
    window.getApp = this;
    // if (this.$ls.get('user')) {
    //   console.log('has user')
    //   this.isAuthenticated = true
    //   this.$router.push('/')
    // }
    // else {
    //   this.isAuthenticated = false
    //   this.$router.push('/login')
    // }
  },
  computed: {
    isAuthenticated: {
      get () {
        return this.$store.state.isAuthenticated
      },
      set (v) {
        this.$store.state.isAuthenticated = v 
      } 
    }
  },
  data () {
    return {
      snackbar: {
        show: false,
        text: '',
        color: '',
      }
    }
  }
}
</script>
