export function useLogger(moduleName?: string) {
  const isDev = import.meta.env.DEV

  const prefix = moduleName ? `[${moduleName}]` : '[App]'

  function info(...args: any[]) {
    if (isDev) console.log(prefix, ...args)
  }

  function warn(...args: any[]) {
    if (isDev) console.warn(prefix, ...args)
  }

  function error(...args: any[]) {
    console.error(prefix, ...args)
  }

  return { info, warn, error }
}
