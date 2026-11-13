export function deduplicateLines(
  text: string,
  options: { caseSensitive: boolean; sortOrder: 'none' | 'asc' | 'desc'; removeEmpty: boolean }
): { output: string; removedCount: number } {
  const rawLines = text.split(/\r?\n/);
  const seen = new Set<string>();
  const unique: string[] = [];
  let removedCount = 0;

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (options.removeEmpty && !trimmed) {
      removedCount++;
      continue;
    }
    const key = options.caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(line);
    } else {
      removedCount++;
    }
  }

  if (options.sortOrder === 'asc') unique.sort((a, b) => a.localeCompare(b));
  if (options.sortOrder === 'desc') unique.sort((a, b) => b.localeCompare(a));

  return { output: unique.join('\n'), removedCount };
}

export interface ReplaceRule {
  id: string;
  find: string;
  replace: string;
  useRegex: boolean;
  caseSensitive: boolean;
}

export function bulkFindAndReplace(text: string, rules: ReplaceRule[]): { output: string; totalMatches: number; error?: string } {
  let output = text;
  let totalMatches = 0;

  try {
    for (const rule of rules) {
      if (!rule.find) continue;
      const flags = rule.caseSensitive ? 'g' : 'gi';
      const pattern = rule.useRegex
        ? new RegExp(rule.find, flags)
        : new RegExp(rule.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);

      const matches = output.match(pattern);
      if (matches) totalMatches += matches.length;
      output = output.replace(pattern, rule.replace);
    }
    return { output, totalMatches };
  } catch (err) {
    return { output, totalMatches, error: err instanceof Error ? err.message : 'Invalid Regex pattern' };
  }
}

export function combineNames(listA: string[], listB: string[], separator = ''): string[] {
  const results: string[] = [];
  for (const a of listA.map((s) => s.trim()).filter(Boolean)) {
    for (const b of listB.map((s) => s.trim()).filter(Boolean)) {
      results.push(`${a}${separator}${b}`);
    }
  }
  return results;
}
