import { useSyncExternalStore } from 'react'

export const useIsMounted = () =>
    useSyncExternalStore(
        () => () => {}, // no-op unsubscribe
        () => true, // client snapshot: mounted
        () => false, // server snapshot: not mounted
    )
