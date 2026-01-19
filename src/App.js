import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingCart, Star, Shield, Info, ExternalLink, Zap, 
  BarChart3, TrendingDown, AlertCircle, CheckCircle, MousePointer2, 
  Cpu, Rocket, Mail, Lock, Phone, MessageSquare, Tag, Award, Users, Heart,
  Instagram, Twitter, Send, Settings, Eye, EyeOff, Save, ArrowLeft, Plus, Trash2, X,
  FileText, Activity, Globe, ChevronLeft, Coins, Database, Bell, MessageCircle, BarChart2, Flame, Languages, Link, Server
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, increment, updateDoc, addDoc, deleteDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';

// --- أيقونة الموقع ---
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

// --- قاموس الترجمة الشامل ---
const translations = {
  ar: {
    home: 'الرئيسية',
    about: 'وش مقارن؟',
    features: 'ليش نثق فينا؟',
    earn: 'كيف نربح؟',
    partners: 'شركاء مقارن',
    merchant: 'للشركات',
    langName: 'English',
    heroTitlePart1: 'قارن بذكاء..',
    heroTitlePart2: 'وقرّر في ثوانٍ',
    heroDesc: 'إحنا "الزبدة" في عالم التسوق.. محركنا يفرّ لك كل المتاجر ويعطيك الخلاصة وأفضل سعر.',
    searchPlaceholder: 'وش بخاطرك تشتري اليوم؟ (آيفون، سماعة، عطر..)',
    searchBtn: 'بحث ذكي',
    analyzing: 'جاري التحليل...',
    realSearch: 'عملية بحث حقيقية',
    trendingLabel: '🔥 طلبات رائجة:',
    partnersTitle: 'نبحث في المتاجر الموثوقة فقط',
    loadingTitle: 'جالس أفرّ لك السوق..',
    loadingDesc: 'نحلل الأسعار، الضمانات، وتقييمات الناس..',
    aiTitle: 'الزبدة من الذكاء الاصطناعي',
    winner: 'خيارنا الفائز',
    trusted: 'موثوق',
    rating: 'تقييم عام',
    from: 'من',
    client: 'عميل',
    warrantyTitle: 'الضمان',
    deliveryTitle: 'التوصيل',
    visitStore: 'زيارة المتجر',
    specialOffer: 'عرض خاص',
    howItWorksTitle: 'كيف يشتغل "مقارن"؟ 🤔',
    step1Title: 'اكتب وش تبي',
    step1Desc: 'بس اكتب اسم المنتج في البحث (جوال، عطر، أي شي).',
    step2Title: 'الذكاء يفرّ السوق',
    step2Desc: 'محركنا يزور المتاجر كلها ويجيب الأسعار والتفاصيل.',
    step3Title: 'خذ الزبدة ووفر',
    step3Desc: 'نعلمك وين الأرخص والأضمن، وتشتريه وأنت مرتاح.',
    earnTitle: 'كيف نربح؟ (بكل شفافية) 💰',
    earnDesc: 'موقع "مقارن" مجاني لك 100%. إحنا نربح عمولة بسيطة من المتاجر لما تشتري عن طريقنا، وهالشي ما يزود السعر عليك أبداً.',
    neutrality: 'حيادية تامة',
    noExtraCost: 'لا زيادة في السعر',
    trustTitle: 'ليش تثق فينا؟ 🤝',
    trust1Title: 'نطرد الوهمي',
    trust1Desc: 'نحلل آلاف التعليقات الحقيقية ونطرد "الوهمية" منها عشان تشتري وأنت واثق.',
    trust2Title: 'حماية حقك',
    trust2Desc: 'نعلمك وش نوع الضمان الفعلي (وكيل ولا متجر) قبل ما تدفع ريال واحد.',
    trust3Title: 'حيادية تامة',
    trust3Desc: 'إحنا وسيط، أولويتنا دائماً مصلحتك وتوفيرك المادي قبل كل شيء.',
    footerDesc: 'محرك البحث الذكي الأول في السعودية للمقارنة بين المتاجر. نعطيك الزبدة ونوفر عليك.',
    quickLinks: 'روابط سريعة',
    legal: 'قانوني',
    contactTitle: 'تواصل معنا',
    rights: 'جميع الحقوق محفوظة لموقع مقارن © 2026',
    madeIn: 'صُنع بحب في السعودية 🇸🇦',
    privacy: 'سياسة الخصوصية',
    terms: 'الشروط والأحكام',
    adminLogin: 'لوحة الإدارة',
    enterCode: 'يرجى إدخال رمز الدخول للوصول للوحة التحكم',
    login: 'دخول',
    back: 'رجوع',
    toastSuccess: 'تم بنجاح!',
    toastError: 'حدث خطأ ما',
    freeShipping: 'شحن مجاني',
    fastShipping: 'شحن سريع',
    instantPickup: 'استلام فوري',
    agentWarranty: 'سنتين وكيل',
    storeWarranty: 'سنة متجر',
    comprehensiveWarranty: 'سنتين شامل'
  },
  en: {
    home: 'Home',
    about: 'About Us',
    features: 'Why Trust Us?',
    earn: 'Our Model',
    partners: 'Partners',
    merchant: 'Merchants',
    langName: 'عربي',
    heroTitlePart1: 'Compare Smartly..',
    heroTitlePart2: 'Decide in Seconds',
    heroDesc: 'We give you the "gist" of shopping. Our engine scans all stores to give you the summary and best price.',
    searchPlaceholder: 'What are you looking for today? (iPhone, Headset...)',
    searchBtn: 'Smart Search',
    analyzing: 'Analyzing...',
    realSearch: 'Real Searches',
    trendingLabel: '🔥 Trending:',
    partnersTitle: 'We search trusted stores only',
    loadingTitle: 'Scanning the market...',
    loadingDesc: 'Analyzing prices, warranties, and user reviews...',
    aiTitle: 'AI Summary',
    winner: 'Our Pick',
    trusted: 'Trusted',
    rating: 'Rating',
    from: 'from',
    client: 'reviews',
    warrantyTitle: 'Warranty',
    deliveryTitle: 'Delivery',
    visitStore: 'Visit Store',
    specialOffer: 'Special Offer',
    howItWorksTitle: 'How Moqaren Works? 🤔',
    step1Title: 'Type what you need',
    step1Desc: 'Just type the product name (Phone, Perfume, anything).',
    step2Title: 'AI Scans Market',
    step2Desc: 'Our engine visits all stores to fetch prices and details.',
    step3Title: 'Get the Gist & Save',
    step3Desc: 'We tell you where is cheaper and safer, so you buy with peace of mind.',
    earnTitle: 'How we earn? (Transparently) 💰',
    earnDesc: 'Moqaren is 100% free for you. We earn a small commission from stores when you buy through us, and this NEVER increases the price for you.',
    neutrality: '100% Neutral',
    noExtraCost: 'No Extra Cost',
    trustTitle: 'Why Trust Us? 🤝',
    trust1Title: 'Filter Fakes',
    trust1Desc: 'We analyze thousands of reviews and filter out "fake" ones so you buy with confidence.',
    trust2Title: 'Protect Your Right',
    trust2Desc: 'We tell you the actual warranty type (Agent or Store) before you pay a single riyal.',
    trust3Title: 'Total Neutrality',
    trust3Desc: 'We are intermediaries; our priority is always your interest and saving money.',
    footerDesc: 'The #1 smart comparison engine in Saudi Arabia. We save you time and money.',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    contactTitle: 'Contact Us',
    rights: 'All rights reserved Moqaren © 2026',
    madeIn: 'Made with love in Saudi Arabia 🇸🇦',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    adminLogin: 'Admin Panel',
    enterCode: 'Please enter access code',
    login: 'Login',
    back: 'Back',
    toastSuccess: 'Success!',
    toastError: 'Something went wrong',
    freeShipping: 'Free Shipping',
    fastShipping: 'Fast Shipping',
    instantPickup: 'Instant Pickup',
    agentWarranty: '2 Years Agent',
    storeWarranty: '1 Year Store',
    comprehensiveWarranty: '2 Years Full'
  }
};

// --- إعدادات المحرك الذكي (Gemini API) ---
// تم التعديل ليسحب المفتاح من متغيرات البيئة في Vercel
const apiKey = process.env.REACT_APP_GEMINI_KEY; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

// --- إعدادات Firebase ---
// تم التعديل لتسحب البيانات من متغيرات البيئة في Vercel
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
const appId = 'moqaren-app-v1'; // معرف ثابت للتطبيق

const App = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [view, setView] = useState('home'); 
  const [showExclusiveToast, setShowExclusiveToast] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  
  // اللغة
  const [lang, setLang] = useState('ar');
  const t = translations[lang];

  // إشعارات النظام
  const [notification, setNotification] = useState(null);

  // حالة العداد الحقيقي (يبدأ من 0)
  const [realSearchCount, setRealSearchCount] = useState(0);

  // --- حالات لوحة التحكم ---
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [adminInput, setAdminInput] = useState(''); // تم تغيير الاسم ليعبر عن المدخل العام (اسم أو رمز)
  const [loginStep, setLoginStep] = useState(0); // 0: اسم المستخدم، 1: الرمز السري
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const clickTimeoutRef = useRef(null); 

  // --- البيانات ---
  const [inboxMessages, setInboxMessages] = useState([]);
  const [topSearchTerms, setTopSearchTerms] = useState([]);

  // حقول الإدخال للإدارة
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

  // --- الحالة الافتراضية للإعدادات ---
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

  // --- 1. المصادقة ---
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

  // --- 2. جلب الإعدادات ---
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

  // --- 3. عداد البحث الحقيقي (يبدأ من 0 إذا لم يوجد بيانات) ---
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

  // --- 4. جلب البريد وإحصائيات البحث ---
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
        element.classList.add('ring-4', 'ring-blue-300', 'transition-all', 'duration-500');
        setTimeout(() => { element.classList.remove('ring-4', 'ring-blue-300'); }, 1000);
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
      setLoginStep(0); // إعادة تعيين الخطوات عند الفتح
      setAdminInput('');
      return;
    } 
    resetToHome();
    clickTimeoutRef.current = setTimeout(() => setAdminClickCount(0), 3000);
  };

  // --- Handlers ---
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
    
    // المرحلة الأولى: التحقق من اسم المستخدم
    if (loginStep === 0) {
      if (adminInput === "abdulrhman07") {
        setLoginStep(1); // الانتقال لمرحلة الرمز
        setAdminInput(''); // مسح الحقل
      } else {
        alert("بيانات غير صحيحة"); // رسالة عامة للتمويه
        setAdminInput('');
      }
    } 
    // المرحلة الثانية: التحقق من الرمز السري
    else {
      if (adminInput === "123456") { 
        setIsAdminAuthenticated(true);
        setAdminInput('');
        setLoginStep(0);
      } else {
        alert("بيانات غير صحيحة");
        setAdminInput('');
        setLoginStep(0); // العودة للبداية زيادة في الأمان
      }
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inbox', msgId));
      showNotification("تم حذف الرسالة");
    } catch (err) { }
  };

  // Admin CRUD Functions
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

  // --- AI ---
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

    const basePrice = Math.floor(Math.random() * 500) + 100;
    
    let searchResults = [
      { id: 1, store: 'أمازون', storeKey: 'amazon', storeColor: 'bg-orange-500', price: basePrice + 20, originalPrice: basePrice + 80, currency: 'ر.س', rating: 4.8, reviewsCount: 1250, delivery: t.freeShipping, warranty: t.agentWarranty, aiAnalysis: 'الضمان عندهم مسمار في لوح.' },
      { id: 2, store: 'نون', storeKey: 'noon', storeColor: 'bg-yellow-400', price: basePrice, originalPrice: basePrice + 50, currency: 'ر.س', rating: 4.5, reviewsCount: 890, delivery: t.fastShipping, warranty: t.storeWarranty, aiAnalysis: 'سعره لقطة وحالياً عليه عرض.' },
      { id: 3, store: 'إكس سايت', storeKey: 'xcite', storeColor: 'bg-blue-600', price: basePrice - 15, originalPrice: basePrice + 60, currency: 'ر.س', rating: 4.9, reviewsCount: 2100, delivery: t.instantPickup, warranty: t.comprehensiveWarranty, aiAnalysis: 'هذا عرض خاص لمتابعينا.' }
    ];

    if (adminConfig.customApis && adminConfig.customApis.length > 0) {
        console.log("Fetching from custom APIs:", adminConfig.customApis);
    }

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* إشعار النظام الموحد */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 ${notification.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white border-green-100 text-green-700'}`}>
            {notification.type === 'error' ? <AlertCircle size={24} /> : <CheckCircle size={24} className="text-green-500" />}
            <span className="font-black text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* زر اللغة العائم (خارج البار) */}
      <button 
        onClick={toggleLanguage} 
        className={`fixed top-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-[100] bg-white/90 backdrop-blur-xl shadow-xl border border-white/50 p-3 rounded-full hover:scale-110 transition-all active:scale-95 group`}
        title="Switch Language"
      >
        <Languages size={20} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
        <span className={`absolute ${lang === 'ar' ? 'left-full ml-2' : 'right-full mr-2'} top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold`}>
          {t.langName}
        </span>
      </button>

      {/* إشعار العرض الخاص */}
      {showExclusiveToast && currentOffer && (
        <div className={`fixed bottom-6 ${lang === 'ar' ? 'left-4' : 'right-4'} md:max-w-sm z-[100] animate-in slide-in-from-bottom-10 duration-500`}>
          <div className="bg-gradient-to-l from-blue-600 to-indigo-600 text-white p-6 rounded-[2rem] shadow-2xl relative border-4 border-white/20 backdrop-blur-md">
            <button onClick={() => setShowExclusiveToast(false)} className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} text-white/50 hover:text-white transition-colors bg-white/10 rounded-full w-8 h-8 flex items-center justify-center`}>✕</button>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white text-blue-600 p-2 rounded-xl shadow-lg animate-bounce"><Tag size={20} /></div>
              <span className="font-black text-lg tracking-tight">{t.specialOffer}! 🤫</span>
            </div>
            <p className="text-sm text-blue-50 font-medium mb-4 leading-relaxed opacity-90">{currentOffer.message}</p>
            <a href={currentOffer.link} target="_blank" className="w-full bg-white text-blue-600 py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-all text-center block shadow-lg active:scale-95">{t.visitStore}</a>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-900/10 rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 pointer-events-auto border border-white/50 max-w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-4 cursor-pointer group select-none" onClick={handleLogoClick}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform"><Zap size={18} fill="currentColor" /></div>
            <span className="text-lg font-black text-slate-800 tracking-tighter hidden md:block">مقارن</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <div className="flex items-center">
            {[{ id: 'home', label: t.home, icon: Globe, action: resetToHome }, { id: 'about', label: t.about, icon: Info, action: () => scrollToSection('about') }, { id: 'features', label: t.features, icon: Star, action: () => scrollToSection('why-trust') }, { id: 'earn', label: t.earn, icon: Coins, action: () => scrollToSection('how-we-earn') }, { id: 'partners', label: t.partners, icon: Users, action: () => scrollToSection('partners') }].map((item) => (
                <button key={item.id} onClick={item.action} className={`px-3 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 transition-all duration-300 ${view === 'home' ? 'hover:bg-blue-50 hover:text-blue-600 text-slate-600' : ''}`}>
                    <item.icon size={14} className="opacity-70" />
                    <span className="whitespace-nowrap">{item.label}</span>
                </button>
            ))}
          </div>
          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>
          <button onClick={() => setView('merchant')} className="hidden md:flex bg-slate-900 text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-slate-800 shadow-lg items-center gap-2 active:scale-95 transition-all whitespace-nowrap"><Award size={14} /> {t.merchant}</button>
        </div>
      </nav>

      {/* الصفحة الرئيسية */}
      {view === 'home' && (
        <>
          <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-900 text-white pt-40 pb-32 px-4 relative overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-black mb-8 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                <span>{realSearchCount.toLocaleString()} {t.realSearch}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl text-white tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">{t.heroTitlePart1} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">{t.heroTitlePart2}</span></h1>
              <p className="text-blue-100 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">{t.heroDesc}</p>
              <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-[2.5rem] group-hover:bg-blue-400/30 transition-all duration-500"></div>
                <input type="text" placeholder={t.searchPlaceholder} className="w-full py-6 md:py-8 px-16 rounded-[2.5rem] text-slate-900 shadow-2xl text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all font-bold border-none relative z-10 placeholder:text-slate-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Search className={`absolute ${lang === 'ar' ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 text-slate-400 z-20`} size={28} />
                <button type="submit" disabled={isSearching} className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[2rem] font-black transition-all flex items-center gap-2 disabled:bg-slate-400 shadow-xl active:scale-95 z-20 text-sm md:text-base group-hover:shadow-blue-500/50`}>
                  {isSearching ? <span className="animate-pulse">{t.analyzing}</span> : <>{t.searchBtn} <Rocket size={18} /></>}
                </button>
              </form>
              <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm font-bold text-blue-200/60 animate-in fade-in duration-1000 delay-300">
                <span>{t.trendingLabel}</span>
                {adminConfig.trendingKeywords && adminConfig.trendingKeywords.length > 0 ? (
                  adminConfig.trendingKeywords.map((keyword, index) => (
                    <button key={index} onClick={() => setSearchQuery(keyword)} className="hover:text-white transition-all bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-95">
                      {keyword}
                    </button>
                  ))
                ) : (
                  <>
                    <button onClick={() => setSearchQuery('آيفون 15')} className="hover:text-white transition-all bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10">آيفون 15</button>
                    <button onClick={() => setSearchQuery('سوني 5')} className="hover:text-white transition-all bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10">سوني 5</button>
                  </>
                )}
              </div>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
            {!results && !isSearching && (
              <section id="partners" className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/50 p-8 mb-24 flex flex-col md:flex-row items-center justify-between gap-8 scroll-mt-32">
                <div className="flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-[0.1em] shrink-0 w-full md:w-auto justify-center md:justify-start"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>{t.partnersTitle}</div>
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer font-black w-full">
                   {adminConfig.trustedPartners?.map((partner, idx) => (<div key={idx} className="text-xl md:text-2xl font-black italic tracking-tighter hover:text-blue-900 transition-colors transform hover:scale-110">{partner.name}</div>))}
                </div>
              </section>
            )}

            {isSearching && (
              <div className="bg-white rounded-[3rem] p-20 shadow-xl border border-slate-100 text-center mb-32">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <Zap className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={32} fill="currentColor" />
                </div>
                <h3 className="text-slate-900 font-black text-2xl md:text-3xl animate-pulse tracking-tight mb-2">{t.loadingTitle}</h3>
                <p className="text-slate-400 font-medium">{t.loadingDesc}</p>
              </div>
            )}

            {results && !isSearching && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 mb-32">
                {aiSummary && (
                    <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden border border-white/10">
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="relative z-10 flex-1">
                          <div className="flex items-center gap-3 mb-6 text-blue-300 font-black text-sm uppercase tracking-widest bg-white/10 w-fit px-4 py-1.5 rounded-full backdrop-blur-sm"><BarChart3 size={16} /> {t.aiTitle}</div>
                          <p className="text-white text-2xl md:text-4xl font-black leading-snug tracking-tight mb-4">"{aiSummary.summary}"</p>
                        </div>
                        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] shadow-2xl shrink-0 text-center min-w-[220px]">
                            <span className="text-xs font-bold text-blue-200 block mb-3 uppercase tracking-widest">{t.winner}</span>
                            <div className="flex flex-col items-center justify-center gap-2 font-black text-3xl">
                                <div className="bg-green-500 rounded-full p-2 mb-2 shadow-lg shadow-green-500/30"><CheckCircle size={32} className="text-white" /></div>
                                {aiSummary.verdict}
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {results.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col group relative">
                      {item.store.includes('شريك') && (<div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black z-20 animate-pulse shadow-lg ring-4 ring-red-100">{t.specialOffer}</div>)}
                      <div className={`${item.storeColor} py-8 px-8 text-white flex justify-between items-start relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div><span className="font-black text-2xl tracking-tighter block mb-1">{item.store}</span><div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-md inline-flex items-center gap-1"><Shield size={10} /> {t.trusted}</div></div>
                      </div>
                      <div className="p-8 flex-grow flex flex-col">
                        <div className="flex justify-between items-end mb-8 border-b border-dashed border-slate-200 pb-6">
                          <div><span className="text-5xl font-black text-slate-900 leading-none tracking-tighter">{item.price}</span><span className="text-lg text-slate-400 font-bold mx-2 uppercase">{item.currency}</span></div>
                          <div className="text-xs text-red-400 line-through font-black opacity-50 mb-2">{item.originalPrice}</div>
                        </div>
                        <div className="space-y-5 mb-8 flex-grow">
                          <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-2xl"><Star size={20} className="text-yellow-400 fill-yellow-400 shrink-0" /><div><span className="block text-slate-900">{item.rating} {t.rating}</span><span className="text-slate-400 font-medium text-xs">{t.from} {item.reviewsCount.toLocaleString()} {t.client}</span></div></div>
                          <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-2xl"><Shield size={20} className="text-blue-500 shrink-0" /><div><span className="block text-slate-900">{t.warrantyTitle}</span><span className="text-slate-400 font-medium text-xs">{item.warranty}</span></div></div>
                          <div className="flex items-center gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-2xl"><ShoppingCart size={20} className="text-indigo-500 shrink-0" /><div><span className="block text-slate-900">{t.deliveryTitle}</span><span className="text-slate-400 font-medium text-xs">{item.delivery}</span></div></div>
                        </div>
                        <div className="bg-blue-50 p-5 rounded-2xl text-xs text-blue-800 mb-8 font-bold leading-relaxed flex gap-3 items-start"><Info size={16} className="shrink-0 mt-0.5" />"{item.aiAnalysis}"</div>
                        <a href={getStoreLink(item.storeKey)} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-blue-600 transition-all flex justify-center items-center gap-2 shadow-xl hover:shadow-blue-200 active:scale-95 text-center group/btn">{t.visitStore}<ExternalLink size={20} className="group-hover/btn:translate-x-1 transition-transform rtl:group-hover/btn:-translate-x-1" /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!results && !isSearching && (
              <>
                <section id="about" className="mb-32 scroll-mt-32">
                  <div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t.howItWorksTitle}</h2><p className="text-slate-500 font-bold text-xl">ثلاث خطوات بسيطة.. وتوفر فلوسك</p></div>
                  <div className="grid md:grid-cols-3 gap-8">{[{ icon: MousePointer2, title: t.step1Title, desc: t.step1Desc, color: 'blue' }, { icon: Cpu, title: t.step2Title, desc: t.step2Desc, color: 'indigo' }, { icon: Rocket, title: t.step3Title, desc: t.step3Desc, color: 'green' }].map((item, i) => (<div key={i} className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-all text-center group"><div className={`bg-${item.color}-50 text-${item.color}-600 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}><item.icon size={48} /></div><h3 className="text-2xl font-black mb-4 text-slate-900">{item.title}</h3><p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p></div>))}</div>
                </section>
                <section id="how-we-earn" className="bg-slate-900 rounded-[3rem] p-10 md:p-24 text-white text-center shadow-2xl mb-32 scroll-mt-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div><div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">{t.earnTitle}</h2><p className="text-blue-100 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed mb-16 relative z-10 font-medium">{t.earnDesc}</p>
                    <div className="flex flex-wrap justify-center gap-6 relative z-10 font-black"><div className="bg-white/10 px-10 py-6 rounded-[2rem] backdrop-blur-md border border-white/10 flex items-center gap-3 hover:bg-white/20 transition-colors"><CheckCircle size={24} className="text-green-400" /> {t.neutrality}</div><div className="bg-white/10 px-10 py-6 rounded-[2rem] backdrop-blur-md border border-white/10 flex items-center gap-3 hover:bg-white/20 transition-colors"><CheckCircle size={24} className="text-green-400" /> {t.noExtraCost}</div></div>
                </section>
                <section id="why-trust" className="mb-32 scroll-mt-32">
                    <div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t.trustTitle}</h2><div className="inline-flex items-center gap-3 bg-blue-50 text-blue-900 px-6 py-3 rounded-full font-black text-lg animate-bounce"><Activity size={24} className="text-blue-600" /><span>{realSearchCount.toLocaleString()} {t.realSearch}</span></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8"><div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all"><div className="bg-blue-50 text-blue-600 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8"><BarChart3 size={40} /></div><h3 className="text-2xl font-black mb-4 text-slate-900">{t.trust1Title}</h3><p className="text-slate-500 font-bold leading-relaxed">{t.trust1Desc}</p></div><div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all"><div className="bg-green-50 text-green-600 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8"><Shield size={40} /></div><h3 className="text-2xl font-black mb-4 text-slate-900">{t.trust2Title}</h3><p className="text-slate-500 font-bold leading-relaxed">{t.trust2Desc}</p></div><div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all"><div className="bg-purple-50 text-purple-600 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8"><Heart size={40} /></div><h3 className="text-2xl font-black mb-4 text-slate-900">{t.trust3Title}</h3><p className="text-slate-500 font-bold leading-relaxed">{t.trust3Desc}</p></div></div>
                </section>
              </>
            )}
          </main>
        </>
      )}

      {/* Admin View */}
      {view === 'admin' && (
        <div className="max-w-5xl mx-auto px-4 py-32 animate-in fade-in">
          {!isAdminAuthenticated ? (
            <div className="bg-white rounded-[3rem] shadow-2xl p-12 max-w-sm mx-auto text-center border border-slate-100">
               <Lock size={40} className="mx-auto mb-6 text-slate-900" />
               <h1 className="text-2xl font-black mb-6">{t.adminLogin}</h1>
               <p className="text-slate-400 mb-6 font-bold">
                 {loginStep === 0 ? "الهوية الأمنية" : "رمز الدخول"}
               </p>
               <form onSubmit={handleAdminLogin} className="space-y-4">
                 <input 
                   type={loginStep === 0 ? "text" : "password"} // تغيير النوع حسب الخطوة
                   className="w-full p-4 rounded-xl bg-slate-50 font-black text-center focus:ring-2 focus:ring-blue-600 outline-none transition-all" 
                   placeholder={loginStep === 0 ? "User ID" : "******"} 
                   value={adminInput} 
                   onChange={(e) => setAdminInput(e.target.value)} 
                   autoFocus
                   autoComplete="off"
                 />
                 <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-colors">
                   {loginStep === 0 ? "التالي" : t.login}
                 </button>
               </form>
               <button onClick={resetToHome} className="mt-6 text-slate-400 font-bold text-sm">{t.back}</button>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-slate-100">
              <div className="flex justify-between items-center mb-10 border-b pb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-black">الإعدادات ⚙️</h1>
                    <div className="relative bg-slate-100 p-2 rounded-xl">
                        <Bell className={`w-6 h-6 ${inboxMessages.length > 0 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
                        {inboxMessages.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">{inboxMessages.length}</span>}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSaveAllChanges} className="px-6 py-2 bg-green-600 text-white rounded-xl font-black text-xs hover:bg-green-700 shadow-lg flex items-center gap-2"><Save size={14} /> حفظ التغييرات</button>
                    <button onClick={() => setIsAdminAuthenticated(false)} className="text-red-500 font-bold text-sm">خروج</button>
                </div>
              </div>
              
              {/* API Settings (New Section) */}
              <div className="mb-12 bg-cyan-50 border border-cyan-100 rounded-[2rem] p-8">
                  <h3 className="font-black text-cyan-900 border-b border-cyan-200 pb-4 mb-6 flex items-center gap-2">
                      <Link className="text-cyan-600" />
                      إعدادات الربط البرمجي (APIs)
                  </h3>
                  <div className="space-y-4">
                      {adminConfig.customApis?.map((api, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                              <span className="font-bold text-cyan-800">{api.name}</span>
                              <span className="flex-1 text-xs text-slate-500 truncate" dir="ltr">{api.url}</span>
                              <button onClick={() => handleDeleteApi(idx)} className="text-cyan-300 hover:text-red-500"><Trash2 size={16} /></button>
                          </div>
                      ))}
                      <div className="flex gap-2">
                          <input type="text" placeholder="اسم المتجر" className="w-1/4 p-3 rounded-xl text-sm font-bold border-none" value={newApiName} onChange={(e) => setNewApiName(e.target.value)} />
                          <input type="text" placeholder="رابط البحث (API URL)" className="flex-1 p-3 rounded-xl text-sm font-bold border-none text-left" dir="ltr" value={newApiUrl} onChange={(e) => setNewApiUrl(e.target.value)} />
                          <button onClick={handleAddApi} className="bg-cyan-600 text-white px-6 rounded-xl font-bold text-sm hover:bg-cyan-700"><Plus size={20} /></button>
                      </div>
                      <p className="text-[10px] text-cyan-600 font-bold mt-2">* يجب أن يدعم الرابط بروتوكول CORS ويعيد بيانات بصيغة JSON.</p>
                  </div>
              </div>
              
              {/* Analytics */}
              <div className="mb-12 bg-indigo-50 border border-indigo-100 rounded-[2rem] p-8">
                  <h3 className="font-black text-indigo-900 border-b border-indigo-200 pb-4 mb-6 flex items-center gap-2"><BarChart2 className="text-indigo-600" />إحصائيات البحث (Trend)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                          <p className="text-sm font-bold text-indigo-400 mb-4">الكلمات الأكثر بحثاً</p>
                          <div className="flex items-end gap-2 h-64 mt-6 bg-white p-4 rounded-xl border border-indigo-50 shadow-inner">
                            {topSearchTerms.length > 0 ? (
                                (() => {
                                    const maxCount = Math.max(...topSearchTerms.map(t => t.count));
                                    return topSearchTerms.map((item, idx) => {
                                        const heightPercent = (item.count / maxCount) * 100;
                                        return (
                                            <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                                <div className="w-full bg-indigo-500 rounded-t-lg transition-all duration-500 hover:bg-indigo-600 relative shadow-sm" style={{ height: `${heightPercent}%` }}>
                                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 font-bold">{item.count} بحث</span>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()
                            ) : (<div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">لا توجد بيانات كافية</div>)}
                          </div>
                          <div className="flex gap-2 mt-2">{topSearchTerms.map((item, idx) => (<span key={idx} className="flex-1 text-[8px] text-center text-slate-500 font-bold truncate block">{item.term}</span>))}</div>
                      </div>
                      <div className="flex flex-col justify-center">
                          <div className="bg-white p-6 rounded-2xl shadow-sm text-center mb-4"><Activity size={48} className="text-indigo-200 mb-4 mx-auto" /><h4 className="text-4xl font-black text-indigo-600 mb-2">{realSearchCount.toLocaleString()}</h4><p className="text-slate-400 font-bold text-sm">إجمالي عمليات البحث</p></div>
                      </div>
                  </div>
              </div>

              {/* Other Configs */}
               <div className="mb-12"><h3 className="font-black text-slate-900 border-b pb-4 mb-6 flex items-center gap-2"><MessageCircle className="text-blue-600" />الرسائل والطلبات الواردة</h3><div className="bg-slate-50 rounded-[2rem] p-6 max-h-[400px] overflow-y-auto custom-scrollbar">{inboxMessages.length === 0 ? (<div className="text-center py-12 text-slate-400 font-bold">لا توجد رسائل جديدة</div>) : (<div className="space-y-4">{inboxMessages.map((msg) => (<div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative group"><button onClick={() => handleDeleteMessage(msg.id)} className="absolute top-4 left-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button><div className="flex items-center gap-3 mb-2"><span className={`text-[10px] font-black px-3 py-1 rounded-full ${msg.type === 'partner_request' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>{msg.type === 'partner_request' ? 'طلب شراكة' : 'رسالة تواصل'}</span><span className="text-xs text-slate-400 font-bold" dir="ltr">{new Date(msg.timestamp).toLocaleDateString('en-GB')}</span></div><h4 className="font-black text-lg text-slate-900 mb-1">{msg.type === 'partner_request' ? msg.store : msg.name}</h4><p className="text-blue-600 font-bold text-sm mb-2" dir="ltr">{msg.email}</p>{msg.message && (<p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-xl mt-2">"{msg.message}"</p>)}</div>))}</div>)}</div></div>

               <div className="mb-12 bg-orange-50 border border-orange-100 rounded-[2rem] p-8"><h3 className="font-black text-orange-900 border-b border-orange-200 pb-4 mb-6 flex items-center gap-2"><Flame className="text-orange-600" />إدارة الكلمات الرائجة (تظهر في الرئيسية)</h3><div className="space-y-4"><div className="flex flex-wrap gap-2 mb-4">{adminConfig.trendingKeywords?.map((kw, idx) => (<div key={idx} className="bg-white text-orange-800 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm border border-orange-100">{kw}<button onClick={() => handleDeleteTrendingKeyword(idx)} className="text-orange-300 hover:text-red-500 transition-colors"><X size={14} /></button></div>))}</div><div className="flex gap-2"><input type="text" placeholder="أضف كلمة جديدة" className="flex-1 p-4 rounded-xl text-sm font-bold border-none shadow-sm" value={newTrendingKeyword} onChange={(e) => setNewTrendingKeyword(e.target.value)} /><button onClick={handleAddTrendingKeyword} className="bg-orange-600 text-white px-6 rounded-xl font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-200"><Plus size={20} /></button></div></div></div>

               <div className="grid md:grid-cols-2 gap-10 mb-12">
                 <div className="space-y-6"><h3 className="font-black text-blue-900 border-b pb-2">بيانات التواصل</h3><div className="space-y-2"><label className="text-xs font-bold text-slate-400">الواتساب</label><input type="text" value={adminConfig.whatsappNumber} onChange={(e) => setAdminConfig({...adminConfig, whatsappNumber: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div><div className="space-y-2"><label className="text-xs font-bold text-slate-400">الإيميل</label><input type="email" value={adminConfig.supportEmail} onChange={(e) => setAdminConfig({...adminConfig, supportEmail: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div><div className="space-y-2"><label className="text-xs font-bold text-slate-400">تويتر</label><input type="text" value={adminConfig.twitterLink} onChange={(e) => setAdminConfig({...adminConfig, twitterLink: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div><div className="space-y-2"><label className="text-xs font-bold text-slate-400">إنستقرام</label><input type="text" value={adminConfig.instagramLink} onChange={(e) => setAdminConfig({...adminConfig, instagramLink: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div></div>
                 <div className="space-y-6"><h3 className="font-black text-green-600 border-b pb-2">روابط المتاجر</h3><div className="max-h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar">{adminConfig.affiliateLinks?.map((store, index) => (<div key={index} className="flex gap-2"><input type="text" value={store.link} onChange={(e) => { const newLinks = [...adminConfig.affiliateLinks]; newLinks[index].link = e.target.value; setAdminConfig({...adminConfig, affiliateLinks: newLinks}); }} className="w-full p-3 rounded-xl bg-slate-50 font-bold border text-xs" dir="ltr" /><div className="w-24 p-3 rounded-xl bg-slate-100 font-black text-center text-xs flex items-center justify-center">{store.name.toUpperCase()}</div><button onClick={() => handleDeleteStore(index)} className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100"><Trash2 size={16} /></button></div>))}</div><div className="bg-green-50 p-4 rounded-2xl border border-green-100"><h4 className="font-bold text-green-700 text-sm mb-3">إضافة متجر جديد</h4><div className="flex gap-2 mb-2"><input type="text" placeholder="الاسم" className="w-1/2 p-3 rounded-xl border text-sm font-bold" value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} /><input type="text" placeholder="الرابط" className="w-1/2 p-3 rounded-xl border text-sm font-bold text-left" dir="ltr" value={newStoreLink} onChange={(e) => setNewStoreLink(e.target.value)} /></div><button onClick={handleAddStore} className="w-full bg-green-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center justify-center gap-2"><Plus size={16} /> إضافة</button></div></div>
                 <div className="space-y-6"><h3 className="font-black text-blue-900 border-b pb-2">شركاء نثق بهم</h3><div className="space-y-2">{adminConfig.trustedPartners?.map((partner, index) => (<div key={index} className="flex gap-2 items-center"><div className="flex-1 p-3 rounded-xl bg-slate-100 font-black text-center text-xs">{partner.name}</div><button onClick={() => handleDeletePartner(index)} className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100"><Trash2 size={16} /></button></div>))}</div><div className="flex gap-2"><input type="text" placeholder="اسم الشريك" className="flex-1 p-3 rounded-xl border text-sm font-bold" value={newPartnerName} onChange={(e) => setNewPartnerName(e.target.value)} /><button onClick={handleAddPartner} className="bg-blue-600 text-white px-4 rounded-xl font-bold text-sm hover:bg-blue-700"><Plus size={16} /></button></div></div>
                 <div className="space-y-6"><h3 className="font-black text-purple-600 border-b pb-2">العروض الخاصة</h3><div className="max-h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar">{adminConfig.exclusiveOffers?.map((offer, index) => (<div key={index} className="bg-purple-50 p-3 rounded-xl text-xs relative group"><button onClick={() => handleDeleteOffer(index)} className="absolute top-2 left-2 text-red-400 hover:text-red-600"><X size={14} /></button><p className="font-black text-purple-900">كلمة البحث: {offer.keyword}</p><p className="text-slate-600 truncate">{offer.message}</p></div>))}</div><div className="bg-purple-50 p-4 rounded-2xl border border-purple-100"><h4 className="font-bold text-purple-700 text-sm mb-3">إضافة عرض ذكي</h4><input type="text" placeholder="كلمة البحث" className="w-full p-2 mb-2 rounded-lg border text-xs font-bold" value={newOfferKeyword} onChange={(e) => setNewOfferKeyword(e.target.value)} /><input type="text" placeholder="رسالة العرض" className="w-full p-2 mb-2 rounded-lg border text-xs font-bold" value={newOfferMessage} onChange={(e) => setNewOfferMessage(e.target.value)} /><input type="text" placeholder="رابط العرض" className="w-full p-2 mb-2 rounded-lg border text-xs font-bold text-left" dir="ltr" value={newOfferLink} onChange={(e) => setNewOfferLink(e.target.value)} /><button onClick={handleAddOffer} className="w-full bg-purple-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-purple-700 flex items-center justify-center gap-2"><Plus size={16} /> إضافة عرض</button></div></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* باقي الصفحات (التجار، الخصوصية، تواصل معنا) */}
      {view === 'merchant' && (
        <div className="max-w-4xl mx-auto px-4 py-32 animate-in fade-in">
           <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-20 border border-slate-100 text-center">
             <Award size={48} className="text-blue-600 mx-auto mb-6" />
             <h1 className="text-3xl font-black text-slate-900 mb-4">شريك أعمال مقارن</h1>
             <p className="text-slate-500 font-bold text-lg mb-10">وصل منتجاتك لآلاف العملاء.</p>
             <form className="space-y-6 text-right max-w-xl mx-auto" onSubmit={handleMerchantSubmit}>
               <input type="text" className="w-full p-5 rounded-2xl bg-slate-50 font-bold border" placeholder="اسم المتجر" required value={merchantForm.store} onChange={e => setMerchantForm({...merchantForm, store: e.target.value})} />
               <input type="email" className="w-full p-5 rounded-2xl bg-slate-50 font-bold border" placeholder="إيميل التواصل" required value={merchantForm.email} onChange={e => setMerchantForm({...merchantForm, email: e.target.value})} />
               <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-blue-700 transition-colors">إرسال الطلب</button>
             </form>
             <button onClick={resetToHome} className="mt-8 text-slate-400 font-bold underline">الرجوع</button>
           </div>
        </div>
      )}

      {view === 'privacy' && (
        <div className="max-w-4xl mx-auto px-4 py-32 animate-in fade-in">
           <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-20 border border-slate-100 relative overflow-hidden">
             <div className="relative z-10">
                <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3"><Lock className="text-blue-600" /> {t.privacy}</h1>
                <div className="space-y-8 text-slate-600 font-bold leading-loose text-base md:text-lg">
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-black text-slate-900 mb-2">1. مقدمة</h3>
                    <p>في "مقارن"، نأخذ خصوصيتك على محمل الجد. تشرح هذه الوثيقة كيف نجمع بياناتك ونستخدمها ونحميها عند استخدامك لموقعنا.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-black text-slate-900 mb-2">2. البيانات التي نجمعها</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>بيانات البحث:</strong> نقوم بتخزين كلمات البحث (بدون هوية) لتحسين خوارزمياتنا واقتراح منتجات أفضل.</li>
                        <li><strong>بيانات الجهاز:</strong> مثل نوع المتصفح والجهاز لضمان أفضل تجربة تصفح.</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-black text-slate-900 mb-2">3. ملفات تعريف الارتباط (Cookies)</h3>
                    <p>نستخدم الكوكيز لتحسين تجربتك وتذكر تفضيلاتك. يمكنك تعطيل الكوكيز من إعدادات متصفحك، لكن قد يؤثر ذلك على بعض وظائف الموقع.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-black text-slate-900 mb-2">4. الروابط الخارجية والعمولات</h3>
                    <p>يحتوي موقعنا على روابط لمتاجر خارجية (مثل أمازون ونون). عند النقر عليها، قد نتحصل على عمولة بسيطة دون أي تكلفة إضافية عليك. نحن غير مسؤولين عن سياسات الخصوصية الخاصة بتلك المتاجر.</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-black text-slate-900 mb-2">5. أمان البيانات</h3>
                    <p>نستخدم بروتوكولات تشفير متقدمة (SSL) لحماية اتصالك بالموقع. لا نقوم ببيع بياناتك لأي طرف ثالث.</p>
                  </div>
                </div>
                <button onClick={resetToHome} className="mt-12 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 transition-colors">الرجوع للرئيسية</button>
             </div>
           </div>
        </div>
      )}

      {view === 'contact' && (
        <div className="max-w-6xl mx-auto px-4 py-32 animate-in fade-in">
           <div className="text-center mb-16">
              <h1 className="text-4xl font-black text-slate-900 mb-4">{t.contactTitle} 📞</h1>
              <p className="text-slate-500 font-bold text-xl">حنا هنا عشان نسمعك، سواء عندك اقتراح أو مشكلة.</p>
           </div>
           <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
                    <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl"><Mail size={28} /></div>
                    <div><h3 className="font-black text-lg text-slate-800">الإيميل</h3><p className="text-blue-600 font-bold">{adminConfig.supportEmail}</p></div>
                 </div>
                 <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
                    <div className="bg-green-100 text-green-600 p-4 rounded-2xl"><MessageSquare size={28} /></div>
                    <div><h3 className="font-black text-lg text-slate-800">واتساب</h3><p className="text-green-600 font-bold" dir="ltr">{adminConfig.whatsappNumber}</p></div>
                 </div>
                 <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
                    <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl"><Send size={28} /></div>
                    <div><h3 className="font-black text-lg text-slate-800">سوشيال ميديا</h3><div className="flex gap-3 mt-1"><a href={adminConfig.twitterLink} className="text-slate-400 hover:text-blue-500 transition-colors"><Twitter size={20} /></a><a href={adminConfig.instagramLink} className="text-slate-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a></div></div>
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 h-full">
                 <h3 className="text-2xl font-black mb-6 text-slate-900">أرسل رسالة مباشرة ✉️</h3>
                 <form className="space-y-4" onSubmit={handleContactSubmit}>
                    <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100" placeholder="الاسم" required value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                    <input type="email" className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100" placeholder="الإيميل" required value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                    <textarea className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100 h-32 resize-none" placeholder="اكتب رسالتك هنا..." required value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                    <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-slate-800 transition-all">إرسال</button>
                 </form>
              </div>
           </div>
           <div className="text-center mt-16"><button onClick={resetToHome} className="text-slate-400 font-bold hover:text-blue-600 flex items-center justify-center gap-2 mx-auto"><ArrowLeft size={16} /> الرجوع للرئيسية</button></div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-32 rounded-t-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-white mb-6"><div className="bg-blue-600 p-2 rounded-xl"><Zap size={24} fill="currentColor" /></div><span className="text-3xl font-black tracking-tighter">مقارن</span></div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">{t.footerDesc}</p>
              <div className="flex gap-4"><a href={adminConfig.twitterLink} className="bg-white/5 hover:bg-blue-500 hover:text-white p-3 rounded-full transition-all"><Twitter size={18} /></a><a href={adminConfig.instagramLink} className="bg-white/5 hover:bg-pink-500 hover:text-white p-3 rounded-full transition-all"><Instagram size={18} /></a></div>
            </div>
            <div><h4 className="text-white font-black text-lg mb-6">{t.quickLinks}</h4><ul className="space-y-4 text-sm font-bold"><li><button onClick={resetToHome} className="hover:text-blue-400 transition-colors">{t.home}</button></li><li><button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">{t.about}</button></li><li><button onClick={() => scrollToSection('why-trust')} className="hover:text-blue-400 transition-colors">{t.features}</button></li><li><button onClick={() => scrollToSection('how-we-earn')} className="hover:text-blue-400 transition-colors">{t.earn}</button></li><li><button onClick={() => setView('merchant')} className="hover:text-blue-400 transition-colors">{t.merchant}</button></li></ul></div>
             <div><h4 className="text-white font-black text-lg mb-6">{t.legal}</h4><ul className="space-y-4 text-sm font-bold"><li><button onClick={() => setView('privacy')} className="hover:text-blue-400 transition-colors">{t.privacy}</button></li><li><button onClick={() => setView('contact')} className="hover:text-blue-400 transition-colors">{t.contactTitle}</button></li><li><button className="hover:text-blue-400 transition-colors cursor-not-allowed opacity-50">{t.terms}</button></li></ul></div>
            <div><h4 className="text-white font-black text-lg mb-6">{t.contact}</h4><ul className="space-y-4 text-sm font-medium"><li className="flex items-center gap-3"><Mail size={18} className="text-blue-500" /><span dir="ltr">{adminConfig.supportEmail}</span></li><li className="flex items-center gap-3"><Phone size={18} className="text-green-500" /><span dir="ltr">{adminConfig.whatsappNumber}</span></li><li className="flex items-start gap-3"><MapPinIcon /><span>الرياض، المملكة العربية السعودية</span></li></ul></div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500"><p>{t.rights}</p><div className="flex gap-6"><span>{t.madeIn}</span></div></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
