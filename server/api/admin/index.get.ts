export default defineEventHandler(async (event) => {
  const db = useDb(event);

  try {
    const { results } = await db.prepare("SELECT id, first_name, last_name, email, role, status, last_login, created_at FROM admin").all();
    return results;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to fetch admins",
    });
  }
});
