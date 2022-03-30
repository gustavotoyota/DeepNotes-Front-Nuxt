<template>
  <v-main>
    <form @submit.prevent="onSubmit">
      <v-text-field
      label="E-mail"
      id="email"
      dense
      outlined
      v-model="email"/>

      <v-btn
      block
      type="submit">
        Send recovery link
      </v-btn>
    </form>
  </v-main>
</template>




<script lang="ts">
export default {
  auth: 'guest',
}
</script>




<script setup lang="ts">
import { ref, useContext, useRouter } from '@nuxtjs/composition-api'

const ctx = useContext()




const email = ref('')




async function onSubmit() {
  try {
    const response = await ctx.$axios.post('/auth/recovery/request', {
      email: email.value
    })
  
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