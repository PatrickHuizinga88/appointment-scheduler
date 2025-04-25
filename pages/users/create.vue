<script setup lang="ts">
import {Page} from "../../components/ui/page";

definePageMeta({
  layout: 'default-sidebar'
})
</script>

<template>
  <Page :title="$t('common.general.new', {item: lowercase($t('users.users'))})">
    <FormUser />
  </Page>
</template>