export type http = "GET" | "POST"

export interface RequestProps {
  url: string
  method?: http
  headers?: Headers
  params?: Record<string, any>
  body?: any
  stringifyBody?: boolean
  formDataBody?: boolean
  xml?: boolean
}
