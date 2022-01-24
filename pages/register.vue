<template>
  <div>
    <NuxtLink to="/">Back</NuxtLink>

    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">E-mail:</label>
        <input v-model="loginData.email" id="email" type="text"/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="loginData.password" ref="password" id="password" type="password"/>
      </div>

      <input type="submit" value="Register"/>
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