"use client";

import { useState } from "react";
import { Repo } from "@/lib/types";
import { formatStars } from "@/lib/utils";

interface RepoCardProps {
  repo: Repo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopyTweet = async () => {
    try {
      await navigator.clipboard.writeText(repo.tweetDraftZh);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const difficultyColor = {
    "轻松": "bg-green-500/20 text-green-400 border-green-500/30",
    "中等": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "硬核": "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <article className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 hover:border-[var(--accent)] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-lg font-semibold hover:text-[var(--accent)] transition-colors"
          >
            <span className="truncate">{repo.fullName}</span>
            <svg
              className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {repo.difficulty && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${difficultyColor[repo.difficulty]}`}>
              {repo.difficulty}
            </span>
          )}
          <div className="flex items-center gap-1 text-sm text-[var(--muted)]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium">{formatStars(repo.starsApprox)}</span>
          </div>
        </div>
      </div>

      <p className="text-[var(--foreground)] font-medium mb-2 leading-relaxed">
        {repo.hookZh}
      </p>

      <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed">
        {repo.useForZh}
      </p>

      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex flex-wrap gap-2">
          {repo.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--tag-bg)] text-[var(--tag-text)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--tag-bg)] text-[var(--tag-text)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
        >
          {expanded ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              收起
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              深入了解
            </>
          )}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--card-border)] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* 功能特性 */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="text-[var(--accent)]">✨</span> 实现了什么
            </h4>
            <ul className="space-y-1.5">
              {repo.featuresZh.map((feature, index) => (
                <li key={index} className="text-sm text-[var(--muted)] flex items-start gap-2">
                  <span className="text-[var(--accent)] flex-shrink-0">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 怎么跑起来 */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="text-[var(--accent)]">🚀</span> 怎么跑起来
            </h4>
            <div className="bg-[var(--background)] rounded-lg p-3 text-sm overflow-x-auto">
              <pre className="text-[var(--muted)] whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {repo.howToRunZh}
              </pre>
            </div>
          </div>

          {/* 怎么为我所用 */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="text-[var(--accent)]">💡</span> 怎么为我所用
            </h4>
            <p className="text-sm text-[var(--muted)] leading-relaxed bg-[var(--accent)]/10 rounded-lg p-3 border border-[var(--accent)]/20">
              {repo.forYouZh}
            </p>
          </div>

          {/* Demo 链接 */}
          {repo.demoUrl && (
            <div>
              <a
                href={repo.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                在线体验 Demo
              </a>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[var(--card-border)]">
        <button
          onClick={handleCopyTweet}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            copied
              ? "bg-[var(--success)] text-white"
              : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              复制推文
            </>
          )}
        </button>
      </div>

      {copied && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full z-10">
          <div className="copy-toast bg-[var(--foreground)] text-[var(--background)] px-3 py-1.5 rounded-lg text-sm shadow-lg">
            推文已复制到剪贴板 ✓
          </div>
        </div>
      )}
    </article>
  );
}
