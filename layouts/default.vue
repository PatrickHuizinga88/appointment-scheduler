<script setup lang="ts">
import {Settings, LogOut} from 'lucide-vue-next'
import Toaster from "~/components/ui/toast/Toaster.vue";
import {APP_NAME} from "~/constants";
import {useToastStore} from "~/stores/toastStore";

const toastStore = useToastStore()
const {t} = useI18n()

const mainNavItems = [
  {name: t('dashboard.dashboard'), url: '/'},
  {name: t('customers.customers', 2), url: 'customers'},
  {name: t('users.users', 2), url: 'users'},
]

const userNavItems = [
  {name: t('settings.settings'), url: 'settings', icon: Settings},
  {name: t('logout'), url: 'logout', icon: LogOut},
]
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>
  <header class="sticky top-0 h-16 flex items-center bg-background/80 backdrop-blur border-b z-10">
    <div class="container">
      <nav class="flex justify-between items-center">
        <div class="flex gap-8 items-center">
          <NuxtLinkLocale to="/">
            <img src="../assets/images/logo.svg" :alt="APP_NAME" class="h-9">
          </NuxtLinkLocale>
          <ul class="flex gap-6">
            <li v-for="item in mainNavItems">
              <NuxtLinkLocale :to="item.url" activeClass="text-primary font-medium"
                              class="inline-block px-2 py-4 text-sm hover:text-primary duration-150">{{ item.name }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>
        <Avatar class="ml-2">
          <AvatarFallback>PH</AvatarFallback>
        </Avatar>
      </nav>
    </div>
  </header>

  <div class="py-10">
    <div class="container">
      <slot/>
    </div>
  </div>

  <Toaster :toasts="toastStore.toasts"/>

</template>