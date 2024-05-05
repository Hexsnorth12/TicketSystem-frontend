import React from 'react'
interface InputProps {
  label?: string
  type: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

const InputComponent: React.FC<InputProps> = ({
  label,
  type,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <div className="mt-2.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
        />
      </div>
    </div>
  )
}

export default InputComponent
