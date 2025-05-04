interface MenuItemProps {
    name: string
    description: string
    price: number
  }
  
  const MenuItem = ({ name, description, price }: MenuItemProps) => (
    <div className="border p-4 rounded shadow text-right">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="mt-2 font-semibold">{price.toLocaleString()} تومان</p>
    </div>
  )
  
  export default MenuItem
  