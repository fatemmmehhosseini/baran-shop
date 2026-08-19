"use client";
import SearchBox from '@/components/ui/search/SearchBox';


type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto mt-6 w-[92%] max-w-2xl"
      >

        <SearchBox mode="mobile" onClose={onClose} />
      </div>
    </div>
  );
}