import { useEffect, useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const Home = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const filteredItems = Array.isArray(items)
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterCategory ? item.category === filterCategory : true)
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-600">
        منوی رستوران ما
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="جستجو بر اساس نام غذا"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">همه دسته‌بندی‌ها</option>
          <option value="main">غذای اصلی</option>
          <option value="appetizer">پیش‌غذا</option>
          <option value="dessert">دسر</option>
          <option value="drink">نوشیدنی</option>
        </select>
      </div>

      {/* Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {item.image_url && (
              <img
                src={`http://localhost:3000${item.image_url}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 text-right">
              <h2 className="text-xl font-bold text-orange-700">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                {item.price.toLocaleString()} تومان
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs text-white bg-orange-400 rounded-full">
                {item.category === 'main' && 'غذای اصلی'}
                {item.category === 'appetizer' && 'پیش‌غذا'}
                {item.category === 'dessert' && 'دسر'}
                {item.category === 'drink' && 'نوشیدنی'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          آیتمی با این مشخصات یافت نشد.
        </div>
      )}
    </div>
  );
};

export default Home;
