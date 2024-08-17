export function useI18nLink(path: string) {
  const localePath = useLocalePath()
  return localePath(path)
}