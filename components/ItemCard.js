export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="border p-4 space-y-2">
      <h2 className="text-xl font-bold">{item.title}</h2>
      <p>{item.description}</p>
      <div className="flex gap-2 flex-wrap">
        {item.tags.map((tag, idx) => <span key={idx} className="bg-gray-200 px-2 py-1 text-sm">{tag}</span>)}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[item.img1, item.img2, item.img3].map((src, i) => src && <img key={i} src={src} alt="img" className="w-full h-24 object-cover" />)}
      </div>
      <p><strong>Runtime:</strong> {item.runtime}</p>
      <p><strong>Language:</strong> {item.language}</p>
      <p><strong>Date:</strong> {item.date}</p>
      <p><strong>Rating:</strong> {item.rating}</p>
      <p><strong>Genre:</strong> {item.genre?.join(', ')}</p>
      <a href={item.downloadLink} target="_blank" className="text-blue-600 underline">Download</a>
      <div className="flex gap-2">
        <button onClick={() => onEdit(item)} className="bg-yellow-400 px-2 py-1">Edit</button>
        <button onClick={() => onDelete(item._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
      </div>
    </div>
  );
}
