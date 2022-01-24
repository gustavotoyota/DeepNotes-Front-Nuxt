<template>
  <div>
    <div>E-mail confirmed successfully.</div>
    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>

<script>
export default {
  auth: 'guest',

  async validate(ctx) {
    const response = await ctx.$axios.post('/auth/email-confirmation', {
      emailConfirmationCode: ctx.route.params.email_confirmation_code
    })

    if (response.data.success) {
      await ctx.$auth.fetchUser()
      await ctx.$auth.refreshTokens()
    }

    return response.data.success
  },
}
</script>

<style>

</style>