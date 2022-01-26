<template>

  <v-app spellcheck="false">

    <v-app-bar app clipped-left clipped-right dense>

      <a href="/" style="display: flex">
        <img src="/icon.png"
        style="width: 24px; height: 24px;
        position: relative; top: 4px"/>

        <Gap width="7px" display="inline-block"/>
          
        <v-app-bar-title style="flex: none; display: flex">
          DeepNotes
        </v-app-bar-title>
      </a>
      
      <v-spacer/>

      <div v-if="!$auth.loggedIn">

        <v-btn depressed
        nuxt to="/login">
          Login
        </v-btn>

      </div>
      
      <div v-else>

        <v-btn depressed
        nuxt to="/account">
          Account
        </v-btn>

        <v-btn depressed
        href="https://pages.deepnotes.app/">
          Go to pages
        </v-btn>

        <v-btn depressed @click="logout">
          Logout
        </v-btn>

      </div>
      
    </v-app-bar>




    <v-main>

      <Nuxt/>

    </v-main>



  </v-app>

</template>

<script>
export default {

  methods: {
    
    logout() {
      this.$auth.logout()
    },

  },

}
</script>

<style>
a {
  text-decoration: none;
}
</style>