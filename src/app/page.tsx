"use client";

import { useState, useMemo } from "react";
import RepoCard from "@/components/RepoCard";
import TagFilter from "@/components/TagFilter";
import SearchBar from "@/components/SearchBar";
import SortSelect from "@/components/SortSelect";
import { SortOption } from "@/lib/types";
import { getAllTags, groupByDate, getDateLabel } from "@/lib/utils";
import { loadRepos } from "@/lib/load-repos";

const repos = loadRepos();

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("date");

  const allTags = useMemo(() => getAllTags(repos), []);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const filteredRepos = useMemo(() => {
    let result = repos;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.fullName.toLowerCase().includes(query) ||
          repo.hookZh.toLowerCase().includes(query) ||
          repo.whyZh.toLowerCase().includes(query) ||
          repo.useForZh.toLowerCase().includes(query) ||
          repo.forYouZh.toLowerCase().includes(query) ||
          repo.featuresZh.some((f) => f.toLowerCase().includes(query)) ||
          (repo.howItWorksZh?.toLowerCase().includes(query) ?? false) ||
          (repo.coreTechZh?.some((t) => t.toLowerCase().includes(query)) ?? false) ||
          repo.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((repo) =>
        selectedTags.some((tag) => repo.tags.includes(tag))
      );
    }

    return result;
  }, [searchQuery, selectedTags]);

  const sortedAndGroupedRepos = useMemo(() => {
    if (sortOption === "stars") {
      return {
        type: "flat" as const,
        repos: [...filteredRepos].sort((a, b) => b.starsApprox - a.starsApprox),
      };
    }

    const sorted = [...filteredRepos].sort(
      (a, b) => new Date(b.curatedDate).getTime() - new Date(a.curatedDate).getTime()
    );
    const grouped = groupByDate(sorted);

    const dates = Array.from(grouped.keys()).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    return {
      type: "grouped" as const,
      dates,
      groups: grouped,
    };
  }, [filteredRepos, sortOption]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-3">实用开源项目深度库</h2>
        <p className="text-[var(--muted)] max-w-2xl mx-auto">
          每日一个深度项目解析——不只是「看一眼」，而是「能为我所用」。告诉你怎么跑起来、怎么用到自己的场景。
        </p>
      </section>

      <section className="mb-8 space-y-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearTags}
        />
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-[var(--muted)]">
            共 <span className="font-medium text-[var(--foreground)]">{filteredRepos.length}</span> 个项目
            {selectedTags.length > 0 && (
              <span> · 已筛选 {selectedTags.length} 个标签</span>
            )}
          </p>
          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>
      </section>

      {filteredRepos.length === 0 ? (
        <section className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--card-bg)] mb-4">
            <svg
              className="w-8 h-8 text-[var(--muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">没有找到匹配的项目</h3>
          <p className="text-[var(--muted)] mb-4">
            尝试调整搜索关键词或清除标签筛选
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTags([]);
            }}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            重置筛选条件
          </button>
        </section>
      ) : sortedAndGroupedRepos.type === "flat" ? (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span>按 Star 数排序</span>
            <span className="text-sm font-normal text-[var(--muted)]">
              ({filteredRepos.length} 个项目)
            </span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {sortedAndGroupedRepos.repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      ) : (
        <div className="space-y-10">
          {sortedAndGroupedRepos.dates.map((date) => {
            const reposInGroup = sortedAndGroupedRepos.groups.get(date)!;
            const isToday = date === today;
            const label = getDateLabel(date, isToday);

            return (
              <section key={date} className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-3">
                  {isToday && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--success)] text-white">
                      NEW
                    </span>
                  )}
                  <span>{label}</span>
                  <span className="text-sm font-normal text-[var(--muted)]">
                    ({reposInGroup.length} 个项目)
                  </span>
                </h3>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {reposInGroup.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
