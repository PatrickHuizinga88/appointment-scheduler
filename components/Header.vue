<script setup lang="ts">
import { Search, Menu, Bell } from 'lucide-vue-next'
import { Sheet, SheetTrigger, SheetContent } from '~/components/ui/sheet';

interface Notification {
  title: string
  description: string
}

defineProps<{
  pageTitle: string
  pageDescription?: string
  // showBreadcrumbs?: boolean
  // customBreadcrumb?: string
}>()

const notifications: Notification[] = []

const open = ref(false)

watch(useRoute(), () => {
  open.value = false
})
</script>

<template>
	<header>
		<div class="flex justify-between items-start gap-6 lg:h-16">
<!--			<Sheet v-model:open="open">-->
<!--				<SheetTrigger as-child>-->
<!--					<Button variant="ghost" size="icon" aria-label="Toggle navigation menu" class="shrink-0 lg:hidden -ml-2">-->
<!--						<Menu class="size-6" aria-hidden="true" />-->
<!--					</Button>-->
<!--				</SheetTrigger>-->
<!--				<SheetContent side="left" class="sm:max-w-xs flex flex-col">-->
<!--					<Navigation />-->
<!--				</SheetContent>-->
<!--			</Sheet>-->

      <div class="hidden lg:flex lg:flex-col shrink overflow-hidden mt-1.5">
        <h1 v-if="pageTitle" class="align-middle">{{ pageTitle }}</h1>
        <div v-if="pageDescription" class="text-muted-foreground mt-1">{{ pageDescription }}</div>
      </div>

		</div>

    <div class="lg:hidden shrink overflow-hidden pt-7">
      <h1 v-if="pageTitle">{{ pageTitle }}</h1>
      <div v-if="pageDescription" class="text-muted-foreground mt-1">{{ pageDescription }}</div>
    </div>
	</header>
</template>