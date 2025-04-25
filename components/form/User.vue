<script setup lang="ts">
import type User from '~/types/User'
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";

const props = defineProps<{
  user?: User
}>()

const toastStore = useToastStore()
const {t} = useI18n()
const localePath = useLocalePath()

const roleOptions = [
  { value: 'admin', label: t('users.roles.admin') },
  { value: 'editor', label: t('users.roles.editor')},
  { value: 'viewer', label: t('users.roles.viewer') },
]

const formSchema = toTypedSchema(z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
}))

const form = useForm({
  initialValues: {
    name: props.user?.name ,
    email: props.user?.email,
    role: props.user?.role,
  },
  validationSchema: formSchema,
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    await $fetch('/api/users', {
      method: props.user ? 'PUT' : 'POST',
      body: {
        id: props.user?.id,
        ...values
      }
    })

    await navigateTo(localePath({name: 'users-id', params: {id: useRoute().params.id}}))
    toastStore.createToast({
      type: 'success',
      action: 'save',
      item: values.name
    })
  } catch (error) {
    if (error) {
      toastStore.createToast({
        type: 'destructive',
        action: 'save',
        item: values.name
      })
      throw error
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ $t('common.general.name') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('common.general.email') }}</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="role">
      <FormItem>
        <FormLabel>{{ $t('users.role') }}</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue :placeholder="$t('users.select_role')" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="option in roleOptions" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button :loading="loading" class="w-full lg:w-auto">
      {{ capitalizeSentence($t('common.actions.save_item', {item: $t('users.users')})) }}
    </Button>
  </form>
</template>