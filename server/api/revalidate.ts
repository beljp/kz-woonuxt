// /server/api/revalidate.ts
import { defineEventHandler, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  // ✅ 1. Secret token beveiligen
  const { secret } = getQuery(event)
  if (secret !== process.env.REVALIDATE_SECRET) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or missing secret token',
    })
  }

  console.log('🔁 Revalidation triggered by webhook at', new Date().toISOString())

  // ✅ 2. Roep Nuxt revalidate API aan (ververst alle cached asyncData / GraphQL queries)
  try {
    // Dit laat Nuxt alle statische pagina’s herladen waar revalidate actief is
    await $fetch('/api/_content/revalidate', { method: 'POST' })

    return {
      revalidated: true,
      timestamp: new Date().toISOString(),
    }
  } catch (err) {
    console.error('Revalidate error:', err)
    return {
      revalidated: false,
      error: err.message,
    }
  }
})
