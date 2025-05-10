import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-300 ${
      isActive ? 'text-orange-500 font-semibold' : 'text-gray-800 hover:text-orange-500'
    }`;

  return (
    <header className="bg-gradient-to-r from-orange-100 to-yellow-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-orange-600 tracking-tight">رستوران ما</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-lg">
          <NavLink to="/" className={linkClass}>خانه</NavLink>
          <NavLink to="/category/appetizer" className={linkClass}>پیش‌غذا</NavLink>
          <NavLink to="/category/main" className={linkClass}>غذای اصلی</NavLink>
          <NavLink to="/category/dessert" className={linkClass}>دسر</NavLink>
          <NavLink to="/category/drink" className={linkClass}>نوشیدنی‌ها</NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-3xl text-orange-600 transition-transform transform hover:scale-110"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-96' : 'max-h-0'
        } bg-white`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>خانه</NavLink>
          <NavLink to="/category/appetizer" className={linkClass} onClick={() => setOpen(false)}>پیش‌غذا</NavLink>
          <NavLink to="/category/main" className={linkClass} onClick={() => setOpen(false)}>غذای اصلی</NavLink>
          <NavLink to="/category/dessert" className={linkClass} onClick={() => setOpen(false)}>دسر</NavLink>
          <NavLink to="/category/drink" className={linkClass} onClick={() => setOpen(false)}>نوشیدنی‌ها</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
