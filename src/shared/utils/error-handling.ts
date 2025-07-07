
type ResultSuccess<T> = {
  type: "success",
  value: T
}

type ErrorCode = number

type ResultFailure = {
  type: "error",
  code: ErrorCode,
}

export type Result<T> = ResultSuccess<T> | ResultFailure

export const success = <T>(value: T): ResultSuccess<T> => ({ type: "success", value })

export const failure = (code: ErrorCode): ResultFailure => ({ type: "error", code })

export const matchResult = <T, V, V2>(res: Result<T>, matchers: { onSuccess: (v: T) => V; onFailure: (code: ErrorCode) => V2 }): V | V2 => {
  if (res.type === "success") {
    return matchers.onSuccess(res.value)
  }
  return matchers.onFailure(res.code)
}
