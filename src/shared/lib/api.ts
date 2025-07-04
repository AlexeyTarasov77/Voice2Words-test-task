export const fetcher = (...args: [RequestInfo | URL, init?: RequestInit]) => fetch(...args).then(res => res.json())
