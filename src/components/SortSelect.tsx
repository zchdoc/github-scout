"use client";

import { SortOption } from "@/lib/types";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
      <label htmlFor="sort" className="text-sm text-[var(--muted)] shrink-0 whitespace-nowrap">
        排序
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="min-w-0 flex-1 sm:flex-none sm:w-auto px-3 py-2 border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] text-[var(--foreground)] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all cursor-pointer"
      >
        <option value="date">收录日期（最新）</option>
        <option value="stars">Star 数（最高）</option>
      </select>
    </div>
  );
}
