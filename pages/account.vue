<script setup lang="ts">
import {Page} from "../components/ui/page";
import type {Database} from "~/types/database.types";

definePageMeta({
  layout: 'default-sidebar'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const {data: profile} = await useAsyncData('accountProfile', async () => {
  const {data} = await supabase.from('profiles').select('first_name,last_name,plan').filter('id', 'eq', user.value?.id).single()
  return data
})
</script>

<template>
  <Page :title="$t('account.account')" :description="$t('account.manage_your_account')">

    <section id="profile-information">
      <h2 class="h3 mb-4">{{ $t('account.profile.profile_information') }}</h2>
      <FormProfile v-if="profile" :first_name="profile.first_name" :last_name="profile.last_name"/>
    </section>

    <Separator class="w-full my-12"/>

    <section id="account-information">
      <h2 class="h3 mb-4">{{ $t('account.account_information.account_information') }}</h2>
      <FormAccount v-if="user" :email="user.email"/>
    </section>

    <Separator class="w-full my-12"/>

    <section id="preferences">
      <h2 class="h3 mb-4">{{ $t('account.preferences.preferences') }}</h2>
      <FormPreferences/>
    </section>

    <Separator class="w-full my-12"/>

    <section id="danger-zone">
      <h2 class="h3 text-destructive mb-2">{{ $t('account.danger_zone.danger_zone') }}</h2>
      <!-- TODO - Setup: Change support email -->
      <p class="text-muted-foreground text-sm mb-6">{{ $t('account.danger_zone.explanation') }} <a
          href="mailto:support@example.com" class="text-primary underline">support@example.com</a>.</p>
      <!--    <p class="text-muted-foreground text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>-->
      <!--          <Button variant="outline" size="sm">-->
      <!--            <Trash class="size-4"/>-->
      <!--            {{ $t('account.anger_zone.delete_account') }}-->
      <!--          </Button>-->
    </section>
  </Page>
</template>

<style scoped>

</style>