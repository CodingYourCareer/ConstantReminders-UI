export interface IApiResponse<T> {
  data: T | null
  isSuccess: boolean
  status: number
  errors: string[]
  message: string
}
