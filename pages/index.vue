<template>
  <div>
    <div v-if="!$auth.loggedIn">
      <NuxtLink to="login" append>Login</NuxtLink>
    </div>
    
    <div v-if="$auth.loggedIn">
      <div><NuxtLink to="account" append>Account</NuxtLink></div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {

  auth: false,

  methods: {
    
    logout() {
      this.$auth.logout()
    },

  },

}
</script>

<style>

</style>