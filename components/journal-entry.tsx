"use client";

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { CalendarIcon, Tag, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/app/contexts/ThemeContext"
import { useRouter } from 'next/navigation'

type JournalEntry = {
  date: string
  title: string
  content: string
  tags: string[]
}

export function JournalEntry() {
  const router = useRouter()
  const { darkMode } = useTheme()
  const [tags, setTags] = useState<string[]>([])
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<JournalEntry>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      title: "",
      content: "",
      tags: [],
    },
  })

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    const subscription = watch((value) => {
      const isTitleFilled = value.title?.trim() !== '';
      const isContentFilled = value.content?.trim() !== '';
      setIsSaveDisabled(!(isTitleFilled && isContentFilled));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: JournalEntry) => {
    const newEntry = {
      id: Date.now().toString(), // Generate a unique ID
      ...data,
    }
    // Save the new entry to localStorage
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]')
    const updatedEntries = [newEntry, ...existingEntries]
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries))
    
    // Redirect to the dashboard
    router.push('/')
  }

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      event.preventDefault()
      const newTag = event.currentTarget.value.trim()
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag])
        setValue('tags', [...tags, newTag])
        event.currentTarget.value = ''
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    setValue('tags', updatedTags)
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => router.push('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className={`text-2xl font-semibold mb-4 sm:mb-0 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>New Journal Entry</h1>
            <div className="flex items-center space-x-2">
              <CalendarIcon className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-black'}`} />
              <Input
                type="date"
                {...register("date")}
                className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          
          <Input
            type="text"
            placeholder="Entry Title"
            {...register("title")}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          
          <Textarea
            placeholder="Write your thoughts here..."
            {...register("content")}
            className="w-full h-64 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Add tags (press Enter)"
                onKeyPress={addTag}
                className="flex-grow border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1 text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-2 focus:outline-none">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isSaveDisabled}
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Save Entry
          </Button>
        </form>
      </div>
    </div>
  )
}

export default JournalEntry;