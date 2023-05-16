import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from '@/components/Form'
import AskProduct from '@/components/AskProduct'
import SelectQuantity from '@/components/SelectQuantity'
import SelectCategory from '@/components/SelectCategory'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <SelectCategory/>
  )
}
