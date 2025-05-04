import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">رستوران ما</h1>
        <nav className="hidden md:flex gap-6 text-lg">
          <NavLink to="/">خانه</NavLink>
          <NavLink to="/category/appetizer">پیش‌غذا</NavLink>
          <NavLink to="/category/main">غذای اصلی</NavLink>
          <NavLink to="/category/dessert">دسر</NavLink>
          <NavLink to="/category/drink">نوشیدنی‌ها</NavLink>
        </nav>
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-gray-50 py-4">
          <NavLink to="/">خانه</NavLink>
          <NavLink to="/category/appetizer">پیش‌غذا</NavLink>
          <NavLink to="/category/main">غذای اصلی</NavLink>
          <NavLink to="/category/dessert">دسر</NavLink>
          <NavLink to="/category/drink">نوشیدنی‌ها</NavLink>
        </div>
      )}
    </header>
  )
}

export default Header
