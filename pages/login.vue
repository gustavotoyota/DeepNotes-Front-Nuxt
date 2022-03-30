<template>
  <v-main>
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
  </v-main>
</template>




<script lang="ts">
export default {
  auth: 'guest',
}
</script>




<script setup lang="ts">
import { HTTPResponse } from '@nuxtjs/auth-next';
import { reactive, useContext } from '@nuxtjs/composition-api'

const ctx = useContext()




// Login

const loginData = reactive({
  email: '',
  password: '',
})




async function onSubmit() {
  try {
    const response = await ctx.$auth.loginWith('local', {
      data: loginData
    }) as HTTPResponse
    
    if (response.data.message)
      alert(response.data.message)
  } catch {
    alert('Failed to contact server.')
  }
}
</script>

<style>

</style>