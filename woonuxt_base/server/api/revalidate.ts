export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const secret = query.secret;
  const expected = process.env.REVALIDATE_SECRET || 'kz_refresh_2025';

  if (secret !== expected) {
    return { revalidated: false, message: 'Invalid secret' };
  }

  return {
    revalidated: true,
    timestamp: new Date().toISOString(),
  };
});
