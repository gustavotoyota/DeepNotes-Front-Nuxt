<template>
  <div>
    <form @submit.prevent="onSubmit">
      <PasswordBox
      label="Password"
      id="password"
      dense
      outlined
      v-model="recoveryData.password"/>
    
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
  </div>
</template>

<script>
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

<script setup>
const recoveryData = reactive({
  recoveryCode: useRoute().params.recovery_code,
  newPassword: '',
  repeatPassword: '',
})

async function onSubmit() {
  if (this.recoveryData.repeatPassword !== this.recoveryData.newPassword) {
    alert('Passwords don\'t match.')
    return
  }

  try {
    const response = await this.$axios.post('/auth/recovery/finish', this.recoveryData)
  
    alert(response.data.message)

    if (response.data.success)
      this.$router.push('/')
  } catch {
    alert('Failed to contact server.')
  }
}
</script>

<style>

</style>