export interface DiffSegment {
  type: 'equal' | 'added' | 'removed';
  value: string;
}

export function computeLineDiff(original: string, modified: string): DiffSegment[] {
  const a = original.split(/\r?\n/);
  const b = modified.split(/\r?\n/);
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (a[i] === b[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const segments: DiffSegment[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      segments.push({ type: 'equal', value: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      segments.push({ type: 'removed', value: a[i] });
      i++;
    } else {
      segments.push({ type: 'added', value: b[j] });
      j++;
    }
  }
  while (i < m) segments.push({ type: 'removed', value: a[i++] });
  while (j < n) segments.push({ type: 'added', value: b[j++] });

  return segments;
}
