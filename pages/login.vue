<template>
  <div style="padding: 20px">
    <form @submit.prevent="onSubmit">
      <v-text-field
      label="E-mail"
      id="email"
      dense
      outlined
      v-model="loginData.email"/>
    
      <PasswordBox
      label="Password"
      id="password"
      dense
      outlined
      v-model="loginData.password"/>

      <v-btn
      block
      type="submit">
        Login
      </v-btn>
    </form>

    <Gap height="20px"/>
  
    <div style="display: flex">
      <NuxtLink to="register">Register</NuxtLink>

      <v-spacer/>

      <NuxtLink to="recovery">Forgot my password</NuxtLink>
    </div>
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