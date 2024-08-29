import React, { useEffect, useState } from 'react'

import { Links } from './Links'
import { useResultContext } from '../context/ResultContextProvider'
import { useDebounce } from 'use-debounce'

export const Search = () => {
  const [text, setText] = useState('')
  const { setSearchTerm } = useResultContext()
  const [debouncedValue] = useDebounce(text, 300)

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue)
  }, [debouncedValue])
  return (
    <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
      <input type="text" value={text}
        placeholder='Search Sulziagle or type URL'
        onChange={(e) => setText(e.target.value)}
        className='sm:w-96 w-80 h-10 dark:bg-gray-200 
      border rounded-full shadow-md outline-none p-6 text-black hover:shadow-lg' />

      {
        !text && (
          <button
          onClick={()=>setText('')} 
          className='absolute top-1.5 right-4 text-2xl text-gray-500'>X</button>
        )
      }
      <Links />
    </div>
  )
}
