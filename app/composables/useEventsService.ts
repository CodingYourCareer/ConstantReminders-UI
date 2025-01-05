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
    // The unique key identifying this query (for caching, refetching, etc.)
    queryKey: ['listEvents'],
    // The function that actually fetches the events
    queryFn: async () => {
      return handleApiCall(
        $fetch<IApiResponse<IEvent[]>>(baseUrl, {
          ...createFetchOptions<IApiResponse<IEvent[]>>(),
          method: 'GET',
        }),
        'listEvents',
      )
    },
    // Placeholder data to show until the real data returns
    placeholderData: () => ({
      data: [],
      isSuccess: true,
      status: 200,
      errors: [],
      message: 'No events found',
    }),
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
      return handleApiCall(
        $fetch<IApiResponse<{ event: IEvent | null, message?: string }>>(
          `${baseUrl}/create`,
          {
            ...createFetchOptions<
              IApiResponse<{ event: IEvent | null, message?: string }>
            >(),
            method: 'POST',
            body: newEvent,
          },
        ),
        'createEvent',
      )
    },
    // If creation is successful, re-fetch the event list (optional)
    onSuccess: () => {
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
