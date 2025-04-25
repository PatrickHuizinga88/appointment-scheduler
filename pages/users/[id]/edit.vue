<script setup lang="ts">
import type User from "~/types/User";
import {Page} from "../../../components/ui/page";

definePageMeta({
  layout: 'default-sidebar'
})

const { data: user } = await useFetch<User>('/api/users', {
  query: { id: useRoute().params.id }
})
</script>

<template>
  <Page :title="user.name">
    <FormUser v-if="user" :user="user" />
    <p v-else>{{ $t('not_found', {item: $t('users.users')}) }}</p>
  </Page>
</template>
