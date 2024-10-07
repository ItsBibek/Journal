'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlusCircle, Moon, Sun, Search, ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { useTheme } from '@/app/contexts/ThemeContext'
import { Badge } from "@/components/ui/badge"

interface JournalEntry {
  id: string
  title: string
  date: string
  content: string
  tags: string[]
}

export function DashboardComponent() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([])
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [showAllEntries, setShowAllEntries] = useState(false)

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]')
    setEntries(storedEntries)
  }, [])

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase()
    const filtered = entries.filter(entry =>
      entry.title.toLowerCase().includes(lowercasedTerm) ||
      entry.content.toLowerCase().includes(lowercasedTerm) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)) ||
      entry.date.toLowerCase().includes(lowercasedTerm)
    )
    setFilteredEntries(filtered)
  }, [searchTerm, entries])

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const displayedEntries = showAllEntries ? filteredEntries : filteredEntries.slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 p-4 sm:p-6 lg:p-8">
      <main className="max-w-2xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Welcome back</h1>
            <p className="text-gray-600 dark:text-gray-400">Your thoughts, captured and organized.</p>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search entries by title, content, tag, or date..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Link href="/new-entry" passHref>
          <Button className="w-full my-4 sm:w-auto" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Entry
          </Button>
        </Link>

        <section className="space-y-4">
          <h2 className="text-xl font-medium">Recent Entries</h2>
          <div className="space-y-2">
            {displayedEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <Link href={`/new-entry/${entry.id}`} className="flex-grow group">
                        <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {entry.title}
                        </span>
                      </Link>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{entry.date}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      {entry.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{entry.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Button
          variant="link"
          onClick={() => setShowAllEntries(!showAllEntries)}
          className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showAllEntries ? (
            <>
              Hide entries <ChevronUp className="inline-block ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              View all entries <ChevronDown className="inline-block ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </main>
    </div>
  )
}