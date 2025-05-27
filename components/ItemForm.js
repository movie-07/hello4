'use client';
import { useState, useEffect } from 'react';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance',
  'Thriller', 'Western', 'web-series' 
];

const defaultForm = {
  title: '',
  description: '',
  tags: '',
  img1: '',
  img2: '',
  img3: '',
  downloadLink: '',
  runtime: '',
  language: '',
  date: '',
  rating: '',
  genre: []
};

export default function ItemForm({ onSubmit, editingItem }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingItem) {
      setForm({
        ...defaultForm,
        ...editingItem,
        tags: editingItem.tags?.join(', ') || '',
        genre: editingItem.genre || []
      });
    }
  }, [editingItem]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleGenreChange(e) {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setForm(prev => ({ ...prev, genre: selected }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
    });
    setForm(defaultForm);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input required name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
      <textarea required name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
      <input required name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="border p-2 w-full" />
      <input required name="img1" value={form.img1} onChange={handleChange} placeholder="ATA BHI DITAI HOBY IMAGE POSTER JATA FRIST PAGE A DKA" className="border p-2 w-full" />
      <input required name="img2" value={form.img2} onChange={handleChange} placeholder="Image 2 URL" className="border p-2 w-full" />
      <input required name="img3" value={form.img3} onChange={handleChange} placeholder="Image 3 URL" className="border p-2 w-full" />
      <input required name="downloadLink" value={form.downloadLink} onChange={handleChange} placeholder="Download Link" className="border p-2 w-full" />
      <input required name="runtime" value={form.runtime} onChange={handleChange} placeholder="Runtime" className="border p-2 w-full" />
      <input required name="language" value={form.language} onChange={handleChange} placeholder="Language (e.g. Hindi, English)" className="border p-2 w-full" />
      <inpu required name="date" value={form.date} onChange={handleChange} placeholder="Date" className="border p-2 w-full" />
      <input required name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" className="border p-2 w-full" />

      <select required multiple value={form.genre} onChange={handleGenreChange} className="border p-2 w-full h-32">
        {GENRES.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editingItem ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
