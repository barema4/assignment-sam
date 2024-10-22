import React, { FC } from 'react'
import { Cross2Icon } from "@radix-ui/react-icons";

interface SearchInputProps {
    text: string;
    handleSearchChange: (text: string) => void;
    handleClear: () => void
}

export const SearchInput: FC<SearchInputProps> = ({text, handleSearchChange, handleClear}) => {
  return (
    <div className="relative w-full sm:w-1/2 md:w-1/3">
        <input
          type="text"
          value={text}
          onChange={(e) => handleSearchChange(e.target.value || "")}
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-10 text-black"
          placeholder="Search"
        />

        {text && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleClear}
          >
            <Cross2Icon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
  )
}
