import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MenuItem from '../components/MenuItem'

interface MenuItemType {
  id: number
  name: string
  description: string
  price: number
  category: string
}

const CategoryPage = () => {
  const { name } = useParams()
  const [items, setItems] = useState<MenuItemType[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((item: MenuItemType) => item.category === name)
        setItems(filtered)
      })
  }, [name])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">دسته‌بندی: {name}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
