export default defineEventHandler(async (event) => {
  const secret = getQuery(event).secret;
  const expectedSecret = process.env.REVALIDATE_SECRET || 'kz_refresh_2025';

  if (secret !== expectedSecret) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  try {
    // 👇 Hiermee dwing je Nuxt om alle pagina’s opnieuw te renderen
    await $fetch('/api/__nuxt__/invalidate', { method: 'POST' }).catch(() => {});

    console.log('✅ Revalidate triggered!');
    return { success: true, message: 'Revalidation triggered successfully.' };
  } catch (error) {
    console.error('❌ Revalidate failed:', error);
    return { success: false, error: (error as Error).message };
  }
});
