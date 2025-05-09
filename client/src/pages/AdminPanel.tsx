import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const AdminPanel = () => {
  const navigate = useNavigate(); // ✅ Hook inside component

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  const [items, setItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formItem, setFormItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
  });

  const fetchMenu = async () => {
    const res = await fetch('http://localhost:3000/menu');
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAdd = async () => {
    if (!formItem.name || !formItem.price || !formItem.category) {
      toast.warning('لطفاً همه فیلدها را پر کنید');
      return;
    }

    const response = await fetch('http://localhost:3000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formItem),
    });

    if (response.ok) {
      toast.success('آیتم جدید با موفقیت اضافه شد');
      setFormItem({ name: '', description: '', price: 0, category: '' });
      fetchMenu();
    } else {
      toast.error('خطا در افزودن آیتم');
    }
  };

  const handleDelete = async (id: number) => {
    const itemToDelete = items.find((item) => item.id === id);
    if (!itemToDelete) return;

    const confirmed = confirm(`آیا "${itemToDelete.name}" را حذف می‌کنید؟`);
    if (!confirmed) return;

    const res = await fetch(`http://localhost:3000/menu/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success(`"${itemToDelete.name}" با موفقیت حذف شد`);
      fetchMenu();
    } else {
      const err = await res.json();
      toast.error('خطا در حذف: ' + err.error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    const response = await fetch(`http://localhost:3000/menu/${editingItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formItem),
    });

    if (response.ok) {
      toast.success('آیتم با موفقیت ویرایش شد');
      setEditingItem(null);
      setFormItem({ name: '', description: '', price: 0, category: '' });
      fetchMenu();
    } else {
      const err = await response.json();
      toast.error('خطا در ویرایش: ' + err.error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <ToastContainer rtl autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4 text-center">پنل مدیریت منو</h2>

      <div className="grid gap-3 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="نام غذا"
          value={formItem.name}
          onChange={(e) => setFormItem({ ...formItem, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="توضیحات"
          value={formItem.description}
          onChange={(e) => setFormItem({ ...formItem, description: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="قیمت"
          value={formItem.price}
          onChange={(e) => setFormItem({ ...formItem, price: +e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={formItem.category}
          onChange={(e) => setFormItem({ ...formItem, category: e.target.value })}
        >
          <option value="">انتخاب دسته‌بندی</option>
          <option value="main">غذای اصلی</option>
          <option value="appetizer">پیش‌غذا</option>
          <option value="dessert">دسر</option>
          <option value="drink">نوشیدنی</option>
        </select>

        {editingItem ? (
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdate}>
            بروزرسانی
          </button>
        ) : (
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAdd}>
            افزودن
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow-sm text-right">
            <div className="font-bold">{item.name}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
            <div>
              {item.price.toLocaleString()} تومان | {item.category}
            </div>
            <div className="flex gap-2 mt-2 justify-end">
              <button
                className="bg-yellow-400 px-3 py-1 text-sm rounded"
                onClick={() => handleEdit(item)}
              >
                ویرایش
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 text-sm rounded"
                onClick={() => handleDelete(item.id)}
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
