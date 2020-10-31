<template>
  <div>
    <v-tabs  slider-color="secondary" color="accent" fixed-tabs>
      <v-tab
        dark
        v-for="n in 3"
        :key="n"
      >

        Item {{n}}

      </v-tab>

    </v-tabs>


    <v-container fill-height grid-list-md >
      <v-layout class="row">
        schedules
      </v-layout>
    </v-container>
  </div>
</template>
