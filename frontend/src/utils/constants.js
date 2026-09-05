export const CROPS = [
  { id: 'Cotton', name: 'Cotton', nameMr: 'कापूस', nameHi: 'कपास', icon: '🌱' },
  { id: 'Soybean', name: 'Soybean', nameMr: 'सोयाबीन', nameHi: 'सोयाबीन', icon: '🌿' },
  { id: 'Tomato', name: 'Tomato', nameMr: 'टोमॅटो', nameHi: 'टमाटर', icon: '🍅' },
  { id: 'Paddy', name: 'Paddy / Rice', nameMr: 'भात', nameHi: 'धान', icon: '🌾' },
  { id: 'Sugarcane', name: 'Sugarcane', nameMr: 'ऊस', nameHi: 'गन्ना', icon: '🎋' },
];

export const DISTRICTS = [
  'Akola', 'Amravati', 'Buldhana', 'Yavatmal', 'Wardha', 'Nagpur', 
  'Nashik', 'Pune', 'Kolhapur', 'Solapur', 'Chandrapur', 'Jalgaon', 
  'Chhatrapati Sambhajinagar', 'Ahmednagar', 'Nanded', 'Latur', 'Satara'
];

export const RISK_LEVELS = {
  LOW: {
    label: 'LOW',
    color: 'bg-emerald-500',
    lightBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
    hex: '#10b981',
    description: 'Minimal localized disease pressure. Routine scouting recommended.'
  },
  MODERATE: {
    label: 'MODERATE',
    color: 'bg-amber-500',
    lightBg: 'bg-amber-50 text-amber-800 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    hex: '#f59e0b',
    description: 'Conditions favorable for pathogen germination. Implement Tier 1-2 IPM measures.'
  },
  HIGH: {
    label: 'HIGH',
    color: 'bg-rose-600',
    lightBg: 'bg-rose-50 text-rose-800 border-rose-200',
    badge: 'bg-rose-100 text-rose-800',
    hex: '#e11d48',
    description: 'Active outbreak alert! High humidity and spore proliferation. Immediate IPM action required.'
  }
};

export const SEVERITY_LEVELS = {
  MILD: { label: 'Mild', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  MODERATE: { label: 'Moderate', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  SEVERE: { label: 'Severe', badge: 'bg-rose-100 text-rose-800 border-rose-200' },
};
