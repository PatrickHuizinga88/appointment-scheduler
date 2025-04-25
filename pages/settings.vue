<script setup lang="ts">
import {Page} from "../components/ui/page";

definePageMeta({
  layout: 'default-sidebar'
})
</script>

<template>
  <Page :title="$t('settings.settings', 2)">
    <FormSettings/>
  </Page>
</template>
