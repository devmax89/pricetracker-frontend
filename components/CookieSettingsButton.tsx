'use client';

export default function CookieSettingsButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('occhioalprezzo_cookie_consent');
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Modifica Preferenze Cookie
    </button>
  );
}