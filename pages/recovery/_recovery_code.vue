<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="new-password">New password:</label>
        <input v-model="recoveryData.newPassword" id="new-password" type="password"/>
      </div>
      <div>
        <label for="repeat-password">Repeat password:</label>
        <input v-model="recoveryData.repeatPassword" id="repeat-password" type="password"/>
      </div>
      
      <input type="submit" value="Change password"/>
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


  data() {
    return {
      recoveryData: {
        recoveryCode: this.$route.params.recovery_code,
        newPassword: '',
        repeatPassword: '',
      },
    }
  },


  methods: {

    async onSubmit() {
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
    },

  },
}
</script>

<style>

</style>