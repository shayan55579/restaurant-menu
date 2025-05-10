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
    fetch('http://localhost:3000/menu', {
      credentials: 'include', // Remove this if not protected
    })
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? item.category === filterCategory : true)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">منوی رستوران</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          className="border p-2 rounded w-full md:w-1/2"
          placeholder="جستجو بر اساس نام غذا"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full md:w-1/2"
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

      {/* Menu List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden text-right">
            {item.image_url && (
              <img
                src={`http://localhost:3000${item.image_url}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-3 font-semibold text-lg">
                {item.price.toLocaleString()} تومان
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
