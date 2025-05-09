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

  // Fetch menu items on load
  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const handleAdd = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert('لطفاً همه فیلدهای الزامی را پر کنید');
      return;
    }

    const response = await fetch('http://localhost:3000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const added = await response.json();
      setItems((prev) => [...prev, added]);
      setNewItem({ name: '', description: '', price: 0, category: '' });
    } else {
      alert('خطا در افزودن آیتم جدید');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">پنل مدیریت منو</h2>

      {/* Form to Add New Item */}
      <div className="grid gap-3 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="نام غذا"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="توضیحات"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="قیمت (تومان)"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: +e.target.value })}
        />

        {/* Dropdown for Category */}
        <select
          className="border p-2 rounded"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          <option value="">انتخاب دسته‌بندی</option>
          <option value="main">غذای اصلی</option>
          <option value="appetizer">پیش‌غذا</option>
          <option value="dessert">دسر</option>
          <option value="drink">نوشیدنی</option>
        </select>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAdd}
        >
          افزودن
        </button>
      </div>

      {/* List of Existing Items */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="border p-3 rounded shadow-sm text-right">
            <strong>{item.name}</strong> — {item.category} — {item.price.toLocaleString()} تومان
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
