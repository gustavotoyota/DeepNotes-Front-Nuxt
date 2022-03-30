<template>
  <v-main>
    <form @submit.prevent="onSubmit">
      <PasswordBox
      label="Password"
      id="password"
      dense
      outlined
      v-model="recoveryData.newPassword"/>
    
      <PasswordBox
      label="Repeat password"
      id="repeat-password"
      dense
      outlined
      v-model="recoveryData.repeatPassword"/>
      
      <v-btn
      block
      type="submit">
        Change password
      </v-btn>
    </form>
  </v-main>
</template>




<script lang="ts">
export default {
  auth: 'guest',

  async validate(ctx) {
    const response = await ctx.$axios.post('/auth/recovery/validate', {
      recoveryCode: ctx.route.params.recovery_code
    })

    return response.data.success
  },
}
</script>




<script setup lang="ts">
import { reactive, useContext, useRoute, useRouter } from '@nuxtjs/composition-api';

const ctx = useContext()




const recoveryData = reactive({
  recoveryCode: useRoute().value.params.recovery_code,
  newPassword: '',
  repeatPassword: '',
})




async function onSubmit() {
  if (recoveryData.repeatPassword !== recoveryData.newPassword) {
    alert('Passwords don\'t match.')
    return
  }

  try {
    const response = await ctx.$axios.post('/auth/recovery/finish', recoveryData)
  
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