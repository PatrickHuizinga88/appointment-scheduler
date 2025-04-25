<script setup lang="ts">
import {Sidebar} from "~/components/ui/sidebar";
import {Toaster} from "~/components/ui/toast";

const toastStore = useToastStore()
</script>

<template>

  <NuxtLoadingIndicator :color="`hsl(var(--primary))`"/>

  <Sidebar ref="sidebar"/>

  <div class="lg:pl-64 overflow-x-hidden">
    <div class="container">
      <div class="pb-6">
        <slot/>
      </div>
    </div>
  </div>

  <Toaster :toasts="toastStore.toasts"/>

</template>