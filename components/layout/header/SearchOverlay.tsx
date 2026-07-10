import { Search } from 'lucide-react';
import React from 'react'

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({open,onClose}: Props) {
  return (
    <>
    {open && (
  <div
    className="fixed inset-0 z-100 bg-black/20 backdrop-blur-sm "
    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="mx-auto mt-5 w-[92%] rounded-2xl bg-white p-4 shadow-2xl"
    >
      <div className="flex items-center gap-3">

        <Search className="h-5 w-5 text-primary" />

        <input
          autoFocus
          type="text"
          placeholder="جستجوی محصول..."
          className="flex-1 bg-transparent outline-none"
        />

      </div>
    </div>
  </div>
)}
</>
  )
}
