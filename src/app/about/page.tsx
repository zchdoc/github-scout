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
            <strong>GitHub Scout（GitHub 拾光）</strong>是一个面向中文开发者的
            GitHub 项目实用策展库。我们的定位是<strong>「能为我所用」</strong>——
            每日深度解析一个实用开源项目，不只是告诉你这个项目好在哪，
            更要让你知道<strong>怎么跑起来、怎么用到自己的场景</strong>。
          </p>
          <p className="leading-relaxed text-[var(--muted)]">
            名字灵感：「拾光」既是"捡拾光芒"——发掘那些闪闪发光的开源项目，
            也谐音"时光"——记录开源世界每一天的精彩。
          </p>
        </div>
      </section>

      <section className="mb-12 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">📖</span> 内容特色
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <strong className="block mb-1">每日一个深度解析</strong>
                <p className="text-sm text-[var(--muted)]">
                  不是五个浅尝辄止，而是一个深入到底。每天只推荐一个项目，但给你足够的信息去实际使用它。
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <strong className="block mb-1">有什么用（useForZh）</strong>
                <p className="text-sm text-[var(--muted)]">
                  明确告诉你这个项目面向谁、解决什么问题，帮你快速判断是否符合你的需求。
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <strong className="block mb-1">实现了什么（featuresZh）</strong>
                <p className="text-sm text-[var(--muted)]">
                  3-6 个核心功能点，让你对项目的能力边界有清晰认知。
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                4
              </span>
              <div>
                <strong className="block mb-1">怎么跑起来（howToRunZh）</strong>
                <p className="text-sm text-[var(--muted)]">
                  可复制的安装运行命令，标注依赖和注意事项，降低上手门槛。
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                5
              </span>
              <div>
                <strong className="block mb-1">怎么为我所用（forYouZh）</strong>
                <p className="text-sm text-[var(--muted)]">
                  具体场景建议，告诉你"今天就能做的第一件事"，让项目真正落地。
                </p>
              </div>
            </li>
          </ul>
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
                <strong className="block mb-1">实用优先</strong>
                <p className="text-sm text-[var(--muted)]">
                  项目必须能解决实际问题，不收录纯概念验证或玩具项目
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <strong className="block mb-1">可跑起来</strong>
                <p className="text-sm text-[var(--muted)]">
                  有清晰的文档，能在合理时间内完成安装和基本使用
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <strong className="block mb-1">活跃维护</strong>
                <p className="text-sm text-[var(--muted)]">
                  优先选择近期有更新、社区活跃的项目，避免"弃坑"仓库
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
                  与当下热门技术趋势相关（如 AI/LLM、Web、可视化），容易引发共鸣
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
              <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-[var(--success)] text-white">
                v0.2
              </span>
              <div>
                <strong>深度内容升级</strong>
                <p className="text-sm text-[var(--muted)]">
                  每日一个深度项目；新增用途、功能、安装、场景等实用字段
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
            欢迎提交你发现的优质项目！编辑{" "}
            <code className="px-1.5 py-0.5 rounded bg-[var(--tag-bg)] text-[var(--tag-text)] text-sm">
              data/repos.json
            </code>{" "}
            文件，按照现有格式添加新项目（包含深度字段），然后提交 Pull Request。
          </p>
          <p className="text-sm text-[var(--muted)]">
            贡献要求：不只是复制 README，要提供真正有用的中文内容——
            让读者看完就知道怎么跑起来、怎么用到自己的场景。
          </p>
        </div>
      </section>
    </div>
  );
}
