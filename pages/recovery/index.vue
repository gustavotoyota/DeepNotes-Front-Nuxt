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

<script>
export default {
  auth: 'guest',
}
</script>

<script setup>
const email = ref('')

async function onSubmit() {
  try {
    const response = await this.$axios.post('/auth/recovery/request', {
      email: this.email
    })
  
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