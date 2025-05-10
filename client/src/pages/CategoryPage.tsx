import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const CategoryPage = () => {
  const { name } = useParams();
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item: MenuItem) => item.category === name);
        setItems(filtered);
      });
  }, [name]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">دسته: {name}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden text-right">
            {item.image_url && (
              <img
                src={`http://localhost:3000${item.image_url}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-3 font-semibold">{item.price.toLocaleString()} تومان</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
