import { useMemo } from "react";

export function useFilteredData<T>(searchQuery: string, nameSelector: (obj: T) => string, data: T[]): T[] {
  const filteredData = useMemo(() => searchQuery.trim() ?
    data?.filter(t => nameSelector(t).toLowerCase().startsWith(searchQuery.trim().toLowerCase())) :
    data,
    [searchQuery])
  return filteredData
}
