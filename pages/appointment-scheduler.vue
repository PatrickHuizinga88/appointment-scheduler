<script setup lang="ts">
import {Building, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft} from "lucide-vue-next";
import exampleData from "~/data/example-response.json";

definePageMeta({
  layout: false
})

const dayjs = useDayjs()

// const days = [
//   {label: 'Maandag', value: 'monday', date: '28 april'},
//   {label: 'Dinsdag', value: 'tuesday', date: '29 april'},
//   {label: 'Woensdag', value: 'wednesday', date: '30 april'},
//   {label: 'Donderdag', value: 'thursday', date: '1 mei'},
//   {label: 'Vrijdag', value: 'friday', date: '2 mei'},
// ]

const currentStep = ref(1)
const selectedWeek = ref(0)
const selectedDay = ref('')
const selectedTimeslot = ref('')
const loading = ref(true)

const {data: schedule, status} = await useFetch('/api/schedule', {
  method: 'POST',
  body: {
    startTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    endTime: dayjs().add(selectedWeek.value + 1, 'weeks').format('YYYY-MM-DDTHH:mm:ss'),
  },
  watch: [selectedWeek],
})

const availableDays = computed(() => {
  if (!schedule.value) return []

  if (selectedWeek.value > 0) return schedule.value.workingHours.daysOfWeek
  const today = dayjs().locale('en').format('dddd')
  // const today = 'Monday'

  const startIndex = schedule.value.workingHours.daysOfWeek.findIndex((day) => {
    return day === today.toLowerCase()
  })
  return startIndex >= 0 ? schedule.value.workingHours.daysOfWeek.slice(startIndex + 1) : []
})

const setInitialView = () => {
  if (dayjs().format('dddd') === 'Saturday' || dayjs().format('dddd') === 'Sunday') {
  // if (true) {
    selectedWeek.value = 1
    return
  }
  selectedWeek.value = 0
}

const onSubmit = async () => {
  if (!selectedDay.value) return
  currentStep.value++

}

setInitialView()
</script>

<template>
  <div class="h-svh flex flex-col space-y-12 bg-muted/50">
    <div class="container">
      <div class="flex justify-center pt-8 pb-12">
        <img src="/logo.svg" alt="Logo" class="h-10">
      </div>
      <div class="max-w-md mx-auto bg-background border rounded-xl p-6 text-center shadow-2xl shadow-primary/25">
        <h1 class="h2">Maak een afspraak</h1>
        <p class="text-sm text-muted-foreground mt-2">Selecteer een moment dat jou het beste uitkomt!</p>
        <div class="inline-flex items-center text-sm font-medium text-muted-foreground bg-muted border rounded-md mt-4 px-2 py-1">
          <Building class="size-4 text-primary mr-1.5"/>
          Jouw Organisatie
        </div>
      </div>
    </div>

    <form @submit.prevent="onSubmit" class="flex-1 border-t bg-background px-4 py-6">
      <div class="max-w-md mx-auto">
        <fieldset v-if="currentStep === 1">
          <div class="flex items-center justify-between">
            <legend class="h3">Kies een dag</legend>
            <div class="flex items-center text-sm font-medium gap-x-3">
              <Button @click="selectedWeek--" type="button" size="icon-sm" variant="outline" :disabled="selectedWeek === 0">
                <ChevronLeft/>
              </Button>
              {{ `${selectedWeek === 0 ? 'Deze' : 'Volgende'}` }} week
              <Button @click="selectedWeek++" type="button" size="icon-sm" variant="outline" :disabled="selectedWeek === 1">
                <ChevronRight/>
              </Button>
            </div>
          </div>
          <div class="flex flex-col gap-3 mt-6">
            <div v-for="day in availableDays" class="relative">
              <input v-model="selectedDay" type="radio" :value="day" :id="day"
                     name="day"
                     class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none" required/>
              <label :for="day"
                     class="flex items-center justify-between rounded-lg border px-4 py-3 h-full cursor-pointer transition-[background-color] hover:bg-muted peer-focus-visible:bg-primary/10 peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark peer-checked:bg-primary/15">
                <span class="font-medium">{{ $t(`appointment_scheduler.days.${day}`) }}</span>
<!--                <span class="text-sm text-muted-foreground">{{ day }}</span>-->
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset v-else-if="currentStep === 2">
          <legend class="h3">Kies een tijd</legend>
          <div class="flex flex-col gap-3 mt-6">
            <div v-for="timeslot in availableTimeslots" class="relative">
              <input v-model="selectedTimeslot" type="radio" :value="timeslot" :id="timeslot"
                     name="timeslot"
                     class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none" required/>
              <label :for="timeslot"
                     class="flex items-center justify-between rounded-lg border px-4 py-3 h-full cursor-pointer transition-[background-color] hover:bg-muted peer-focus-visible:bg-primary/10 peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark peer-checked:bg-primary/15">
                <span class="font-medium">{{ timeslot }}</span>
                <!--                <span class="text-sm text-muted-foreground">{{ day }}</span>-->
              </label>
            </div>
          </div>
        </fieldset>
        <div class="flex gap-2 mt-6">
          <Button v-if="currentStep > 1" @click="currentStep--" size="icon-lg" variant="ghost" type="button" class="shrink-0">
            <ArrowLeft/>
          </Button>
          <Button size="lg" class="w-full" :disabled="!selectedDay">
            Volgende stap
            <ArrowRight/>
          </Button>
        </div>

      </div>
    </form>
  </div>
</template>

<style scoped>

</style>