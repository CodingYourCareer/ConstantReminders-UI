// composables/useEvents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { IApiResponse, ICreateEventRequest, IEvent } from '../types'
import { useApiUtils } from './useApiUtils'

export default function useEvents() {
  const config = useRuntimeConfig() // Ignore this error. Nuxt auto imports it but typescript is stupid
  const { handleApiCall, createFetchOptions } = useApiUtils()
  const queryClient = useQueryClient()

  const baseUrl = `${config.public.apiBaseUrl}/api/v1/events`

  /**
   * QUERY: List all events
   * GET /api/v1/events
   *
   * We use a useQuery hook that returns
   * { data, isLoading, isError, error, ... }
   */
  const listEventsQuery = useQuery<IApiResponse<IEvent[]>>({
    queryKey: ['listEvents'],
    queryFn: async () => {
      // Get fetch options first
      const fetchOptions = await createFetchOptions<IApiResponse<IEvent[]>>()

      // Log the complete headers
      console.log('Request Headers:', {
        ...fetchOptions.headers,
        method: 'GET',
        url: baseUrl,
      })

      return handleApiCall(
        $fetch<IApiResponse<IEvent[]>>(baseUrl, {
          ...fetchOptions,
          method: 'GET',
        }),
        'listEvents',
      )
    },
  })

  /**
   * MUTATION: Create a new Event
   * POST /api/v1/events/create
   *
   * We use a useMutation hook that returns
   * { mutate, isPending, error, ... }
   */
  const createEventMutation = useMutation<
    IApiResponse<{ event: IEvent | null, message?: string }>, // success shape
    Error, // error shape
    ICreateEventRequest // payload shape
  >({
    mutationFn: async (newEvent: ICreateEventRequest) => {
      // IMPORTANT: Await the fetch options
      const fetchOptions = await createFetchOptions<
        IApiResponse<{ event: IEvent | null, message?: string }>
      >()

      return handleApiCall(
        $fetch<IApiResponse<{ event: IEvent | null, message?: string }>>(
          `${baseUrl}/create`,
          {
            ...fetchOptions,
            method: 'POST',
            body: newEvent,
          },
        ),
        'createEvent',
      )
    },
    onSuccess: () => {
      // If creation is successful, re-fetch the event list (optional)
      queryClient.invalidateQueries({ queryKey: ['listEvents'] })
    },
    onError: (error: Error) => {
      console.error('Failed to create event:', error)
      // Additional user-facing error handling can go here
    },
  })

  // Return both the query object and the mutation object
  return {
    listEventsQuery,
    createEventMutation,
  }
}
