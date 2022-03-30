<template>
  <div style="display: contents">
    <v-navigation-drawer
    clipped
    app
    permanent>

      <v-list>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Profile
          </v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-shield</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Security
          </v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Settings
          </v-list-item-title>
        </v-list-item>
        
      </v-list>

    </v-navigation-drawer>


    <v-main>
      <div style="padding: 32px">
        <div v-if="authUser.newEmail">
          Unconfirmed e-mail: {{ authUser.newEmail }}
          <v-btn @click="resendEmailLink">Resend link</v-btn>
          <v-btn @click="cancelEmailChange">Cancel change</v-btn>
        </div>
        <div>E-mail: {{ authUser.email }} <v-btn @click="changeEmail">Change e-mail</v-btn></div>
        <div>Password: ******** <v-btn @click="changePassword">Change password</v-btn></div>
      </div>
    </v-main>
  </div>
</template>




<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api';




const ctx = useContext()

const authUser = (ctx.$auth.user ? ctx.$auth.user : {})




async function resendEmailLink() {
  const response = await ctx.$axios.post('/api/user/email-change/request', {
    email: authUser.newEmail,
  })

  alert(response.data.message)
}
async function cancelEmailChange() {
  if (!confirm('Are you sure you want to cancel the e-mail change request?'))
    return
  
  const response = await ctx.$axios.post('/api/user/email-change/cancel')

  alert(response.data.message)

  await ctx.$auth.fetchUser()
}

async function changeEmail() {
  const newEmail = prompt('E-mail:', authUser.email as string)
  if (!newEmail)
    return

  const response = await ctx.$axios.post('/api/user/email-change/request', {
    email: newEmail,
  })

  alert(response.data.message)

  await ctx.$auth.fetchUser()
}

async function changePassword() {
  const passwords = {} as any

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


  

  const response = await ctx.$axios.post('/api/user/password-change', passwords)

  alert(response.data.message)
}
</script>




<style>

</style>