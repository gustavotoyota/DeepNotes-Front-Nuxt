<template>
  <div>
    <NuxtLink to="/">Back</NuxtLink>

    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">E-mail:</label>
        <input v-model="email" id="email" type="text"/>
      </div>

      <input type="submit" value="Send recovery link"/>
    </form>
  </div>
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