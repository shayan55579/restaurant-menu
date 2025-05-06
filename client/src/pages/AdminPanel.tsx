import { useEffect, useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const AdminPanel = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const handleAdd = async () => {
    await fetch('http://localhost:3000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    setNewItem({ name: '', description: '', price: 0, category: '' });
    const res = await fetch('http://localhost:3000/menu');
    const updated = await res.json();
    setItems(updated);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">پنل مدیریت</h2>
      <div className="grid gap-3 mb-4">
        <input placeholder="نام" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
        <input placeholder="توضیحات" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
        <input placeholder="قیمت" type="number" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: +e.target.value })} />
        <input placeholder="دسته" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">افزودن</button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="border p-2 rounded shadow-sm">
            <strong>{item.name}</strong> — {item.category} — {item.price.toLocaleString()} تومان
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
