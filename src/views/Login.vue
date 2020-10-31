<template>
  <v-app id="login" class="primary" >

    <v-content >
      <v-container fluid fill-height >
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md6 lg4 >
            <v-card class="elevation-10 pa-3" >
              <v-card-text>
                <div class="layout column align-center">
                  <img src="@/assets/m.png" alt="Vue Material Admin" width="100" height="100">
                  <h1 class="flex my-4 primary--text">Maleficent Models Academy</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="mdi-account" name="login" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field append-icon="mdi-onepassword" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="secondary" @click="login" :loading="loading">Login</v-btn>
                <v-btn block color="secondary" @click="logout" >logout test</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'


export default {
  created () {
    //  if (this.isAuthenticated)
    //   this.$router.push('/')
  },
  computed: mapState({
    isAuthenticated: state => state.isAuthenticated
  }),
  data: () => ({
    loading: false,
    email: '',
    password: ''
  }),

  methods: {
    login () {
      this.loading = true
      let self = this

      let username = this.email
      this.$auth.signInWithEmailAndPassword(username, this.password)
        .then(user => {
          var uid = user.user.uid
            self.$bindAsArray('user', this.$database.ref(`users`).orderByKey().equalTo(uid), null, () => {
            self.$ls.set('user', uid)
            self.loading = false
            
            console.log(this.user[0].activated === true, 'is undefined')
            if (typeof this.user[0] !== 'undefined' && this.user[0].activated === true) {
              console.log('authenticated')
              this.$store.state.isAuthenticated = true
              self.$router.replace({ path: '/' })
            } else {
              this.logout()
              // this.$q.notify('Incorrect Email and Password')
              self.$router.push('/login')
            }
          })
         
        })
        .catch(err => {
          console.log(err, 'error occured')
          // this.$q.dialog({
          //   title: 'Error',
          //   message: 'Error Occured'
          // })
          // this.spinner = false
        })
    },
    logout () {
      this.$auth.signOut().then(() => {
        console.log(this.$ls, 'Logout Successfull')
        this.$store.state.userType = ''

        this.$router.push('/login')
        this.$ls.remove('user')
      })
  
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
