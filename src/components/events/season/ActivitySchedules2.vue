<template>
  <div>
    <v-container fluid fill-height grid-list-lg align-center>
      <v-layout row wrap align-content-center justify-space-around>
        <!-- orientation -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Orientation</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 ">
              <v-form>
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
                      label="Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                </v-menu>

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        <!-- payment -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Payments</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 pr-0">
              <v-form>
                <span class="subheading font-weight-bold">Season Rate: P10000</span>
                <div class="red--text">Missing Amount: P 2000</div>
                <div class="blue--text">Exceed Amount: P 2000</div>
                <v-container fluid grid-list-md>
                  <v-layout justify-space-around align-center row wrap v-for="n in 3" :key="n"  class="mr-0">
                    
                  <v-flex xs12 class="pb-0 pt-0 pl-0 ma-0" >
                    <v-card tile flat>
                      
                      <v-card-text class="pl-0 pb-0 pr-0 ma-0">

                        <v-layout row wrap align-center justify-space-between class="pb-0">
                          <v-flex xs4 md6 class="pl-0 pr-1">
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
                                  :label="`Payment ${n}`"
                                  prepend-icon="mdi-calendar"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                            </v-menu>
                          </v-flex>

                          <v-flex xs6 md6>
                             <v-text-field
                              label="Amount"
                              type="number"
                              prefix="P"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        

                       
                      </v-card-text>
                    </v-card>
                   
                  </v-flex>

                </v-layout>
                </v-container>
                
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>

        <!-- photoshoot -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Photoshoot</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-form>
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
                      label="Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                </v-menu>

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        <!-- photoliking -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Photoliking</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-form>
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
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
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
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                </v-menu>

              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        <!-- workshops -->
        <v-flex xs12 md12 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Workshops</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-layout row wrap justify-center align-content-space-around>
                <v-flex xs12 md3 v-for="n in 4" :key="n">
                  <span>Workshop {{n}}</span>
                    <v-form>
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
                            label="Date"
                            prepend-icon="mdi-calendar"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                      </v-menu>

                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="time"
                            label="Time"
                            prepend-icon="mdi-clock"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="time"
                          full-width
                          @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                      </v-menu>
                        <v-divider></v-divider>
                      <v-select
                        class="pb-2"
                        :items="items"
                        label="Location"
                        hint="Quezon city"
                        persistent-hint
                      >
                        <template slot="prepend-item">
                          <v-btn flat>

                            <v-icon>mdi-plus</v-icon>
                            New Location
                          </v-btn>
                        </template>
                      </v-select>

                      <v-textarea
                        name="input-7-1"
                        label="Description"
                        value="The Woodman set to work at "
                      ></v-textarea>
                    </v-form>

                </v-flex>

              </v-layout>
              
              


            </v-card-text>
          </v-card>

        </v-flex>


        <!-- other activities -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">General Rehersal</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 ">
              <v-form>
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
                      label="Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                </v-menu>

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Orderly</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-form>
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
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
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
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                </v-menu>

              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>

        <!-- final event -->
        <v-flex xs12 md3 >
          <v-card class="pa-1">
            <v-card-title>
              <span class="title">Final Event</span>
            </v-card-title>
            <v-card-text class="pt-0 pb-0 ">
              <v-form>
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
                      label="Date"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" @input="menu = false"></v-date-picker>
                </v-menu>

                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      label="Time"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
                  <v-divider></v-divider>
                 <v-select
                  class="pb-2"
                  :items="items"
                  label="Location"
                  hint="Quezon city"
                  persistent-hint
                >
                  <template slot="prepend-item">
                    <v-btn flat>  

                      <v-icon>mdi-plus</v-icon>
                      New Location
                    </v-btn>
                  </template>
                </v-select>

                 <v-textarea
                  name="input-7-1"
                  label="Description"
                  value="The Woodman set to work at "
                ></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-flex>


      </v-layout>

    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    date2: '',
    menu: false,
    menu2: false,
    time: '',
    items: []
  })
}
</script>
