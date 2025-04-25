<script setup lang="ts">
import {Trash, Pencil} from 'lucide-vue-next'
import {useNotificationStore} from "~/stores/toastStore";
import {Card, CardHeader, CardTitle} from "~/components/ui/card";
import type User from "~/types/User";
import {Page, PageActions, PageBackButton, PageHeader} from "../../../components/ui/page";

definePageMeta({
  layout: 'default-sidebar',
})

const toastStore = useToastStore()
const {t} = useI18n()
const localePath = useLocalePath()

const dialogOpen = ref(false)

// TODO: Get users from Supabase
const {data: user} = await useFetch<User>('/api/users', {
  query: {
    id: useRoute().params.id
  }
})

const deleteUser = async () => {
  try {

    // Delete user

    await navigateTo(localePath('users'))
    toastStore.createToast({
      type: 'success',
      action: 'delete',
      item: user.value?.name || t('users.users'),
    })
  } catch (error) {
    toastStore.createToast({
      type: 'destructive',
      action: 'delete',
      item: user.value?.name || t('users.users'),
    })
    console.error(error)
  }
}
</script>

<template>
  <Page :title="user.name || `${$t('users.users')} ${user.id}`">
    <PageHeader>
      <PageBackButton to="/users" :label="capitalizeSentence($t('common.actions.back_to_ITEM', {item: $t('users.users', 2)}))"/>
      <PageActions>
        <Dialog v-model:open="dialogOpen">
          <DialogTrigger as-child>
            <Button
                variant="outline"
                size="sm"
            >
              <Trash aria-hidden="true"/>
              {{ $t('common.actions.delete') }}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{{
                  capitalizeSentence($t('common.actions.delete_item', {item: $t('users.users')}))
                }}
              </DialogTitle>
              <DialogDescription>
                {{ $t('common.actions.delete_confirmation', {item: $t('users.users')}) }}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                  variant="outline"
                  @click="dialogOpen = false"
              >
                {{ $t('common.actions.cancel') }}
              </Button>
              <Button
                  variant="destructive"
                  @click="deleteUser"
              >
                {{ $t('common.actions.delete') }}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
            size="sm"
            asChild
        >
          <NuxtLink :to="localePath({name: 'users-id-edit', params: {id: user.id}})">
            <Pencil aria-hidden="true"/>
            {{ $t('common.actions.edit') }}
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>{{ $t('users.general_information') }}</CardTitle>
          </CardHeader>
          <dl class="space-y-6">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.name') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.name || '-' }}</dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.email') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{
                  user.email || '-'
                }}
              </dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('users.role') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.role || '-' }}</dd>
            </div>
          </dl>
        </Card>
      </div>
      <div>

      </div>
    </div>

  </Page>
</template>
