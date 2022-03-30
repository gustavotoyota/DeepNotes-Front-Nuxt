<template>
  <v-main>
    <div>E-mail confirmed successfully.</div>
    <NuxtLink to="/">Back</NuxtLink>
  </v-main>
</template>




<script lang="ts">
import { Context } from "@nuxt/types"




export default {
  auth: false,

  async validate(ctx: Context) {
    const response = await ctx.$axios.post('/auth/email-confirmation', {
      emailConfirmationCode: ctx.route.params.email_confirmation_code
    })

    if (response.data.success)
      await ctx.$auth.fetchUser()

    return response.data.success
  },
}
</script>




<style>

</style>