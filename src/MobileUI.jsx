import React, { useMemo, useState } from "react";
import {
  Zap,
  Languages,
  Search,
  Rocket,
  Globe,
  Info,
  Star,
  Coins,
  Users,
  Award,
  Shield,
  Share2,
  Heart,
  BarChart3,
  ShoppingCart,
  X
} from "lucide-react";

const IconButton = ({ title, onClick, children }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className="p-2.5 rounded-2xl bg-white/90 backdrop-blur border border-white/60 shadow-lg active:scale-95 transition"
  >
    {children}
  </button>
);

const Drawer = ({ open, onClose, lang, t, items, onMerchant }) => {
  return (
    <div className={`fixed inset-0 z-[80] ${open ? "visible" : "invisible"}`}>
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 ${lang === "ar" ? "right-0" : "left-0"} h-full w-[86%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : lang === "ar" ? "translate-x-full" : "-translate-x-full"
        }`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="p-6 flex items-center justify-between border-b">
          <div className="font-black text-lg text-slate-900">مقارن</div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => {
                it.action();
                onClose();
              }}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition"
              type="button"
            >
              <it.icon size={18} className="text-slate-600" />
              <span className="font-black text-slate-800">{it.label}</span>
            </button>
          ))}

          <button
            onClick={() => {
              onMerchant();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 text-white font-black active:scale-95 transition"
            type="button"
          >
            <Award size={18} />
            {t.merchant}
          </button>
        </div>
      </div>
    </div>
  );
};

const Hero = ({
  lang,
  t,
  realSearchCount,
  searchQuery,
  setSearchQuery,
  isSearching,
  onSearch,
  trendingKeywords
}) => {
  return (
    <header className="relative overflow-hidden">
      <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-900 text-white rounded-b-[2.5rem] sm:rounded-b-[4rem] shadow-2xl px-4 sm:px-6 pt-10 pb-10">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-blue-500 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-indigo-500 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-black mb-6 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span>
              {realSearchCount.toLocaleString()} {t.realSearch}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
            {t.heroTitlePart1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
              {t.heroTitlePart2}
            </span>
          </h1>

          <p className="mt-4 text-blue-100/90 text-sm sm:text-base md:text-xl font-bold leading-relaxed">
            {t.heroDesc}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="mt-7 sm:mt-8 max-w-xl mx-auto"
          >
            <div className="bg-white/10 border border-white/15 backdrop-blur-xl rounded-[2rem] p-3 sm:p-4 shadow-2xl">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    lang === "ar" ? "right-4" : "left-4"
                  } text-white/60`}
                  size={20}
                />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full ${
                    lang === "ar" ? "pr-12" : "pl-12"
                  } py-4 px-4 rounded-2xl bg-white text-slate-900 font-black text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-400/40`}
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="mt-3 w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition font-black text-white shadow-lg disabled:bg-slate-400 flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <span className="animate-pulse">{t.analyzing}</span>
                ) : (
                  <>
                    {t.searchBtn} <Rocket size={18} />
                  </>
                )}
              </button>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-black text-blue-200/70">
                <span className="opacity-80">{t.trendingLabel}</span>
                {(trendingKeywords || []).slice(0, 6).map((kw, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSearchQuery(kw)}
                    className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 active:scale-95 transition"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

const Results = ({
  t,
  lang,
  results,
  aiSummary,
  isFavorite,
  toggleFavorite,
  onShare,
  getStoreLink
}) => {
  if (!results) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-10 pb-10">
      {aiSummary && (
        <div className="bg-slate-900 text-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-white/10">
          <div className="flex items-center gap-2 text-blue-200 text-xs font-black mb-3">
            <BarChart3 size={16} />
            {t.aiTitle}
          </div>
          <div className="font-black text-xl sm:text-2xl leading-snug">
            “{aiSummary.summary}”
          </div>
          <div className="mt-4 bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="text-xs font-black text-blue-200">{t.winner}</div>
            <div className="font-black">{aiSummary.verdict}</div>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {results.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden"
          >
            <div className={`${item.storeColor} text-white p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-black text-xl tracking-tight">{item.store}</div>
                  <div className="mt-2 inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black">
                    <Shield size={10} /> {t.trusted}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onShare(item)}
                    className="p-3 rounded-2xl bg-white/20 active:scale-95 transition"
                    title="Share"
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(item)}
                    className="p-3 rounded-2xl bg-white/20 active:scale-95 transition"
                    title="Favorite"
                  >
                    <Heart
                      size={18}
                      className={isFavorite(item) ? "fill-red-500 text-red-500" : ""}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-end justify-between border-b border-dashed border-slate-200 pb-4">
                <div className="font-black text-4xl tracking-tight text-slate-900">
                  {item.price}
                  <span className="text-sm text-slate-400 mx-2">{item.currency}</span>
                </div>
                <div className="text-xs text-red-400 line-through font-black opacity-60">
                  {item.originalPrice}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <div className="text-sm font-black text-slate-900">
                    {item.rating} {t.rating}
                    <div className="text-[11px] text-slate-500 font-bold">
                      {t.from} {item.reviewsCount?.toLocaleString?.() || item.reviewsCount} {t.client}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                  <Shield size={18} className="text-blue-500" />
                  <div className="text-sm font-black text-slate-900">
                    {t.warrantyTitle}
                    <div className="text-[11px] text-slate-500 font-bold">{item.warranty}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                  <ShoppingCart size={18} className="text-indigo-500" />
                  <div className="text-sm font-black text-slate-900">
                    {t.deliveryTitle}
                    <div className="text-[11px] text-slate-500 font-bold">{item.delivery}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 text-blue-900 p-4 rounded-2xl text-xs font-bold leading-relaxed">
                “{item.aiAnalysis}”
              </div>

              <a
                href={getStoreLink(item.storeKey)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full block text-center bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-black active:scale-[0.99] transition shadow-lg"
              >
                {t.visitStore}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function MobileUI(props) {
  const {
    lang,
    t,
    view,
    setView,
    realSearchCount,
    searchQuery,
    setSearchQuery,
    isSearching,
    results,
    aiSummary,
    resetToHome,
    scrollToSection,
    handleLogoClick,
    toggleLanguage,
    openMySpace,
    handleSearch,
    adminConfig,
    isFavorite,
    toggleFavorite,
    handleShare,
    getStoreLink
  } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  const items = useMemo(
    () => [
      { id: "home", label: t.home, icon: Globe, action: resetToHome },
      { id: "about", label: t.about, icon: Info, action: () => scrollToSection("about") },
      { id: "features", label: t.features, icon: Star, action: () => scrollToSection("why-trust") },
      { id: "earn", label: t.earn, icon: Coins, action: () => scrollToSection("how-we-earn") },
      { id: "partners", label: t.partners, icon: Users, action: () => scrollToSection("partners") }
    ],
    [t, resetToHome, scrollToSection]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 pt-4">
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/60 px-3 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 transition"
                onClick={() => setMenuOpen(true)}
                type="button"
                title="Menu"
              >
                <div className="w-5 h-5 grid gap-1">
                  <span className="block h-0.5 bg-slate-700 rounded" />
                  <span className="block h-0.5 bg-slate-700 rounded" />
                  <span className="block h-0.5 bg-slate-700 rounded" />
                </div>
              </button>

              <button onClick={handleLogoClick} className="flex items-center gap-2" type="button">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-2xl text-white shadow-lg">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="font-black text-slate-900 tracking-tight text-base sm:text-lg">مقارن</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <IconButton title={t.mySpace} onClick={openMySpace}>
                <Award size={18} className="text-slate-700" />
              </IconButton>
              <IconButton title="Language" onClick={toggleLanguage}>
                <Languages size={18} className="text-slate-700" />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-24 sm:h-28" />

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        lang={lang}
        t={t}
        items={items}
        onMerchant={() => setView("merchant")}
      />

      {/* HOME */}
      {view === "home" && (
        <>
          <Hero
            lang={lang}
            t={t}
            realSearchCount={realSearchCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearching={isSearching}
            onSearch={() => handleSearch({ preventDefault: () => {} })}
            trendingKeywords={adminConfig?.trendingKeywords || []}
          />

          {isSearching && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
              <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100 text-center">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 border-6 border-slate-100 rounded-full" />
                  <div className="absolute inset-0 border-6 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-slate-900 font-black text-xl">{t.loadingTitle}</h3>
                <p className="text-slate-400 font-bold text-sm mt-2">{t.loadingDesc}</p>
              </div>
            </div>
          )}

          <Results
            t={t}
            lang={lang}
            results={results}
            aiSummary={aiSummary}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onShare={handleShare}
            getStoreLink={getStoreLink}
          />
        </>
      )}

      {/* لو انت فتحت صفحات ثانية عندك (admin/merchant/privacy/contact) خلها من App.js */}
    </div>
  );
}
