<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    app
    :dark="$vuetify.dark"
    v-model="drawer"
    >
    <v-toolbar color="primary darken-1" dark>
      <img src="@/assets/m.png" height="36" alt="Vue Material Admin Template">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Admin</span>
      </v-toolbar-title>         
    </v-toolbar>
    
   <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
       <v-list dense expand>
           <div v-for="(menu,i) in menus" :key="i">
               <v-list-tile :to="menu.link" ripple="ripple" rel="noopener" :key="menu.name">
                    <v-list-tile-action>
                        <v-icon>{{menu.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{menu.title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
           </div>
      </v-list>        
    </vue-perfect-scrollbar>        
  </v-navigation-drawer>
</template>
<script>
// import menu from '@/api/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';


export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    drawer: true,
    scrollSettings: {
      maxScrollbarLength: 160
    },
    menus: [
        {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard',
            link: 'dashboard',
            name: 'dashboard',
        },
        { 
            title: 'Walk-in',
            icon: 'mdi-walk',
            link: '/walkin',
            name: 'walkin',
        },
        { 
            title: 'Courses',
            icon: 'mdi-book-variant',
            link: '/courses',
            name: 'courses',
        },
        {
            title: 'Events',
            icon: 'mdi-calendar-range',
            link: '/events',
            name: 'events',
        },
        {
            title: 'Schedules',
            icon: 'mdi-calendar',
            link: '/schedules',
            name: 'schedules',
        },
        {
            title: 'Attendance',
            icon: 'mdi-clipboard-check',
            link: '/',
            name: 'attendance',
        }
    ]
  }),
  computed: {
    computeGroupActive () {
      return true;
    },
    computeLogo () {
      return '/static/m.png';
    },

    sideToolbarColor () {
      return this.$vuetify.options.extra.sideNav;
    }    
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },
  

  methods: {
    genChildTarget (item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component,
        };
      }
      return { name: `${item.group}/${(subItem.name)}` };
    },
  }
};
</script>


<style lang="stylus">
@import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl'

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto

</style>
