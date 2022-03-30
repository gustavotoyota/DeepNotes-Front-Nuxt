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
      
        <PasswordBox
        label="Repeat password"
        id="repeat-password"
        dense
        outlined
        v-model="loginData.repeatPassword"/>

        <v-btn
        block
        type="submit">
          Register
        </v-btn>
      </form>
    </div>
  </v-main>
</template>




<script lang="ts">
export default {
  auth: 'guest',
}
</script>




<script setup lang="ts">
import { reactive, useContext, useRouter } from '@nuxtjs/composition-api';

const ctx = useContext()




const loginData = reactive({
  email: '',
  password: '',
  repeatPassword: '',
})




async function onSubmit() {
  if (loginData.password !== loginData.repeatPassword) {
    alert('Passwords don\'t match')
    return
  }

  try {
    const response = await ctx.$axios.post('/auth/register', loginData)
  
    alert(response.data.message)

    if (response.data.success)
      useRouter().push('/')
  } catch {
    alert('Failed to contact server.')
  }
}
</script>

<style>

</style>