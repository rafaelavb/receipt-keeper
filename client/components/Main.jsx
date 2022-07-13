import React from 'react'
import Sidebar from './Sidebar'
import Receipts from './Receipts'
import { useParams } from 'react-router-dom'

export default function Main() {
  const { username } = useParams()
  return (
    <div>
      <Sidebar />
      <Receipts />
    </div>
  )
}
