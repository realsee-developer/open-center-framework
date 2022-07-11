export type RealseeApiRequest = {}

export type RealseeApiResponse<T = any> = {
  code: number
  message: string
  data?: T
}
