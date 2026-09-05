export const formatDate = (dateString, lang = 'en') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const locale = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatPercent = (decimal) => {
  if (decimal === null || decimal === undefined) return '0%';
  return `${Math.round(decimal * 100)}%`;
};

export const getRiskBadgeClass = (riskLevel) => {
  switch (riskLevel) {
    case 'HIGH':
      return 'bg-rose-100 text-rose-800 border-rose-300';
    case 'MODERATE':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'LOW':
    default:
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  }
};
