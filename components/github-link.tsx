import React from 'react'
import { Github } from 'lucide-react'
import Link from 'next/link'

export function GitHubLink() {
  return (
    <Link
      href="https://github.com/ItsBibek"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
    >
      <Github size={20} />
      <span className="text-sm font-medium">Made by Bibek</span>
    </Link>
  )
}
