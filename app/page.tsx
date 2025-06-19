import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/dashboard') // or '/login' once you build it
}
