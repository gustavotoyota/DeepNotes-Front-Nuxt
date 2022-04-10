<template>

  <v-app v-show="mounted"
  spellcheck="false">

    <v-app-bar app
    clipped-left clipped-right>

      <a href="/" style="display: flex">
        <img src="/icon.png"
        style="width: 24px; height: 24px;
        position: relative; top: 4px"/>

        <Gap width="7px" inline-block/>
          
        <v-app-bar-title
        style="display: flex;
        color: white">
          DeepNotes
        </v-app-bar-title>
      </a>

      <Gap width="16px" inline-block/>
      
      <v-spacer/>

      <v-btn depressed
      nuxt to="/">
        Home
      </v-btn>

      <client-only>
        <div v-if="!$auth.loggedIn"
        style="display: flex">

          <v-btn depressed
          nuxt to="/login">
            Login
          </v-btn>

          <v-btn depressed
          nuxt to="/register">
            Sign up
          </v-btn>

        </div>
        
        <div v-else
        style="display: flex">

          <v-btn depressed
          nuxt to="/account">
            Account
          </v-btn>

          <v-btn depressed
          :href="ctx.isDev ? 'http://localhost:24579' : 'https://pages.deepnotes.app/'">
            Pages
          </v-btn>

          <v-btn depressed
          @click="$auth.logout()">
            Logout
          </v-btn>

        </div>
      </client-only>
      
    </v-app-bar>




    <Nuxt/>
    



    <v-footer
    height="180"
    app
    dark
    absolute
    padless>
      <v-card
      flat
      tile
      class="fill-height 
      indigo lighten-1
      white--text text-center">
        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>


  </v-app>

</template>

<script setup lang="ts">
import { ref, onMounted, useContext } from '@nuxtjs/composition-api'

const ctx = useContext()




const mounted = ref(false)




onMounted(() => {
  mounted.value = true
})
</script>

<style>
html {
  overflow: auto;
}

a {
  text-decoration: none;
}
</style>