export const timeAgo = (dateString: string): string => {
  try {
    const now = new Date();
    const past = new Date(dateString);
    if (isNaN(past.getTime())) {
      return 'Tanggal tidak valid';
    }
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays} hari yang lalu`;
    if (diffHours > 0) return `${diffHours} jam yang lalu`;
    if (diffMinutes > 0) return `${diffMinutes} menit yang lalu`;
    return 'Baru saja';
  } catch {
    return 'Tanggal tidak valid';
  }
};