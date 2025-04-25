<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {Page} from "../../../components/ui/page";

definePageMeta({
  layout: 'default-sidebar'
})

const supabase = useSupabaseClient<Database>()
const toastStore = useToastStore()
const {t} = useI18n()

const {data: customer} = await useAsyncData(async () => {
  try {
    const {data, error} = await supabase.from('customers').select('*').filter('id', 'eq', useRoute().params.id).single()
    if (error) throw error
    return data
  } catch (error) {
    toastStore.createToast({
      type: 'destructive',
      action: 'retrieve',
      item: t('customers.customers'),
    })
    console.error(error)
  }
})
</script>

<template>
  <Page :title="`${customer.first_name} ${customer.last_name}`">
    <FormCustomer v-if="customer" :customer="customer"/>
    <p v-else>{{ $t('not_found', {item: $t('customers.customers')}) }}</p>
  </Page>
</template>
