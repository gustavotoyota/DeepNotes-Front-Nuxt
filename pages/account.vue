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

<script setup>
async function resendEmailLink() {
  const response = await this.$axios.post('/api/users/email-change/request', {
    email: this.$auth.user.newEmail,
  })

  alert(response.data.message)
}
async function cancelEmailChange() {
  if (!confirm('Are you sure you want to cancel the e-mail change request?'))
    return
  
  const response = await this.$axios.post('/api/users/email-change/cancel')

  alert(response.data.message)

  await this.$auth.fetchUser()
}

async function changeEmail() {
  const newEmail = prompt('E-mail:', this.$auth.user.email)
  if (!newEmail)
    return

  const response = await this.$axios.post('/api/users/email-change/request', {
    email: newEmail,
  })

  alert(response.data.message)

  await this.$auth.fetchUser()
}

async function changePassword() {
  const passwords = {}

  passwords.newPassword = prompt('New password:', '')
  if (!passwords.newPassword)
    return

  passwords.repeatPassword = prompt('Repeat password:', '')
  if (!passwords.repeatPassword)
    return

    


  if (passwords.newPassword !== passwords.repeatPassword) {
    alert('Passwords don\'t match.')
    return
  }


  

  const response = await this.$axios.post('/api/users/password-change', passwords)

  alert(response.data.message)
}
</script>

<style>

</style>