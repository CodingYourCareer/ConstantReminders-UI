// composables/useUserService.ts
import { useMutation } from '@tanstack/vue-query'
import type { IApiResponse, IUserRegistration } from '../types'
import { useApiUtils } from './useApiUtils'


export default function useUserService() {
  const config = useRuntimeConfig()
  const { handleApiCall, createFetchOptions } = useApiUtils()

  // const baseUrl = `${config.public.apiBaseUrl}/api/v1/users` //modify for testing
  const baseUrl = '/api/user-registration' // test API

  /**
   * MUTATION: Register a new user
   * POST /api/v1/users/register
   */
  const registerUserMutation = useMutation<
    IApiResponse<{ message: string }>, // Success response shape
    Error, // Error shape
    IUserRegistration // Payload shape
  >({
    mutationFn: async (userData: IUserRegistration) => {
      const fetchOptions = await createFetchOptions<IApiResponse<{ message: string }>>()

      return handleApiCall(
        $fetch<IApiResponse<{ message: string }>>(`${baseUrl}`, {
          ...fetchOptions,
          method: 'POST',
          body: userData,
        }),
        'registerUser',
      )
    },
    onSuccess: (data) => {
      console.log('Registration successful:', data)
    },
    onError: (error) => {
      console.error('Registration failed:', error)
    },
  })

  return {
    registerUserMutation,
  }
}
