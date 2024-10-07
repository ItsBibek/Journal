import { JournalEntry } from '@/components/journal-entry'
import { EntryView } from '@/components/EntryView'

export default function NewEntryPage({ params }: { params: { id?: string } }) {
  if (params.id) {
    return <EntryView />
  }
  return <JournalEntry />
}
