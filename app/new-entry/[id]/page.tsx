import { EntryView } from '@/components/EntryView'

export default function Page({ params }: { params: { id: string } }) {
  // Use params or remove if not needed
  return (
    <EntryView />
  )
}
