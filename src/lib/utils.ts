export function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return stars.toString();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return '今日';
  }
  if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return '昨日';
  }
  
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function getDateLabel(dateStr: string, isToday: boolean): string {
  if (isToday) {
    return '今日精选';
  }
  return `历史精选 · ${formatDate(dateStr)}`;
}

export function groupByDate<T extends { curatedDate: string }>(items: T[]): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  
  for (const item of items) {
    const date = item.curatedDate;
    if (!groups.has(date)) {
      groups.set(date, []);
    }
    groups.get(date)!.push(item);
  }
  
  return groups;
}

export function getAllTags(repos: { tags: string[] }[]): string[] {
  const tagSet = new Set<string>();
  for (const repo of repos) {
    for (const tag of repo.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
