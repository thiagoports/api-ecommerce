export const asArray = <T>(data: any): T[] => (Array.isArray(data) ? data : (data?.results ?? []))
