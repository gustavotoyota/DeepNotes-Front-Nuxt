<template>
  <div>
    <div v-if="$auth.user.newEmail">
      Unconfirmed e-mail: {{ $auth.user.newEmail }}
      <v-btn @click="resendEmailLink">Resend link</v-btn>
      <v-btn @click="cancelEmailChange">Cancel change</v-btn>
    </div>
    <div>E-mail: {{ $auth.user.email }} <v-btn @click="changeEmail">Change</v-btn></div>
    <div>Password: ******** <v-btn @click="changePassword">Change</v-btn></div>
  </div>
</template>

<script>
export default {

  methods: {

    async resendEmailLink() {
      const response = await this.$axios.post('/api/users/email-change/request', {
        email: this.$auth.user.newEmail,
      })

      alert(response.data.message)
    },
    async cancelEmailChange() {
      const response = await this.$axios.post('/api/users/email-change/cancel')

      alert(response.data.message)

      await this.$auth.fetchUser()
    },

    async changeEmail() {
      const response = await this.$axios.post('/api/users/email-change/request', {
        email: prompt('E-mail:', this.$auth.user.email),
      })

      alert(response.data.message)

      await this.$auth.fetchUser()
    },

    async changePassword() {
      const passwords = {
        newPassword: prompt('New password:', ''),
        repeatPassword: prompt('Repeat password:', ''),
      }

      if (passwords.newPassword !== passwords.repeatPassword) {
        alert('Passwords don\'t match.')
        return
      }

      const response = await this.$axios.post('/api/users/password-change', passwords)

      alert(response.data.message)
    },

  },

}
</script>

<style>

</style>