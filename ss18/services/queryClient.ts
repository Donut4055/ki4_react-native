import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetch when app regains focus
      retry: 1, // Retry failed requests once
      gcTime: 5 * 60 * 1000, // Cache cleanup after 5 minutes
      staleTime: 60 * 1000, // Data considered fresh for 1 minute
    },
  },
});
