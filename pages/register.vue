<template>
  <div style="padding: 20px">
    <form @submit.prevent="onSubmit">
      <div style="display: flex">
        <v-text-field
        label="First name"
        id="first-name"
        dense
        outlined
        v-model="loginData.firstName"/>

        <Gap width="20px"/>

        <v-text-field
        label="Last name"
        id="last-name"
        dense
        outlined
        v-model="loginData.lastName"/>
      </div>

      <v-text-field
      label="E-mail"
      id="email"
      dense
      outlined
      v-model="loginData.email"/>
    
      <v-text-field
      label="Password"
      id="password"
      dense
      outlined
      v-model="loginData.password"
      type="password"/>
    
      <v-text-field
      label="Repeat password"
      id="repeat-password"
      dense
      outlined
      v-model="loginData.repeatPassword"
      type="password"/>

      <v-btn
      block
      type="submit">
        Register
      </v-btn>
    </form>
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
      if (this.loginData.password !== this.loginData.repeatPassword) {
        alert('Passwords don\'t match')
        return
      }

      try {
        const response = await this.$axios.post('/auth/register', this.loginData)
      
        alert(response.data.message)

        if (response.data.success)
          this.$router.push('/')
      } catch {
        alert('Failed to contact server.')
      }
    },

  },

}
</script>

<style>

</style>