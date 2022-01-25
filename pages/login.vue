<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">E-mail:</label>
        <input v-model="loginData.email" id="email" type="text"/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="loginData.password" ref="password" id="password" type="password"/>
      </div>

      <input type="submit" value="Login"/>
    </form>
  
    <div><NuxtLink to="register">Register</NuxtLink></div>
    <div><NuxtLink to="recovery">Forgot my password</NuxtLink></div>
  </div>
</template>

<script>
export default {

  auth: 'guest',
  
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      }
    }
  },

  methods: {

    async onSubmit() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.loginData
        })
        
        if (response.data.message)
          alert(response.data.message)
      } catch {
        alert('Failed to contact server.')
      }
    },

    logout() {
      this.$auth.logout()
    },

  },
}
</script>

<style>

</style>