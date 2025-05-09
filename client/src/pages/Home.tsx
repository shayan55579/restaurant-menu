import { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';

interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const Home = () => {
  const [items, setItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">تمامی غذاها</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
