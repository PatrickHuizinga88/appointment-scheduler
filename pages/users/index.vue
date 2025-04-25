<script setup lang="ts">
import type User from '~/types/User'
import { PlusCircle } from 'lucide-vue-next'
import {Page, PageActions, PageHeader} from "../../components/ui/page";
import {SkeletonTable} from "~/components/ui/skeleton";

definePageMeta({
  layout: 'default-sidebar',
})

const localePath = useLocalePath()

const { data: users, status } = useFetch<User[]>('/api/users')
</script>

<template>
  <Page :title="$t('users.users', 2)">
    <PageHeader class="justify-end">
      <PageActions>
        <Button size="sm" as-child>
          <NuxtLinkLocale to="users-create">
            <PlusCircle/>
            {{capitalizeSentence($t('common.actions.add_item', {item: $t('users.users')}))}}
          </NuxtLinkLocale>
        </Button>
      </PageActions>
    </PageHeader>
    
    <div v-if="users?.length" class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow-md shadow-black/5 border border-border sm:rounded-2xl">
            <table class="min-w-full divide-y divide-border">
              <thead class="bg-muted">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">{{ $t('users.name') }}</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">{{ $t('common.general.email') }}</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">{{ $t('users.role') }}</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">{{ $t('common.actions.edit') }}</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-border bg-card">
              <tr v-for="user in users" :key="user.email">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <NuxtLink :to="localePath({name: 'users-id', params: {id: user.id}})">{{ user.name || '-' }}</NuxtLink>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  <a :href="`mailto:${user.email}`">{{ user.email || '-' }}</a>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{{ user.role || '-' }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <NuxtLinkLocale :to="localePath({name: 'users-id', params: {id: user.id}})" class="text-primary hover:underline">
                    {{ $t('common.actions.edit') }}<span class="sr-only">, {{ user.name }}</span>
                  </NuxtLinkLocale>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <template v-else-if="status === 'pending'">
      <SkeletonTable :columns="3" />
    </template>
    <div v-else class="w-full text-center">{{
        $t('common.general.no_records_found', {item: $t('users.users', 2)})
      }}
    </div>
  </Page>
</template>
