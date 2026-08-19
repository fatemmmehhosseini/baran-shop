"use client";
import { Search, X } from "lucide-react";
import { useEffect, useState, useRef, KeyboardEvent } from "react";
import SearchResult from "./SearchResult";
import { SearchProduct } from "@/types/product.type";

type Props = {
  mode: "desktop" | "mobile";
  onClose?: () => void;
};

export default function SearchBox({ mode, onClose }: Props) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

 
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      return;
    }
    if (query.trim().length < 2) {
    setResults([]);
    setIsOpen(false);
    setLoading(false);
    return;
    }  

    setIsOpen(true);
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!res.ok) throw new Error("Search failed");
        
        const data: SearchProduct[] = await res.json();
        setResults(data);
        setHighlightedIndex(-1); 
      } catch  {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);

      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && results[highlightedIndex]) {
        handleSelect(results[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
      setResults([]);
    }
  };

  const handleSelect = (product: SearchProduct) => {
    setQuery(""); 
    setResults([]); 
    setIsOpen(false);
    
    if (mode === "mobile" && onClose) {
      onClose();
    }
    
  };

  const clearInput = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className={`relative ${mode === "desktop" ? "w-full max-w-xl" : "w-full"}`}>
      <label className="relative flex items-center">
        <Search className="pointer-events-none absolute right-4 h-5 w-5 text-text-secondary" />
        
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="search"
          placeholder={"جستجوی محصول، دسته‌بندی یا برند..."}
          className="h-12 w-full rounded-full border border-border bg-surface pr-11 pl-4 text-sm outline-none transition focus:border-primary placeholder:text-text-secondary focus:ring-2 focus:ring-light/20"
        />

        {query && (
          <button
            onClick={clearInput}
            aria-label="پاک کردن جستجو"
            className="absolute left-4 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition hover:bg-gray-300"
            type="button"
          >
            <X size={14} aria-hidden="true"/>
          </button>
        )}
      </label>

      {isOpen && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
          
          {results.length > 0 && (
            <div className="flex items-center justify-between border-b border-border bg-surface/50 px-4 py-1.5 text-[10px] text-text-secondary">
              <span>↑ ↓ حرکت بین نتایج</span>
              <span>Enter انتخاب</span>
            </div>
          )}

          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8 text-sm text-text-secondary">
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                در حال جستجو...
              </div>
            ) : results.length > 0 ? (
              results.map((item, index) => (
                <SearchResult
                  key={item.id}
                  product={item}
                  isHighlighted={index === highlightedIndex}
                  onClick={() => handleSelect(item)}
                />
              ))
            ) : (
              <div className="p-8 text-center text-sm text-text-secondary">
                محصولی با این نام پیدا نشد.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}