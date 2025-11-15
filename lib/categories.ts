export const CATEGORIES = [
  // Principali (Featured)
  { value: 'gpu', label: 'Schede Video', icon: '🎮', featured: true },
  { value: 'cpu', label: 'Processori', icon: '🧠', featured: true },
  { value: 'smartphone', label: 'Smartphone', icon: '📱', featured: true },
  { value: 'console', label: 'Console', icon: '🎮', featured: true },
  { value: 'monitor', label: 'Monitor', icon: '🖥️', featured: true },
  { value: 'mouse-tastiere', label: 'Mouse & Tastiere', icon: '⌨️', featured: true },
  { value: 'notebook', label: 'Notebook', icon: '💻', featured: true },
  { value: 'tablet', label: 'Tablet', icon: '📱', featured: true }, // 🆕
  
  // Componenti PC
  { value: 'schede-madri', label: 'Schede Madri', icon: '🔲', featured: false },
  { value: 'ssd', label: 'SSD & Hard Disk', icon: '💾', featured: false },
  { value: 'ram', label: 'RAM', icon: '🎯', featured: false },
  { value: 'alimentatori', label: 'Alimentatori', icon: '⚡', featured: false },
  { value: 'dissipatori', label: 'Dissipatori', icon: '❄️', featured: false },
  { value: 'case-pc', label: 'Case PC', icon: '📦', featured: false },
  { value: 'pc-desktop', label: 'PC Desktop', icon: '🖥️', featured: false },
  
  // Periferiche & Gaming
  { value: 'cuffie-audio', label: 'Cuffie & Audio', icon: '🎧', featured: false },
  { value: 'controller-gaming', label: 'Controller Gaming', icon: '🎮', featured: false },
  { value: 'webcam-streaming', label: 'Webcam & Streaming', icon: '📷', featured: false },
  
  // Mobile & Wearables
  { value: 'smartwatch', label: 'Smartwatch', icon: '⌚', featured: false },
  
  // Casa & Intrattenimento
  { value: 'tv-video', label: 'TV, Video & Accessori', icon: '📺', featured: false },
  { value: 'hifi-audio', label: 'Hi-fi & Audio', icon: '🔊', featured: false },
  { value: 'elettrodomestici', label: 'Elettrodomestici', icon: '🏠', featured: false },
] as const;

export type CategoryValue = typeof CATEGORIES[number]['value'];

export function getCategoryLabel(value: string): string {
  return CATEGORIES.find(cat => cat.value === value)?.label || value;
}

export function getCategoryIcon(value: string): string {
  return CATEGORIES.find(cat => cat.value === value)?.icon || '🔧';
}