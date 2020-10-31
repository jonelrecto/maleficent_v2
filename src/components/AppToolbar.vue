<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-0 pl-3">
      Maleficent Models Academy
    </v-toolbar-title>
      
        <!-- <h4>Maleficent Models Academy</h4> -->
      <v-spacer></v-spacer>

      <!-- <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu> -->
      
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
            <v-avatar size="30px">
            <img src="@/assets/user.png" alt="Michael Wang"/>
            </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>
<script>
// import NotificationList from '@/components/widgets/list/NotificationList';
// import Util from '@/util';
export default {
  name: 'app-toolbar',
  components: {
    // NotificationList
  },
  data: (vue) => ({
    items: [
      {
        icon: 'mdi-account',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'mdi-settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'mdi-logout',
        href: '#',
        title: 'Logout',
        click: (e) => {
          // console.log(a, 'log')
          // window.getApp.$emit('APP_LOGOUT');
          vue.logout()
        }
      }
    ],
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    logout () {
      this.$auth.signOut().then(() => {
          console.log(this.$ls, 'Logout Successfull')
          this.$store.state.userType = ''
          this.$ls.remove('user')
          this.$store.state.isAuthenticated = false
          this.$router.push('/login')
          // this.snackbar = {
          //   show: true,
          //   color: 'green',
          //   text: 'Logout successfully.'
          // };
          // this.$router.replace({ path: '/login' });
        })
    }
  }
};
</script>
