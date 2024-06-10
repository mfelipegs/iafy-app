import { RequestProps } from "@/types/types"

export const request = async ({
  url,
  body,
  params,
  xml = false,
  stringifyBody = true,
  formDataBody = false,
  headers = new Headers(),
  method = "GET",
}: RequestProps) => {
  const baseUrl = "http://192.168.1.66:5000"
  const requestUrl = new URL(`${baseUrl}${url}`)

  if (params) {
    Object.keys(params).forEach((key) => {
      requestUrl.searchParams.append(key, params[key])
    })
  }

  headers.append("Accept", "application/json")
  headers.append("Content-Type", formDataBody ? "multipart/form-data" : "application/json")

  const requestBody = body && stringifyBody && !formDataBody ? JSON.stringify(body) : body

  if (xml) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, requestUrl.toString(), true)

      headers.forEach((value: string, key: string) => {
        xhr.setRequestHeader(key, value)
      })

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const response = {
            status: xhr.status,
            statusText: xhr.statusText,
            responseText: xhr.responseText,
            json: () => Promise.resolve(JSON.parse(xhr.responseText)),
          }

          if (xhr.status >= 200 && xhr.status < 300) {
            response
              .json()
              .then((json) => resolve(json))
              .catch((error) => reject("XML HTTP Request: Parsing error"))
          } else {
            response
              .json()
              .then((json) => resolve({ ...json, hasError: true }))
              .catch((error) => reject("XML HTTP Request: Network error"))
          }
        }
      }

      xhr.onerror = () => {
        reject("XML HTTP Request: Network error")
      }

      xhr.send(requestBody)
    })
  }

  const options: RequestInit = {
    method,
    headers,
    body: requestBody,
  }

  return await fetch(requestUrl.toString(), options)
    .then(async (response) => {
      return response
    })
    .then(async (response) => {
      const json = response.status === 204 ? {} : await response.json()

      if (!response.ok) {
        return { ...json, hasError: true }
      }

      return json
    })
    .catch((error) => {
      throw new Error("Network error")
    })
}
