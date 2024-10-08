import React from 'react'
import { Github } from 'lucide-react'
import Link from 'next/link'

export function GitHubLink() {
  return (
    <Link
      href="https://github.com/ItsBibek"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-2 left-2 z-50 flex items-center space-x-1 bg-gray-800 text-white px-2 py-1 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
    >
      <Github size={16} />
      <span className="text-xs font-medium">Made by Bibek</span>
    </Link>
  )
}
