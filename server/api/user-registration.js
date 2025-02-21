// This is debugging code for a mock API endpoint until the backend API is built out...
// 
// // /server/api/user-registration.js

export default defineEventHandler(async (event) => {
  // Access the request body with `event.body`
  const body = await readBody(event);

  // Validation for required fields
  if (!body.lastName) { // Last name is required
    return createError({
      statusCode: 400,
      message: 'Last name is required',
    });
  }

  // At least one of phone or email must be provided
  if (!body.phone && !body.email) {
    return createError({
      statusCode: 400,
      message: 'At least one of phone or email is required',
    });
  }

  // Simulate a successful registration response
  return {
    statusCode: 200,
    message: 'User registered successfully!',
  };
});

  