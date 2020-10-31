<template>
  <div>
    <v-container class="pt-0" grid-list-xl fill-height>
      <v-layout wrap justify-space-between>
        <v-flex xs12 md6>
          <v-form>
            <v-select
              :items="items"
              label="Course *"
              hide-no-data
            >
              <template slot="prepend-item">
                <v-btn flat>
                  <v-icon>mdi-plus</v-icon>
                  New Course
                </v-btn>
              </template>
            </v-select>
            <v-text-field
              label="Season Number *"
              type="number"
            ></v-text-field>

              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Season Start (1st batch orientation) *"
                    prepend-icon="mdi-calendar"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
              </v-menu>

              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date2"
                    label="Season End *"
                    prepend-icon="mdi-calendar"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
              </v-menu>

              <v-text-field
              label="Number of Payment *"
              type="number"
            ></v-text-field>

            <v-text-field
              label="Number of Workshops *"
              type="number"
            ></v-text-field>
          </v-form>
            
        </v-flex>
          
        <v-flex xs12 md6>
          <v-form>

            <v-text-field
              label="Ticket Count *"
              type="number"
            ></v-text-field>

            <v-text-field
              label="Ticket Price *"
              type="number"
            ></v-text-field>

            <v-text-field
              label="Pre-Registration Fee *"
              type="number"
            ></v-text-field>
            <v-divider></v-divider>
            <div class="py-2">
              <p class="title">Total Amount</p>

              <p class="subheading">Cash: P </p>
              <p class="subheading">Instalment: P </p>
            </div>
            <span class="subheading">Color Code (for scheduling purpose)</span>
            <slider-picker v-model="newSeasonColor"></slider-picker>

          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { Slider } from 'vue-color'

export default {
  components: {
    'slider-picker': Slider
  },
  data: () => ({
    colors: {
       hex: '#F5AFC8'
    },
    stepper: 1,
    menu: false,
    menu2: false,
    items: [],
    date: '',
    date2: '',
    openDialog: false
  }), // end of data
  computed: {
    newSeasonColor: {
      get () {
        return this.$store.state.newSeasonColor
      },
      set (v) {
        this.$store.state.newSeasonColor = v
      }
    }
  }
}
</script>
