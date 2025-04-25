<script setup lang="ts">
import {Building, ChevronLeft, ChevronRight, ArrowRight} from "lucide-vue-next";
import exampleData from "~/data/example-response.json";

definePageMeta({
  layout: false
})

const days = [
  {label: 'Maandag', value: 'monday', date: '28 april'},
  {label: 'Dinsdag', value: 'tuesday', date: '29 april'},
  {label: 'Woensdag', value: 'wednesday', date: '30 april'},
  {label: 'Donderdag', value: 'thursday', date: '1 mei'},
  {label: 'Vrijdag', value: 'friday', date: '2 mei'},
]

const selectedDay = ref()
</script>

<template>
  <div class="h-svh flex flex-col space-y-12 bg-muted/50">
    <div class="container">
      <div class="flex justify-center pt-8 pb-12">
        <img src="/logo.svg" alt="Logo" class="h-10">
      </div>
      <div class="bg-background border rounded-xl p-6 text-center shadow-2xl shadow-primary/25">
        <h1 class="h2">Maak een afspraak</h1>
        <p class="text-sm text-muted-foreground mt-2">Selecteer een moment dat jou het beste uitkomt!</p>
        <div class="inline-flex items-center text-sm font-medium text-muted-foreground bg-muted border rounded-md mt-4 px-2 py-1">
          <Building class="size-4 text-primary mr-1.5"/>
          Jouw Organisatie
        </div>
      </div>
    </div>

    <form class="flex-1 border-t bg-background px-4 py-6">
      <fieldset>
        <div class="flex items-center justify-between">
          <legend class="h3">Kies een dag</legend>
          <div class="flex items-center text-sm font-medium gap-x-3">
            <Button type="button" size="icon-sm" variant="outline" disabled><ChevronLeft/></Button>
            Deze week
            <Button type="button" size="icon-sm" variant="outline"><ChevronRight/></Button>
          </div>
        </div>
        <div class="flex flex-col gap-3 mt-6">
          <div v-for="day in days" class="relative">
            <input v-model="selectedDay" type="radio" :value="day.value" :id="day.value"
                   name="day"
                   class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none" required/>
            <label :for="day.value"
                   class="flex items-center justify-between rounded-lg border px-4 py-3 h-full cursor-pointer transition-[background-color] hover:bg-muted peer-focus-visible:bg-primary/10 peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark peer-checked:bg-primary/15">
              <span class="font-medium">{{ day.label }}</span>
              <span class="text-sm text-muted-foreground">{{ day.date }}</span>
            </label>
          </div>
        </div>
      </fieldset>
      <Button size="lg" class="w-full mt-6">
        Volgende stap
        <ArrowRight/>
      </Button>
    </form>
  </div>
</template>

<style scoped>

</style>