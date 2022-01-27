<template>
  <div style="padding: 20px">
    <form @submit.prevent="onSubmit">
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