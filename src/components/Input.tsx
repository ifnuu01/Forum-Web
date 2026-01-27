import type { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-primary border border-secondary p-4 pl-12 rounded-2xl outline-none focus:ring-1 focus:ring-secondary transition-all ${props.className ?? ''}`}
    />
  )
}