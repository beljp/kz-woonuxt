export default defineEventHandler(async (event) => {
  // Je geheime sleutel uit Netlify (of direct in code)
  const secret = getQuery(event).secret;
  const expectedSecret = process.env.REVALIDATE_SECRET || 'kz_refresh_2025';

  if (secret !== expectedSecret) {
    return { revalidated: false, message: 'Invalid secret' };
  }

  // Trigger hier eventueel een rebuild of cache refresh
  // In WooNuxt kun je eventueel API-caches legen of iets anders doen

  return {
    revalidated: true,
    timestamp: new Date().toISOString(),
  };
});
