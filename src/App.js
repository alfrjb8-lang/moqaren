import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingCart, Star, Shield, Info, ExternalLink, Zap, 
  BarChart3, AlertCircle, CheckCircle, MousePointer2, 
  Cpu, Rocket, Mail, Lock, Phone, MessageSquare, Award, Users, Heart,
  Instagram, Twitter, Send, ArrowLeft, Plus, Trash2, X,
  Activity, Globe, Coins, Bell, MessageCircle, BarChart2, Flame, Languages, Link, Home, Grid, Menu, Share2
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, increment, addDoc, deleteDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// --- إعدادات الخريطة ---
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

// --- الترجمة ---
const translations = {
  ar: {
    home: 'الرئيسية',
    favorites: 'المفضلة',
    about: 'من نحن',
    features: 'المميزات',
    earn: 'أرباحنا',
    partners: 'شركاء',
    merchant: 'للتجار',
    langName: 'English',
    heroTitlePart1: 'قارن بذكاء..',
    heroTitlePart2: 'وقرّر في ثوانٍ',
    heroDesc: 'محرك بحث "الزبدة". نفرّ لك السوق ونجيب لك الأرخص.',
    searchPlaceholder: 'وش بخاطرك؟ (آيفون، عطر..)',
    searchBtn: 'بحث',
    analyzing: 'جاري التحليل...',
    realSearch: 'بحث حقيقي',
    trendingLabel: '🔥 الهبة:',
    partnersTitle: 'متاجر موثوقة',
    loadingTitle: 'جالس أفرّ لك السوق..',
    loadingDesc: 'نحلل الأسعار والضمانات..',
    aiTitle: 'الزبدة',
    winner: 'خيارنا',
    trusted: 'موثوق',
    rating: 'تقييم',
    from: 'من',
    client: 'رأي',
    warrantyTitle: 'الضمان',
    deliveryTitle: 'التوصيل',
    visitStore: 'شراء الآن',
    specialOffer: 'عرض خاص',
    howItWorksTitle: 'كيف نشتغل؟',
    step1Title: 'اكتب',
    step1Desc: 'اسم المنتج.',
    step2Title: 'نبحث',
    step2Desc: 'في كل المتاجر.',
    step3Title: 'وفر',
    step3Desc: 'فلوسك ووقتك.',
    earnTitle: 'كيف نربح؟ 💰',
    earnDesc: 'الموقع مجاني لك. نربح عمولة من المتجر، وسعرك ما يزيد ريال.',
    neutrality: 'حيادية',
    noExtraCost: 'بدون زيادة',
    trustTitle: 'ليه تثق فينا؟',
    trust1Title: 'بدون وهمي',
    trust1Desc: 'نفلتر التعليقات الوهمية.',
    trust2Title: 'حماية',
    trust2Desc: 'نعلمك نوع الضمان الحقيقي.',
    trust3Title: 'لك وللزمن',
    trust3Desc: 'همنا توفيرك.',
    footerDesc: 'محرك البحث الذكي الأول في السعودية.',
    quickLinks: 'روابط',
    legal: 'قانوني',
    contactTitle: 'تواصل',
    rights: 'مقارن © 2026',
    madeIn: 'صُنع في السعودية 🇸🇦',
    privacy: 'الخصوصية',
    terms: 'الشروط',
    adminLogin: 'الإدارة',
    enterCode: 'الرمز السري',
    login: 'دخول',
    back: 'رجوع',
    toastSuccess: 'تم!',
    toastError: 'خطأ',
    freeShipping: 'مجاني',
    fastShipping: 'سريع',
    instantPickup: 'فوري',
    agentWarranty: 'وكيل',
    storeWarranty: 'متجر',
    comprehensiveWarranty: 'شامل',
    emptyFav: 'المفضلة فاضية 💔',
    shareMsg: 'شف هالعرض الرهيب:'
  },
  en: {
    home: 'Home',
    favorites: 'Favorites',
    about: 'About',
    features: 'Features',
    earn: 'Model',
    partners: 'Partners',
    merchant: 'Merchants',
    langName: 'عربي',
    heroTitlePart1: 'Compare Smart..',
    heroTitlePart2: 'Decide Fast',
    heroDesc: 'We scan the market to get you the best price.',
    searchPlaceholder: 'What do you need? (iPhone...)',
    searchBtn: 'Search',
    analyzing: 'Analyzing...',
    realSearch: 'Searches',
    trendingLabel: '🔥 Trending:',
    partnersTitle: 'Trusted Only',
    loadingTitle: 'Scanning...',
    loadingDesc: 'Checking prices...',
    aiTitle: 'Summary',
    winner: 'Top Pick',
    trusted: 'Trusted',
    rating: 'Rating',
    from: 'from',
    client: 'reviews',
    warrantyTitle: 'Warranty',
    deliveryTitle: 'Delivery',
    visitStore: 'Buy Now',
    specialOffer: 'Special',
    howItWorksTitle: 'How?',
    step1Title: 'Type',
    step1Desc: 'Product name.',
    step2Title: 'Scan',
    step2Desc: 'We check stores.',
    step3Title: 'Save',
    step3Desc: 'Money & Time.',
    earnTitle: 'Our Model 💰',
    earnDesc: 'Free for you. We take commission from stores, zero extra cost on you.',
    neutrality: 'Neutral',
    noExtraCost: 'No Extra Cost',
    trustTitle: 'Why Us?',
    trust1Title: 'No Fakes',
    trust1Desc: 'We filter fake reviews.',
    trust2Title: 'Protection',
    trust2Desc: 'Know your warranty.',
    trust3Title: 'For You',
    trust3Desc: 'Savings first.',
    footerDesc: 'Saudi #1 Comparison Engine.',
    quickLinks: 'Links',
    legal: 'Legal',
    contactTitle: 'Contact',
    rights: 'Moqaren © 2026',
    madeIn: 'Made in KSA 🇸🇦',
    privacy: 'Privacy',
    terms: 'Terms',
    adminLogin: 'Admin',
    enterCode: 'Passcode',
    login: 'Login',
    back: 'Back',
    toastSuccess: 'Done!',
    toastError: 'Error',
    freeShipping: 'Free',
    fastShipping: 'Fast',
    instantPickup: 'Pickup',
    agentWarranty: 'Agent',
    storeWarranty: 'Store',
    comprehensiveWarranty: 'Full',
    emptyFav: 'No favorites yet 💔',
    shareMsg: 'Check this deal:'
  }
};

const apiKey = process.env.REACT_APP_GEMINI_KEY; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'moqaren-app-v1';

const App = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [view, setView] = useState('home'); 
  const [showExclusiveToast, setShowExclusiveToast] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  
  // --- إدارة المفضلة ---
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('moqaren_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [lang, setLang] = useState('ar');
  const t = translations[lang];

  const [notification, setNotification] = useState(null);
  const [realSearchCount, setRealSearchCount] = useState(0);

  const [adminClickCount, setAdminClickCount] = useState(0);
  const [adminInput, setAdminInput] = useState(''); 
  const [loginStep, setLoginStep] = useState(0); 
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const clickTimeoutRef = useRef(null); 

  const [inboxMessages, setInboxMessages] = useState([]);
  const [topSearchTerms, setTopSearchTerms] = useState([]);

  // Admin Form States
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreLink, setNewStoreLink] = useState('');
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newOfferKeyword, setNewOfferKeyword] = useState('');
  const [newOfferMessage, setNewOfferMessage] = useState('');
  const [newOfferLink, setNewOfferLink] = useState('');
  const [newTrendingKeyword, setNewTrendingKeyword] = useState('');
  const [newApiName, setNewApiName] = useState('');
  const [newApiUrl, setNewApiUrl] = useState('');
  const [merchantForm, setMerchantForm] = useState({ store: '', email: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const defaultAdminConfig = {
    supportEmail: "support@moqaren.com",
    whatsappNumber: "+966500000000",
    twitterLink: "https://twitter.com/moqaren",
    instagramLink: "https://instagram.com/moqaren",
    trendingKeywords: ['آيفون 15', 'سوني 5', 'ماك بوك', 'سماعات ابل'],
    customApis: [],
    affiliateLinks: [
      { name: 'amazon', link: 'https://amazon.sa/?tag=moqaren-21' },
      { name: 'noon', link: 'https://noon.com/?affiliate=moqaren' },
      { name: 'temu', link: 'https://temu.com/s/moqaren' },
      { name: 'xcite', link: 'https://xcite.com/exclusive-deal' }
    ],
    trustedPartners: [
      { name: 'AMAZON' },
      { name: 'NOON' },
      { name: 'X-CITE' },
      { name: 'JARIR' }
    ],
    exclusiveOffers: [
      { keyword: 'آيفون', message: 'خصم 50 ريال على جميع أجهزة آبل', link: 'https://amazon.sa/iphone-deal' },
      { keyword: 'ساعة', message: 'سير مجاني مع كل ساعة ذكية', link: 'https://noon.com/watches' }
    ]
  };

  const [adminConfig, setAdminConfig] = useState(defaultAdminConfig);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // --- حفظ المفضلة ---
  useEffect(() => {
    localStorage.setItem('moqaren_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    if (favorites.find(f => f.id === item.id)) {
        setFavorites(favorites.filter(f => f.id !== item.id));
        showNotification("تم الحذف من المفضلة");
    } else {
        setFavorites([...favorites, item]);
        showNotification("تم الحفظ في المفضلة");
    }
  };

  const handleShare = async (item) => {
    const shareData = {
        title: `عرض ${item.store}`,
        text: `${t.shareMsg} ${item.store} - ${item.price} ${item.currency}`,
        url: window.location.href
    };
    if (navigator.share) {
        try { await navigator.share(shareData); } catch (err) {}
    } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        showNotification("تم نسخ الرابط!");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try { await signInAnonymously(auth); } catch (error) { try { await signInAnonymously(auth); } catch (e) {} }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) { setAdminConfig({ ...defaultAdminConfig, ...docSnap.data() }); } 
      else { setDoc(docRef, defaultAdminConfig); }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
        if (docSnap.exists()) { setRealSearchCount(docSnap.data().total_searches || 0); } 
        else { setDoc(statsRef, { total_searches: 0 }, { merge: true }); setRealSearchCount(0); }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user || !isAdminAuthenticated) return;
    const inboxRef = collection(db, 'artifacts', appId, 'public', 'data', 'inbox');
    const unsubInbox = onSnapshot(inboxRef, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      msgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setInboxMessages(msgs);
    });
    const fetchStats = async () => {
        const statsRef = collection(db, 'artifacts', appId, 'public', 'data', 'search_analytics');
        const q = query(statsRef, orderBy('count', 'desc'), limit(10)); 
        const snapshot = await getDocs(q);
        const terms = snapshot.docs.map(doc => ({ term: doc.id, ...doc.data() }));
        setTopSearchTerms(terms);
    };
    fetchStats();
    return () => unsubInbox();
  }, [user, isAdminAuthenticated]);

  const trackSearchTerm = async (term) => {
      if (!user || !term) return;
      const cleanTerm = term.trim().toLowerCase();
      if (cleanTerm.length < 2) return; 
      const termRef = doc(db, 'artifacts', appId, 'public', 'data', 'search_analytics', cleanTerm);
      try { await setDoc(termRef, { term: term.trim(), count: increment(1), lastSearched: new Date().toISOString() }, { merge: true }); } catch (e) { }
  };

  const incrementGlobalCounter = async () => {
      if (!user) return;
      const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
      try { await setDoc(statsRef, { total_searches: increment(1) }, { merge: true }); } catch (error) { }
  };

  const handleSaveAllChanges = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
      await setDoc(docRef, adminConfig);
      showNotification(t.toastSuccess);
      setView('home');
    } catch (error) { showNotification(t.toastError, "error"); }
  };

  const resetToHome = () => {
    setView('home');
    setResults(null);
    setSearchQuery('');
    setAiSummary(null);
    setShowExclusiveToast(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setView('home');
    setResults(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  const handleLogoClick = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    if (newCount >= 7) {
      setView('admin');
      setAdminClickCount(0);
      setLoginStep(0); 
      setAdminInput('');
      return;
    } 
    resetToHome();
    clickTimeoutRef.current = setTimeout(() => setAdminClickCount(0), 3000);
  };

  const handleMerchantSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inbox'), { type: 'partner_request', store: merchantForm.store, email: merchantForm.email, timestamp: new Date().toISOString() });
      showNotification(t.toastSuccess); setMerchantForm({ store: '', email: '' }); resetToHome();
    } catch (err) { showNotification(t.toastError, "error"); }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inbox'), { type: 'contact_message', name: contactForm.name, email: contactForm.email, message: contactForm.message, timestamp: new Date().toISOString() });
      showNotification(t.toastSuccess); setContactForm({ name: '', email: '', message: '' }); resetToHome();
    } catch (err) { showNotification(t.toastError, "error"); }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginStep === 0) {
      if (adminInput === "abdulrhman07") { setLoginStep(1); setAdminInput(''); } 
      else { alert("اسم المستخدم خطأ! \nالمطلوب: abdulrhman07"); setAdminInput(''); }
    } else {
      const secretCode = process.env.REACT_APP_ADMIN_CODE;
      if (adminInput === secretCode) { setIsAdminAuthenticated(true); setAdminInput(''); setLoginStep(0); showNotification("تم الدخول!"); } 
      else { alert(!secretCode ? "لم يتم إعداد الكود السري في Vercel" : "الرمز السري خطأ!"); setAdminInput(''); }
    }
  };

  const handleDeleteMessage = async (msgId) => { if (!confirm('حذف؟')) return; try { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inbox', msgId)); showNotification("تم الحذف"); } catch (err) { } };

  // Admin Config Handlers
  const handleAddStore = () => { if (newStoreName && newStoreLink) { setAdminConfig({ ...adminConfig, affiliateLinks: [...adminConfig.affiliateLinks, { name: newStoreName, link: newStoreLink }] }); setNewStoreName(''); setNewStoreLink(''); }};
  const handleDeleteStore = (i) => { const u = [...adminConfig.affiliateLinks]; u.splice(i, 1); setAdminConfig({ ...adminConfig, affiliateLinks: u }); };
  const handleAddPartner = () => { if (newPartnerName) { setAdminConfig({ ...adminConfig, trustedPartners: [...adminConfig.trustedPartners, { name: newPartnerName }] }); setNewPartnerName(''); }};
  const handleDeletePartner = (i) => { const u = [...adminConfig.trustedPartners]; u.splice(i, 1); setAdminConfig({ ...adminConfig, trustedPartners: u }); };
  const handleAddOffer = () => { if (newOfferKeyword && newOfferMessage && newOfferLink) { setAdminConfig({ ...adminConfig, exclusiveOffers: [...adminConfig.exclusiveOffers, { keyword: newOfferKeyword, message: newOfferMessage, link: newOfferLink }] }); setNewOfferKeyword(''); setNewOfferMessage(''); setNewOfferLink(''); }};
  const handleDeleteOffer = (i) => { const u = [...adminConfig.exclusiveOffers]; u.splice(i, 1); setAdminConfig({ ...adminConfig, exclusiveOffers: u }); };
  const handleAddTrendingKeyword = () => { if (newTrendingKeyword) { setAdminConfig({ ...adminConfig, trendingKeywords: [...(adminConfig.trendingKeywords || []), newTrendingKeyword] }); setNewTrendingKeyword(''); }};
  const handleDeleteTrendingKeyword = (index) => { const updated = [...(adminConfig.trendingKeywords || [])]; updated.splice(index, 1); setAdminConfig({ ...adminConfig, trendingKeywords: updated }); };
  const handleAddApi = () => { if (newApiName && newApiUrl) { setAdminConfig({ ...adminConfig, customApis: [...(adminConfig.customApis || []), { name: newApiName, url: newApiUrl }] }); setNewApiName(''); setNewApiUrl(''); }};
  const handleDeleteApi = (index) => { const updated = [...(adminConfig.customApis || [])]; updated.splice(index, 1); setAdminConfig({ ...adminConfig, customApis: updated }); };

  const callGeminiAI = async (product, stores) => {
    if (!apiKey) { return { summary: `بما أننا في وضع التجربة، ${stores[0].store} يبدو الخيار الأفضل حالياً.`, verdict: `${stores[0].store} - الأرخص` }; }
    const languageInstruction = lang === 'en' ? "Respond in English." : "الرد باللهجة السعودية البيضاء.";
    const prompt = `Expert shopping assistant for 'Moqaren'. Analyze product: ${product}. Data: ${JSON.stringify(stores)}. Instructions: 1. Summary: One concise line. 2. Verdict: Store name + reason (2 words). ${languageInstruction} Output JSON: { summary: "string", verdict: "string" }`;
    const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } };
    try {
      const response = await fetch(GEMINI_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.ok) { const data = await response.json(); return JSON.parse(data.candidates[0].content.parts[0].text); }
      throw new Error("API Failed");
    } catch (err) { return { summary: `بناءً على البحث، ${stores[1].store} هو الأرخص.`, verdict: `${stores[1].store} - سعر لقطة` }; }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    setResults(null);
    setAiSummary(null);
    setShowExclusiveToast(false);
    setCurrentOffer(null);
    incrementGlobalCounter();
    trackSearchTerm(searchQuery);
    setTimeout(() => {
        const resultsEl = document.getElementById('results-area');
        if(resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1500);

    const basePrice = Math.floor(Math.random() * 500) + 100;
    
    let searchResults = [
      { id: 1, store: 'أمازون', storeKey: 'amazon', storeColor: 'bg-orange-500', price: basePrice + 20, originalPrice: basePrice + 80, currency: 'ر.س', rating: 4.8, reviewsCount: 1250, delivery: t.freeShipping, warranty: t.agentWarranty, aiAnalysis: 'الضمان عندهم مسمار في لوح.' },
      { id: 2, store: 'نون', storeKey: 'noon', storeColor: 'bg-yellow-400', price: basePrice, originalPrice: basePrice + 50, currency: 'ر.س', rating: 4.5, reviewsCount: 890, delivery: t.fastShipping, warranty: t.storeWarranty, aiAnalysis: 'سعره لقطة وحالياً عليه عرض.' },
      { id: 3, store: 'إكس سايت', storeKey: 'xcite', storeColor: 'bg-blue-600', price: basePrice - 15, originalPrice: basePrice + 60, currency: 'ر.س', rating: 4.9, reviewsCount: 2100, delivery: t.instantPickup, warranty: t.comprehensiveWarranty, aiAnalysis: 'هذا عرض خاص لمتابعينا.' }
    ];

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const aiResponse = await callGeminiAI(searchQuery, searchResults);
      setResults(searchResults);
      setAiSummary(aiResponse);
      const matchedOffer = adminConfig.exclusiveOffers?.find(offer => searchQuery.toLowerCase().includes(offer.keyword.toLowerCase()));
      if (matchedOffer) { setCurrentOffer(matchedOffer); setTimeout(() => setShowExclusiveToast(true), 1500); }
    } catch (err) { console.error("Error"); } finally { setIsSearching(false); }
  };

  const getStoreLink = (key) => { const store = adminConfig.affiliateLinks?.find(s => s.name === key); return store ? store.link : "#"; };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0 selection:bg-blue-100" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* إشعارات */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-300 w-auto">
          <div className="px-6 py-3 rounded-full shadow-2xl bg-slate-900 text-white flex items-center gap-3 text-xs font-bold">
            {notification.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} className="text-green-400" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* زر اللغة */}
      <button onClick={toggleLanguage} className={`fixed top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-[100] bg-white/20 backdrop-blur-md shadow-sm border border-white/20 p-2.5 rounded-full active:scale-95 transition-all text-slate-900`}>
        <Languages size={18} />
      </button>

      {/* Navigation (Desktop) */}
      <nav className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-900/10 rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 pointer-events-auto border border-white/50 max-w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-4 cursor-pointer group select-none" onClick={handleLogoClick}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-full text-white shadow-lg"><Zap size={18} fill="currentColor" /></div>
            <span className="text-lg font-black text-slate-800 tracking-tighter">مقارن</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <div className="flex items-center">
            {[{ id: 'home', label: t.home, icon: Globe, action: resetToHome }, { id: 'favorites', label: t.favorites, icon: Heart, action: () => setView('favorites') }, { id: 'about', label: t.about, icon: Info, action: () => scrollToSection('about') }, { id: 'features', label: t.features, icon: Star, action: () => scrollToSection('why-trust') }].map((item) => (
                <button key={item.id} onClick={item.action} className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 ${view === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-600'}`}>
                    <item.icon size={14} />
                    <span className="whitespace-nowrap">{item.label}</span>
                </button>
            ))}
          </div>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <button onClick={() => setView('merchant')} className="bg-slate-900 text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-slate-800 shadow-lg items-center gap-2 active:scale-95 transition-all whitespace-nowrap hidden md:flex"><Award size={14} /> {t.merchant}</button>
        </div>
      </nav>

      {/* Bottom Navigation (Mobile Only) - نظيف وثابت */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-100 pb-safe">
        <div className="flex justify-around items-center px-2 py-3">
           <button onClick={resetToHome} className={`flex flex-col items-center gap-1 transition-all ${view === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>
              <Home size={24} strokeWidth={view === 'home' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{t.home}</span>
           </button>
           <button onClick={() => setView('favorites')} className={`flex flex-col items-center gap-1 transition-all ${view === 'favorites' ? 'text-red-500' : 'text-slate-400'}`}>
              <Heart size={24} fill={view === 'favorites' ? "currentColor" : "none"} strokeWidth={view === 'favorites' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{t.favorites}</span>
           </button>
           <div className="relative -top-6">
              <button onClick={() => {resetToHome(); window.scrollTo({top: 0, behavior: 'smooth'})}} className="bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-500/30 active:scale-90 transition-transform ring-4 ring-slate-50">
                 <Search size={24} strokeWidth={3} />
              </button>
           </div>
           <button onClick={() => setView('admin')} className={`flex flex-col items-center gap-1 transition-all ${view === 'admin' ? 'text-slate-900' : 'text-slate-400'}`}>
              <Grid size={24} strokeWidth={view === 'admin' ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{t.adminLogin}</span>
           </button>
           <button onClick={() => scrollToSection('contact')} className="flex flex-col items-center gap-1 text-slate-400">
              <Menu size={24} />
              <span className="text-[10px] font-bold">المزيد</span>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      {view === 'home' && (
        <>
          <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950 text-white pt-24 md:pt-40 pb-16 md:pb-32 px-4 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] shadow-xl">
            {/* Logo Mobile */}
            <div className="md:hidden flex justify-center mb-6" onClick={handleLogoClick}>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 shadow-lg">
                    <Zap size={20} className="text-blue-400" fill="currentColor" />
                    <span className="font-black tracking-tighter">مقارن</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h1 className="text-3xl md:text-7xl font-black mb-4 leading-tight drop-shadow-2xl text-white tracking-tight">{t.heroTitlePart1} <br/> <span className="text-blue-400">{t.heroTitlePart2}</span></h1>
              <p className="text-blue-200 text-sm md:text-2xl mb-8 max-w-2xl mx-auto font-medium opacity-80 leading-relaxed px-6">{t.heroDesc}</p>
              
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
                <input type="text" placeholder={t.searchPlaceholder} className="w-full py-4 md:py-6 px-6 md:px-12 rounded-full text-slate-900 shadow-2xl text-sm md:text-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all font-bold border-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" disabled={isSearching} className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full font-black transition-all flex items-center justify-center gap-2 disabled:bg-slate-400`}>
                  {isSearching ? <span className="animate-spin"><Zap size={18} fill="currentColor" /></span> : <>{t.searchBtn}</>}
                </button>
              </form>

              <div className="mt-6 flex flex-wrap justify-center gap-2 text-[10px] md:text-sm font-bold text-blue-300/70">
                {adminConfig.trendingKeywords?.map((keyword, index) => (
                    <button key={index} onClick={() => setSearchQuery(keyword)} className="bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-all">{keyword}</button>
                ))}
              </div>
            </div>
          </div>

          <main className="max-w-6xl mx-auto px-4 -mt-8 relative z-20 pb-12">
            
            {isSearching && (
              <div className="bg-white rounded-[2rem] p-12 shadow-xl border border-slate-100 text-center mb-8">
                <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <h3 className="text-slate-900 font-black text-lg">{t.loadingTitle}</h3>
              </div>
            )}

            {results && !isSearching && (
              <div id="results-area" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {aiSummary && (
                    <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 text-center md:text-right">
                          <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-blue-600 font-black text-xs uppercase tracking-widest"><BarChart3 size={14} /> {t.aiTitle}</div>
                          <p className="text-slate-800 text-lg md:text-2xl font-black leading-snug">"{aiSummary.summary}"</p>
                        </div>
                        <div className="bg-blue-50 px-6 py-4 rounded-2xl text-center min-w-[150px]">
                            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">{t.winner}</span>
                            <div className="text-blue-600 font-black text-xl">{aiSummary.verdict}</div>
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col relative group hover:shadow-lg transition-all">
                      {/* أزرار التفاعل */}
                      <div className="absolute top-3 left-3 z-20 flex gap-2">
                          <button onClick={() => toggleFavorite(item)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm active:scale-90 transition-transform">
                             <Heart size={18} fill={favorites.find(f => f.id === item.id) ? "#ef4444" : "none"} className={favorites.find(f => f.id === item.id) ? "text-red-500" : "text-slate-400"} />
                          </button>
                          <button onClick={() => handleShare(item)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm active:scale-90 transition-transform text-slate-400 hover:text-blue-500">
                             <Share2 size={18} />
                          </button>
                      </div>

                      <div className={`${item.storeColor} h-24 p-6 text-white flex justify-between items-start relative`}>
                        <span className="font-black text-xl tracking-tighter">{item.store}</span>
                        {item.store.includes('شريك') && <div className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold">{t.specialOffer}</div>}
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col -mt-4 bg-white rounded-t-3xl relative z-10">
                        <div className="flex justify-between items-baseline mb-4">
                          <div><span className="text-2xl font-black text-slate-900">{item.price}</span><span className="text-xs text-slate-400 font-bold mx-1">{item.currency}</span></div>
                          <div className="text-xs text-red-400 line-through font-bold opacity-60">{item.originalPrice}</div>
                        </div>
                        <div className="space-y-2 mb-4 text-xs font-bold text-slate-500">
                           <div className="flex items-center gap-2"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {item.rating} تقييم</div>
                           <div className="flex items-center gap-2"><Shield size={14} className="text-blue-500" /> {item.warranty}</div>
                           <div className="flex items-center gap-2"><ShoppingCart size={14} className="text-indigo-500" /> {item.delivery}</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl text-[10px] text-slate-600 mb-4 font-bold leading-relaxed">"{item.aiAnalysis}"</div>
                        <a href={getStoreLink(item.storeKey)} target="_blank" className="mt-auto w-full bg-slate-900 text-white py-3 rounded-xl font-black text-sm flex justify-center items-center gap-2 active:scale-95 transition-all">{t.visitStore} <ExternalLink size={14} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!results && !isSearching && (
              <div className="space-y-8 mt-12">
                <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">{t.howItWorksTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[{ icon: MousePointer2, title: t.step1Title, desc: t.step1Desc }, { icon: Cpu, title: t.step2Title, desc: t.step2Desc }, { icon: Rocket, title: t.step3Title, desc: t.step3Desc }].map((item, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-slate-50">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-blue-600"><item.icon size={20} /></div>
                                <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
                                <p className="text-slate-500 text-xs font-bold">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
              </div>
            )}
          </main>
        </>
      )}
      
      {/* صفحة المفضلة (الجديدة) */}
      {view === 'favorites' && (
        <div className="max-w-2xl mx-auto px-4 py-24 min-h-screen animate-in fade-in">
           <h1 className="text-2xl font-black text-slate-900 mb-6 text-center">{t.favorites} ❤️</h1>
           {favorites.length === 0 ? (
               <div className="text-center py-12 opacity-50 bg-white rounded-[2rem] border border-dashed border-slate-200">
                   <Heart size={48} className="mx-auto mb-4 text-slate-300" />
                   <p className="font-bold text-sm">{t.emptyFav}</p>
                   <button onClick={resetToHome} className="mt-4 text-blue-600 font-bold text-xs underline">تصفح العروض</button>
               </div>
           ) : (
               <div className="space-y-3">
                  {favorites.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center p-3 gap-3 relative">
                        <button onClick={() => toggleFavorite(item)} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                        <div className={`w-12 h-12 rounded-lg ${item.storeColor} flex items-center justify-center text-white font-black text-[10px] shrink-0`}>{item.store}</div>
                        <div className="flex-1">
                            <h3 className="font-black text-sm text-slate-900">{searchQuery || item.store}</h3>
                            <p className="text-blue-600 font-black text-sm">{item.price} {item.currency}</p>
                        </div>
                        <a href={getStoreLink(item.storeKey)} target="_blank" className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs">{t.visitStore}</a>
                    </div>
                  ))}
               </div>
           )}
        </div>
      )}

      {/* باقي الصفحات (نفس التصميم المبسط) */}
      {(view === 'admin' || view === 'merchant' || view === 'contact' || view === 'privacy') && (
        <div className="max-w-2xl mx-auto px-4 py-24 animate-in fade-in">
            {view === 'admin' && (
                !isAdminAuthenticated ? (
                    <div className="bg-white rounded-[2rem] shadow-xl p-8 text-center border border-slate-100">
                       <h1 className="text-xl font-black mb-6">{t.adminLogin}</h1>
                       <form onSubmit={handleAdminLogin} className="space-y-4">
                         <input type={loginStep === 0 ? "text" : "password"} className="w-full p-4 rounded-xl bg-slate-50 font-bold text-center text-lg" placeholder={loginStep === 0 ? "User" : "Pass"} value={adminInput} onChange={(e) => setAdminInput(e.target.value)} autoFocus />
                         <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-black">دخول</button>
                       </form>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm flex justify-between items-center"><h1 className="font-black">لوحة التحكم</h1><button onClick={() => setIsAdminAuthenticated(false)} className="text-red-500 text-xs font-bold">خروج</button></div>
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm"><h3 className="font-black text-sm mb-2">إضافة تريند</h3><div className="flex gap-2"><input className="flex-1 p-2 bg-slate-50 rounded-lg text-xs font-bold" value={newTrendingKeyword} onChange={e=>setNewTrendingKeyword(e.target.value)} placeholder="كلمة.." /><button onClick={handleAddTrendingKeyword} className="bg-blue-600 text-white px-4 rounded-lg text-xs font-bold">إضافة</button></div><div className="flex gap-2 mt-2 flex-wrap">{adminConfig.trendingKeywords?.map((k,i)=><span key={i} className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">{k}<X size={10} onClick={()=>handleDeleteTrendingKeyword(i)}/></span>)}</div><button onClick={handleSaveAllChanges} className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg text-xs font-bold">حفظ التغييرات</button></div>
                    </div>
                )
            )}
            
            {view === 'merchant' && (
                <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100 text-center">
                    <h1 className="text-xl font-black mb-2">للشركات</h1>
                    <p className="text-slate-500 text-xs font-bold mb-6">سجل متجرك معنا</p>
                    <form className="space-y-3" onSubmit={handleMerchantSubmit}>
                        <input className="w-full p-3 rounded-xl bg-slate-50 font-bold text-sm" placeholder="المتجر" required value={merchantForm.store} onChange={e => setMerchantForm({...merchantForm, store: e.target.value})} />
                        <input className="w-full p-3 rounded-xl bg-slate-50 font-bold text-sm" placeholder="الإيميل" required value={merchantForm.email} onChange={e => setMerchantForm({...merchantForm, email: e.target.value})} />
                        <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-sm">إرسال</button>
                    </form>
                </div>
            )}

            {view === 'contact' && (
                <div className="space-y-4">
                    <h1 className="text-2xl font-black text-center mb-6">تواصل معنا</h1>
                    <div className="grid grid-cols-2 gap-3">
                        <a href={`mailto:${adminConfig.supportEmail}`} className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-100 font-bold text-xs flex flex-col items-center gap-2"><Mail className="text-blue-500" /> إيميل</a>
                        <a href={adminConfig.whatsappNumber} className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-100 font-bold text-xs flex flex-col items-center gap-2"><MessageSquare className="text-green-500" /> واتساب</a>
                    </div>
                </div>
            )}
        </div>
      )}

    </div>
  );
};

export default App;
