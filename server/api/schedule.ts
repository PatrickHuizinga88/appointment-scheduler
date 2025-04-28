interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  ext_expires_in: number;
}

interface ScheduleResponse {
  "@odata.context": string;
  value: ScheduleInformation[];
}

interface ScheduleInformation {
  scheduleId: string;
  availabilityView: string;
  scheduleItems: ScheduleItem[];
  workingHours: WorkingHours;
}

interface ScheduleItem {
  isPrivate: boolean;
  status: string;
  subject: string;
  location: string;
  isMeeting: boolean;
  isRecurring: boolean;
  isException: boolean;
  isReminderSet: boolean;
  start: DateTimeInfo;
  end: DateTimeInfo;
}

interface DateTimeInfo {
  dateTime: string;
  timeZone: string;
}

interface WorkingHours {
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  timeZone: TimeZoneName;
}

interface TimeZoneName {
  name: string;
}

export default defineEventHandler(async (event) => {
  const {startTime, endTime} = await readBody(event)

  if (!startTime || !endTime) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  const {microsoftClientSecret} = useRuntimeConfig()
  const {access_token} = await $fetch<TokenResponse>('https://login.microsoftonline.com/a74772b0-86bc-4bff-8929-73ce2fc5a350/oauth2/v2.0/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: '676b85f7-7fee-4f82-bf12-6244fed76061',
      scope: 'https://graph.microsoft.com/.default',
      client_secret: microsoftClientSecret,
      grant_type: 'client_credentials'
    }).toString()
  })
  if (!access_token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const {value} = await $fetch<ScheduleResponse>('https://graph.microsoft.com/v1.0/users/hello@patrickhuizinga.nl/calendar/getSchedule', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      Prefer: 'outlook.timezone="Europe/Amsterdam"'
    },
    body: JSON.stringify({
      schedules: ["hello@patrickhuizinga.nl"],
      startTime: {
        dateTime: startTime,
        timeZone: "Europe/Amsterdam"
      },
      endTime: {
        dateTime: endTime,
        timeZone: "Europe/Amsterdam"
      },
      availabilityViewInterval: 0
    })
  })
  if (!value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No schedule found'
    })
  }

  return value[0]
})