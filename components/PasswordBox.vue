<template>

  <v-text-field
  v-bind="$attrs" v-on="$listeners"
  :type="showPassword ? 'text' : 'password'"
  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
  @click:append="() => (showPassword = !showPassword)">
    <slot/>
  </v-text-field>

</template>

<script setup lang="ts">
import { ref } from '@nuxtjs/composition-api'

const showPassword = ref(false)
</script>

<style>

</style>