<template>
  <div id="page-events">
    <v-layout row class="align-center layout px-4 pt-3 app--page-header">
        <div>
          <h2 class="pr-3">{{$route.name}}</h2>
        </div>
      <!-- <v-btn @click="test">
        test
      </v-btn> -->
      <v-icon>mdi-home-outline</v-icon>
      <v-breadcrumbs large :items="breadCrumbs" divider=">"></v-breadcrumbs>
      <v-spacer></v-spacer>
      
    </v-layout>

    <router-view></router-view>
    
  </div>
  
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Home',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Events',
        disabled: false,
        to: '/events'
      }
    ],
  }), // end of data
  computed: {
    breadCrumbs () {
      if (this.$route.name === 'Batches') {
        console.log('bread', breadCrumbs) 
        let breadCrumbs = [
          {
            text: 'Home',
            to: '/dashboard',
            exact: true
          },
          {
            text: 'Events',
            to: '/events',
            exact: true
          },
          {
            text: 'Seasons',
            to: '/events/seasons',
            exact: true
          },
          {
            text: 'Batches',
            to: '/events/seasons/batches',
            exact: true
          }
        ]
        return breadCrumbs
      } else {
        let breadCrumbs = [
          {
            text: 'Home',
            to: '/dashboard',
            exact: true
          }
        ]
        this.$route.matched.forEach(item => {
            breadCrumbs.push({
              text: item.name,
              to: item.path,
              exact: true
            })
        })
        return this.$_.uniqBy(breadCrumbs, d => {
          return d.to
        })
      }
      
      
      // if (this.$route.name === 'Batches') {
      //   breadCrumbs.push({
      //     text: 'Seasons',
      //     to: '/events/seasons',
      //     exact: true
      //   }, 1, 1)
      // }
      
      
    }
  },
  methods: {
    test () {
      console.log(this.$route, 'route')
      console.log(this.breadCrumbs, 'breadCrumbs')
    }
  }
}
</script>

