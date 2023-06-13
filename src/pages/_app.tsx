import '@/styles/globals.css'
import { NotificationProvider } from '@ka-react/message';
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider >
      <Component {...pageProps} />
    </NotificationProvider>
  )
}
