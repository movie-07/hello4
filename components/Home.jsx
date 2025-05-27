'use client';

import { useEffect, useState } from 'react';
import ItemForm from '@/components/ItemForm';
import ItemCard from '@/components/ItemCard';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchItems();
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch(`/api/items?q=${encodeURIComponent(search)}&page=1&limit=100`);
      const data = await res.json();
      // Expecting shape: { movies: [...], totalCount: number }
      setItems(Array.isArray(data.movies) ? data.movies : []);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  }

  async function createOrUpdateItem(item) {
    const url = editingItem ? `/api/items/${editingItem._id}` : '/api/items';
    const method = editingItem ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error('Error saving item:', err);
    }
  }

  async function deleteItem(id) {
    try {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  }

  return (
    <main className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">vsdk uplod kor </h1>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by title, tags, or description"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ItemForm onSubmit={createOrUpdateItem} editingItem={editingItem} />

      {loading ? (
        <p className="text-center text-gray-500">Loading items...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={setEditingItem}
              onDelete={deleteItem}
            />
          ))}
        </div>
      )}
    </main>
  );
}
