'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"

interface JournalEntry {
  id: string
  title: string
  date: string
  content: string
  tags: string[]
}

export function EntryView() {
  const router = useRouter()
  const { id } = useParams()
  const [entry, setEntry] = useState<JournalEntry | null>(null)

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]')
    const foundEntry = storedEntries.find((e: JournalEntry) => e.id === id)
    setEntry(foundEntry || null)
  }, [id])

  if (!entry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-600 dark:text-gray-400">Entry not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-4">{entry.title}</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Calendar className="mr-2 h-4 w-4" />
              <time dateTime={entry.date}>{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <div className="prose dark:prose-invert max-w-none mb-6">
              {entry.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            {entry.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-6">
                <Tag className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                {entry.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
