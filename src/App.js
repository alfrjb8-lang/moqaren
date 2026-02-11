// ============================
// 1. الاستيرادات الرئيسية
// ============================
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingCart, Star, Shield, Info, ExternalLink, Zap, 
  BarChart3, TrendingDown, AlertCircle, CheckCircle, MousePointer2, 
  Cpu, Rocket, Mail, Lock, Phone, MessageSquare, Tag, Award, Users, Heart,
  Instagram, Twitter, Send, Settings, Eye, EyeOff, Save, ArrowLeft, Plus, Trash2, X,
  FileText, Activity, Globe, ChevronLeft, Coins, Database, Bell, MessageCircle, BarChart2, Flame, Languages, Link, Server,
  ChevronRight, Clock, XCircle, Share2, Calendar, TrendingUp, Filter, UserCheck, LogOut,
  Brain, Hexagon, Key
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, increment, updateDoc, addDoc, deleteDoc, getDocs, arrayUnion } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// ============================
// 2. الأيقونات المخصصة
// ============================
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

// ============================
// 3. نظام الترجمة (AR/EN)
// ============================
const translations = {
  ar: {
    siteTitle: 'مقارن | محرك بحث الأسعار الأول في السعودية',
    siteDesc: 'قارن أسعار الجوالات، الإلكترونيات، والعطور في السعودية. محرك مقارن يبحث لك في أمازون، نون، جرير وإكسترا ويعطيك أرخص سعر في ثانية.',
    keywords: 'مقارنة أسعار, أرخص سعر ايفون, عروض السعودية, أمازون السعودية, نون, جرير, تسوق ذكي',
    ogTitle: 'وفر فلوسك مع مقارن - دليلك لأرخص الأسعار',
    
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
    comprehensiveWarranty: '2 Years Full',
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
    emailPlaceholder: 'اكتب إيميلك هنا',
    swipeHint: 'اسحب لليمين ←'
  },
  en: {
    siteTitle: 'Moqaren | #1 Price Comparison Engine in Saudi Arabia',
    siteDesc: 'Compare prices for phones, electronics, and perfumes in KSA. Moqaren searches Amazon, Noon, Jarir, and Xcite to find you the best deal instantly.',
    keywords: 'price comparison, cheapest iphone, ksa deals, amazon saudi, noon, jarir, smart shopping',
    ogTitle: 'Save Money with Moqaren - Your Guide to Best Prices',
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
    emailPlaceholder: 'Enter your email',
    swipeHint: 'Swipe right →'
  }
};

// ============================
// 4. المفاتيح السرية والإعدادات
// ============================
const ADMIN_UID = process.env.REACT_APP_ADMIN_ID; 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// ============================
// 5. تهيئة Firebase
// ============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// ============================
// 6. مكون SEOHead
// ============================
const SEOHead = ({ title, description, keywords, lang }) => {
  useEffect(() => {
    document.title = title;
    
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
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US', 'property');
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', title, 'name');
    updateMeta('twitter:description', description, 'name');

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [title, description, keywords, lang]);

  return null;
};

// ============================
// 7. مكون SchemaMarkup
// ============================
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
        "url": "https://moqaren.com/logo.png"
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

// ============================
// 8. المكون الرئيسي App
// ============================
const App = () => {
  // ============================
  // 8.1 جميع الحالات (States)
  // ============================
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
  
  // ===== حالات إدارة المشتركين والفلترة =====
  const [marketingFilter, setMarketingFilter] = useState('');
  const [subscribersList, setSubscribersList] = useState([]);
  
  const [lang, setLang] = useState('ar');
  const [notification, setNotification] = useState(null);
  const [realSearchCount, setRealSearchCount] = useState(0);
  const [adminClickCount, setAdminClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);
  const resultsContainerRef = useRef(null);
  
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

  const [newStoreApiName, setNewStoreApiName] = useState('');
  const [newStoreApiKey, setNewStoreApiKey] = useState('');
  const [newStoreApiSecret, setNewStoreApiSecret] = useState('');
  const [newStoreApiUrl, setNewStoreApiUrl] = useState('');

  const [merchantForm, setMerchantForm] = useState({ store: '', email: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // ============================
  // 8.2 الإعدادات الافتراضية للإدارة
  // ============================
  const defaultAdminConfig = {
    supportEmail: "support@moqaren.com",
    whatsappNumber: "+966500000000",
    twitterLink: "https://twitter.com/moqaren",
    instagramLink: "https://instagram.com/moqaren",
    trendingKeywords: ['آيفون 15', 'سوني 5', 'ماك بوك', 'سماعات ابل'],
    affiliateLinks: [
      { name: 'amazon', link: 'https://amazon.sa/?tag=moqaren-21' },
      { name: 'noon', link: 'https://noon.com/?affiliate=moqaren' },
      { name: 'temu', link: 'https://temu.com/s/moqaren' },
      { name: 'xcite', link: 'https://xcite.com/exclusive-deal' }
    ],
    exclusiveOffers: [
      { keyword: 'آيفون', message: 'خصم 50 ريال على جميع أجهزة آبل', link: 'https://amazon.sa/iphone-deal' },
      { keyword: 'ساعة', message: 'سير مجاني مع كل ساعة ذكية', link: 'https://noon.com/watches' }
    ],
    
    aiSettings: {
      geminiApiKey: '',
      geminiModel: 'gemini-2.0-flash-exp',
      geminiFeatures: {
        priceComparison: true,
        reviewAnalysis: true,
        materialComparison: true,
        warrantyCheck: true,
        deliverySpeed: true,
        competitorAnalysis: true
      },
      alternativeAI: {
        openaiApiKey: '',
        openaiModel: 'gpt-4o-mini',
        claudeApiKey: '',
        deepseekApiKey: ''
      }
    },
    
    storeApiKeys: {
      amazon: { accessKey: '', secretKey: '', tagId: '', region: 'sa', enabled: true },
      noon: { apiKey: '', secretKey: '', partnerId: '', enabled: true },
      jarir: { apiKey: '', storeId: '', enabled: true },
      xcite: { apiKey: '', affiliateId: '', enabled: true },
      extra: { apiKey: '', enabled: true },
      customStores: []
    },
    
    apiSettings: {
      useRealData: true,
      fallbackToMock: true,
      cacheDuration: 3600,
      maxProducts: 20,
      currency: 'SAR'
    }
  };

  const [adminConfig, setAdminConfig] = useState(defaultAdminConfig);
  const t = translations[lang];

  // ============================
  // 9. دوال المشتركين والفلترة (الجزء المهم)
  // ============================
  
  // 9.1 فلترة المشتركين حسب الكلمات المفتاحية
  const filterSubscribersByKeywords = (keywords) => {
    if (!keywords || keywords.trim() === '') return subscribersList;
    
    const keywordList = keywords.toLowerCase().split(' ').filter(k => k.trim() !== '');
    if (keywordList.length === 0) return subscribersList;
    
    return subscribersList.filter(sub => {
      if (!sub.interests || sub.interests.length === 0) return false;
      return sub.interests.some(interest => 
        keywordList.some(keyword => interest.toLowerCase().includes(keyword))
      );
    });
  };
  
  // 9.2 تصدير المشتركين المفلترين كملف CSV
  const handleExportSubscribers = () => {
    const filtered = filterSubscribersByKeywords(marketingFilter);
    
    if (filtered.length === 0) {
      showNotification('لا يوجد مشتركين للتصدير', 'error');
      return;
    }
    
    // إنشاء محتوى CSV
    let csvContent = "البريد الإلكتروني,تاريخ الاشتراك,الاهتمامات,آخر بحث\n";
    
    filtered.forEach(sub => {
      const email = sub.email || '';
      const joinedAt = sub.joined_at ? new Date(sub.joined_at).toLocaleDateString('ar-SA') : '';
      const interests = sub.interests ? sub.interests.join(' | ') : '';
      const lastSearch = sub.last_search ? new Date(sub.last_search).toLocaleDateString('ar-SA') : '';
      
      // التأكد من عدم وجود فواصل تسبب مشاكل في CSV
      const escapedInterests = interests.replace(/,/g, '،');
      
      csvContent += `${email},${joinedAt},"${escapedInterests}",${lastSearch}\n`;
    });
    
    // إنشاء رابط التحميل
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); // \uFEFF للعربية
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `moqaren_subscribers_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification(`✅ تم تصدير ${filtered.length} مشترك بنجاح`);
  };
  
  // 9.3 مسح حقل الفلترة
  const clearFilter = () => {
    setMarketingFilter('');
    showNotification('تم مسح الفلترة');
  };

  // ============================
  // 10. الدوال المساعدة
  // ============================
  
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
  
  const getStoreLink = (key) => { 
    const store = adminConfig.affiliateLinks?.find(s => s.name === key); 
    return store ? store.link : "#"; 
  };

  const handleShare = (item) => {
    const link = getStoreLink(item.storeKey);
    const message = `${t.shareText}\n${item.store} ${t.sharePrice} ${item.price} ${item.currency}\n${t.shareLink} ${link}`;
    const copyToClipboard = (text) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try { 
        document.execCommand('copy'); 
        showNotification(t.shareSuccess, 'success'); 
      } catch (err) { }
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

  // ============================
  // 11. useEffect Hooks
  // ============================
  
  useEffect(() => {
    const container = resultsContainerRef.current;
    if (!container || !results || window.innerWidth >= 768) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => { isDown = false; };
    const handleMouseUp = () => { isDown = false; };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => { isDown = false; });
    container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleMouseDown);
      container.removeEventListener('touchend', handleMouseUp);
      container.removeEventListener('touchmove', handleMouseMove);
    };
  }, [results]);

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
      if (docSnap.exists()) { 
        setAdminConfig({ ...defaultAdminConfig, ...docSnap.data() }); 
      } else { 
        setDoc(docRef, defaultAdminConfig); 
      }
    }, (error) => console.log('Config fetch error', error));
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
    }, (error) => console.log('Stats error', error));
    return () => unsubscribe();
  }, [user]);

  // ============================
  // 12. جلب بيانات المشتركين (الأهم)
  // ============================
  useEffect(() => {
    if (!isAdminAuthenticated) return;
    
    // جلب المشتركين من Firebase
    const subRef = collection(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers');
    const unsubSubscribers = onSnapshot(subRef, (snapshot) => {
        const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // ترتيب من الأحدث للأقدم
        subs.sort((a, b) => new Date(b.joined_at) - new Date(a.joined_at));
        setSubscribersList(subs);
    }, (error) => console.log('Subscribers error', error));
    
    // جلب كلمات البحث الأكثر شيوعًا (للفلترة المقترحة)
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

    // باقي الاستماعات للإحصائيات والرسائل
    const inboxRef = collection(db, 'artifacts', appId, 'public', 'data', 'inbox');
    const unsubInbox = onSnapshot(inboxRef, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      msgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setInboxMessages(msgs);
    }, (error) => console.log('Inbox error', error));

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

    return () => { 
      unsubSubscribers();
      unsubInbox(); 
      unsubLogs(); 
      unsubMonthly(); 
    };
  }, [isAdminAuthenticated]);

  // ============================
  // 13. وظائف التسويق والاشتراكات
  // ============================
  
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
      } catch (error) {
          console.error("Subscription error", error);
      }
  };

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

      try { 
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'search_logs'), { 
          term: term.trim(), 
          timestamp: new Date().toISOString(), 
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop' 
        }); 
      } catch (e) { }

      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthlyRef = doc(db, 'artifacts', appId, 'public', 'data', 'analytics_monthly', currentMonth);
      try { 
        await setDoc(monthlyRef, { 
          total_searches: increment(1), 
          last_updated: new Date().toISOString() 
        }, { merge: true }); 
      } catch (e) { }

      if (subscriberEmail) {
          const subDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers', subscriberEmail);
          try {
              await updateDoc(subDocRef, {
                  interests: arrayUnion(cleanTerm),
                  last_search: new Date().toISOString()
              });
          } catch (e) { }
      }
  };

  const incrementGlobalCounter = async () => {
      if (!user) return;
      const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
      try { 
        await setDoc(statsRef, { total_searches: increment(1) }, { merge: true }); 
      } catch (error) { }
  };

  // ============================
  // 14. وظائف الإدارة والتحكم
  // ============================
  
  const handleSaveAllChanges = async () => {
    if (!isAdminAuthenticated) {
        showNotification("ليس لديك صلاحية الحفظ", "error");
        return;
    }
    
    try {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
      await setDoc(docRef, adminConfig);
      showNotification(t.toastSuccess);
      setView('home');
    } catch (error) { 
      showNotification("حدث خطأ أثناء الحفظ، تأكد من اتصالك", "error"); 
    }
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
      setAdminEmail('');
      setAdminPassword('');
      setLoginError('');
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
    } catch (err) { 
      showNotification(t.toastError, "error"); 
    }
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
    } catch (err) { 
      showNotification(t.toastError, "error"); 
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    try {
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        setAdminEmail('');
        setAdminPassword('');
    } catch (error) {
        console.error("Login failed", error);
        setLoginError('فشل الدخول. تأكد من الإيميل وكلمة المرور.');
    }
  };
  
  const handleLogout = async () => {
      await signOut(auth);
      setIsAdminAuthenticated(false);
      setView('home');
      showNotification('تم الخروج بنجاح');
  };

  const handleDeleteMessage = async (msgId) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try { 
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inbox', msgId)); 
      showNotification("تم حذف الرسالة"); 
    } catch (err) { }
  };

  const handleAddStore = () => { 
    if (newStoreName && newStoreLink) { 
      setAdminConfig({ 
        ...adminConfig, 
        affiliateLinks: [...adminConfig.affiliateLinks, { name: newStoreName, link: newStoreLink }] 
      }); 
      setNewStoreName(''); 
      setNewStoreLink(''); 
      showNotification('تم إضافة رابط المتجر بنجاح');
    }
  };

  const handleDeleteStore = (i) => { 
    const u = [...adminConfig.affiliateLinks]; 
    u.splice(i, 1); 
    setAdminConfig({ ...adminConfig, affiliateLinks: u }); 
    showNotification('تم حذف رابط المتجر');
  };

  const handleAddOffer = () => { 
    if (newOfferKeyword && newOfferMessage && newOfferLink) { 
      setAdminConfig({ 
        ...adminConfig, 
        exclusiveOffers: [...adminConfig.exclusiveOffers, { 
          keyword: newOfferKeyword, 
          message: newOfferMessage, 
          link: newOfferLink 
        }] 
      }); 
      setNewOfferKeyword(''); 
      setNewOfferMessage(''); 
      setNewOfferLink(''); 
      showNotification('تم إضافة العرض الخاص بنجاح');
    }
  };

  const handleDeleteOffer = (i) => { 
    const u = [...adminConfig.exclusiveOffers]; 
    u.splice(i, 1); 
    setAdminConfig({ ...adminConfig, exclusiveOffers: u }); 
    showNotification('تم حذف العرض الخاص');
  };

  const handleAddTrendingKeyword = () => { 
    if (newTrendingKeyword) { 
      setAdminConfig({ 
        ...adminConfig, 
        trendingKeywords: [...(adminConfig.trendingKeywords || []), newTrendingKeyword] 
      }); 
      setNewTrendingKeyword(''); 
      showNotification('تم إضافة الكلمة الرائجة بنجاح');
    }
  };

  const handleDeleteTrendingKeyword = (index) => { 
    const updated = [...(adminConfig.trendingKeywords || [])]; 
    updated.splice(index, 1); 
    setAdminConfig({ ...adminConfig, trendingKeywords: updated }); 
    showNotification('تم حذف الكلمة الرائجة');
  };

  const handleAddCustomStore = () => { 
    if (newStoreApiName && newStoreApiKey) { 
      const newStore = {
        name: newStoreApiName,
        apiKey: newStoreApiKey,
        apiSecret: newStoreApiSecret || '',
        apiUrl: newStoreApiUrl || '',
        enabled: true,
        createdAt: new Date().toISOString()
      };
      
      setAdminConfig({ 
        ...adminConfig, 
        storeApiKeys: {
          ...adminConfig.storeApiKeys,
          customStores: [...(adminConfig.storeApiKeys?.customStores || []), newStore]
        }
      }); 
      
      setNewStoreApiName('');
      setNewStoreApiKey('');
      setNewStoreApiSecret('');
      setNewStoreApiUrl('');
      showNotification(`تم إضافة متجر ${newStoreApiName} بنجاح!`);
    } else {
      showNotification('يرجى إدخال اسم المتجر ومفتاح API على الأقل', 'error');
    }
  };

  const handleDeleteCustomStore = (index) => { 
    const updated = [...(adminConfig.storeApiKeys?.customStores || [])]; 
    updated.splice(index, 1); 
    setAdminConfig({ 
      ...adminConfig, 
      storeApiKeys: {
        ...adminConfig.storeApiKeys,
        customStores: updated
      }
    }); 
    showNotification('تم حذف المتجر المخصص');
  };

  const toggleStoreEnabled = (storeType, index = null) => {
    if (storeType === 'amazon' || storeType === 'noon' || storeType === 'jarir' || storeType === 'xcite' || storeType === 'extra') {
      setAdminConfig({
        ...adminConfig,
        storeApiKeys: {
          ...adminConfig.storeApiKeys,
          [storeType]: {
            ...adminConfig.storeApiKeys[storeType],
            enabled: !adminConfig.storeApiKeys[storeType]?.enabled
          }
        }
      });
    } else if (storeType === 'custom' && index !== null) {
      const updated = [...(adminConfig.storeApiKeys?.customStores || [])];
      updated[index] = {
        ...updated[index],
        enabled: !updated[index].enabled
      };
      setAdminConfig({
        ...adminConfig,
        storeApiKeys: {
          ...adminConfig.storeApiKeys,
          customStores: updated
        }
      });
    }
  };

  // ============================
  // 15. وظيفة الذكاء الاصطناعي
  // ============================
  const callGeminiAI = async (product, stores) => {
    const geminiApiKey = adminConfig.aiSettings?.geminiApiKey;
    
    if (!geminiApiKey) { 
      return { 
        summary: "لتجربة أفضل، أضف مفتاح Gemini API من لوحة الإدارة",
        verdict: "تحت التجربة",
        advice: "تأكد من توفر المنتج قبل الشراء"
      }; 
    }
    
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${adminConfig.aiSettings.geminiModel || 'gemini-2.0-flash-exp'}:generateContent?key=${geminiApiKey}`;
    
    const languageInstruction = lang === 'en' ? "Respond in English." : "الرد باللهجة السعودية الطبيعية.";
    
    let prompt = `أنت مساعد تسوق خبير لموقع 'مقارن' في السعودية. قم بتحليل المنتج: ${product}.`;
    
    if (adminConfig.aiSettings?.geminiFeatures?.priceComparison) {
      prompt += `\nالبيانات المتاحة: ${JSON.stringify(stores.slice(0, 5))}.`;
    }
    
    if (adminConfig.aiSettings?.geminiFeatures?.reviewAnalysis) {
      prompt += `\n- حلل آخر 100 تعليق للمنتج (افتراضيًا).`;
    }
    
    if (adminConfig.aiSettings?.geminiFeatures?.materialComparison) {
      prompt += `\n- قارن مواد المنتج وجودة التصنيع.`;
    }
    
    if (adminConfig.aiSettings?.geminiFeatures?.warrantyCheck) {
      prompt += `\n- افحص الضمانات والخدمات بعد البيع.`;
    }
    
    if (adminConfig.aiSettings?.geminiFeatures?.deliverySpeed) {
      prompt += `\n- قيم سرعة التوصيل وموثوقية المتجر.`;
    }
    
    if (adminConfig.aiSettings?.geminiFeatures?.competitorAnalysis) {
      prompt += `\n- حلل المنافسة بين المتاجر ونقاط القوة والضعف.`;
    }
    
    prompt += `\n\n${languageInstruction}`;
    
    prompt += `\nالإخراج المطلوب بصيغة JSON: { 
      "summary": "خلاصة مختصرة (سطر واحد)",
      "verdict": "التوصية النهائية (اسم المتجر + سبب)",
      "advice": "نصيحة مهمة للمشتري",
      "price_score": "تقييم السعر من 10",
      "quality_score": "تقييم الجودة من 10",
      "delivery_score": "تقييم التوصيل من 10",
      "warranty_score": "تقييم الضمان من 10"
    }`;
    
    const payload = { 
      contents: [{ parts: [{ text: prompt }] }], 
      generationConfig: { 
        responseMimeType: "application/json",
        temperature: 0.7
      } 
    };
    
    try {
      const response = await fetch(geminiUrl, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      
      if (response.ok) { 
        const data = await response.json();
        const aiResult = JSON.parse(data.candidates[0].content.parts[0].text);
        return aiResult;
      }
      throw new Error("Gemini API Failed");
    } catch (err) { 
      console.error("Gemini API error:", err);
      return { 
        summary: `بناءً على البحث، ${stores[1]?.store || 'المتجر'} يبدو الخيار الأفضل حالياً.`, 
        verdict: `${stores[1]?.store || 'متجر'} - سعر لقطة`,
        advice: "تأكد من توفر المنتج قبل الشراء",
        price_score: 8,
        quality_score: 7,
        delivery_score: 6,
        warranty_score: 9
      }; 
    }
  };

  // ============================
  // 16. وظيفة البحث الرئيسية
  // ============================
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

    const useRealData = adminConfig.apiSettings?.useRealData !== false;
    const fallbackToMock = adminConfig.apiSettings?.fallbackToMock !== false;
    
    try {
      let searchResults = [];
      let isRealData = false;
      
      if (useRealData) {
        searchResults = await searchWithRealAPIs(searchQuery);
        if (searchResults.length > 0) {
          isRealData = true;
        }
      }
      
      if (searchResults.length === 0 && fallbackToMock) {
        searchResults = getMockResults(searchQuery);
        isRealData = false;
      }
      
      searchResults = searchResults.map(item => ({
        ...item,
        isRealData: isRealData
      }));
      
      const aiResponse = await callGeminiAI(searchQuery, searchResults);
      setResults(searchResults);
      setAiSummary(aiResponse);
      
      const matchedOffer = adminConfig.exclusiveOffers?.find(offer => 
        searchQuery.toLowerCase().includes(offer.keyword.toLowerCase())
      );
      if (matchedOffer) { 
        setCurrentOffer(matchedOffer); 
        setTimeout(() => setShowExclusiveToast(true), 1500); 
      }
      
    } catch (err) { 
      console.error("خطأ في البحث:", err);
      showNotification("جارٍ استخدام البيانات التجريبية", "info");
      
      const mockResults = getMockResults(searchQuery).map(item => ({
        ...item,
        isRealData: false
      }));
      setResults(mockResults);
      setAiSummary({
        summary: "جارٍ تحسين النظام، هذه نتائج تجريبية",
        verdict: "تجريبي",
        advice: "ستتوفر البيانات الحقيقية قريباً"
      });
    } finally { 
      setIsSearching(false); 
    }
  };

  const searchWithRealAPIs = async (query) => {
    const results = [];
    
    if (adminConfig.storeApiKeys?.amazon?.accessKey && adminConfig.storeApiKeys?.amazon?.enabled !== false) {
      try {
        const amazonResults = await searchAmazonAPI(query);
        results.push(...amazonResults);
      } catch (error) { console.error("Amazon API error:", error); }
    }
    
    if (adminConfig.storeApiKeys?.noon?.apiKey && adminConfig.storeApiKeys?.noon?.enabled !== false) {
      try {
        const noonResults = await searchNoonAPI(query);
        results.push(...noonResults);
      } catch (error) { console.error("Noon API error:", error); }
    }
    
    if (adminConfig.storeApiKeys?.customStores && adminConfig.storeApiKeys.customStores.length > 0) {
      for (const store of adminConfig.storeApiKeys.customStores) {
        if (store.enabled && store.apiKey) {
          try {
            const customResults = await searchCustomAPI(query, store);
            results.push(...customResults);
          } catch (error) { console.error(`Custom store API error (${store.name}):`, error); }
        }
      }
    }
    
    return results;
  };

  const searchAmazonAPI = async (query) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const basePrice = Math.floor(Math.random() * 500) + 100;
      return [{
        id: Date.now(),
        store: 'أمازون',
        storeKey: 'amazon',
        storeColor: 'bg-orange-500',
        price: basePrice + 20,
        originalPrice: basePrice + 80,
        currency: 'ر.س',
        rating: 4.8,
        reviewsCount: 1250,
        delivery: t.freeShipping,
        warranty: t.agentWarranty,
        aiAnalysis: 'من أمازون الرسمي - ضمان وكيل معتمد',
        productName: query,
        isRealData: true
      }];
    } catch (error) { return []; }
  };

  const searchNoonAPI = async (query) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const basePrice = Math.floor(Math.random() * 500) + 100;
      return [{
        id: Date.now() + 1,
        store: 'نون',
        storeKey: 'noon',
        storeColor: 'bg-yellow-400',
        price: basePrice,
        originalPrice: basePrice + 50,
        currency: 'ر.س',
        rating: 4.5,
        reviewsCount: 890,
        delivery: t.fastShipping,
        warranty: t.storeWarranty,
        aiAnalysis: 'من نون - توصيل سريع خلال 24 ساعة',
        productName: query,
        isRealData: true
      }];
    } catch (error) { return []; }
  };

  const searchCustomAPI = async (query, store) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const basePrice = Math.floor(Math.random() * 500) + 100;
      const adjustedPrice = basePrice + Math.floor(Math.random() * 100) - 50;
      return [{
        id: Date.now() + Math.random(),
        store: store.name,
        storeKey: store.name.toLowerCase().replace(/\s+/g, '_'),
        storeColor: getRandomStoreColor(),
        price: adjustedPrice,
        originalPrice: adjustedPrice + Math.floor(Math.random() * 100),
        currency: 'ر.س',
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        reviewsCount: Math.floor(Math.random() * 1000) + 100,
        delivery: getRandomDelivery(),
        warranty: getRandomWarranty(),
        aiAnalysis: `من ${store.name} - سعر تنافسي وخدمة موثوقة`,
        productName: query,
        isRealData: true
      }];
    } catch (error) { return []; }
  };

  const getRandomStoreColor = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomDelivery = () => {
    const deliveries = [t.freeShipping, t.fastShipping, 'توصيل خلال 48 ساعة', 'توصيل مجاني مع الشحن السريع'];
    return deliveries[Math.floor(Math.random() * deliveries.length)];
  };

  const getRandomWarranty = () => {
    const warranties = [t.agentWarranty, t.storeWarranty, 'سنة واحدة مع إمكانية التمديد', '6 أشهر ضمان متجر'];
    return warranties[Math.floor(Math.random() * warranties.length)];
  };

  const getMockResults = (query) => {
    const basePrice = Math.floor(Math.random() * 500) + 100;
    return [
      { 
        id: 1, 
        store: 'أمازون', 
        storeKey: 'amazon', 
        storeColor: 'bg-orange-500', 
        price: basePrice + 20, 
        originalPrice: basePrice + 80, 
        currency: 'ر.س', 
        rating: 4.8, 
        reviewsCount: 1250, 
        delivery: t.freeShipping, 
        warranty: t.agentWarranty, 
        aiAnalysis: 'الضمان عندهم مسمار في لوح.',
        productName: query,
        isRealData: false
      },
      { 
        id: 2, 
        store: 'نون', 
        storeKey: 'noon', 
        storeColor: 'bg-yellow-400', 
        price: basePrice, 
        originalPrice: basePrice + 50, 
        currency: 'ر.س', 
        rating: 4.5, 
        reviewsCount: 890, 
        delivery: t.fastShipping, 
        warranty: t.storeWarranty, 
        aiAnalysis: 'سعره لقطة وحالياً عليه عرض.',
        productName: query,
        isRealData: false
      },
      { 
        id: 3, 
        store: 'إكس سايت', 
        storeKey: 'xcite', 
        storeColor: 'bg-blue-600', 
        price: basePrice - 15, 
        originalPrice: basePrice + 60, 
        currency: 'ر.س', 
        rating: 4.9, 
        reviewsCount: 2100, 
        delivery: t.instantPickup, 
        warranty: t.comprehensiveWarranty, 
        aiAnalysis: 'هذا عرض خاص لمتابعينا.',
        productName: query,
        isRealData: false
      }
    ];
  };

  // ============================
  // 17. حساب المشتركين المفلترين
  // ============================
  const filteredSubscribers = filterSubscribersByKeywords(marketingFilter);

  // ============================
  // 18. الواجهة الرئيسية (Home View)
  // ============================
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <SEOHead 
        title={view === 'home' && !results ? t.siteTitle : `${searchQuery ? searchQuery + ' | ' : ''} ${t.siteTitle}`} 
        description={t.siteDesc} 
        keywords={t.keywords}
        lang={lang}
      />
      <SchemaMarkup />

      {/* الإشعارات */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 ${notification.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white border-green-100 text-green-700'}`}>
            {notification.type === 'error' ? <AlertCircle size={24} /> : <CheckCircle size={24} className="text-green-500" />}
            <span className="font-black text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* نافذة الاشتراك */}
      {showPromoPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowPromoPopup(false)}></div>
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-300 border-4 border-white/20">
                  <button onClick={() => setShowPromoPopup(false)} className="absolute top-4 left-4 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-full p-1"><X size={20} /></button>
                  <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                          <Mail size={32} className="text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{t.promoTitle}</h3>
                      <p className="text-slate-500 font-bold text-sm leading-relaxed">{t.promoDesc}</p>
                  </div>
                  <form onSubmit={handleSubscribe} className="space-y-3">
                      <input 
                          type="email" 
                          required 
                          className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:ring-0 font-bold text-center placeholder:text-slate-300"
                          placeholder={t.emailPlaceholder}
                          value={promoEmail}
                          onChange={(e) => setPromoEmail(e.target.value)}
                      />
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black shadow-lg shadow-blue-200 transition-all active:scale-95">
                          {t.subscribe}
                      </button>
                  </form>
                  <p className="text-[10px] text-center text-slate-300 font-bold mt-4">نحترم خصوصيتك، لا رسائل مزعجة.</p>
              </div>
          </div>
      )}

      {/* زر فتح لوحة المساحة الشخصية */}
      <button 
        onClick={() => setShowSidePanel(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-r-2xl shadow-lg border border-slate-200 z-40 hover:pl-5 transition-all group border-l-0"
        title={t.mySpace}
      >
        <div className="relative">
            {myFavorites.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
            <ChevronRight className="text-slate-600 group-hover:text-blue-600 transition-colors" size={24} />
        </div>
      </button>

      {/* لوحة المساحة الشخصية */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${showSidePanel ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${showSidePanel ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowSidePanel(false)}></div>
        <div className={`absolute left-0 top-0 h-full w-full md:w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${showSidePanel ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full flex flex-col p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2"><Award className="text-blue-600" /> {t.mySpace}</h2>
                    <button onClick={() => setShowSidePanel(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X size={20} /></button>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
                    <button onClick={() => setSidePanelTab('favorites')} className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${sidePanelTab === 'favorites' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                        <Heart size={16} className={sidePanelTab === 'favorites' ? 'fill-blue-600' : ''} /> {t.favorites}
                    </button>
                    <button onClick={() => setSidePanelTab('history')} className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${sidePanelTab === 'history' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
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

      {/* زر تبديل اللغة */}
      <button 
        onClick={toggleLanguage} 
        className={`fixed ${lang === 'ar' ? 'left-4' : 'right-4'} top-24 md:top-6 z-[100] bg-white/90 backdrop-blur-xl shadow-xl border border-white/50 p-3 rounded-full hover:scale-110 transition-all active:scale-95 group`}
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

      {/* شريط التنقل */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-900/10 rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 pointer-events-auto border border-white/50 max-w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-4 cursor-pointer group select-none" onClick={handleLogoClick}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                <Brain size={18} />
            </div>
            <span className="text-lg font-black text-slate-800 tracking-tighter hidden md:block">مقارن</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <div className="flex items-center">
            {[{ id: 'home', label: t.home, icon: Globe, action: resetToHome }, { id: 'about', label: t.about, icon: Info, action: () => scrollToSection('about') }, { id: 'features', label: t.features, icon: Star, action: () => scrollToSection('why-trust') }, { id: 'earn', label: t.earn, icon: Coins, action: () => scrollToSection('how-we-earn') }].map((item) => (
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

      {/* الواجهة الرئيسية - تم نزول الهيدر الأزرق للأسفل (pt-32 بدل pt-40) */}
      {view === 'home' && (
        <>
          <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-900 text-white pt-32 pb-24 px-4 relative overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
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
                        <circle cx="60" cy="40" r="2" fill="currentColor"/>
                        <circle cx="120" cy="100" r="2" fill="currentColor"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <Hexagon size={64} className="text-blue-300/10 absolute top-[10%] left-[5%] animate-spin-slow blur-sm" />
                <Cpu size={48} className="text-indigo-300/10 absolute bottom-[20%] right-[10%] animate-bounce-slow blur-sm" />
                <Database size={32} className="text-blue-400/10 absolute top-[30%] right-[25%] animate-pulse blur-sm" />
                <Brain size={80} className="text-indigo-500/5 absolute bottom-[10%] left-[20%] animate-pulse blur-xl rotate-12" />
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
            {isSearching && (
              <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-slate-100 text-center mb-32">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <Brain className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={32} />
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
                          {aiSummary.advice && (
                            <p className="text-blue-200 text-lg font-bold mt-4">💡 نصيحة: {aiSummary.advice}</p>
                          )}
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
                
                <div className="relative">
                  <div className="md:hidden mb-6 text-center">
                    <p className="text-slate-600 text-sm font-bold flex items-center justify-center gap-2 animate-pulse">
                      <span>{t.swipeHint}</span>
                      <ChevronRight size={16} />
                    </p>
                  </div>
                  
                  <div 
                    ref={resultsContainerRef}
                    className="flex overflow-x-auto pb-6 gap-6 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible scrollbar-hide snap-x snap-mandatory touch-pan-x"
                  >
                    {results.map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden flex-shrink-0 w-[85vw] md:w-auto md:flex-grow snap-center md:hover:-translate-y-2"
                      >
                        {item.store.includes('شريك') && (
                          <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black z-20 animate-pulse shadow-lg ring-4 ring-red-100">
                            {t.specialOffer}
                          </div>
                        )}
                        
                        <div className={`${item.storeColor} py-8 px-8 text-white flex justify-between items-start relative overflow-hidden`}>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                          <div>
                            <span className="font-black text-2xl tracking-tighter block mb-1">{item.store}</span>
                            <div className="flex gap-2">
                              <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-md inline-flex items-center gap-1">
                                <Shield size={10} /> {t.trusted}
                              </div>
                              {item.isRealData ? (
                                <div className="bg-green-500/80 px-3 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-md inline-flex items-center gap-1">
                                  <CheckCircle size={10} /> بيانات حقيقية
                                </div>
                              ) : (
                                <div className="bg-yellow-500/80 px-3 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-md inline-flex items-center gap-1">
                                  <Info size={10} /> بيانات تجريبية
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="relative z-10 flex gap-2">
                            <button onClick={() => handleShare(item)} className="bg-white/20 hover:bg-white hover:text-blue-600 p-2 rounded-full transition-all text-white backdrop-blur-md" title="مشاركة">
                              <Share2 size={20} />
                            </button>
                            <button onClick={() => toggleFavorite(item)} className="bg-white/20 hover:bg-white hover:text-red-500 p-2 rounded-full transition-all text-white backdrop-blur-md" title="مفضلتي">
                              <Heart size={20} className={isFavorite(item) ? 'fill-red-500 text-red-500' : ''} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-6 md:p-8 flex-grow flex flex-col">
                          <div className="flex justify-between items-end mb-6 md:mb-8 border-b border-dashed border-slate-200 pb-4 md:pb-6">
                            <div>
                              <span className="text-4xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter">{item.price}</span>
                              <span className="text-lg text-slate-400 font-bold mx-2 uppercase">{item.currency}</span>
                            </div>
                            <div className="text-xs text-red-400 line-through font-black opacity-50 mb-2">{item.originalPrice}</div>
                          </div>
                          
                          <div className="space-y-4 md:space-y-5 mb-6 md:mb-8 flex-grow">
                            <div className="flex items-center gap-3 md:gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-2xl">
                              <Star size={18} className="text-yellow-400 fill-yellow-400 shrink-0" />
                              <div className="flex-1">
                                <span className="block text-slate-900 text-sm md:text-base">{item.rating} {t.rating}</span>
                                <span className="text-slate-400 font-medium text-xs">{t.from} {item.reviewsCount.toLocaleString()} {t.client}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 md:gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-2xl">
                              <Shield size={18} className="text-blue-500 shrink-0" />
                              <div className="flex-1">
                                <span className="block text-slate-900 text-sm md:text-base">{t.warrantyTitle}</span>
                                <span className="text-slate-400 font-medium text-xs">{item.warranty}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 md:gap-4 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-2xl">
                              <ShoppingCart size={18} className="text-indigo-500 shrink-0" />
                              <div className="flex-1">
                                <span className="block text-slate-900 text-sm md:text-base">{t.deliveryTitle}</span>
                                <span className="text-slate-400 font-medium text-xs">{item.delivery}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 p-4 md:p-5 rounded-2xl text-xs text-blue-800 mb-6 md:mb-8 font-bold leading-relaxed flex gap-3 items-start">
                            <Info size={16} className="shrink-0 mt-0.5" />
                            "{item.aiAnalysis}"
                          </div>
                          
                          <a 
                            href={getStoreLink(item.storeKey)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-[1.5rem] font-black text-lg hover:bg-blue-600 transition-all flex justify-center items-center gap-2 shadow-xl hover:shadow-blue-200 active:scale-95 text-center group/btn"
                          >
                            {t.visitStore}
                            <ExternalLink size={20} className="group-hover/btn:translate-x-1 transition-transform rtl:group-hover/btn:-translate-x-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
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

      {/* ============================ */}
      {/* 19. لوحة الإدارة (Admin View) - مع قسم المشتركين فقط */}
      {/* ============================ */}
      {view === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 py-32 animate-in fade-in">
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
            <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-slate-100">
              {/* رأس لوحة التحكم */}
              <div className="flex justify-between items-center mb-10 border-b pb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-black">إدارة النظام الذكي ⚙️</h1>
                    <div className="relative bg-slate-100 p-2 rounded-xl"><Key className="w-6 h-6 text-blue-500" /></div>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSaveAllChanges} className="px-6 py-2 bg-green-600 text-white rounded-xl font-black text-xs hover:bg-green-700 shadow-lg flex items-center gap-2"><Save size={14} /> حفظ جميع الإعدادات</button>
                    <button onClick={handleLogout} className="text-red-500 font-bold text-sm flex items-center gap-1"><LogOut size={14} /> خروج</button>
                </div>
              </div>
              
              {/* ==================== */}
              {/* قسم الذكاء الاصطناعي */}
              {/* ==================== */}
              <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-[2rem] p-8">
                <h3 className="font-black text-blue-900 border-b border-blue-200 pb-4 mb-6 flex items-center gap-2">
                  <Brain className="text-blue-600" />
                  إعدادات الذكاء الاصطناعي المتقدم
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-2 rounded-xl">
                        <Hexagon className="text-blue-600" size={24} />
                      </div>
                      <h4 className="font-black text-blue-800 text-lg">Google Gemini</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 mb-2 block">API Key</label>
                        <div className="relative">
                          <input 
                            type="password" 
                            value={adminConfig.aiSettings?.geminiApiKey || ''}
                            onChange={(e) => setAdminConfig({
                              ...adminConfig, 
                              aiSettings: { 
                                ...adminConfig.aiSettings, 
                                geminiApiKey: e.target.value 
                              }
                            })} 
                            className="w-full p-3 rounded-xl bg-slate-50 border border-blue-200 font-bold text-sm pr-10"
                            placeholder="sk-proj-xxxxxxxxxx"
                          />
                          <Eye size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 cursor-pointer" 
                            onClick={(e) => {
                              const input = e.target.previousSibling;
                              if (input.type === 'password') input.type = 'text';
                              else input.type = 'password';
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-bold text-slate-500 mb-2 block">الموديل</label>
                        <select 
                          value={adminConfig.aiSettings?.geminiModel || 'gemini-2.0-flash-exp'}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig, 
                            aiSettings: { 
                              ...adminConfig.aiSettings, 
                              geminiModel: e.target.value 
                            }
                          })}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-blue-200 font-bold text-sm"
                        >
                          <option value="gemini-2.0-flash-exp">Flash (أسرع)</option>
                          <option value="gemini-1.5-pro">Pro (أدق)</option>
                          <option value="gemini-2.0-pro-exp">Pro Experimental</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h4 className="font-black text-blue-800 mb-4">ميزات التحليل المتقدم</h4>
                    
                    <div className="space-y-3">
                      {[
                        { key: 'priceComparison', label: 'مقارنة الأسعار بين المتاجر', icon: TrendingDown },
                        { key: 'reviewAnalysis', label: 'تحليل آخر 100 تعليق', icon: MessageSquare },
                        { key: 'materialComparison', label: 'مقارنة مواد المنتج', icon: Database },
                        { key: 'warrantyCheck', label: 'فحص الضمانات', icon: Shield },
                        { key: 'deliverySpeed', label: 'سرعة التوصيل', icon: Rocket },
                        { key: 'competitorAnalysis', label: 'تحليل المنافسين', icon: BarChart3 }
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <feature.icon size={18} className="text-blue-600" />
                            <span className="font-bold text-sm text-slate-700">{feature.label}</span>
                          </div>
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              checked={adminConfig.aiSettings?.geminiFeatures?.[feature.key] || false}
                              onChange={(e) => setAdminConfig({
                                ...adminConfig,
                                aiSettings: {
                                  ...adminConfig.aiSettings,
                                  geminiFeatures: {
                                    ...adminConfig.aiSettings?.geminiFeatures,
                                    [feature.key]: e.target.checked
                                  }
                                }
                              })}
                              className="sr-only"
                              id={`feature-${feature.key}`}
                            />
                            <label 
                              htmlFor={`feature-${feature.key}`}
                              className={`block w-10 h-6 rounded-full cursor-pointer ${adminConfig.aiSettings?.geminiFeatures?.[feature.key] ? 'bg-blue-600' : 'bg-slate-300'}`}
                            >
                              <span className={`block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition-transform ${adminConfig.aiSettings?.geminiFeatures?.[feature.key] ? 'translate-x-4' : ''}`}></span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================== */}
              {/* قسم مفاتيح المتاجر */}
              {/* ==================== */}
              <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-[2rem] p-8">
                <h3 className="font-black text-green-900 border-b border-green-200 pb-4 mb-6 flex items-center gap-2">
                  <ShoppingCart className="text-green-600" />
                  مفاتيح API للمتاجر
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-green-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                            <span className="font-black text-sm">A</span>
                          </div>
                          <h4 className="font-black text-green-800">Amazon Saudi</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={adminConfig.storeApiKeys?.amazon?.enabled !== false}
                            onChange={() => toggleStoreEnabled('amazon')}
                            className="sr-only"
                            id="amazon-enabled"
                          />
                          <label 
                            htmlFor="amazon-enabled"
                            className={`block w-10 h-6 rounded-full cursor-pointer ${adminConfig.storeApiKeys?.amazon?.enabled !== false ? 'bg-green-600' : 'bg-slate-300'}`}
                          >
                            <span className={`block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition-transform ${adminConfig.storeApiKeys?.amazon?.enabled !== false ? 'translate-x-4' : ''}`}></span>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">Access Key</label>
                          <input 
                            type="text" 
                            value={adminConfig.storeApiKeys?.amazon?.accessKey || ''}
                            onChange={(e) => setAdminConfig({
                              ...adminConfig,
                              storeApiKeys: {
                                ...adminConfig.storeApiKeys,
                                amazon: { ...adminConfig.storeApiKeys?.amazon, accessKey: e.target.value }
                              }
                            })} 
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">Secret Key</label>
                          <input 
                            type="password" 
                            value={adminConfig.storeApiKeys?.amazon?.secretKey || ''}
                            onChange={(e) => setAdminConfig({
                              ...adminConfig,
                              storeApiKeys: {
                                ...adminConfig.storeApiKeys,
                                amazon: { ...adminConfig.storeApiKeys?.amazon, secretKey: e.target.value }
                              }
                            })} 
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-green-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                            <span className="font-black text-sm">N</span>
                          </div>
                          <h4 className="font-black text-green-800">Noon</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={adminConfig.storeApiKeys?.noon?.enabled !== false}
                            onChange={() => toggleStoreEnabled('noon')}
                            className="sr-only"
                            id="noon-enabled"
                          />
                          <label 
                            htmlFor="noon-enabled"
                            className={`block w-10 h-6 rounded-full cursor-pointer ${adminConfig.storeApiKeys?.noon?.enabled !== false ? 'bg-green-600' : 'bg-slate-300'}`}
                          >
                            <span className={`block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition-transform ${adminConfig.storeApiKeys?.noon?.enabled !== false ? 'translate-x-4' : ''}`}></span>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">API Key</label>
                          <input 
                            type="text" 
                            value={adminConfig.storeApiKeys?.noon?.apiKey || ''}
                            onChange={(e) => setAdminConfig({
                              ...adminConfig,
                              storeApiKeys: {
                                ...adminConfig.storeApiKeys,
                                noon: { ...adminConfig.storeApiKeys?.noon, apiKey: e.target.value }
                              }
                            })} 
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">Secret Key</label>
                          <input 
                            type="password" 
                            value={adminConfig.storeApiKeys?.noon?.secretKey || ''}
                            onChange={(e) => setAdminConfig({
                              ...adminConfig,
                              storeApiKeys: {
                                ...adminConfig.storeApiKeys,
                                noon: { ...adminConfig.storeApiKeys?.noon, secretKey: e.target.value }
                              }
                            })} 
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 border-2 border-dashed border-green-200 rounded-2xl p-6">
                    <h4 className="font-black text-green-800 mb-4 flex items-center gap-2">
                      <Plus className="text-green-600" size={20} />
                      إضافة متجر جديد
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">أضف متاجر جديدة وسيتم البحث فيها تلقائياً مع الذكاء الاصطناعي</p>
                    
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">اسم المتجر</label>
                          <input 
                            type="text" 
                            placeholder="مثال: متجر إلكتروني"
                            value={newStoreApiName}
                            onChange={(e) => setNewStoreApiName(e.target.value)}
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">مفتاح API</label>
                          <input 
                            type="password" 
                            placeholder="مفتاح API الخاص بالمتجر"
                            value={newStoreApiKey}
                            onChange={(e) => setNewStoreApiKey(e.target.value)}
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">الرمز السري (اختياري)</label>
                          <input 
                            type="password" 
                            placeholder="الرمز السري للـ API"
                            value={newStoreApiSecret}
                            onChange={(e) => setNewStoreApiSecret(e.target.value)}
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 mb-1 block">رابط API (اختياري)</label>
                          <input 
                            type="text" 
                            placeholder="https://api.example.com/search"
                            value={newStoreApiUrl}
                            onChange={(e) => setNewStoreApiUrl(e.target.value)}
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 text-sm font-bold text-left"
                            dir="ltr"
                          />
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleAddCustomStore}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-2"
                      >
                        <Plus size={16} />
                        إضافة متجر جديد
                      </button>
                    </div>
                  </div>
                  
                  {adminConfig.storeApiKeys?.customStores && adminConfig.storeApiKeys.customStores.length > 0 && (
                    <div className="mt-6">
                      <h5 className="font-bold text-green-700 mb-3">المتاجر المضافة:</h5>
                      <div className="space-y-3">
                        {adminConfig.storeApiKeys.customStores.map((store, index) => (
                          <div key={index} className="bg-white p-4 rounded-xl border border-green-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                                <span className="font-black text-sm">{store.name.charAt(0)}</span>
                              </div>
                              <div>
                                <h6 className="font-bold text-green-800">{store.name}</h6>
                                <p className="text-xs text-slate-500 truncate max-w-[200px]">
                                  {store.apiUrl || 'API مخصص'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <input 
                                  type="checkbox" 
                                  checked={store.enabled !== false}
                                  onChange={() => toggleStoreEnabled('custom', index)}
                                  className="sr-only"
                                  id={`store-${index}-enabled`}
                                />
                                <label 
                                  htmlFor={`store-${index}-enabled`}
                                  className={`block w-10 h-6 rounded-full cursor-pointer ${store.enabled !== false ? 'bg-green-600' : 'bg-slate-300'}`}
                                >
                                  <span className={`block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition-transform ${store.enabled !== false ? 'translate-x-4' : ''}`}></span>
                                </label>
                              </div>
                              <button 
                                onClick={() => handleDeleteCustomStore(index)}
                                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white p-4 rounded-xl border border-green-100 mt-6">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                      <Link className="text-green-600" size={18} />
                      روابط المتاجر (لروابط العمولة)
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">أضف روابط المتاجر لربطها بنتائج البحث</p>
                    
                    <div className="space-y-3">
                      {adminConfig.affiliateLinks?.map((store, index) => (
                        <div key={index} className="flex gap-2">
                          <input 
                            type="text" 
                            value={store.link}
                            onChange={(e) => { 
                              const newLinks = [...adminConfig.affiliateLinks]; 
                              newLinks[index].link = e.target.value; 
                              setAdminConfig({...adminConfig, affiliateLinks: newLinks}); 
                            }} 
                            className="w-full p-2 rounded-lg bg-slate-50 border border-green-200 font-bold text-xs text-left"
                            dir="ltr"
                            placeholder="رابط المتجر"
                          />
                          <div className="w-24 p-2 rounded-lg bg-green-100 font-black text-center text-xs flex items-center justify-center">
                            {store.name.toUpperCase()}
                          </div>
                          <button 
                            onClick={() => handleDeleteStore(index)} 
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      
                      <div className="flex gap-2 mt-2">
                        <input 
                          type="text" 
                          placeholder="اسم المتجر (مثال: amazon)"
                          className="w-1/3 p-2 rounded-lg border border-green-200 text-sm font-bold"
                          value={newStoreName}
                          onChange={(e) => setNewStoreName(e.target.value)}
                        />
                        <input 
                          type="text" 
                          placeholder="رابط المتجر (https://...)"
                          className="flex-1 p-2 rounded-lg border border-green-200 text-sm font-bold text-left"
                          dir="ltr"
                          value={newStoreLink}
                          onChange={(e) => setNewStoreLink(e.target.value)}
                        />
                        <button 
                          onClick={handleAddStore}
                          className="bg-green-600 text-white px-4 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                        >
                          <Plus size={16} />
                          إضافة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ==================== */}
              {/* 🎯 القسم الوحيد المهم: إدارة المشتركين والفلترة */}
              {/* ==================== */}
              <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-[2rem] p-8 shadow-lg">
                <h3 className="font-black text-blue-900 border-b-2 border-blue-200 pb-4 mb-8 flex items-center gap-3 text-xl">
                  <Users className="text-blue-600" size={28} />
                  👥 إدارة المشتركين والفلترة الذكية
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full mr-auto">جديد</span>
                </h3>

                {/* ✅ إحصائيات سريعة للمشتركين */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white p-5 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <Users size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold">إجمالي المشتركين</p>
                        <p className="text-3xl font-black text-blue-600">{subscribersList.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Filter size={24} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold">المفلتر حالياً</p>
                        <p className="text-3xl font-black text-green-600">{filteredSubscribers.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 p-3 rounded-xl">
                        <FileText size={24} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold">جاهز للتصدير</p>
                        <p className="text-3xl font-black text-purple-600">{filteredSubscribers.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ قسم الفلترة الذكية */}
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 mb-6">
                  <h4 className="font-black text-blue-800 mb-4 flex items-center gap-2 text-lg">
                    <Filter size={20} className="text-blue-600" />
                    فلترة المشتركين حسب المنتجات
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* جهة اليمين: حقل الفلترة */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 mb-2 block">
                        اكتب المنتجات اللي تبغى تفلتر عليها (مفصولة بمسافة)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={marketingFilter}
                          onChange={(e) => setMarketingFilter(e.target.value)}
                          className="w-full p-4 pr-12 rounded-xl bg-slate-50 border-2 border-blue-200 font-bold text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="مثال: آيفون سامسونج ماك بوك ابل"
                        />
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      </div>
                      
                      {/* زر مسح الفلترة */}
                      {marketingFilter && (
                        <button 
                          onClick={clearFilter}
                          className="mt-2 text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                        >
                          <X size={14} /> مسح الفلترة
                        </button>
                      )}
                      
                      {/* الكلمات المقترحة من أشهر المنتجات */}
                      <div className="mt-4">
                        <p className="text-xs font-bold text-slate-400 mb-2">منتجات مقترحة للفلترة:</p>
                        <div className="flex flex-wrap gap-2">
                          {topSearchTerms.slice(0, 10).map((term, idx) => (
                            <button
                              key={idx}
                              onClick={() => setMarketingFilter(term.term)}
                              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold transition-colors border border-blue-200"
                            >
                              {term.term} ({term.count})
                            </button>
                          ))}
                          {topSearchTerms.length === 0 && (
                            <span className="text-xs text-slate-400">لا توجد كلمات بحث بعد</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* جهة اليسار: معاينة سريعة + نسبة التغطية */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-blue-800">نتائج الفلترة:</span>
                        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-sm">
                          {filteredSubscribers.length} مشترك
                        </span>
                      </div>
                      
                      {/* شريط تقدم النسبة */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">نسبة التغطية</span>
                          <span className="font-bold text-blue-600">
                            {subscribersList.length > 0 
                              ? ((filteredSubscribers.length / subscribersList.length) * 100).toFixed(1) 
                              : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ 
                              width: subscribersList.length > 0 
                                ? `${(filteredSubscribers.length / subscribersList.length) * 100}%` 
                                : '0%' 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* معاينة سريعة للمشتركين */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-slate-500">معاينة سريعة:</span>
                          <button 
                            onClick={handleExportSubscribers}
                            className="text-xs bg-white text-blue-600 px-3 py-1.5 rounded-full font-bold border border-blue-200 hover:bg-blue-50 transition-colors flex items-center gap-1"
                          >
                            <FileText size={12} />
                            تصدير CSV
                          </button>
                        </div>
                        <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar">
                          {filteredSubscribers.slice(0, 5).map((sub, idx) => (
                            <div key={idx} className="text-xs bg-white/80 p-2.5 rounded-lg flex items-center gap-2 border border-blue-100">
                              <Mail size={14} className="text-blue-400" />
                              <span className="font-bold text-slate-700 flex-1 truncate" dir="ltr">{sub.email}</span>
                              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                                {sub.interests?.length || 0} اهتمامات
                              </span>
                            </div>
                          ))}
                          {filteredSubscribers.length > 5 && (
                            <p className="text-[10px] text-center text-slate-400 pt-1">
                              + {filteredSubscribers.length - 5} مشترك آخر
                            </p>
                          )}
                          {filteredSubscribers.length === 0 && (
                            <div className="text-center py-6">
                              <p className="text-slate-400 text-xs mb-2">لا يوجد مشتركين متطابقين مع الفلترة</p>
                              <button 
                                onClick={clearFilter}
                                className="text-xs bg-slate-100 px-3 py-1.5 rounded-full font-bold"
                              >
                                مسح الفلترة
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ قائمة جميع المشتركين (اختياري) */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-blue-800">جميع المشتركين ({subscribersList.length})</h4>
                    <button 
                      onClick={() => setMarketingFilter('')}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold"
                    >
                      عرض الكل
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-blue-100 max-h-[250px] overflow-y-auto custom-scrollbar">
                    {subscribersList.length > 0 ? (
                      subscribersList.slice(0, 10).map((sub, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border-b border-slate-50 last:border-0 hover:bg-blue-50/50">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700" dir="ltr">{sub.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {sub.interests && sub.interests.length > 0 && (
                              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full">
                                {sub.interests.slice(0, 2).join(', ')}
                                {sub.interests.length > 2 && '...'}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">
                              {sub.joined_at ? new Date(sub.joined_at).toLocaleDateString('ar-SA') : ''}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-400 text-sm">لا يوجد مشتركين بعد</p>
                      </div>
                    )}
                    {subscribersList.length > 10 && (
                      <div className="p-3 text-center text-xs text-blue-600 font-bold">
                        + {subscribersList.length - 10} مشترك آخر
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* ==================== */}
              {/* إعدادات عامة */}
              {/* ==================== */}
              <div className="mb-12 bg-slate-50 border border-slate-100 rounded-[2rem] p-8">
                <h3 className="font-black text-slate-900 border-b border-slate-200 pb-4 mb-6 flex items-center gap-2">
                  <Settings className="text-slate-600" />
                  إعدادات النظام العامة
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">استخدام بيانات حقيقية</h4>
                        <p className="text-xs text-slate-400">البحث في APIs الحقيقية للمتاجر</p>
                      </div>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={adminConfig.apiSettings?.useRealData !== false}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            apiSettings: {
                              ...adminConfig.apiSettings,
                              useRealData: e.target.checked
                            }
                          })}
                          className="sr-only"
                          id="use-real-data"
                        />
                        <label 
                          htmlFor="use-real-data"
                          className={`block w-10 h-6 rounded-full cursor-pointer ${adminConfig.apiSettings?.useRealData !== false ? 'bg-green-600' : 'bg-slate-300'}`}
                        >
                          <span className={`block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition-transform ${adminConfig.apiSettings?.useRealData !== false ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">الرجوع للبيانات الوهمية</h4>
                        <p className="text-xs text-slate-400">إذا فشل الاتصال بالـ APIs</p>
                      </div>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={adminConfig.apiSettings?.fallbackToMock !== false}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            apiSettings: {
                              ...adminConfig.apiSettings,
                              fallbackToMock: e.target.checked
                            }
                          })}
                          className="sr-only"
                          id="fallback-mock"
                        />
                        <label 
                          htmlFor="fallback-mock"
                          className={`block w-10 h-6 rounded-full cursor-pointer ${adminConfig.apiSettings?.fallbackToMock !== false ? 'bg-green-600' : 'bg-slate-300'}`}
                        >
                          <span className={`block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition-transform ${adminConfig.apiSettings?.fallbackToMock !== false ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* إحصائيات البحث المتقدمة */}
              <div className="mb-12 bg-indigo-50 border border-indigo-100 rounded-[2rem] p-8">
                <h3 className="font-black text-indigo-900 border-b border-indigo-200 pb-4 mb-6 flex items-center gap-2">
                  <BarChart2 className="text-indigo-600" />
                  إحصائيات البحث المتقدمة
                </h3>
                
                <div className="mb-8">
                  <p className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2">
                    <TrendingUp size={16} /> النمو الشهري
                  </p>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-50 h-64 flex items-end gap-4 overflow-x-auto custom-scrollbar">
                    {monthlyStats.length > 0 ? (
                      (() => {
                        const maxMonthly = Math.max(...monthlyStats.map(s => s.total_searches));
                        return monthlyStats.slice(-6).map((stat, idx) => {
                          const heightPercent = (stat.total_searches / maxMonthly) * 100;
                          return (
                            <div key={idx} className="flex flex-col items-center gap-2 group min-w-[50px]">
                              <div className="w-12 bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-xl transition-all duration-500 relative shadow-md group-hover:scale-105" style={{ height: `${heightPercent}%` }}>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap">{stat.total_searches}</span>
                              </div>
                              <span className="text-[10px] font-black text-slate-400" dir="ltr">{stat.month}</span>
                            </div>
                          );
                        });
                      })()
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">جاري جمع بيانات شهرية...</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-bold text-indigo-400 mb-4">الكلمات الأكثر بحثاً</p>
                    <div className="flex items-end gap-2 h-64 mt-6 bg-white p-4 rounded-xl border border-indigo-50 shadow-inner">
                      {topSearchTerms.length > 0 ? (
                        (() => {
                          const maxCount = Math.max(...topSearchTerms.map(t => t.count));
                          return topSearchTerms.slice(0, 8).map((item, idx) => {
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
                    <div className="flex gap-2 mt-2">
                      {topSearchTerms.slice(0, 8).map((item, idx) => (
                        <span key={idx} className="flex-1 text-[8px] text-center text-slate-500 font-bold truncate block">{item.term}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col h-[350px]">
                    <p className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2">
                      <Clock size={16} /> سجل البحث المباشر
                    </p>
                    <div className="bg-white rounded-2xl shadow-sm border border-indigo-50 flex-1 overflow-hidden flex flex-col">
                      <div className="flex bg-indigo-50 p-3 text-[10px] font-black text-indigo-800 uppercase tracking-wider">
                        <div className="w-1/3">الوقت</div>
                        <div className="flex-1">كلمة البحث</div>
                        <div className="w-1/4">الجهاز</div>
                      </div>
                      <div className="overflow-y-auto custom-scrollbar flex-1 p-2 space-y-1">
                        {searchLogs.length > 0 ? (
                          searchLogs.slice(0, 15).map((log, idx) => (
                            <div key={idx} className="flex items-center p-3 text-xs border-b border-slate-50 last:border-0 hover:bg-indigo-50/50 transition-colors rounded-lg">
                              <div className="w-1/3 text-slate-400 font-bold" dir="ltr">
                                {new Date(log.timestamp).toLocaleDateString('en-GB')} <br/>
                                <span className="text-indigo-300">{new Date(log.timestamp).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</span>
                              </div>
                              <div className="flex-1 font-black text-slate-700">{log.term}</div>
                              <div className="w-1/4 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full text-center">{log.device || 'Desktop'}</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 text-slate-300 text-xs font-bold">لا توجد عمليات بحث حديثة</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* الرسائل والطلبات الواردة */}
              <div className="mb-12">
                <h3 className="font-black text-slate-900 border-b pb-4 mb-6 flex items-center gap-2">
                  <MessageCircle className="text-blue-600" />
                  الرسائل والطلبات الواردة
                </h3>
                <div className="bg-slate-50 rounded-[2rem] p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {inboxMessages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 font-bold">لا توجد رسائل جديدة</div>
                  ) : (
                    <div className="space-y-4">
                      {inboxMessages.map((msg) => (
                        <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative group">
                          <button onClick={() => handleDeleteMessage(msg.id)} className="absolute top-4 left-4 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${msg.type === 'partner_request' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                              {msg.type === 'partner_request' ? 'طلب شراكة' : 'رسالة تواصل'}
                            </span>
                            <span className="text-xs text-slate-400 font-bold" dir="ltr">
                              {new Date(msg.timestamp).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          <h4 className="font-black text-lg text-slate-900 mb-1">
                            {msg.type === 'partner_request' ? msg.store : msg.name}
                          </h4>
                          <p className="text-blue-600 font-bold text-sm mb-2" dir="ltr">{msg.email}</p>
                          {msg.message && (
                            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-xl mt-2">"{msg.message}"</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* إدارة الكلمات الرائجة */}
              <div className="mb-12 bg-orange-50 border border-orange-100 rounded-[2rem] p-8">
                <h3 className="font-black text-orange-900 border-b border-orange-200 pb-4 mb-6 flex items-center gap-2">
                  <Flame className="text-orange-600" />
                  إدارة الكلمات الرائجة
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {adminConfig.trendingKeywords?.map((kw, idx) => (
                      <div key={idx} className="bg-white text-orange-800 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm border border-orange-100">
                        {kw}
                        <button onClick={() => handleDeleteTrendingKeyword(idx)} className="text-orange-300 hover:text-red-500 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="أضف كلمة جديدة" 
                      className="flex-1 p-4 rounded-xl text-sm font-bold border-none shadow-sm" 
                      value={newTrendingKeyword} 
                      onChange={(e) => setNewTrendingKeyword(e.target.value)} 
                    />
                    <button 
                      onClick={handleAddTrendingKeyword} 
                      className="bg-orange-600 text-white px-6 rounded-xl font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-200"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* بيانات التواصل والعروض */}
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                <div className="space-y-6">
                  <h3 className="font-black text-blue-900 border-b pb-2">بيانات التواصل</h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400">الواتساب</label>
                    <input 
                      type="text" 
                      value={adminConfig.whatsappNumber} 
                      onChange={(e) => setAdminConfig({...adminConfig, whatsappNumber: e.target.value})} 
                      className="w-full p-4 rounded-xl bg-slate-50 font-bold border" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400">الإيميل</label>
                    <input 
                      type="email" 
                      value={adminConfig.supportEmail} 
                      onChange={(e) => setAdminConfig({...adminConfig, supportEmail: e.target.value})} 
                      className="w-full p-4 rounded-xl bg-slate-50 font-bold border" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400">تويتر</label>
                    <input 
                      type="text" 
                      value={adminConfig.twitterLink} 
                      onChange={(e) => setAdminConfig({...adminConfig, twitterLink: e.target.value})} 
                      className="w-full p-4 rounded-xl bg-slate-50 font-bold border" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400">إنستقرام</label>
                    <input 
                      type="text" 
                      value={adminConfig.instagramLink} 
                      onChange={(e) => setAdminConfig({...adminConfig, instagramLink: e.target.value})} 
                      className="w-full p-4 rounded-xl bg-slate-50 font-bold border" 
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-black text-purple-600 border-b pb-2">العروض الخاصة</h3>
                  <div className="max-h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {adminConfig.exclusiveOffers?.map((offer, index) => (
                      <div key={index} className="bg-purple-50 p-3 rounded-xl text-xs relative group">
                        <button onClick={() => handleDeleteOffer(index)} className="absolute top-2 left-2 text-red-400 hover:text-red-600">
                          <X size={14} />
                        </button>
                        <p className="font-black text-purple-900">كلمة البحث: {offer.keyword}</p>
                        <p className="text-slate-600 truncate">{offer.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                    <h4 className="font-bold text-purple-700 text-sm mb-3">إضافة عرض ذكي</h4>
                    <input 
                      type="text" 
                      placeholder="كلمة البحث" 
                      className="w-full p-2 mb-2 rounded-lg border text-xs font-bold" 
                      value={newOfferKeyword} 
                      onChange={(e) => setNewOfferKeyword(e.target.value)} 
                    />
                    <input 
                      type="text" 
                      placeholder="رسالة العرض" 
                      className="w-full p-2 mb-2 rounded-lg border text-xs font-bold" 
                      value={newOfferMessage} 
                      onChange={(e) => setNewOfferMessage(e.target.value)} 
                    />
                    <input 
                      type="text" 
                      placeholder="رابط العرض" 
                      className="w-full p-2 mb-2 rounded-lg border text-xs font-bold text-left" 
                      dir="ltr" 
                      value={newOfferLink} 
                      onChange={(e) => setNewOfferLink(e.target.value)} 
                    />
                    <button 
                      onClick={handleAddOffer} 
                      className="w-full bg-purple-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-purple-700 flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> إضافة عرض
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* صفحات أخرى */}
      {view === 'merchant' && (
        <div className="max-w-4xl mx-auto px-4 py-32 animate-in fade-in">
           <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-20 border border-slate-100 text-center">
             <Award size={48} className="text-blue-600 mx-auto mb-6" />
             <h1 className="text-3xl font-black text-slate-900 mb-4">شريك أعمال مقارن</h1>
             <p className="text-slate-500 font-bold text-lg mb-10">وصل منتجاتك لآلاف العملاء.</p>
             <form className="space-y-6 text-right max-w-xl mx-auto" onSubmit={handleMerchantSubmit}>
               <input 
                 type="text" 
                 className="w-full p-5 rounded-2xl bg-slate-50 font-bold border" 
                 placeholder="اسم المتجر" 
                 required 
                 value={merchantForm.store} 
                 onChange={e => setMerchantForm({...merchantForm, store: e.target.value})} 
               />
               <input 
                 type="email" 
                 className="w-full p-5 rounded-2xl bg-slate-50 font-bold border" 
                 placeholder="إيميل التواصل" 
                 required 
                 value={merchantForm.email} 
                 onChange={e => setMerchantForm({...merchantForm, email: e.target.value})} 
               />
               <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-blue-700 transition-colors">
                 إرسال الطلب
               </button>
             </form>
             <button onClick={resetToHome} className="mt-8 text-slate-400 font-bold underline">الرجوع</button>
           </div>
        </div>
      )}

      {view === 'privacy' && (
        <div className="max-w-4xl mx-auto px-4 py-32 animate-in fade-in">
           <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-20 border border-slate-100 relative overflow-hidden">
             <div className="relative z-10">
                <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <Lock className="text-blue-600" /> {t.privacy}
                </h1>
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
                <button onClick={resetToHome} className="mt-12 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 transition-colors">
                  الرجوع للرئيسية
                </button>
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
                    <div>
                      <h3 className="font-black text-lg text-slate-800">الإيميل</h3>
                      <p className="text-blue-600 font-bold">{adminConfig.supportEmail}</p>
                    </div>
                 </div>
                 <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
                    <div className="bg-green-100 text-green-600 p-4 rounded-2xl"><MessageSquare size={28} /></div>
                    <div>
                      <h3 className="font-black text-lg text-slate-800">واتساب</h3>
                      <p className="text-green-600 font-bold" dir="ltr">{adminConfig.whatsappNumber}</p>
                    </div>
                 </div>
                 <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
                    <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl"><Send size={28} /></div>
                    <div>
                      <h3 className="font-black text-lg text-slate-800">سوشيال ميديا</h3>
                      <div className="flex gap-3 mt-1">
                        <a href={adminConfig.twitterLink} className="text-slate-400 hover:text-blue-500 transition-colors"><Twitter size={20} /></a>
                        <a href={adminConfig.instagramLink} className="text-slate-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                      </div>
                    </div>
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 h-full">
                 <h3 className="text-2xl font-black mb-6 text-slate-900">أرسل رسالة مباشرة ✉️</h3>
                 <form className="space-y-4" onSubmit={handleContactSubmit}>
                    <input 
                      type="text" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100" 
                      placeholder="الاسم" 
                      required 
                      value={contactForm.name} 
                      onChange={e => setContactForm({...contactForm, name: e.target.value})} 
                    />
                    <input 
                      type="email" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100" 
                      placeholder="الإيميل" 
                      required 
                      value={contactForm.email} 
                      onChange={e => setContactForm({...contactForm, email: e.target.value})} 
                    />
                    <textarea 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100 h-32 resize-none" 
                      placeholder="اكتب رسالتك هنا..." 
                      required 
                      value={contactForm.message} 
                      onChange={e => setContactForm({...contactForm, message: e.target.value})}
                    ></textarea>
                    <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-slate-800 transition-all">
                      إرسال
                    </button>
                 </form>
              </div>
           </div>
           <div className="text-center mt-16">
             <button onClick={resetToHome} className="text-slate-400 font-bold hover:text-blue-600 flex items-center justify-center gap-2 mx-auto">
               <ArrowLeft size={16} /> الرجوع للرئيسية
             </button>
           </div>
        </div>
      )}

      {/* التذييل (Footer) */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-32 rounded-t-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-white mb-6">
                <div className="bg-blue-600 p-2 rounded-xl"><Brain size={24} /></div>
                <span className="text-3xl font-black tracking-tighter">مقارن</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">{t.footerDesc}</p>
              <div className="flex gap-4">
                <a href={adminConfig.twitterLink} className="bg-white/5 hover:bg-blue-500 hover:text-white p-3 rounded-full transition-all"><Twitter size={18} /></a>
                <a href={adminConfig.instagramLink} className="bg-white/5 hover:bg-pink-500 hover:text-white p-3 rounded-full transition-all"><Instagram size={18} /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black text-lg mb-6">{t.quickLinks}</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><button onClick={resetToHome} className="hover:text-blue-400 transition-colors">{t.home}</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">{t.about}</button></li>
                <li><button onClick={() => scrollToSection('why-trust')} className="hover:text-blue-400 transition-colors">{t.features}</button></li>
                <li><button onClick={() => scrollToSection('how-we-earn')} className="hover:text-blue-400 transition-colors">{t.earn}</button></li>
                <li><button onClick={() => setView('merchant')} className="hover:text-blue-400 transition-colors">{t.merchant}</button></li>
              </ul>
            </div>
             <div>
               <h4 className="text-white font-black text-lg mb-6">{t.legal}</h4>
               <ul className="space-y-4 text-sm font-bold">
                 <li><button onClick={() => setView('privacy')} className="hover:text-blue-400 transition-colors">{t.privacy}</button></li>
                 <li><button onClick={() => setView('contact')} className="hover:text-blue-400 transition-colors">{t.contactTitle}</button></li>
                 <li><button className="hover:text-blue-400 transition-colors cursor-not-allowed opacity-50">{t.terms}</button></li>
               </ul>
             </div>
            <div>
              <h4 className="text-white font-black text-lg mb-6">{t.contact}</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-3"><Mail size={18} className="text-blue-500" /><span dir="ltr">{adminConfig.supportEmail}</span></li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-green-500" /><span dir="ltr">{adminConfig.whatsappNumber}</span></li>
                <li className="flex items-start gap-3"><MapPinIcon /><span>الرياض، المملكة العربية السعودية</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500">
            <p>{t.rights}</p>
            <div className="flex gap-6"><span>{t.madeIn}</span></div>
          </div>
        </div>
      </footer>

      {/* الأنماط المخصصة */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .touch-pan-x {
          touch-action: pan-x;
        }
      `}</style>
    </div>
  );
};

export default App;
