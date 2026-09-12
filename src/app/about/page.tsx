import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 | GitHub Scout · GitHub 拾光",
  description: "了解 GitHub Scout 的策展标准和项目愿景",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        关于 GitHub Scout
      </h1>

      <section className="mb-12 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🎯</span> 项目愿景
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 space-y-3">
          <p className="leading-relaxed">
            <strong>GitHub Scout（GitHub 拾光）</strong>是一个面向中文 X/Twitter 内容创作者的
            GitHub 项目策展库。我们每日精选值得关注的开源项目，提供简洁有力的中文推文文案，
            帮助你高效产出优质内容。
          </p>
          <p className="leading-relaxed text-[var(--muted)]">
            名字灵感：「拾光」既是"捡拾光芒"——发掘那些闪闪发光的开源项目，
            也谐音"时光"——记录开源世界每一天的精彩。
          </p>
        </div>
      </section>

      <section className="mb-12 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">📋</span> 策展标准
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <strong className="block mb-1">有趣或有用</strong>
                <p className="text-sm text-[var(--muted)]">
                  项目要么能解决实际问题，要么足够新奇有趣，能引发讨论和分享欲
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <strong className="block mb-1">活跃维护</strong>
                <p className="text-sm text-[var(--muted)]">
                  优先选择近期有更新、有明确 roadmap 的项目，避免"弃坑"仓库
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <strong className="block mb-1">文档清晰</strong>
                <p className="text-sm text-[var(--muted)]">
                  README 结构清晰，有演示或截图，方便读者快速理解项目价值
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] flex items-center justify-center font-bold text-sm">
                4
              </span>
              <div>
                <strong className="block mb-1">话题性强</strong>
                <p className="text-sm text-[var(--muted)]">
                  与当下热门技术趋势相关（如 AI/LLM、Web3、可视化），容易引发共鸣
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] flex items-center justify-center font-bold text-sm">
                5
              </span>
              <div>
                <strong className="block mb-1">多元覆盖</strong>
                <p className="text-sm text-[var(--muted)]">
                  平衡不同领域（前端/后端/AI/工具），避免单一类型垄断
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🚀</span> 路线图
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-[var(--success)] text-white">
                v0.1
              </span>
              <div>
                <strong>项目库 MVP</strong>
                <p className="text-sm text-[var(--muted)]">
                  搜索、标签筛选、日期分组、一键复制推文
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-[var(--tag-bg)] text-[var(--tag-text)]">
                v0.2
              </span>
              <div>
                <strong>Repo 星球（3D 地球可视化）</strong>
                <p className="text-sm text-[var(--muted)]">
                  交互式 3D 地球展示全球热门项目分布，探索式发现体验
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-[var(--tag-bg)] text-[var(--tag-text)]">
                v0.3
              </span>
              <div>
                <strong>用户收藏 & 个性化推荐</strong>
                <p className="text-sm text-[var(--muted)]">
                  登录后收藏项目，基于偏好的智能推荐
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">💡</span> 参与贡献
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 space-y-3">
          <p className="leading-relaxed">
            欢迎提交你发现的优质项目！只需要编辑{" "}
            <code className="px-1.5 py-0.5 rounded bg-[var(--tag-bg)] text-[var(--tag-text)] text-sm">
              data/repos.json
            </code>{" "}
            文件，按照现有格式添加新项目，然后提交 Pull Request。
          </p>
          <p className="text-sm text-[var(--muted)]">
            详细的贡献指南请参阅项目 README。
          </p>
        </div>
      </section>
    </div>
  );
}
