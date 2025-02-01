// /server/api/user-registration.js
export default defineEventHandler(async (event) => {
    //  access the request body with `event.body`
    const body = await readBody(event);
  
    // Basic validation (expand as needed)
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return createError({
        statusCode: 400,
        message: 'All fields are required',
      });
    }
  
    // Simulate a successful registration response
    return {
      statusCode: 200,
      message: 'User registered successfully!',
    };
  });
  