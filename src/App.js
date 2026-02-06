import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingCart, Star, Shield, Info, ExternalLink, Zap, 
  BarChart3, TrendingDown, AlertCircle, CheckCircle, MousePointer2, 
  Cpu, Rocket, Mail, Lock, Phone, MessageSquare, Tag, Award, Users, Heart,
  Instagram, Twitter, Send, Settings, Eye, EyeOff, Save, ArrowLeft, Plus, Trash2, X,
  FileText, Activity, Globe, ChevronLeft, Coins, Database, Bell, MessageCircle, BarChart2, Flame, Languages, Link, Server,
  ChevronRight, Clock, XCircle, Share2, Calendar, TrendingUp, Filter, UserCheck, LogOut,
  Brain, Hexagon, Menu, X as XIcon, Home, CreditCard, Store, ChevronDown, MapPin, Facebook, Youtube, Ticket
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
    searchPlaceholder: 'وش بخاطرك تشتري اليوم؟ (آيفون، سماعة، عطر..)',
    searchBtn: 'بحث ذكي',
    analyzing: 'جاري التحليل...',
    realSearch: 'عملية بحث رائجة',
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
    menu: 'القائمة',
    contact: 'تواصل',
    dashboard: 'لوحة التحكم',
    analytics: 'الإحصائيات',
    marketing: 'التسويق',
    subscribers: 'المشتركين',
    inbox: 'الوارد',
    stores: 'المتاجر',
    offers: 'العروض',
    configuration: 'الإعدادات',
    privacyPolicy: 'سياسة الخصوصية',
    viewResults: 'عرض النتائج',
    comparison: 'المقارنة',
    allResults: 'جميع النتائج',
    sortBy: 'ترتيب حسب',
    price: 'السعر',
    rating: 'التقييم',
    bestMatch: 'الأفضل',
    showMore: 'عرض المزيد',
    showLess: 'عرض أقل',
    socialMedia: 'وسائل التواصل',
    tiktok: 'تيك توك',
    facebook: 'فيسبوك',
    youtube: 'يوتيوب',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    whatsapp: 'واتساب',
    twitter: 'تويتر',
    instagram: 'إنستقرام',
    save: 'حفظ',
    update: 'تحديث',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    bestChoice: 'الخيار الأفضل',
    ourPick: 'اختيارنا'
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
    searchPlaceholder: 'What are you looking for today? (iPhone, Headset...)',
    searchBtn: 'Smart Search',
    analyzing: 'Analyzing...',
    realSearch: 'Trending Searches',
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
    menu: 'Menu',
    contact: 'Contact',
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    marketing: 'Marketing',
    subscribers: 'Subscribers',
    inbox: 'Inbox',
    stores: 'Stores',
    offers: 'Offers',
    configuration: 'Configuration',
    privacyPolicy: 'Privacy Policy',
    viewResults: 'View Results',
    comparison: 'Comparison',
    allResults: 'All Results',
    sortBy: 'Sort By',
    price: 'Price',
    rating: 'Rating',
    bestMatch: 'Best Match',
    showMore: 'Show More',
    showLess: 'Show Less',
    socialMedia: 'Social Media',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    youtube: 'YouTube',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    twitter: 'Twitter',
    instagram: 'Instagram',
    save: 'Save',
    update: 'Update',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    bestChoice: 'Best Choice',
    ourPick: 'Our Pick'
  }
};

// --- استدعاء المفاتيح السرية من البيئة ---
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
  const [notification, setNotification] = useState(null);
  const [realSearchCount, setRealSearchCount] = useState(0);
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState('bestMatch');
  const [showComparisonGuide, setShowComparisonGuide] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  
  const clickTimeoutRef = useRef(null); 
  const t = translations[lang];

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
    facebookLink: "https://facebook.com/moqaren",
    tiktokLink: "https://tiktok.com/@moqaren",
    youtubeLink: "https://youtube.com/@moqaren",
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

  // --- كشف حجم الشاشة ---
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // --- Firebase Auth Listener ---
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

  // --- Promo Popup Timer ---
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

  // --- Fetch Settings ---
  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) { 
        const data = docSnap.data();
        // دمج البيانات مع القيم الافتراضية للحفاظ على الهيكل
        setAdminConfig({ 
          ...defaultAdminConfig, 
          ...data,
          // التأكد من وجود جميع روابط التواصل
          facebookLink: data.facebookLink || defaultAdminConfig.facebookLink,
          tiktokLink: data.tiktokLink || defaultAdminConfig.tiktokLink,
          youtubeLink: data.youtubeLink || defaultAdminConfig.youtubeLink
        }); 
      } else { 
        setDoc(docRef, defaultAdminConfig); 
      }
    }, (error) => console.log('Config fetch error', error));
    return () => unsubscribe();
  }, [user]);

  // --- Real Counter ---
  useEffect(() => {
    if (!user) return;
    const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
        if (docSnap.exists()) { setRealSearchCount(docSnap.data().total_searches || 0); } else { setDoc(statsRef, { total_searches: 0 }, { merge: true }); setRealSearchCount(0); }
    }, (error) => console.log('Stats error', error));
    return () => unsubscribe();
  }, [user]);

  // --- Fetch Dashboard Data ---
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

  // --- وظائف التسويق ---
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
      try { await setDoc(termRef, { term: term.trim(), count: increment(1), lastSearched: new Date().toISOString() }, { merge: true }); } catch (e) { }

      try { await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'search_logs'), { term: term.trim(), timestamp: new Date().toISOString(), device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop' }); } catch (e) { }

      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthlyRef = doc(db, 'artifacts', appId, 'public', 'data', 'analytics_monthly', currentMonth);
      try { await setDoc(monthlyRef, { total_searches: increment(1), last_updated: new Date().toISOString() }, { merge: true }); } catch (e) { }

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

  const handleSendCampaign = () => {
      if (!marketingSubject || !marketingBody) {
          showNotification('يرجى تعبئة العنوان والرسالة', 'error');
          return;
      }
      showNotification(`تم إرسال الحملة إلى ${filteredSubscribers.length} مشترك بنجاح!`, 'success');
      setMarketingSubject('');
      setMarketingBody('');
  };

  const incrementGlobalCounter = async () => {
      if (!user) return;
      const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
      try { await setDoc(statsRef, { total_searches: increment(1) }, { merge: true }); } catch (error) { }
  };

  const handleSaveAllChanges = async () => {
    if (!isAdminAuthenticated) {
        showNotification("ليس لديك صلاحية الحفظ", "error");
        return;
    }
    
    try {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'app_settings', 'main_config');
      await setDoc(docRef, adminConfig);
      showNotification(t.toastSuccess);
    } catch (error) { 
      showNotification("حدث خطأ أثناء الحفظ، تأكد من اتصالك", "error"); 
      console.error("Save error:", error);
    }
  };

  const resetToHome = () => {
    setView('home');
    setResults(null);
    setSearchQuery('');
    setAiSummary(null);
    setShowExclusiveToast(false);
    setIsMobileMenuOpen(false);
    setShowComparisonGuide(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setView('home');
    setResults(null);
    setIsMobileMenuOpen(false);
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
      setIsMobileMenuOpen(false);
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
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inbox'), { type: 'partner_request', store: merchantForm.store, email: merchantForm.email, timestamp: new Date().toISOString() });
      showNotification(t.toastSuccess);
      setMerchantForm({ store: '', email: '' });
      resetToHome();
    } catch (err) { showNotification(t.toastError, "error"); }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inbox'), { type: 'contact_message', name: contactForm.name, email: contactForm.email, message: contactForm.message, timestamp: new Date().toISOString() });
      showNotification(t.toastSuccess);
      setContactForm({ name: '', email: '', message: '' });
      resetToHome();
    } catch (err) { showNotification(t.toastError, "error"); }
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

  // --- AI ---
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
    setShowComparisonGuide(true);
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

  // Filter subscribers for admin
  const filteredSubscribers = subscribersList.filter(sub => {
      if (!marketingFilter) return true;
      const keywords = marketingFilter.toLowerCase().split(' ');
      return sub.interests && sub.interests.some(interest => 
          keywords.some(keyword => interest.toLowerCase().includes(keyword))
      );
  });

  // Sort results
  const sortedResults = results ? [...results].sort((a, b) => {
    switch(sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'bestMatch':
      default:
        return 0;
    }
  }) : [];

  const navItems = [
    { id: 'home', label: t.home, icon: Home, action: resetToHome },
    { id: 'about', label: t.about, icon: Info, action: () => scrollToSection('about') },
    { id: 'features', label: t.features, icon: Star, action: () => scrollToSection('why-trust') },
    { id: 'earn', label: t.earn, icon: CreditCard, action: () => scrollToSection('how-we-earn') },
    { id: 'partners', label: t.partners, icon: Users, action: () => scrollToSection('partners') }
  ];

  // إيجاد أفضل خيار (الأقل سعراً)
  const bestChoice = results ? results.reduce((best, current) => 
    current.price < best.price ? current : best
  ) : null;

  // --- صفحة سياسة الخصوصية ---
  const PrivacyPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-32 animate-in fade-in">
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-12 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl -mr-40 -mt-40"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <Lock className="text-blue-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">{t.privacyPolicy}</h1>
              <p className="text-slate-500 font-bold">آخر تحديث: يناير 2026</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <section className="bg-blue-50 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="text-blue-600" size={20} />
                1. مقدمة
              </h2>
              <p className="text-slate-600 leading-relaxed">
                في "مقارن"، نأخذ خصوصيتك على محمل الجد. تشرح هذه الوثيقة كيف نجمع بياناتك ونستخدمها ونحميها عند استخدامك لموقعنا.
              </p>
            </section>

            <section className="bg-green-50 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Database className="text-green-600" size={20} />
                2. البيانات التي نجمعها
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed ml-4">
                <li><strong>بيانات البحث:</strong> نقوم بتخزين كلمات البحث (بدون هوية) لتحسين خوارزمياتنا واقتراح منتجات أفضل.</li>
                <li><strong>بيانات الجهاز:</strong> مثل نوع المتصفح والجهاز لضمان أفضل تجربة تصفح.</li>
                <li><strong>بيانات الاشتراك:</strong> إذا اشتركت في نشرتنا البريدية، نخزن إيميلك فقط لإرسال العروض.</li>
              </ul>
            </section>

            <section className="bg-yellow-50 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="text-yellow-600" size={20} />
                3. ملفات تعريف الارتباط (Cookies)
              </h2>
              <p className="text-slate-600 leading-relaxed">
                نستخدم الكوكيز لتحسين تجربتك وتذكر تفضيلاتك. يمكنك تعطيل الكوكيز من إعدادات متصفحك، لكن قد يؤثر ذلك على بعض وظائف الموقع.
              </p>
            </section>

            <section className="bg-purple-50 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Link className="text-purple-600" size={20} />
                4. الروابط الخارجية والعمولات
              </h2>
              <p className="text-slate-600 leading-relaxed">
                يحتوي موقعنا على روابط لمتاجر خارجية (مثل أمازون ونون). عند النقر عليها، قد نتحصل على عمولة بسيطة دون أي تكلفة إضافية عليك. نحن غير مسؤولين عن سياسات الخصوصية الخاصة بتلك المتاجر.
              </p>
            </section>

            <section className="bg-red-50 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="text-red-600" size={20} />
                5. أمان البيانات
              </h2>
              <p className="text-slate-600 leading-relaxed">
                نستخدم بروتوكولات تشفير متقدمة (SSL) لحماية اتصالك بالموقع. لا نقوم ببيع بياناتك لأي طرف ثالث. نحتفظ ببياناتك فقط طالما كنت تستخدم خدماتنا.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <Mail className="text-slate-600" size={20} />
                6. تواصل معنا
              </h2>
              <p className="text-slate-600 leading-relaxed">
                إذا كان لديك أي استفسار حول سياسة الخصوصية، يمكنك التواصل معنا عبر:
              </p>
              <div className="mt-4 space-y-2">
                <p className="font-bold text-slate-700">البريد الإلكتروني: <span className="text-blue-600" dir="ltr">{adminConfig.supportEmail}</span></p>
                <p className="font-bold text-slate-700">رقم الواتساب: <span className="text-green-600" dir="ltr">{adminConfig.whatsappNumber}</span></p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <button 
              onClick={resetToHome}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- صفحة تواصل معنا ---
  const ContactPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-32 animate-in fade-in">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.contactTitle} 📞</h1>
        <p className="text-slate-500 font-bold text-lg md:text-xl">حنا هنا عشان نسمعك، سواء عندك اقتراح أو مشكلة أو سؤال.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800">البريد الإلكتروني</h3>
              <p className="text-blue-600 font-bold" dir="ltr">{adminConfig.supportEmail}</p>
              <p className="text-sm text-slate-500 mt-1">ردنا خلال 24 ساعة</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
            <div className="bg-green-100 text-green-600 p-4 rounded-2xl">
              <MessageSquare size={28} />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800">واتساب</h3>
              <p className="text-green-600 font-bold" dir="ltr">{adminConfig.whatsappNumber}</p>
              <p className="text-sm text-slate-500 mt-1">خدمة العملاء 24/7</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800">العنوان</h3>
              <p className="text-slate-700 font-bold">الرياض، المملكة العربية السعودية</p>
              <p className="text-sm text-slate-500 mt-1">مقرنا الرئيسي</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-50 flex items-center gap-6 hover:-translate-y-1 transition-transform">
            <div className="bg-pink-100 text-pink-600 p-4 rounded-2xl">
              <Instagram size={28} />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800">سوشيال ميديا</h3>
              <div className="flex gap-4 mt-2">
                <a href={adminConfig.twitterLink} className="bg-slate-100 hover:bg-blue-100 p-3 rounded-xl transition-colors">
                  <Twitter size={20} className="text-slate-600 hover:text-blue-500" />
                </a>
                <a href={adminConfig.instagramLink} className="bg-slate-100 hover:bg-pink-100 p-3 rounded-xl transition-colors">
                  <Instagram size={20} className="text-slate-600 hover:text-pink-500" />
                </a>
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
              placeholder="اسمك الكامل" 
              required 
              value={contactForm.name} 
              onChange={e => setContactForm({...contactForm, name: e.target.value})} 
            />
            <input 
              type="email" 
              className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100" 
              placeholder="البريد الإلكتروني" 
              required 
              value={contactForm.email} 
              onChange={e => setContactForm({...contactForm, email: e.target.value})} 
            />
            <textarea 
              className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-4 focus:ring-blue-100 h-40 resize-none" 
              placeholder="اكتب رسالتك هنا..." 
              required 
              value={contactForm.message} 
              onChange={e => setContactForm({...contactForm, message: e.target.value})}
            ></textarea>
            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              إرسال الرسالة
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 text-center">
              سنرد على رسالتك في أقرب وقت ممكن. شكراً لتواصلك معنا!
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <button 
          onClick={resetToHome} 
          className="text-slate-400 font-bold hover:text-blue-600 flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          <ArrowLeft size={16} /> 
          العودة للرئيسية
        </button>
      </div>
    </div>
  );

  // --- مكونات لوحة التحكم ---
  const AdminTabContent = () => {
    switch(activeAdminTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-bold">عمليات البحث</p>
                    <h3 className="text-2xl font-black text-slate-900">{realSearchCount.toLocaleString()}</h3>
                  </div>
                  <Activity className="text-blue-500" size={24} />
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-bold">المشتركين</p>
                    <h3 className="text-2xl font-black text-slate-900">{subscribersList.length}</h3>
                  </div>
                  <Users className="text-green-500" size={24} />
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-bold">الرسائل</p>
                    <h3 className="text-2xl font-black text-slate-900">{inboxMessages.length}</h3>
                  </div>
                  <MessageCircle className="text-purple-500" size={24} />
                </div>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-bold">المتاجر</p>
                    <h3 className="text-2xl font-black text-slate-900">{adminConfig.affiliateLinks?.length || 0}</h3>
                  </div>
                  <Store className="text-orange-500" size={24} />
                </div>
              </div>
            </div>

            {/* إدارة صفحات الموقع */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4">إدارة صفحات الموقع</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setView('privacy')}
                  className="bg-slate-50 p-4 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-3"
                >
                  <Lock className="text-blue-600" size={20} />
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{t.privacy}</div>
                    <div className="text-xs text-slate-500">إدارة سياسة الخصوصية</div>
                  </div>
                </button>
                <button 
                  onClick={() => setView('contact')}
                  className="bg-slate-50 p-4 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-3"
                >
                  <MessageSquare className="text-green-600" size={20} />
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{t.contact}</div>
                    <div className="text-xs text-slate-500">إدارة صفحة التواصل</div>
                  </div>
                </button>
                <button 
                  onClick={() => setView('merchant')}
                  className="bg-slate-50 p-4 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-3"
                >
                  <Store className="text-orange-600" size={20} />
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{t.merchant}</div>
                    <div className="text-xs text-slate-500">صفحة الشركاء</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-6">إدارة معلومات التواصل</h3>
              
              <div className="space-y-4">
                {/* البريد الإلكتروني */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني للدعم</label>
                  <input 
                    type="email" 
                    value={adminConfig.supportEmail}
                    onChange={(e) => setAdminConfig({...adminConfig, supportEmail: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-300"
                    placeholder="support@moqaren.com"
                  />
                </div>

                {/* رقم الواتساب */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رقم الواتساب</label>
                  <input 
                    type="text" 
                    value={adminConfig.whatsappNumber}
                    onChange={(e) => setAdminConfig({...adminConfig, whatsappNumber: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-300"
                    placeholder="+966500000000"
                  />
                </div>

                {/* روابط السوشيال ميديا */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">تويتر</label>
                    <input 
                      type="text" 
                      value={adminConfig.twitterLink}
                      onChange={(e) => setAdminConfig({...adminConfig, twitterLink: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300"
                      placeholder="https://twitter.com/moqaren"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">إنستقرام</label>
                    <input 
                      type="text" 
                      value={adminConfig.instagramLink}
                      onChange={(e) => setAdminConfig({...adminConfig, instagramLink: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300"
                      placeholder="https://instagram.com/moqaren"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">فيسبوك</label>
                    <input 
                      type="text" 
                      value={adminConfig.facebookLink}
                      onChange={(e) => setAdminConfig({...adminConfig, facebookLink: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300"
                      placeholder="https://facebook.com/moqaren"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">تيك توك</label>
                    <input 
                      type="text" 
                      value={adminConfig.tiktokLink}
                      onChange={(e) => setAdminConfig({...adminConfig, tiktokLink: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300"
                      placeholder="https://tiktok.com/@moqaren"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">يوتيوب</label>
                    <input 
                      type="text" 
                      value={adminConfig.youtubeLink}
                      onChange={(e) => setAdminConfig({...adminConfig, youtubeLink: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-300"
                      placeholder="https://youtube.com/@moqaren"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button 
                    onClick={handleSaveAllChanges}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'marketing':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-6">{t.marketing}</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">فرز المشتركين حسب الاهتمام</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="اكتب كلمة للفلترة (مثل: آيفون، سوني)" 
                          className="w-full p-3 pl-10 rounded-xl border border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 font-bold"
                          value={marketingFilter}
                          onChange={(e) => setMarketingFilter(e.target.value)}
                        />
                        <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 h-64 overflow-y-auto p-4">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                      <span className="text-sm font-bold text-slate-600">{t.subscribers}</span>
                      <span className="text-xs font-black bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                        {filteredSubscribers.length} مشترك
                      </span>
                    </div>
                    {filteredSubscribers.length > 0 ? (
                      filteredSubscribers.map((sub, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 hover:bg-white rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full">
                              <UserCheck size={14} className="text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-700" dir="ltr">{sub.email}</p>
                              {sub.interests && sub.interests.length > 0 && (
                                <p className="text-xs text-slate-500">مهتم بـ: {sub.interests.slice(-2).join(', ')}</p>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-slate-400">
                            {new Date(sub.joined_at).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <Filter size={32} className="mb-2 opacity-50" />
                        <p className="text-sm font-bold">لا يوجد مشتركين مطابقين</p>
                      </div>
                    )}
                  </div>
                </div>

               
