import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="food-detail" options={{ title: 'Food Detail' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
    </QueryClientProvider>
  );
}
