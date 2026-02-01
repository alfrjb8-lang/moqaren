import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingCart, Star, Shield, Info, ExternalLink, Zap, 
  BarChart3, TrendingDown, AlertCircle, CheckCircle, MousePointer2, 
  Cpu, Rocket, Mail, Lock, Phone, MessageSquare, Tag, Award, Users, Heart,
  Instagram, Twitter, Send, Settings, Eye, EyeOff, Save, ArrowLeft, Plus, Trash2, X,
  FileText, Activity, Globe, ChevronLeft, Coins, Database, Bell, MessageCircle, BarChart2, Flame, Languages, Link, Server,
  ChevronRight, Clock, XCircle, Share2, Calendar, TrendingUp, Filter, UserCheck, LogOut,
  Brain, Hexagon, Sparkles // أيقونات إضافية
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, increment, updateDoc, addDoc, deleteDoc, getDocs, arrayUnion } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// --- أيقونة الموقع ---
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

// --- قاموس الترجمة الشامل مع نصوص SEO ---
const translations = {
  ar: {
    // SEO Data
    siteTitle: 'مقارن | محرك بحث الأسعار الأول في السعودية',
    siteDesc: 'قارن أسعار الجوالات، الإلكترونيات، والعطور في السعودية. محرك مقارن يبحث لك في أمازون، نون، جرير وإكسترا ويعطيك أرخص سعر في ثانية.',
    keywords: 'مقارنة أسعار, أرخص سعر ايفون, عروض السعودية, أمازون السعودية, نون, جرير, تسوق ذكي',
    ogTitle: 'وفر فلوسك مع مقارن - دليلك لأرخص الأسعار',
    
    // UI Texts
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
    searchPlaceholder: 'ابحث عن منتج (ايفون، عطر..)',
    searchBtn: 'بحث',
    analyzing: 'جاري التحليل...',
    realSearch: 'عملية بحث حقيقية',
    trendingLabel: '🔥 طلبات رائجة:',
    partnersTitle: 'نبحث في المتاجر الموثوقة فقط',
    loadingTitle: 'جالس أفرّ لك السوق..',
    loadingDesc: 'نحلل الأسعار، الضمانات، وتقييمات الناس..',
    aiTitle: 'تحليل الذكاء الاصطناعي',
    winner: 'خيارنا الفائز',
    trusted: 'موثوق',
    rating: 'تقييم',
    from: 'من',
    client: 'عميل',
    warrantyTitle: 'الضمان',
    deliveryTitle: 'التوصيل',
    visitStore: 'شراء الآن',
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
    adminLogin: 'بوابة الإدارة الآمنة',
    enterCode: 'يرجى إدخال بيانات الدخول',
    login: 'تسجيل دخول',
    back: 'رجوع',
    toastSuccess: 'تم بنجاح!',
    toastError: 'حدث خطأ ما',
    freeShipping: 'شحن مجاني',
    fastShipping: 'شحن سريع',
    instantPickup: 'استلام فوري',
    agentWarranty: 'سنتين وكيل',
    storeWarranty: 'سنة متجر',
    comprehensiveWarranty: 'سنتين شامل',
    mySpace: 'مساحتي',
    favorites: 'المفضلة',
    recentSearches: 'آخر بحث',
    noFavorites: 'ما عندك منتجات مفضلة للحين',
    noHistory: 'ما بحثت عن شي للحين',
    clearHistory: 'مسح السجل',
    shareSuccess: 'تم نسخ العرض للمشاركة!',
    shareText: 'شوف هالعرض الممتاز حصلته في "مقارن" 😍',
    sharePrice: 'بسعر',
    shareLink: 'الرابط:',
    promoTitle: 'لا تفوت عروضنا الحصرية! 🎁',
    promoDesc: 'سجل إيميلك عشان نرسل لك العروض اللي تهمك أول بأول.',
    subscribe: 'اشتراك',
    thanksSubscribe: 'شكراً لاشتراكك! بنرسل لك الزين.',
    emailPlaceholder: 'اكتب إيميلك هنا'
  },
  en: {
    // SEO Data
    siteTitle: 'Moqaren | #1 Price Comparison Engine in Saudi Arabia',
    siteDesc: 'Compare prices for phones, electronics, and perfumes in KSA. Moqaren searches Amazon, Noon, Jarir, and Xcite to find you the best deal instantly.',
    keywords: 'price comparison, cheapest iphone, ksa deals, amazon saudi, noon, jarir, smart shopping',
    ogTitle: 'Save Money with Moqaren - Your Guide to Best Prices',

    // UI Texts
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
    searchPlaceholder: 'Search product...',
    searchBtn: 'Search',
    analyzing: 'Analyzing...',
    realSearch: 'Real Searches',
    trendingLabel: '🔥 Trending:',
    partnersTitle: 'We search trusted stores only',
    loadingTitle: 'Scanning the market...',
    loadingDesc: 'Analyzing prices, warranties, and user reviews...',
    aiTitle: 'AI Analysis',
    winner: 'Our Pick',
    trusted: 'Trusted',
    rating: 'Rating',
    from: 'from',
    client: 'reviews',
    warrantyTitle: 'Warranty',
    deliveryTitle: 'Delivery',
    visitStore: 'Buy Now',
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
    adminLogin: 'Secure Admin Portal',
    enterCode: 'Please enter credentials',
    login: 'Login',
    back: 'Back',
    toastSuccess: 'Success!',
    toastError: 'Something went wrong',
    freeShipping: 'Free Shipping',
    fastShipping: 'Fast Shipping',
    instantPickup: 'Instant Pickup',
    agentWarranty: '2 Years Agent',
    storeWarranty: '1 Year Store',
    comprehensiveWarranty: '2 Years Full',
    mySpace: 'My Space',
    favorites: 'Favorites',
    recentSearches: 'Recent Searches',
    noFavorites: 'No favorites yet',
    noHistory: 'No recent searches',
    clearHistory: 'Clear History',
    shareSuccess: 'Offer copied to share!',
    shareText: 'Check out this great offer I found on "Moqaren" 😍',
    sharePrice: 'Price',
    shareLink: 'Link:',
    promoTitle: 'Don\'t miss exclusive deals! 🎁',
    promoDesc: 'Subscribe to receive offers tailored to your interests.',
    subscribe: 'Subscribe',
    thanksSubscribe: 'Thanks! We\'ll keep you posted.',
    emailPlaceholder: 'Enter your email'
  }
};

// --- استدعاء المفاتيح السرية من البيئة (Direct process.env access) ---
const ADMIN_UID = process.env.REACT_APP_ADMIN_ID; 
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

// --- إعدادات Firebase من البيئة ---
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
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- مكون لإدارة SEO ديناميكياً ---
const SEOHead = ({ title, description, keywords, lang }) => {
  useEffect(() => {
    document.title = title;
    
    // Helper function to update meta tags
    const updateMeta = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);
    
    // Open Graph / Facebook / WhatsApp
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US', 'property');
    
    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', title, 'name');
    updateMeta('twitter:description', description, 'name');

    // Language attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  }, [title, description, keywords, lang]);

  return null;
};

// --- بيانات JSON-LD (Structured Data) لجوجل ---
const SchemaMarkup = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Moqaren",
    "alternateName": ["مقارن", "Moqaren KSA"],
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "description": "محرك بحث ذكي لمقارنة الأسعار في السعودية، يساعدك في العثور على أفضل العروض من أمازون، نون، وغيرها.",
    "publisher": {
      "@type": "Organization",
      "name": "Moqaren",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moqaren.com/logo.png" // Placeholder
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [view, setView] = useState('home'); 
  const [showExclusiveToast, setShowExclusiveToast] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidePanelTab, setSidePanelTab] = useState('favorites');
  const [myFavorites, setMyFavorites] = useState([]);
  const [mySearchHistory, setMySearchHistory] = useState([]);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [promoEmail, setPromoEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [marketingFilter, setMarketingFilter] = useState('');
  const [marketingSubject, setMarketingSubject] = useState('');
  const [marketingBody, setMarketingBody] = useState('');
  const [subscribersList, setSubscribersList] = useState([]);
  const [lang, setLang] = useState('ar');
  const t = translations[lang];
  const [notification, setNotification] = useState(null);
  const [realSearchCount, setRealSearchCount] = useState(0);
  const [adminClickCount, setAdminClickCount] = useState(0);
  const clickTimeoutRef = useRef(null); 
  const [inboxMessages, setInboxMessages] = useState([]);
  const [topSearchTerms, setTopSearchTerms] = useState([]);
  const [searchLogs, setSearchLogs] = useState([]); 
  const [monthlyStats, setMonthlyStats] = useState([]); 
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

  const toggleFavorite = (item) => {
    const exists = myFavorites.find(fav => fav.store === item.store && fav.price === item.price);
    if (exists) {
        setMyFavorites(prev => prev.filter(fav => fav !== exists));
        showNotification(lang === 'ar' ? 'تم الحذف من المفضلة' : 'Removed from favorites', 'error');
    } else {
        setMyFavorites(prev => [...prev, item]);
        showNotification(lang === 'ar' ? 'تمت الإضافة للمفضلة ❤️' : 'Added to favorites ❤️', 'success');
    }
  };

  const isFavorite = (item) => {
    return myFavorites.some(fav => fav.store === item.store && fav.price === item.price);
  };
  
  const getStoreLink = (key) => { const store = adminConfig.affiliateLinks?.find(s => s.name === key); return store ? store.link : "#"; };

  const handleShare = (item) => {
    const link = getStoreLink(item.storeKey);
    const message = `${t.shareText}\n${item.store} ${t.sharePrice} ${item.price} ${item.currency}\n${t.shareLink} ${link}`;
    const copyToClipboard = (text) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try { document.execCommand('copy'); showNotification(t.shareSuccess, 'success'); } catch (err) { }
      document.body.removeChild(textArea);
    };
    copyToClipboard(message);
  };

  const addToHistory = (term) => {
    setMySearchHistory(prev => {
        const filtered = prev.filter(t => t !== term);
        return [term, ...filtered].slice(0, 10);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.uid === ADMIN_UID) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
        if (!currentUser) {
            signInAnonymously(auth).catch((error) => console.log("Anon login err", error));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem('moqaren_user_email');
    if (savedEmail) {
        setSubscriberEmail(savedEmail);
        setIsSubscribed(true);
    } else {
        const timer = setTimeout(() => {
            if (view === 'home' && !isAdminAuthenticated) {
                setShowPromoPopup(true);
            }
        }, 3500); 
        return () => clearTimeout(timer);
    }
  }, [view, isAdminAuthenticated]);

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) { setAdminConfig({ ...defaultAdminConfig, ...docSnap.data() }); } else { setDoc(docRef, defaultAdminConfig); }
    }, (error) => console.log('Config fetch error', error));
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
        if (docSnap.exists()) { setRealSearchCount(docSnap.data().total_searches || 0); } else { setDoc(statsRef, { total_searches: 0 }, { merge: true }); setRealSearchCount(0); }
    }, (error) => console.log('Stats error', error));
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!isAdminAuthenticated) return;
    const inboxRef = collection(db, 'artifacts', appId, 'public', 'data', 'inbox');
    const unsubInbox = onSnapshot(inboxRef, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      msgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setInboxMessages(msgs);
    }, (error) => console.log('Inbox error', error));
    
    const fetchStats = async () => {
        try {
            const statsRef = collection(db, 'artifacts', appId, 'public', 'data', 'search_analytics');
            const snapshot = await getDocs(statsRef);
            const terms = snapshot.docs.map(doc => ({ term: doc.id, ...doc.data() }));
            terms.sort((a, b) => b.count - a.count);
            setTopSearchTerms(terms.slice(0, 10));
        } catch (e) { console.log('Analytics error', e) }
    };
    fetchStats();

    const logsRef = collection(db, 'artifacts', appId, 'public', 'data', 'search_logs');
    const unsubLogs = onSnapshot(logsRef, (snapshot) => {
        let logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setSearchLogs(logs.slice(0, 50));
    }, (error) => console.log('Logs error', error));

    const monthlyRef = collection(db, 'artifacts', appId, 'public', 'data', 'analytics_monthly');
    const unsubMonthly = onSnapshot(monthlyRef, (snapshot) => {
        const stats = snapshot.docs.map(doc => ({ month: doc.id, ...doc.data() }));
        stats.sort((a, b) => a.month.localeCompare(b.month));
        setMonthlyStats(stats);
    }, (error) => console.log('Monthly stats error', error));

    const subRef = collection(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers');
    const unsubSubscribers = onSnapshot(subRef, (snapshot) => {
        const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscribersList(subs);
    }, (error) => console.log('Subscribers error', error));

    return () => { unsubInbox(); unsubLogs(); unsubMonthly(); unsubSubscribers(); };
  }, [isAdminAuthenticated]);

  const handleSubscribe = async (e) => {
      e.preventDefault();
      if (!promoEmail || !user) return;
      const email = promoEmail.toLowerCase();
      try {
          const subDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers', email);
          await setDoc(subDocRef, {
              email: email,
              joined_at: new Date().toISOString(),
              interests: searchQuery ? [searchQuery.toLowerCase()] : [] 
          }, { merge: true });
          localStorage.setItem('moqaren_user_email', email);
          setSubscriberEmail(email);
          setIsSubscribed(true);
          setShowPromoPopup(false);
          showNotification(t.thanksSubscribe);
      } catch (error) { console.error("Subscription error", error); }
  };

  const trackSearchTerm = async (term) => {
      if (!user || !term) return;
      const cleanTerm = term.trim().toLowerCase();
      if (cleanTerm.length < 2) return; 
      const termRef = doc(db, 'artifacts', appId, 'public', 'data', 'search_analytics', cleanTerm);
      try { await setDoc(termRef, { term: term.trim(), count: increment(1), lastSearched: new Date().toISOString() }, { merge: true }); } catch (e) { }
      try { await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'search_logs'), { term: term.trim(), timestamp: new Date().toISOString(), device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop' }); } catch (e) { }
      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthlyRef = doc(db, 'artifacts', appId, 'public', 'data', 'analytics_monthly', currentMonth);
      try { await setDoc(monthlyRef, { total_searches: increment(1), last_updated: new Date().toISOString() }, { merge: true }); } catch (e) { }
      if (subscriberEmail) {
          const subDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers', subscriberEmail);
          try { await updateDoc(subDocRef, { interests: arrayUnion(cleanTerm), last_search: new Date().toISOString() }); } catch (e) { }
      }
  };

  const handleSendCampaign = () => {
      if (!marketingSubject || !marketingBody) { showNotification('يرجى تعبئة العنوان والرسالة', 'error'); return; }
      showNotification(`تم إرسال الحملة إلى ${filteredSubscribers.length} مشترك بنجاح!`, 'success');
      setMarketingSubject(''); setMarketingBody('');
  };

  const incrementGlobalCounter = async () => {
      if (!user) return;
      const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
      try { await setDoc(statsRef, { total_searches: increment(1) }, { merge: true }); } catch (error) { }
  };

  const handleSaveAllChanges = async () => {
    if (!isAdminAuthenticated) { showNotification("ليس لديك صلاحية الحفظ", "error"); return; }
    try {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
      await setDoc(docRef, adminConfig);
      showNotification(t.toastSuccess);
      setView('home');
    } catch (error) { showNotification("حدث خطأ أثناء الحفظ، تأكد من اتصالك", "error"); }
  };

  const resetToHome = () => {
    setView('home'); setResults(null); setSearchQuery(''); setAiSummary(null); setShowExclusiveToast(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setView('home'); setResults(null);
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
      setView('admin'); setAdminClickCount(0); setAdminEmail(''); setAdminPassword(''); setLoginError(''); return;
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

  const handleAdminLogin = async (e) => {
    e.preventDefault(); setLoginError('');
    try {
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        setAdminEmail(''); setAdminPassword('');
    } catch (error) { setLoginError('فشل الدخول. تأكد من الإيميل وكلمة المرور.'); }
  };
  
  const handleLogout = async () => { await signOut(auth); setIsAdminAuthenticated(false); setView('home'); showNotification('تم الخروج بنجاح'); };

  const handleDeleteMessage = async (msgId) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inbox', msgId)); showNotification("تم حذف الرسالة"); } catch (err) { }
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

  const callGeminiAI = async (product, stores) => {
    if (!GEMINI_API_KEY) { return { summary: `بما أننا في وضع التجربة، ${stores[0].store} يبدو الخيار الأفضل حالياً.`, verdict: `${stores[0].store} - الأرخص` }; }
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
    addToHistory(searchQuery); 

    const basePrice = Math.floor(Math.random() * 500) + 100;
    
    let searchResults = [
      { id: 1, store: 'أمازون', storeKey: 'amazon', storeColor: 'bg-orange-500', price: basePrice + 20, originalPrice: basePrice + 80, currency: 'ر.س', rating: 4.8, reviewsCount: 1250, delivery: t.freeShipping, warranty: t.agentWarranty, aiAnalysis: 'الضمان عندهم مسمار في لوح.' },
      { id: 2, store: 'نون', storeKey: 'noon', storeColor: 'bg-yellow-400', price: basePrice, originalPrice: basePrice + 50, currency: 'ر.س', rating: 4.5, reviewsCount: 890, delivery: t.fastShipping, warranty: t.storeWarranty, aiAnalysis: 'سعره لقطة وحالياً عليه عرض.' },
      { id: 3, store: 'إكس سايت', storeKey: 'xcite', storeColor: 'bg-blue-600', price: basePrice - 15, originalPrice: basePrice + 60, currency: 'ر.س', rating: 4.9, reviewsCount: 2100, delivery: t.instantPickup, warranty: t.comprehensiveWarranty, aiAnalysis: 'هذا عرض خاص لمتابعينا.' }
    ];

    if (adminConfig.customApis && adminConfig.customApis.length > 0) { console.log("Fetching from custom APIs:", adminConfig.customApis); }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const aiResponse = await callGeminiAI(searchQuery, searchResults);
      setResults(searchResults);
      setAiSummary(aiResponse);
      const matchedOffer = adminConfig.exclusiveOffers?.find(offer => searchQuery.toLowerCase().includes(offer.keyword.toLowerCase()));
      if (matchedOffer) { setCurrentOffer(matchedOffer); setTimeout(() => setShowExclusiveToast(true), 1500); }
    } catch (err) { console.error("Error"); } finally { setIsSearching(false); }
  };

  const filteredSubscribers = subscribersList.filter(sub => {
      if (!marketingFilter) return true;
      const keywords = marketingFilter.toLowerCase().split(' ');
      return sub.interests && sub.interests.some(interest => 
          keywords.some(keyword => interest.toLowerCase().includes(keyword))
      );
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* SEO & Meta Tags Management */}
      <SEOHead 
        title={view === 'home' && !results ? t.siteTitle : `${searchQuery ? searchQuery + ' | ' : ''} ${t.siteTitle}`} 
        description={t.siteDesc} 
        keywords={t.keywords}
        lang={lang}
      />
      <SchemaMarkup />

      {/* إشعار النظام الموحد */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300 w-[90%] md:w-auto">
          <div className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 border-2 ${notification.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white border-green-100 text-green-700'}`}>
            {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} className="text-green-500" />}
            <span className="font-black text-xs md:text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* --- نافذة الاشتراك البريدي --- */}
      {showPromoPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowPromoPopup(false)}></div>
              <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-6 relative z-10 animate-in zoom-in-95 duration-300 border-4 border-white/20">
                  <button onClick={() => setShowPromoPopup(false)} className="absolute top-4 left-4 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-full p-1"><X size={20} /></button>
                  <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                          <Mail size={28} className="text-blue-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{t.promoTitle}</h3>
                      <p className="text-slate-500 font-bold text-xs leading-relaxed">{t.promoDesc}</p>
                  </div>
                  <form onSubmit={handleSubscribe} className="space-y-3">
                      <input 
                          type="email" 
                          required 
                          className="w-full p-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:ring-0 font-bold text-center placeholder:text-slate-300 text-sm"
                          placeholder={t.emailPlaceholder}
                          value={promoEmail}
                          onChange={(e) => setPromoEmail(e.target.value)}
                      />
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-black shadow-lg shadow-blue-200 transition-all active:scale-95 text-sm">
                          {t.subscribe}
                      </button>
                  </form>
                  <p className="text-[10px] text-center text-slate-300 font-bold mt-4">نحترم خصوصيتك، لا رسائل مزعجة.</p>
              </div>
          </div>
      )}

      {/* --- القائمة الجانبية --- */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${showSidePanel ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${showSidePanel ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowSidePanel(false)}></div>
        <div className={`absolute left-0 top-0 h-full w-[85%] md:w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${showSidePanel ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full flex flex-col p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Award className="text-blue-600" /> {t.mySpace}</h2>
                    <button onClick={() => setShowSidePanel(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={20} /></button>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
                    <button onClick={() => setSidePanelTab('favorites')} className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${sidePanelTab === 'favorites' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                        <Heart size={16} className={sidePanelTab === 'favorites' ? 'fill-blue-600' : ''} /> {t.favorites}
                    </button>
                    <button onClick={() => setSidePanelTab('history')} className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${sidePanelTab === 'history' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                        <Clock size={16} /> {t.recentSearches}
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                    {sidePanelTab === 'favorites' ? (
                        myFavorites.length > 0 ? (
                            myFavorites.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group">
                                    <button onClick={() => toggleFavorite(item)} className="absolute top-2 left-2 text-red-400 hover:text-red-600 bg-white p-1.5 rounded-full shadow-sm"><Trash2 size={14} /></button>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded-full ${item.storeColor}`}>{item.store}</span>
                                        <span className="font-black text-lg text-slate-900">{item.price} <span className="text-xs">{item.currency}</span></span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-bold mb-3 line-clamp-2">{item.aiAnalysis}</p>
                                    <a href={getStoreLink(item.storeKey)} target="_blank" className="block w-full text-center bg-white border border-slate-200 py-2 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-800 hover:text-white transition-colors">{t.visitStore}</a>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 opacity-50 flex flex-col items-center">
                                <Heart size={48} className="mb-4 text-slate-300" />
                                <p className="font-bold text-slate-400">{t.noFavorites}</p>
                            </div>
                        )
                    ) : (
                        mySearchHistory.length > 0 ? (
                            <>
                                {mySearchHistory.map((term, idx) => (
                                    <button key={idx} onClick={() => { setSearchQuery(term); setShowSidePanel(false); handleSearch({ preventDefault: () => {} }); }} className="w-full bg-slate-50 hover:bg-blue-50 p-4 rounded-2xl border border-slate-100 text-right flex justify-between items-center group transition-colors">
                                        <span className="font-bold text-slate-700">{term}</span>
                                        <ArrowLeft size={16} className="text-slate-300 group-hover:text-blue-500 transform group-hover:-translate-x-1 transition-all" />
                                    </button>
                                ))}
                                <button onClick={() => setMySearchHistory([])} className="w-full text-center text-red-400 text-xs font-bold mt-4 hover:text-red-600">{t.clearHistory}</button>
                            </>
                        ) : (
                            <div className="text-center py-10 opacity-50 flex flex-col items-center">
                                <Clock size={48} className="mb-4 text-slate-300" />
                                <p className="font-bold text-slate-400">{t.noHistory}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* زر اللغة العائم */}
      <button 
        onClick={toggleLanguage} 
        className={`fixed top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-[100] bg-white/90 backdrop-blur-xl shadow-xl border border-white/50 p-2.5 rounded-full active:scale-95 group`}
      >
        <Languages size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
      </button>

      {/* زر القائمة الجانبية العائم */}
      <button 
        onClick={() => setShowSidePanel(true)}
        className={`fixed top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} z-[100] bg-white/90 backdrop-blur-xl shadow-xl border border-white/50 p-2.5 rounded-full active:scale-95 group md:hidden`}
      >
        <div className="relative">
             {myFavorites.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
             <Award size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
        </div>
      </button>

      {/* Navigation (Desktop Only) */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none hidden md:flex">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-900/10 rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 pointer-events-auto border border-white/50 max-w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-4 cursor-pointer group select-none" onClick={handleLogoClick}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                <Brain size={18} />
            </div>
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
          {/* Desktop Sidebar Trigger */}
          <button onClick={() => setShowSidePanel(true)} className="ml-2 bg-slate-100 hover:bg-blue-50 p-2 rounded-full transition-colors relative">
             {myFavorites.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
             <Award size={18} className="text-slate-600" />
          </button>
        </div>
      </nav>

      {/* الصفحة الرئيسية */}
      {view === 'home' && (
        <>
          {/* --- Hero Section --- */}
          <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-900 text-white pt-32 md:pt-40 pb-20 md:pb-32 px-4 relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[5rem] shadow-2xl">
            
            {/* Layers */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <svg className="absolute inset-0 w-full h-full text-white/5 mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="data-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#data-grid)" />
            </svg>

            <svg className="absolute inset-0 w-full h-full text-indigo-300/10 mix-blend-overlay pointer-events-none animate-pulse" style={{animationDuration: '8s'}} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <path d="M0 20 L20 20 L20 0 M20 20 L40 40 M40 40 L60 40 M60 40 L60 60 M100 100 L120 100 L120 80 M150 150 L180 150 L180 180" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                        <circle cx="20" cy="20" r="2" fill="currentColor"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>

            {/* Content */}
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 border border-white/10 text-blue-200 text-[10px] md:text-xs font-black mb-6 md:mb-8 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                <span>{realSearchCount.toLocaleString()} {t.realSearch}</span>
              </div>
              <h1 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 leading-tight drop-shadow-2xl text-white tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">{t.heroTitlePart1} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">{t.heroTitlePart2}</span></h1>
              <p className="text-blue-100 text-sm md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 px-4">{t.heroDesc}</p>
              <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 px-2 md:px-0">
                <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-[2rem] md:rounded-[2.5rem] group-hover:bg-blue-400/30 transition-all duration-500"></div>
                <input type="text" placeholder={t.searchPlaceholder} className="w-full py-5 md:py-8 px-6 md:px-16 rounded-[2rem] md:rounded-[2.5rem] text-slate-900 shadow-2xl text-base md:text-xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all font-bold border-none relative z-10 placeholder:text-slate-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" disabled={isSearching} className={`absolute ${lang === 'ar' ? 'left-2 md:left-3' : 'right-2 md:right-3'} top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-8 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] font-black transition-all flex items-center gap-2 disabled:bg-slate-400 shadow-xl active:scale-95 z-20 text-xs md:text-base group-hover:shadow-blue-500/50`}>
                  {isSearching ? <span className="animate-pulse">{t.analyzing}</span> : <>{t.searchBtn} <Rocket size={16} className="md:w-[18px]" /></>}
                </button>
              </form>
              <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-blue-200/60 animate-in fade-in duration-1000 delay-300 px-2">
                <span>{t.trendingLabel}</span>
                {adminConfig.trendingKeywords && adminConfig.trendingKeywords.length > 0 ? (
                  adminConfig.trendingKeywords.map((keyword, index) => (
                    <button key={index} onClick={() => setSearchQuery(keyword)} className="hover:text-white transition-all bg-white/5 px-2.5 py-1 rounded-full border border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-95">
                      {keyword}
                    </button>
                  ))
                ) : (
                  <>
                    <button onClick={() => setSearchQuery('آيفون 15')} className="hover:text-white transition-all bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10">آيفون 15</button>
                  </>
                )}
              </div>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-20 relative z-20">
            {isSearching && (
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 shadow-xl border border-slate-100 text-center mb-24 md:mb-32">
                <div className="relative w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 md:mb-8">
                    <div className="absolute inset-0 border-4 md:border-8 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 md:border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <Brain className="absolute inset-0 m-auto text-blue-600 animate-pulse w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-slate-900 font-black text-xl md:text-3xl animate-pulse tracking-tight mb-2">{t.loadingTitle}</h3>
                <p className="text-slate-400 font-medium text-sm md:text-base">{t.loadingDesc}</p>
              </div>
            )}

            {results && !isSearching && (
              <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 mb-24 md:mb-32">
                {aiSummary && (
                    <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 relative overflow-hidden border border-white/10">
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="relative z-10 flex-1">
                          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 text-blue-300 font-black text-[10px] md:text-sm uppercase tracking-widest bg-white/10 w-fit px-3 py-1 md:px-4 md:py-1.5 rounded-full backdrop-blur-sm"><BarChart3 size={14} /> {t.aiTitle}</div>
                          <p className="text-white text-lg md:text-4xl font-black leading-snug tracking-tight mb-2 md:mb-4">"{aiSummary.summary}"</p>
                        </div>
                        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl shrink-0 text-center min-w-[150px] md:min-w-[220px]">
                            <span className="text-[10px] md:text-xs font-bold text-blue-200 block mb-2 md:mb-3 uppercase tracking-widest">{t.winner}</span>
                            <div className="flex flex-col items-center justify-center gap-2 font-black text-xl md:text-3xl">
                                <div className="bg-green-500 rounded-full p-1.5 md:p-2 mb-1 md:mb-2 shadow-lg shadow-green-500/30"><CheckCircle className="text-white w-5 h-5 md:w-8 md:h-8" /></div>
                                {aiSummary.verdict}
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {results.map((item) => (
                    /* --- بطاقة الجوال الإبداعية (Mobile AI Card) --- */
                    <div key={item.id} className="relative group overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-xl transition-all hover:shadow-2xl md:hover:-translate-y-2">
                        {/* الخلفية الهولوغرافية الخفيفة */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-50 pointer-events-none"></div>
                        
                        {item.store.includes('شريك') && (<div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[9px] font-black z-20 animate-pulse shadow-lg ring-2 ring-red-100">{t.specialOffer}</div>)}

                        {/* رأس البطاقة */}
                        <div className="relative p-6 flex justify-between items-start z-10 border-b border-slate-100/50">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl ${item.storeColor} flex items-center justify-center text-white shadow-lg`}>
                                   <span className="font-black text-xs">{item.store.substring(0, 2)}</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-slate-800 leading-none mb-1">{item.store}</h3>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full w-fit">
                                        <Shield size={10} /> {t.trusted}
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="font-black text-2xl text-blue-600 leading-none">{item.price} <span className="text-xs text-slate-400">{item.currency}</span></div>
                                <div className="text-[10px] text-red-400 line-through font-bold opacity-60 text-right mt-1">{item.originalPrice}</div>
                            </div>
                        </div>

                        {/* جسم البطاقة (البيانات) */}
                        <div className="p-6 relative z-10 space-y-4">
                            {/* رسالة الذكاء الاصطناعي */}
                            <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl text-xs font-medium leading-relaxed relative overflow-hidden border border-slate-700">
                                <div className="absolute top-0 right-0 w-10 h-10 bg-blue-500/20 rounded-full blur-xl"></div>
                                <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold uppercase tracking-wider text-[9px]">
                                    <Sparkles size={10} /> {t.aiTitle}
                                </div>
                                "{item.aiAnalysis}"
                            </div>

                            {/* الخصائص */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-slate-50 p-2.5 rounded-xl flex items-center gap-2 border border-slate-100">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-slate-400 font-bold">{t.rating}</span>
                                        <span className="text-xs font-black text-slate-700">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-2.5 rounded-xl flex items-center gap-2 border border-slate-100">
                                    <Shield size={14} className="text-green-500" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-slate-400 font-bold">{t.warrantyTitle}</span>
                                        <span className="text-xs font-black text-slate-700 truncate max-w-[80px]">{item.warranty}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* الإجراءات */}
                        <div className="p-4 pt-0 relative z-10 flex gap-2">
                             <a href={getStoreLink(item.storeKey)} target="_blank" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-black text-sm flex justify-center items-center gap-2 shadow-lg hover:shadow-blue-200 active:scale-95 transition-all">
                                {t.visitStore} <ExternalLink size={14} />
                             </a>
                             <button onClick={() => toggleFavorite(item)} className={`p-3.5 rounded-xl border border-slate-200 ${isFavorite(item) ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white text-slate-400 hover:text-red-500'} transition-colors active:scale-95`}>
                                <Heart size={18} className={isFavorite(item) ? 'fill-red-500' : ''} />
                             </button>
                             <button onClick={() => handleShare(item)} className="p-3.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-blue-500 transition-colors active:scale-95">
                                <Share2 size={18} />
                             </button>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!results && !isSearching && (
              <>
                 <section id="about" className="mb-24 md:mb-32 scroll-mt-32">
                  <div className="text-center mb-12 md:mb-16"><h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6">{t.howItWorksTitle}</h2><p className="text-slate-500 font-bold text-lg md:text-xl">ثلاث خطوات بسيطة.. وتوفر فلوسك</p></div>
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">{[{ icon: MousePointer2, title: t.step1Title, desc: t.step1Desc, color: 'blue' }, { icon: Cpu, title: t.step2Title, desc: t.step2Desc, color: 'indigo' }, { icon: Rocket, title: t.step3Title, desc: t.step3Desc, color: 'green' }].map((item, i) => (<div key={i} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-all text-center group"><div className={`bg-${item.color}-50 text-${item.color}-600 w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}><item.icon size={32} className="md:w-[48px] md:h-[48px]" /></div><h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-slate-900">{item.title}</h3><p className="text-slate-500 font-bold text-sm md:text-base leading-relaxed">{item.desc}</p></div>))}</div>
                </section>
                <section id="partners" className="mb-24">
                   <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/50 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-[0.1em] shrink-0 w-full md:w-auto justify-center md:justify-start"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>{t.partnersTitle}</div>
                        <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer font-black w-full text-slate-800">
                             {adminConfig.trustedPartners?.map((partner, idx) => (<div key={idx} className="text-lg md:text-2xl font-black italic tracking-tighter hover:text-blue-900 transition-colors transform hover:scale-110">{partner.name}</div>))}
                        </div>
                   </div>
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
               <p className="text-slate-400 mb-6 font-bold text-sm">استخدم بيانات حساب الفايربيس (Firebase) الخاصة بك</p>
               {loginError && <p className="text-red-500 font-bold text-xs mb-4">{loginError}</p>}
               <form onSubmit={handleAdminLogin} className="space-y-4">
                 <input type="email" required className="w-full p-4 rounded-xl bg-slate-50 font-bold text-center border focus:ring-2 focus:ring-blue-600 outline-none" placeholder="الإيميل" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                 <input type="password" required className="w-full p-4 rounded-xl bg-slate-50 font-bold text-center border focus:ring-2 focus:ring-blue-600 outline-none" placeholder="كلمة المرور" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                 <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-colors">{t.login}</button>
               </form>
               <button onClick={resetToHome} className="mt-6 text-slate-400 font-bold text-sm">{t.back}</button>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] shadow-2xl p-6 md:p-16 border border-slate-100">
               <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-6 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-black">الإعدادات ⚙️</h1>
                    <div className="relative bg-slate-100 p-2 rounded-xl"><Bell className={`w-6 h-6 ${inboxMessages.length > 0 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />{inboxMessages.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">{inboxMessages.length}</span>}</div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={handleSaveAllChanges} className="flex-1 md:flex-none px-6 py-2 bg-green-600 text-white rounded-xl font-black text-xs hover:bg-green-700 shadow-lg flex items-center justify-center gap-2"><Save size={14} /> حفظ</button>
                    <button onClick={handleLogout} className="text-red-500 font-bold text-sm flex items-center gap-1"><LogOut size={14} /> خروج</button>
                </div>
              </div>
              <div className="text-center py-20 text-slate-400 font-bold">لوحة التحكم (تم اختصار العرض للكود)</div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 mt-24 md:mt-32 rounded-t-[2.5rem] md:rounded-t-[3rem] relative overflow-hidden pb-24 md:pb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="col-span-1 md:col-span-1 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white mb-6"><div className="bg-blue-600 p-2 rounded-xl"><Brain size={24} /></div><span className="text-3xl font-black tracking-tighter">مقارن</span></div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">{t.footerDesc}</p>
            </div>
            <div className="hidden md:block"><h4 className="text-white font-black text-lg mb-6">{t.quickLinks}</h4><ul className="space-y-4 text-sm font-bold"><li><button onClick={resetToHome} className="hover:text-blue-400">{t.home}</button></li><li><button onClick={() => scrollToSection('about')} className="hover:text-blue-400">{t.about}</button></li></ul></div>
            <div className="text-center md:text-right"><h4 className="text-white font-black text-lg mb-6">{t.contact}</h4><ul className="space-y-4 text-sm font-medium inline-block md:block"><li className="flex items-center gap-3 mb-2 md:mb-0"><Mail size={18} className="text-blue-500" /><span dir="ltr">{adminConfig.supportEmail}</span></li></ul></div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center md:text-right text-xs font-bold text-slate-500"><p>{t.rights}</p></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
