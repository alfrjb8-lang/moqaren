import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingCart, Star, Shield, Info, ExternalLink, Zap, 
  BarChart3, TrendingDown, AlertCircle, CheckCircle, MousePointer2, 
  Cpu, Rocket, Mail, Lock, Phone, MessageSquare, Tag, Award, Users, Heart,
  Instagram, Twitter, Send, Settings, Eye, EyeOff, Save, ArrowLeft, Plus, Trash2, X,
  FileText, Activity, Globe, ChevronLeft, Coins, Database, Bell, MessageCircle, BarChart2, Flame, Languages, Link, Server, Home, Grid, Menu, Share2
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, increment, updateDoc, addDoc, deleteDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';

// --- أيقونة الموقع ---
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
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
    merchant: 'تجار',
    langName: 'En',
    heroTitlePart1: 'قارن بذكاء..',
    heroTitlePart2: 'وقرّر في ثوانٍ',
    heroDesc: 'محرك بحث "الزبدة". نفرّ لك السوق ونجيب لك الأرخص.',
    searchPlaceholder: 'وش بخاطرك؟ (آيفون، عطر..)',
    searchBtn: 'بحث',
    analyzing: 'جاري التحليل...',
    realSearch: 'عملية بحث',
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
    emptyFav: 'ما عندك مفضلة للحين 💔',
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
  
  // حفظ المفضلة في الجهاز (LocalStorage)
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
    setTimeout(() => setNotification(null), 4000);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // مراقبة وحفظ المفضلة
  useEffect(() => {
    localStorage.setItem('moqaren_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    if (favorites.find(f => f.id === item.id)) {
        setFavorites(favorites.filter(f => f.id !== item.id));
        showNotification("تم الحذف من المفضلة");
    } else {
        setFavorites([...favorites, item]);
        showNotification("تمت الإضافة للمفضلة");
    }
  };

  const handleShare = async (item) => {
    const shareData = {
        title: `عرض ${item.store}`,
        text: `${t.shareMsg} ${item.store} - ${item.price} ${item.currency}`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {}
    } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        showNotification("تم نسخ الرابط!");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) { try { await signInAnonymously(auth); } catch (e) {} }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setAdminConfig({ ...defaultAdminConfig, ...docSnap.data() });
      } else {
        setDoc(docRef, defaultAdminConfig);
      }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
        if (docSnap.exists()) {
            setRealSearchCount(docSnap.data().total_searches || 0);
        } else {
            setDoc(statsRef, { total_searches: 0 }, { merge: true });
            setRealSearchCount(0);
        }
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
      try {
          await setDoc(termRef, {
              term: term.trim(),
              count: increment(1),
              lastSearched: new Date().toISOString()
          }, { merge: true });
      } catch (e) { }
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
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inbox'), {
        type: 'partner_request',
        store: merchantForm.store,
        email: merchantForm.email,
        timestamp: new Date().toISOString()
      });
      showNotification(t.toastSuccess);
      setMerchantForm({ store: '', email: '' });
      resetToHome();
    } catch (err) { showNotification(t.toastError, "error"); }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inbox'), {
        type: 'contact_message',
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
        timestamp: new Date().toISOString()
      });
      showNotification(t.toastSuccess);
      setContactForm({ name: '', email: '', message: '' });
      resetToHome();
    } catch (err) { showNotification(t.toastError, "error"); }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginStep === 0) {
      if (adminInput === "abdulrhman07") {
        setLoginStep(1); 
        setAdminInput(''); 
      } else {
        alert("اسم المستخدم خطأ! \nأنت كتبت: " + adminInput + "\nالمفروض تكتب: abdulrhman07");
        setAdminInput('');
      }
    } 
    else {
      const secretCode = process.env.REACT_APP_ADMIN_CODE;
      if (adminInput === secretCode) { 
        setIsAdminAuthenticated(true);
        setAdminInput('');
        setLoginStep(0);
        showNotification("تم الدخول بنجاح!");
      } else {
         if (!secretCode) {
            alert("تنبيه: الكود السري غير موجود في إعدادات Vercel!");
         } else {
            alert("الرمز السري خطأ!");
         }
        setAdminInput('');
      }
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!confirm('حذف؟')) return;
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inbox', msgId));
      showNotification("تم الحذف");
    } catch (err) { }
  };

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
    }, 2000);

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 md:pb-0 selection:bg-blue-200 selection:text-blue-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* إشعار النظام الموحد */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] animate-in fade-in slide-in-from-top-4 duration-300 w-[90%] md:w-auto">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-center gap-3 border-2 ${notification.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white border-green-100 text-green-700'}`}>
            {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} className="text-green-500" />}
            <span className="font-bold text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* زر اللغة العائم */}
      <button 
        onClick={toggleLanguage} 
        className={`fixed top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-[100] bg-white/30 backdrop-blur-xl shadow-sm border border-white/20 p-2.5 rounded-2xl active:scale-95 transition-all`}
      >
        <Languages size={20} className="text-white md:text-slate-600" />
      </button>

      {/* Navigation (Desktop) - مخفية في الجوال */}
      <nav className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-900/10 rounded-full px-2 py-2 flex items-center gap-2 pointer-events-auto border border-white/50">
          <div className="flex items-center gap-2 px-4 cursor-pointer group" onClick={handleLogoClick}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform"><Zap size={18} fill="currentColor" /></div>
            <span className="text-lg font-black text-slate-800 tracking-tighter">مقارن</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <div className="flex items-center">
            {[{ id: 'home', label: t.home, icon: Globe, action: resetToHome }, { id: 'favorites', label: t.favorites, icon: Heart, action: () => setView('favorites') }, { id: 'about', label: t.about, icon: Info, action: () => scrollToSection('about') }, { id: 'features', label: t.features, icon: Star, action: () => scrollToSection('why-trust') }, { id: 'partners', label: t.partners, icon: Users, action: () => scrollToSection('partners') }].map((item) => (
                <button key={item.id} onClick={item.action} className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 ${view === item.id ? 'hover:bg-blue-50 hover:text-blue-600 text-slate-600' : ''}`}>
                    <item.icon size={14} className="opacity-70" />
                    <span className="whitespace-nowrap">{item.label}</span>
                </button>
            ))}
          </div>
          <button onClick={() => setView('merchant')} className="bg-slate-900 text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-slate-800 shadow-lg flex items-center gap-2 active:scale-95 transition-all"><Award size={14} /> {t.merchant}</button>
        </div>
      </nav>

      {/* Bottom Navigation (Mobile Only) - تصميم "إنستقرام" مع المفضلة */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe pt-2">
        <div className="flex justify-around items-center px-2 pb-2">
           <button onClick={resetToHome} className={`flex flex-col items-center p-2 rounded-xl transition-all ${view === 'home' ? 'text-slate-900' : 'text-slate-400'}`}>
              <Home size={24} strokeWidth={view === 'home' ? 2.5 : 2} />
              <span className="text-[10px] font-bold mt-1">{t.home}</span>
           </button>
           
           {/* زر المفضلة بدال الشركاء */}
           <button onClick={() => setView('favorites')} className={`flex flex-col items-center p-2 rounded-xl transition-all ${view === 'favorites' ? 'text-red-500' : 'text-slate-400'}`}>
              <Heart size={24} fill={view === 'favorites' ? "currentColor" : "none"} strokeWidth={view === 'favorites' ? 2.5 : 2} />
              <span className="text-[10px] font-bold mt-1">{t.favorites}</span>
           </button>
           
           {/* زر البحث الرئيسي (في النص) */}
           <div className="relative -top-5">
              <button onClick={() => {resetToHome(); window.scrollTo({top: 0, behavior: 'smooth'})}} className="bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-500/30 active:scale-90 transition-transform border-4 border-slate-50">
                 <Zap size={28} fill="currentColor" />
              </button>
           </div>
           
           <button onClick={() => setView('admin')} className={`flex flex-col items-center p-2 rounded-xl transition-all ${view === 'admin' ? 'text-slate-900' : 'text-slate-400'}`}>
              <Grid size={24} strokeWidth={view === 'admin' ? 2.5 : 2} />
              <span className="text-[10px] font-bold mt-1">الإدارة</span>
           </button>
           <button onClick={() => scrollToSection('contact')} className="flex flex-col items-center p-2 rounded-xl text-slate-400">
              <Menu size={24} />
              <span className="text-[10px] font-bold mt-1">المزيد</span>
           </button>
        </div>
      </nav>

      {/* الصفحة الرئيسية */}
      {view === 'home' && (
        <>
          <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 text-white pt-24 md:pt-40 pb-20 md:pb-32 px-4 relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[5rem] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
            </div>
            
            {/* Logo in Header Mobile */}
            <div className="md:hidden flex flex-col items-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/10 mb-2 shadow-xl ring-4 ring-white/5" onClick={handleLogoClick}>
                    <Zap size={32} fill="currentColor" className="text-white" />
                </div>
                <h1 className="font-black text-xl tracking-tighter">مقارن</h1>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-100 text-[10px] md:text-xs font-black mb-6 backdrop-blur-md shadow-lg">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                <span>{realSearchCount.toLocaleString()} {t.realSearch}</span>
              </div>
              <h1 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 leading-tight drop-shadow-2xl text-white tracking-tight">
                {t.heroTitlePart1} <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">{t.heroTitlePart2}</span>
              </h1>
              <p className="text-blue-100 text-sm md:text-2xl mb-8 md:mb-12 max-w-xl mx-auto font-medium leading-relaxed opacity-90 px-4">{t.heroDesc}</p>
              
              <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group w-full px-2">
                <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-[2rem] group-hover:bg-blue-400/40 transition-all duration-500 hidden md:block"></div>
                <input type="text" placeholder={t.searchPlaceholder} className="w-full py-5 md:py-8 px-6 md:px-16 rounded-[2rem] text-slate-900 shadow-2xl text-base md:text-xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all font-bold border-none relative z-10 placeholder:text-slate-400/80 bg-white/95 backdrop-blur-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" disabled={isSearching} className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3'} top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 rounded-[1.5rem] font-black transition-all flex items-center justify-center gap-2 disabled:bg-slate-400 shadow-lg active:scale-95 z-20 text-sm md:text-base`}>
                  {isSearching ? <span className="animate-spin"><Zap size={20} fill="currentColor" /></span> : <>{t.searchBtn}</>}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-bold text-blue-200/80 px-4">
                <span className="w-full md:w-auto mb-2 md:mb-0">{t.trendingLabel}</span>
                {adminConfig.trendingKeywords?.map((keyword, index) => (
                    <button key={index} onClick={() => setSearchQuery(keyword)} className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 active:scale-95 transition-transform backdrop-blur-md">
                      {keyword}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-20 relative z-20 pb-12">
            
            {/* Loading State */}
            {isSearching && (
              <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-12 shadow-xl border border-white/50 text-center mb-12 mx-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 mx-auto mb-6 relative">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <Zap className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} fill="currentColor" />
                </div>
                <h3 className="text-slate-900 font-black text-xl mb-2">{t.loadingTitle}</h3>
                <p className="text-slate-400 text-sm font-bold">{t.loadingDesc}</p>
              </div>
            )}

            {/* Results */}
            {results && !isSearching && (
              <div id="results-area" className="space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 mb-12">
                {aiSummary && (
                    <div className="bg-slate-900 text-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden mx-2 md:mx-0 ring-4 ring-blue-500/10">
                        <div className="relative z-10 flex-1">
                          <div className="flex items-center gap-2 mb-4 text-blue-300 font-black text-[10px] uppercase tracking-widest bg-white/10 w-fit px-3 py-1 rounded-full"><BarChart3 size={12} /> {t.aiTitle}</div>
                          <p className="text-white text-lg md:text-3xl font-black leading-snug">"{aiSummary.summary}"</p>
                        </div>
                        <div className="w-full md:w-auto bg-blue-600 p-4 rounded-2xl text-center shrink-0 shadow-lg shadow-blue-600/30">
                            <span className="text-[10px] font-bold text-white/80 block mb-1 uppercase tracking-widest">{t.winner}</span>
                            <div className="font-black text-xl flex items-center justify-center gap-2"><CheckCircle size={20} fill="white" className="text-blue-600" /> {aiSummary.verdict}</div>
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-2 md:px-0">
                  {results.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden flex flex-col group relative hover:shadow-2xl transition-all duration-300">
                      {item.store.includes('شريك') && (<div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black z-20 shadow-lg">{t.specialOffer}</div>)}
                      
                      {/* أزرار التفاعل: مفضلة ومشاركة */}
                      <button onClick={() => toggleFavorite(item)} className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-red-500 transition-all shadow-lg active:scale-90">
                         <Heart size={20} fill={favorites.find(f => f.id === item.id) ? "red" : "none"} className={favorites.find(f => f.id === item.id) ? "text-red-500" : "text-white"} />
                      </button>
                      <button onClick={() => handleShare(item)} className="absolute top-4 left-14 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-blue-500 transition-all shadow-lg active:scale-90">
                         <Share2 size={20} />
                      </button>

                      <div className={`${item.storeColor} p-6 text-white flex justify-between items-start relative overflow-hidden h-32`}>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        <div>
                            <span className="font-black text-xl tracking-tighter block mb-1">{item.store}</span>
                            <div className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md inline-flex items-center gap-1"><Shield size={10} /> {t.trusted}</div>
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col -mt-4 bg-white rounded-t-[1.5rem] relative z-10">
                        <div className="flex justify-between items-end mb-6 border-b border-dashed border-slate-100 pb-4">
                          <div><span className="text-3xl font-black text-slate-900">{item.price}</span><span className="text-xs text-slate-400 font-bold mx-1">{item.currency}</span></div>
                          <div className="text-xs text-red-400 line-through font-bold opacity-60 mb-1">{item.originalPrice}</div>
                        </div>
                        <div className="space-y-3 mb-6">
                           <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><Star size={16} className="text-yellow-400 fill-yellow-400" /> <span>{item.rating} ({item.reviewsCount})</span></div>
                           <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><Shield size={16} className="text-blue-500" /> <span>{item.warranty}</span></div>
                           <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><ShoppingCart size={16} className="text-indigo-500" /> <span>{item.delivery}</span></div>
                        </div>
                        <div className="bg-blue-50/50 p-3 rounded-xl text-[10px] text-blue-800 mb-6 font-bold leading-relaxed border border-blue-100">"{item.aiAnalysis}"</div>
                        <a href={getStoreLink(item.storeKey)} target="_blank" className="mt-auto w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm hover:bg-blue-600 transition-all flex justify-center items-center gap-2 shadow-xl active:scale-95">{t.visitStore} <ExternalLink size={16} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landing Sections */}
            {!results && !isSearching && (
              <div className="space-y-6 md:space-y-24">
                
                {/* Partners Scroller */}
                <div className="overflow-x-auto no-scrollbar pb-4 md:pb-0 -mx-4 px-4 md:mx-0">
                    <div className="flex md:flex-wrap md:justify-center items-center gap-4 md:gap-12 min-w-max md:min-w-0">
                        {adminConfig.trustedPartners?.map((partner, idx) => (
                            <div key={idx} className="bg-white px-6 py-3 rounded-2xl font-black text-slate-300 text-sm md:text-xl shadow-sm border border-slate-100 whitespace-nowrap">{partner.name}</div>
                        ))}
                    </div>
                </div>

                <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 text-center">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-8">{t.howItWorksTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[{ icon: MousePointer2, title: t.step1Title, desc: t.step1Desc, color: 'blue' }, { icon: Cpu, title: t.step2Title, desc: t.step2Desc, color: 'indigo' }, { icon: Rocket, title: t.step3Title, desc: t.step3Desc, color: 'green' }].map((item, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <div className={`bg-${item.color}-100 text-${item.color}-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}><item.icon size={28} /></div>
                                <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
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
      
      {/* صفحة المفضلة */}
      {view === 'favorites' && (
        <div className="px-4 py-24 animate-in fade-in max-w-lg mx-auto min-h-screen">
           <h1 className="text-3xl font-black text-slate-900 mb-8 text-center">{t.favorites} ❤️</h1>
           {favorites.length === 0 ? (
               <div className="text-center py-20 opacity-50">
                   <Heart size={64} className="mx-auto mb-4 text-slate-300" />
                   <p className="font-bold">{t.emptyFav}</p>
                   <button onClick={resetToHome} className="mt-4 text-blue-500 font-bold underline">ابحث عن منتجات</button>
               </div>
           ) : (
               <div className="space-y-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex items-center p-4 gap-4 relative">
                        <button onClick={() => toggleFavorite(item)} className="absolute top-4 left-4 text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                        <div className={`w-16 h-16 rounded-xl ${item.storeColor} flex items-center justify-center text-white font-black text-xs shrink-0`}>
                            {item.store}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-slate-900">{searchQuery || item.store}</h3>
                            <p className="text-blue-600 font-black text-lg">{item.price} {item.currency}</p>
                        </div>
                        <a href={getStoreLink(item.storeKey)} target="_blank" className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs">{t.visitStore}</a>
                    </div>
                  ))}
               </div>
           )}
        </div>
      )}

      {/* Admin View */}
      {view === 'admin' && (
        <div className="max-w-md mx-auto px-4 py-24 animate-in fade-in">
          {!isAdminAuthenticated ? (
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border border-slate-100">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={32} className="text-slate-900" /></div>
               <h1 className="text-xl font-black mb-6">{t.adminLogin}</h1>
               <form onSubmit={handleAdminLogin} className="space-y-4">
                 <input 
                   type={loginStep === 0 ? "text" : "password"} 
                   className="w-full p-4 rounded-xl bg-slate-50 font-bold text-center focus:ring-2 focus:ring-blue-600 outline-none text-lg" 
                   placeholder={loginStep === 0 ? "User ID" : "••••••"} 
                   value={adminInput} 
                   onChange={(e) => setAdminInput(e.target.value)} 
                   autoFocus
                   autoComplete="off"
                 />
                 <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/30">
                   {loginStep === 0 ? "التالي" : "دخول"}
                 </button>
               </form>
            </div>
          ) : (
            <div className="space-y-6 pb-20">
                <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-xl font-black">الإعدادات</h1>
                        <p className="text-xs text-slate-400 font-bold">مرحباً عبد الرحمن 👋</p>
                    </div>
                    <button onClick={() => setIsAdminAuthenticated(false)} className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-black">خروج</button>
                </div>
                
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                   <div className="flex justify-between items-center mb-4"><h3 className="font-black text-sm">بحث جديد</h3><button onClick={handleSaveAllChanges} className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg shadow-green-500/30">حفظ</button></div>
                   <input type="text" placeholder="أضف كلمة (تريند)" className="w-full p-3 rounded-xl bg-slate-50 text-sm font-bold mb-2" value={newTrendingKeyword} onChange={(e) => setNewTrendingKeyword(e.target.value)} />
                   <button onClick={handleAddTrendingKeyword} className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-black">إضافة</button>
                   <div className="flex flex-wrap gap-2 mt-4">{adminConfig.trendingKeywords?.map((kw, i) => (<span key={i} className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded-lg flex items-center gap-1">{kw} <X size={10} onClick={() => handleDeleteTrendingKeyword(i)} /></span>))}</div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                    <h3 className="font-black text-sm mb-4">الرسائل ({inboxMessages.length})</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                        {inboxMessages.map(msg => (
                            <div key={msg.id} className="bg-slate-50 p-4 rounded-xl relative">
                                <button onClick={() => handleDeleteMessage(msg.id)} className="absolute top-2 left-2 text-slate-300"><Trash2 size={14} /></button>
                                <p className="text-xs font-black mb-1">{msg.type === 'partner_request' ? msg.store : msg.name}</p>
                                <p className="text-[10px] text-slate-500">{msg.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          )}
        </div>
      )}

      {/* باقي الصفحات (Merchant, Privacy, Contact) - Simplified for Mobile */}
      {view === 'merchant' && (
        <div className="px-4 py-24 animate-in fade-in max-w-lg mx-auto">
           <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-slate-100 text-center">
             <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><Award size={32} /></div>
             <h1 className="text-2xl font-black text-slate-900 mb-2">للشركات</h1>
             <p className="text-slate-500 text-sm font-bold mb-8">سجل متجرك معنا.</p>
             <form className="space-y-4" onSubmit={handleMerchantSubmit}>
               <input type="text" className="w-full p-4 rounded-xl bg-slate-50 font-bold border-none text-sm" placeholder="اسم المتجر" required value={merchantForm.store} onChange={e => setMerchantForm({...merchantForm, store: e.target.value})} />
               <input type="email" className="w-full p-4 rounded-xl bg-slate-50 font-bold border-none text-sm" placeholder="الإيميل" required value={merchantForm.email} onChange={e => setMerchantForm({...merchantForm, email: e.target.value})} />
               <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm shadow-xl active:scale-95 transition-all">إرسال</button>
             </form>
           </div>
        </div>
      )}

      {view === 'contact' && (
        <div className="px-4 py-24 animate-in fade-in max-w-lg mx-auto" id="contact">
            <h1 className="text-3xl font-black text-center mb-8">تواصل معنا</h1>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <a href={`mailto:${adminConfig.supportEmail}`} className="bg-white p-6 rounded-[2rem] text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"><Mail className="text-blue-500" /><span className="text-xs font-black">إيميل</span></a>
                <a href={adminConfig.whatsappNumber} className="bg-white p-6 rounded-[2rem] text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"><MessageSquare className="text-green-500" /><span className="text-xs font-black">واتساب</span></a>
            </div>
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                 <h3 className="font-black mb-4">رسالة سريعة</h3>
                 <form className="space-y-3" onSubmit={handleContactSubmit}>
                    <input type="text" className="w-full p-3 rounded-xl bg-slate-50 border-none font-bold text-sm" placeholder="الاسم" required value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                    <input type="email" className="w-full p-3 rounded-xl bg-slate-50 border-none font-bold text-sm" placeholder="الإيميل" required value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                    <textarea className="w-full p-3 rounded-xl bg-slate-50 border-none font-bold text-sm h-24 resize-none" placeholder="الرسالة..." required value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-sm shadow-lg active:scale-95 transition-all">إرسال</button>
                 </form>
             </div>
        </div>
      )}

      {view === 'privacy' && (
        <div className="px-4 py-24 max-w-lg mx-auto animate-in slide-in-from-bottom-10">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                <h1 className="text-2xl font-black mb-6">الخصوصية</h1>
                <p className="text-sm font-bold text-slate-500 leading-relaxed">نحترم خصوصيتك. البيانات التي نجمعها تستخدم فقط لتحسين تجربة البحث ولا يتم بيعها لأي طرف ثالث.</p>
                <button onClick={resetToHome} className="mt-8 w-full bg-slate-100 py-3 rounded-xl font-black text-xs">الرجوع</button>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;
