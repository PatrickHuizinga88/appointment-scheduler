<script setup lang="ts">
import {PlusCircle} from 'lucide-vue-next'
import type {Database} from "~/types/database.types";
import {Page, PageActions, PageHeader} from "../../components/ui/page";
import {SkeletonTable} from "~/components/ui/skeleton";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

definePageMeta({
  layout: 'default-sidebar',
})

const supabase = useSupabaseClient<Database>()
const toastStore = useToastStore()
const {t} = useI18n()
const localePath = useLocalePath()

const searchQuery = ref('')
const startRange = ref(0)
const endRange = ref(8)

const nextPage = () => {
  startRange.value = endRange.value
  endRange.value += 8
}

const previousPage = () => {
  startRange.value -= 8
  endRange.value -= 8
}

const currentPage = computed(() => Math.ceil(endRange.value / 8))
const totalPages = computed(() => Math.ceil((customers.value?.count ?? 0) / 8))

const {data: customers, status} = await useLazyAsyncData(async () => {
  try {
    const {count, data, error} = await supabase
        .from('customers')
        .select('*', {count: 'exact'})
        .order('created_at', {ascending: false})
        .ilike('last_name', `%${searchQuery.value}%`)
        .range(startRange.value, endRange.value)
    if (error) throw error
    return {
      data,
      count
    }
  } catch (error) {
    toastStore.createToast({
      type: 'destructive',
      action: 'retrieve',
      item: t('customers.customers', 2)
    })
    console.error(error)
  }
}, {
  watch: [startRange, searchQuery]
})
</script>

<template>
  <Page :title="$t('customers.customers', 2)">
    <PageHeader>
      <Input
          v-model="searchQuery"
          :placeholder="$t('common.general.search')"
          class="h-9 w-64"/>
      <PageActions>
        <Button size="sm" as-child>
          <NuxtLinkLocale to="customers-create">
            <PlusCircle/>
            {{ capitalizeSentence($t('common.actions.add_item', {item: $t('customers.customers')})) }}
          </NuxtLinkLocale>
        </Button>
      </PageActions>
    </PageHeader>

    <div v-if="customers?.data.length" class="flow-root">
      <div class="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow-md shadow-black/5 border border-border sm:rounded-2xl">
            <table class="min-w-full divide-y divide-border">
              <thead class="bg-muted">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                  {{ $t('common.general.name') }}
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">{{
                    $t('common.general.email')
                  }}
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">{{ $t('common.actions.actions') }}</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-border bg-card">
              <tr v-for="customer in customers.data" :key="customer.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <NuxtLink :to="localePath({name: 'customers-id', params: {id: customer.id}})">
                    <template v-if="customer.first_name || customer.last_name">
                      {{ customer.first_name + ' ' + customer.last_name }}
                    </template>
                    <template v-else>-</template>
                  </NuxtLink>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  <a :href="`mailto:${customer.email}`">{{ customer.email || '-' }}</a>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <NuxtLink :to="localePath({name: 'customers-id-edit', params: {id: customer.id}})" class="text-primary hover:underline">
                    {{ $t('common.actions.edit') }}<span
                      class="sr-only">, {{ customer.first_name + ' ' + customer.last_name }}</span>
                  </NuxtLink>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-x-6 mt-4">
        <div class="text-sm text-muted-foreground">
          {{ `${$t('common.pagination.page')} ${currentPage} ${$t('common.pagination.of')} ${totalPages}` }}
        </div>
        <Pagination :total="customers.count || 0" :items-per-page="8" show-edges>
          <PaginationList class="flex items-center gap-2">
            <PaginationPrev @click="previousPage"/>
            <PaginationNext @click="nextPage"/>
          </PaginationList>
        </Pagination>
      </div>
    </div>
    <template v-else-if="status === 'pending'">
      <SkeletonTable :columns="2"/>
    </template>
    <div v-else class="w-full text-center">{{
        $t('common.general.no_records_found', {item: lowercase($t('customers.customers', 2))})
      }}
    </div>
  </Page>
</template>
