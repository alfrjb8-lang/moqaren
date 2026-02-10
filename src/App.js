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
  Brain, Hexagon, Key, Target, MailCheck, Users2, BellRing, ChartBar
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, increment, updateDoc, addDoc, deleteDoc, getDocs, arrayUnion, query, where, getDoc } from 'firebase/firestore';
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
    swipeHint: 'اسحب لليمين ←',
    
    // New Email Campaigns
    emailCampaigns: 'الحملات الإيميلية',
    createCampaign: 'إنشاء حملة جديدة',
    campaignName: 'اسم الحملة',
    campaignSubject: 'عنوان الرسالة',
    campaignContent: 'محتوى الرسالة',
    targetAudience: 'الفئة المستهدفة',
    allSubscribers: 'جميع المشتركين',
    filterByInterests: 'فلترة حسب الاهتمامات',
    interestsPlaceholder: 'اكتب اهتمامات (مثال: آيفون, سامسونج, لابتوب)',
    scheduleSend: 'جدولة الإرسال',
    sendNow: 'إرسال الآن',
    sendLater: 'إرسال لاحقاً',
    scheduledFor: 'مجدول للإرسال في',
    campaignStatus: 'حالة الحملة',
    draft: 'مسودة',
    scheduled: 'مجدول',
    sent: 'تم الإرسال',
    stats: 'إحصائيات',
    totalSubscribers: 'إجمالي المشتركين',
    activeSubscribers: 'مشتركين نشطين',
    campaignStats: 'إحصائيات الحملة',
    sentTo: 'مرسل إلى',
    opened: 'مفتوح',
    clicked: 'نقرات',
    conversion: 'تحويل',
    createNewCampaign: 'إنشاء حملة جديدة',
    editCampaign: 'تعديل الحملة',
    deleteCampaign: 'حذف الحملة',
    sendTestEmail: 'إرسال بريد تجريبي',
    testEmailSent: 'تم إرسال البريد التجريبي',
    campaignSaved: 'تم حفظ الحملة',
    campaignSent: 'تم إرسال الحملة',
    subscribersList: 'قائمة المشتركين',
    email: 'الإيميل',
    subscribedDate: 'تاريخ الاشتراك',
    lastActivity: 'آخر نشاط',
    interests: 'الاهتمامات',
    status: 'الحالة',
    active: 'نشط',
    inactive: 'غير نشط',
    exportSubscribers: 'تصدير المشتركين',
    importSubscribers: 'استيراد المشتركين',
    template: 'قالب',
    preview: 'معاينة'
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
    swipeHint: 'Swipe right →',
    
    // New Email Campaigns
    emailCampaigns: 'Email Campaigns',
    createCampaign: 'Create New Campaign',
    campaignName: 'Campaign Name',
    campaignSubject: 'Email Subject',
    campaignContent: 'Email Content',
    targetAudience: 'Target Audience',
    allSubscribers: 'All Subscribers',
    filterByInterests: 'Filter by Interests',
    interestsPlaceholder: 'Enter interests (e.g., iPhone, Samsung, Laptop)',
    scheduleSend: 'Schedule Send',
    sendNow: 'Send Now',
    sendLater: 'Send Later',
    scheduledFor: 'Scheduled for',
    campaignStatus: 'Campaign Status',
    draft: 'Draft',
    scheduled: 'Scheduled',
    sent: 'Sent',
    stats: 'Statistics',
    totalSubscribers: 'Total Subscribers',
    activeSubscribers: 'Active Subscribers',
    campaignStats: 'Campaign Stats',
    sentTo: 'Sent to',
    opened: 'Opened',
    clicked: 'Clicks',
    conversion: 'Conversion',
    createNewCampaign: 'Create New Campaign',
    editCampaign: 'Edit Campaign',
    deleteCampaign: 'Delete Campaign',
    sendTestEmail: 'Send Test Email',
    testEmailSent: 'Test email sent',
    campaignSaved: 'Campaign saved',
    campaignSent: 'Campaign sent',
    subscribersList: 'Subscribers List',
    email: 'Email',
    subscribedDate: 'Subscribed Date',
    lastActivity: 'Last Activity',
    interests: 'Interests',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    exportSubscribers: 'Export Subscribers',
    importSubscribers: 'Import Subscribers',
    template: 'Template',
    preview: 'Preview'
  }
};

// ============================
// 4. المفاتيح السرية والإعدادات
// ============================
const ADMIN_UID = process.env.REACT_APP_ADMIN_ID; 

// --- إعدادات Firebase من البيئة ---
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
// 6. مكون SEOHead (للتحكم في SEO)
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
// 7. مكون SchemaMarkup (لتحسين SEO)
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
  const [marketingFilter, setMarketingFilter] = useState('');
  const [marketingSubject, setMarketingSubject] = useState('');
  const [marketingBody, setMarketingBody] = useState('');
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

  // الحالات الخاصة بالحملات الإيميلية
  const [emailCampaigns, setEmailCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [targetInterests, setTargetInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [campaignStatus, setCampaignStatus] = useState('draft');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [testEmail, setTestEmail] = useState('');
  
  // متغيرات الإعدادات الأخرى
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreLink, setNewStoreLink] = useState('');
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newOfferKeyword, setNewOfferKeyword] = useState('');
  const [newOfferMessage, setNewOfferMessage] = useState('');
  const [newOfferLink, setNewOfferLink] = useState('');
  const [newTrendingKeyword, setNewTrendingKeyword] = useState('');
  
  // الحالات الجديدة لإضافة متاجر جديدة
  const [newStoreApiName, setNewStoreApiName] = useState('');
  const [newStoreApiKey, setNewStoreApiKey] = useState('');
  const [newStoreApiSecret, setNewStoreApiSecret] = useState('');
  const [newStoreApiUrl, setNewStoreApiUrl] = useState('');

  const [merchantForm, setMerchantForm] = useState({ store: '', email: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // ============================
  // 8.2 الإعدادات الافتراضية للإدارة - محدثة
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
    
    // === القسم 1: إعدادات الذكاء الاصطناعي ===
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
    
    // === القسم 2: مفاتيح المتاجر ===
    storeApiKeys: {
      amazon: {
        accessKey: '',
        secretKey: '',
        tagId: '',
        region: 'sa',
        enabled: true
      },
      noon: {
        apiKey: '',
        secretKey: '',
        partnerId: '',
        enabled: true
      },
      jarir: {
        apiKey: '',
        storeId: '',
        enabled: true
      },
      xcite: {
        apiKey: '',
        affiliateId: '',
        enabled: true
      },
      extra: {
        apiKey: '',
        enabled: true
      },
      // متاجر مخصصة يمكن إضافتها
      customStores: []
    },
    
    // === القسم 3: الإعدادات العامة ===
    apiSettings: {
      useRealData: true,
      fallbackToMock: true,
      cacheDuration: 3600,
      maxProducts: 20,
      currency: 'SAR'
    },
    
    // === القسم 4: إعدادات البريد الإلكتروني ===
    emailSettings: {
      smtpServer: '',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      fromName: 'مقارن',
      fromEmail: 'noreply@moqaren.com',
      replyTo: 'support@moqaren.com'
    }
  };

  const [adminConfig, setAdminConfig] = useState(defaultAdminConfig);
  const t = translations[lang];

  // ============================
  // 9. الدوال المساعدة
  // ============================
  
  // 9.1 عرض الإشعارات
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // 9.2 تبديل اللغة
  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // 9.3 إضافة/حذف المفضلة
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

  // 9.4 التحقق من المفضلة
  const isFavorite = (item) => {
    return myFavorites.some(fav => fav.store === item.store && fav.price === item.price);
  };
  
  // 9.5 الحصول على رابط المتجر
  const getStoreLink = (key) => { 
    const store = adminConfig.affiliateLinks?.find(s => s.name === key); 
    return store ? store.link : "#"; 
  };

  // 9.6 مشاركة المنتج
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

  // 9.7 إضافة إلى سجل البحث
  const addToHistory = (term) => {
    setMySearchHistory(prev => {
        const filtered = prev.filter(t => t !== term);
        return [term, ...filtered].slice(0, 10);
    });
  };
  
  // 9.8 إضافة اهتمام إلى قائمة الاهتمامات المستهدفة
  const addInterest = () => {
    if (newInterest.trim() && !targetInterests.includes(newInterest.trim().toLowerCase())) {
      setTargetInterests([...targetInterests, newInterest.trim().toLowerCase()]);
      setNewInterest('');
    }
  };
  
  // 9.9 إزالة اهتمام من القائمة
  const removeInterest = (index) => {
    setTargetInterests(targetInterests.filter((_, i) => i !== index));
  };
  
  // 9.10 حساب عدد المشتركين المستهدفين
  const calculateTargetCount = () => {
    if (targetAudience === 'all') {
      return subscribersList.length;
    } else if (targetAudience === 'filtered' && targetInterests.length > 0) {
      return subscribersList.filter(sub => {
        if (!sub.interests) return false;
        return targetInterests.some(interest => 
          sub.interests.some(subInterest => 
            subInterest.toLowerCase().includes(interest.toLowerCase())
          )
        );
      }).length;
    }
    return 0;
  };

  // ============================
  // 10. useEffect Hooks
  // ============================
  
  // 10.1 تأثير السحب للنتائج في الجوال
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

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

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

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
      isDown = false;
    });

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

  // 10.2 المصادقة الذكية
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

  // 10.3 إدارة النوافذ المنبثقة
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

  // 10.4 جلب الإعدادات والبيانات
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

  // 10.5 العداد الحقيقي
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

  // 10.6 جلب بيانات لوحة التحكم
  useEffect(() => {
    if (!isAdminAuthenticated) return;
    
    // جلب الحملات الإيميلية
    const campaignsRef = collection(db, 'artifacts', appId, 'public', 'data', 'email_campaigns');
    const unsubCampaigns = onSnapshot(campaignsRef, (snapshot) => {
      const campaigns = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      campaigns.sort((a, b) => new Date(b.createdAt || b.scheduledFor || 0) - new Date(a.createdAt || a.scheduledFor || 0));
      setEmailCampaigns(campaigns);
    }, (error) => console.log('Campaigns error', error));
    
    // جلب رسائل الواردة
    const inboxRef = collection(db, 'artifacts', appId, 'public', 'data', 'inbox');
    const unsubInbox = onSnapshot(inboxRef, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      msgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setInboxMessages(msgs);
    }, (error) => console.log('Inbox error', error));
    
    // جلب إحصائيات البحث
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

    // جلب سجلات البحث
    const logsRef = collection(db, 'artifacts', appId, 'public', 'data', 'search_logs');
    const unsubLogs = onSnapshot(logsRef, (snapshot) => {
        let logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setSearchLogs(logs.slice(0, 50));
    }, (error) => console.log('Logs error', error));

    // جلب الإحصائيات الشهرية
    const monthlyRef = collection(db, 'artifacts', appId, 'public', 'data', 'analytics_monthly');
    const unsubMonthly = onSnapshot(monthlyRef, (snapshot) => {
        const stats = snapshot.docs.map(doc => ({ month: doc.id, ...doc.data() }));
        stats.sort((a, b) => a.month.localeCompare(b.month));
        setMonthlyStats(stats);
    }, (error) => console.log('Monthly stats error', error));

    // جلب المشتركين
    const subRef = collection(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers');
    const unsubSubscribers = onSnapshot(subRef, (snapshot) => {
        const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscribersList(subs);
    }, (error) => console.log('Subscribers error', error));

    return () => { 
      unsubCampaigns();
      unsubInbox(); 
      unsubLogs(); 
      unsubMonthly(); 
      unsubSubscribers(); 
    };
  }, [isAdminAuthenticated]);

  // ============================
  // 11. وظائف الحملات الإيميلية
  // ============================
  
  // 11.1 إنشاء حملة جديدة
  const handleCreateCampaign = async () => {
    if (!campaignName || !campaignSubject || !campaignContent) {
      showNotification('يرجى تعبئة جميع الحقول المطلوبة', 'error');
      return;
    }
    
    const targetCount = calculateTargetCount();
    if (targetCount === 0) {
      showNotification('لا يوجد مشتركين مستهدفين للحملة', 'error');
      return;
    }
    
    try {
      const campaignData = {
        name: campaignName,
        subject: campaignSubject,
        content: campaignContent,
        targetAudience,
        targetInterests: targetInterests,
        targetCount,
        status: campaignStatus,
        createdAt: new Date().toISOString(),
        createdBy: user.email || 'admin'
      };
      
      // إذا كان هناك جدولة
      if (scheduleDate && scheduleTime && campaignStatus === 'scheduled') {
        const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
        campaignData.scheduledFor = scheduledDateTime.toISOString();
      }
      
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'email_campaigns'), campaignData);
      
      showNotification(t.campaignSaved, 'success');
      
      // إعادة تعيين الحقول
      setCampaignName('');
      setCampaignSubject('');
      setCampaignContent('');
      setTargetAudience('all');
      setTargetInterests([]);
      setScheduleDate('');
      setScheduleTime('');
      setCampaignStatus('draft');
    } catch (error) {
      console.error('Error creating campaign:', error);
      showNotification('حدث خطأ أثناء إنشاء الحملة', 'error');
    }
  };
  
  // 11.2 إرسال حملة
  const handleSendCampaign = async (campaignId) => {
    try {
      const campaignRef = doc(db, 'artifacts', appId, 'public', 'data', 'email_campaigns', campaignId);
      await updateDoc(campaignRef, {
        status: 'sent',
        sentAt: new Date().toISOString(),
        sentTo: calculateTargetCount()
      });
      
      showNotification(t.campaignSent, 'success');
      
      // هنا يمكنك إضافة كود إرسال البريد الفعلي
      // باستخدام خدمة البريد مثل SendGrid أو AWS SES
      
    } catch (error) {
      console.error('Error sending campaign:', error);
      showNotification('حدث خطأ أثناء إرسال الحملة', 'error');
    }
  };
  
  // 11.3 حذف حملة
  const handleDeleteCampaign = async (campaignId) => {
    if (!confirm('هل أنت متأكد من حذف هذه الحملة؟')) return;
    
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'email_campaigns', campaignId));
      showNotification('تم حذف الحملة', 'success');
    } catch (error) {
      console.error('Error deleting campaign:', error);
      showNotification('حدث خطأ أثناء حذف الحملة', 'error');
    }
  };
  
  // 11.4 إرسال بريد تجريبي
  const handleSendTestEmail = async () => {
    if (!testEmail) {
      showNotification('يرجى إدخال بريد إلكتروني تجريبي', 'error');
      return;
    }
    
    // هنا يمكنك إضافة كود إرسال البريد التجريبي
    showNotification(t.testEmailSent, 'success');
    setTestEmail('');
  };
  
  // 11.5 تصدير قائمة المشتركين
  const handleExportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email,Subscribed Date,Last Activity,Interests,Status"]
      .concat(subscribersList.map(sub => 
        `"${sub.email}","${sub.joined_at || ''}","${sub.last_search || ''}","${sub.interests ? sub.interests.join(', ') : ''}","${sub.status || 'active'}"`
      ))
      .join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `moqaren_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('تم تصدير قائمة المشتركين', 'success');
  };
  
  // 11.6 إلغاء اشتراك مستخدم
  const handleUnsubscribe = async (subscriberId) => {
    if (!confirm('هل أنت متأكد من إلغاء اشتراك هذا المستخدم؟')) return;
    
    try {
      const subRef = doc(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers', subscriberId);
      await updateDoc(subRef, {
        status: 'inactive',
        unsubscribedAt: new Date().toISOString()
      });
      showNotification('تم إلغاء الاشتراك', 'success');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      showNotification('حدث خطأ أثناء إلغاء الاشتراك', 'error');
    }
  };

  // ============================
  // 12. وظائف التسويق والاشتراكات
  // ============================
  
  // 12.1 الاشتراك في النشرة البريدية
  const handleSubscribe = async (e) => {
      e.preventDefault();
      if (!promoEmail || !user) return;
      
      const email = promoEmail.toLowerCase();
      try {
          const subDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'newsletter_subscribers', email);
          await setDoc(subDocRef, {
              email: email,
              joined_at: new Date().toISOString(),
              interests: searchQuery ? [searchQuery.toLowerCase()] : [],
              status: 'active'
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

  // 12.2 تتبع كلمات البحث
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

  // 12.3 زيادة عداد البحث العام
  const incrementGlobalCounter = async () => {
      if (!user) return;
      const statsRef = doc(db, 'artifacts', appId, 'public', 'data', 'stats', 'global_counts');
      try { 
        await setDoc(statsRef, { total_searches: increment(1) }, { merge: true }); 
      } catch (error) { }
  };

  // ============================
  // 13. وظائف الإدارة والتحكم
  // ============================
  
  // 13.1 حفظ جميع التغييرات
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

  // 13.2 العودة للرئيسية
  const resetToHome = () => {
    setView('home');
    setResults(null);
    setSearchQuery('');
    setAiSummary(null);
    setShowExclusiveToast(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 13.3 التمرير للقسم المحدد
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

  // 13.4 النقر على الشعار (للوصول للإدارة)
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

  // 13.5 تسجيل دخول المدير
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
  
  // 13.6 تسجيل خروج
  const handleLogout = async () => {
      await signOut(auth);
      setIsAdminAuthenticated(false);
      setView('home');
      showNotification('تم الخروج بنجاح');
  };

  // 13.7 حذف الرسالة
  const handleDeleteMessage = async (msgId) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try { 
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inbox', msgId)); 
      showNotification("تم حذف الرسالة"); 
    } catch (err) { }
  };

  // 13.8 إضافة متجر جديد للروابط
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

  // 13.9 حذف متجر من الروابط
  const handleDeleteStore = (i) => { 
    const u = [...adminConfig.affiliateLinks]; 
    u.splice(i, 1); 
    setAdminConfig({ ...adminConfig, affiliateLinks: u }); 
    showNotification('تم حذف رابط المتجر');
  };

  // 13.10 إضافة عرض خاص
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

  // 13.11 حذف عرض
  const handleDeleteOffer = (i) => { 
    const u = [...adminConfig.exclusiveOffers]; 
    u.splice(i, 1); 
    setAdminConfig({ ...adminConfig, exclusiveOffers: u }); 
    showNotification('تم حذف العرض الخاص');
  };

  // 13.12 إضافة كلمة رائجة
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

  // 13.13 حذف كلمة رائجة
  const handleDeleteTrendingKeyword = (index) => { 
    const updated = [...(adminConfig.trendingKeywords || [])]; 
    updated.splice(index, 1); 
    setAdminConfig({ ...adminConfig, trendingKeywords: updated }); 
    showNotification('تم حذف الكلمة الرائجة');
  };

  // 13.14 إضافة متجر جديد مع API
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
      showNotification(`تم إضافة متجر ${newStoreApiName} بنجاح! سيتم استخدامه في البحث`);
    } else {
      showNotification('يرجى إدخال اسم المتجر ومفتاح API على الأقل', 'error');
    }
  };

  // 13.15 حذف متجر مخصص
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

  // 13.16 تفعيل/تعطيل متجر
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
  // 14. وظيفة الذكاء الاصطناعي (Gemini)
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
    
    // بناء الـ Prompt المتقدم حسب الميزات المختارة
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
  // 15. وظيفة البحث الرئيسية
  // ============================
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearching(true);
    setResults(null);
    setAiSummary(null);
    setShowExclusiveToast(false);
    setCurrentOffer(null);
    
    // تحديث الإحصائيات
    incrementGlobalCounter();
    trackSearchTerm(searchQuery);
    addToHistory(searchQuery);

    // 1. تحقق من إعدادات النظام
    const useRealData = adminConfig.apiSettings?.useRealData !== false;
    const fallbackToMock = adminConfig.apiSettings?.fallbackToMock !== false;
    
    try {
      let searchResults = [];
      let isRealData = false;
      
      // 2. محاولة البحث في APIs الحقيقية
      if (useRealData) {
        searchResults = await searchWithRealAPIs(searchQuery);
        if (searchResults.length > 0) {
          isRealData = true;
        }
      }
      
      // 3. إذا لم توجد نتائج حقيقية، استخدم البيانات الوهمية
      if (searchResults.length === 0 && fallbackToMock) {
        searchResults = getMockResults(searchQuery);
        isRealData = false;
      }
      
      // 4. إضافة علامة مصدر البيانات
      searchResults = searchResults.map(item => ({
        ...item,
        isRealData: isRealData
      }));
      
      // 5. استدعاء الذكاء الاصطناعي
      const aiResponse = await callGeminiAI(searchQuery, searchResults);
      setResults(searchResults);
      setAiSummary(aiResponse);
      
      // 6. التحقق من العروض الخاصة
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
      
      // استخدام بيانات وهمية
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

  // البحث باستخدام APIs الحقيقية
  const searchWithRealAPIs = async (query) => {
    const searchPromises = [];
    const results = [];
    
    // البحث في Amazon (إذا كان هناك مفتاح ومفعل)
    if (adminConfig.storeApiKeys?.amazon?.accessKey && adminConfig.storeApiKeys?.amazon?.enabled !== false) {
      try {
        const amazonResults = await searchAmazonAPI(query);
        results.push(...amazonResults);
      } catch (error) {
        console.error("Amazon API error:", error);
      }
    }
    
    // البحث في Noon (إذا كان هناك مفتاح ومفعل)
    if (adminConfig.storeApiKeys?.noon?.apiKey && adminConfig.storeApiKeys?.noon?.enabled !== false) {
      try {
        const noonResults = await searchNoonAPI(query);
        results.push(...noonResults);
      } catch (error) {
        console.error("Noon API error:", error);
      }
    }
    
    // البحث في المتاجر المخصصة (إذا كانت هناك متاجر مضافة)
    if (adminConfig.storeApiKeys?.customStores && adminConfig.storeApiKeys.customStores.length > 0) {
      for (const store of adminConfig.storeApiKeys.customStores) {
        if (store.enabled && store.apiKey) {
          try {
            const customResults = await searchCustomAPI(query, store);
            results.push(...customResults);
          } catch (error) {
            console.error(`Custom store API error (${store.name}):`, error);
          }
        }
      }
    }
    
    return results;
  };

  // البحث في Amazon API
  const searchAmazonAPI = async (query) => {
    // هذا مثال - ستحتاج إلى تطبيق API حقيقي
    try {
      // محاكاة استجابة API
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
    } catch (error) {
      return [];
    }
  };

  // البحث في Noon API
  const searchNoonAPI = async (query) => {
    // هذا مثال - ستحتاج إلى تطبيق API حقيقي
    try {
      // محاكاة استجابة API
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
    } catch (error) {
      return [];
    }
  };

  // البحث في API مخصص لمتجر جديد
  const searchCustomAPI = async (query, store) => {
    try {
      // محاكاة استجابة API للمتاجر المخصصة
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
    } catch (error) {
      console.error(`Custom store API error (${store.name}):`, error);
      return [];
    }
  };

  // دالة للحصول على لون عشوائي للمتجر
  const getRandomStoreColor = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // دالة للحصول على توصيل عشوائي
  const getRandomDelivery = () => {
    const deliveries = [t.freeShipping, t.fastShipping, 'توصيل خلال 48 ساعة', 'توصيل مجاني مع الشحن السريع'];
    return deliveries[Math.floor(Math.random() * deliveries.length)];
  };

  // دالة للحصول على ضمان عشوائي
  const getRandomWarranty = () => {
    const warranties = [t.agentWarranty, t.storeWarranty, 'سنة واحدة مع إمكانية التمديد', '6 أشهر ضمان متجر'];
    return warranties[Math.floor(Math.random() * warranties.length)];
  };

  // البيانات الوهمية كبديل
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
  // 16. حساب المشتركين المفلترين
  // ============================
  const filteredSubscribers = subscribersList.filter(sub => {
      if (!marketingFilter) return true;
      const keywords = marketingFilter.toLowerCase().split(' ');
      return sub.interests && sub.interests.some(interest => 
          keywords.some(keyword => interest.toLowerCase().includes(keyword))
      );
  });

  // ============================
  // 17. الواجهة الرئيسية (Home View)
  // ============================
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 17.1 مكونات SEO */}
      <SEOHead 
        title={view === 'home' && !results ? t.siteTitle : `${searchQuery ? searchQuery + ' | ' : ''} ${t.siteTitle}`} 
        description={t.siteDesc} 
        keywords={t.keywords}
        lang={lang}
      />
      <SchemaMarkup />

      {/* 17.2 الإشعارات */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 ${notification.type === 'error' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white border-green-100 text-green-700'}`}>
            {notification.type === 'error' ? <AlertCircle size={24} /> : <CheckCircle size={24} className="text-green-500" />}
            <span className="font-black text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* 17.3 نافذة الاشتراك */}
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

      {/* 17.4 زر فتح لوحة المساحة الشخصية */}
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

      {/* 17.5 لوحة المساحة الشخصية */}
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

      {/* 17.6 زر تبديل اللغة */}
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

      {/* 17.7 إشعار العرض الخاص */}
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

      {/* 17.8 شريط التنقل */}
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

      {/* ============================ */}
      {/* 18. الواجهة الرئيسية (Home View) */}
      {/* ============================ */}
      {view === 'home' && (
        <>
          {/* 18.1 قسم الهيرو */}
          <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-900 text-white pt-40 pb-32 px-4 relative overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl">
            
            {/* خلفيات متحركة */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            {/* أنماط خلفية */}
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

            {/* أيقونات خلفية */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <Hexagon size={64} className="text-blue-300/10 absolute top-[10%] left-[5%] animate-spin-slow blur-sm" />
                <Cpu size={48} className="text-indigo-300/10 absolute bottom-[20%] right-[10%] animate-bounce-slow blur-sm" />
                <Database size={32} className="text-blue-400/10 absolute top-[30%] right-[25%] animate-pulse blur-sm" />
                <Brain size={80} className="text-indigo-500/5 absolute bottom-[10%] left-[20%] animate-pulse blur-xl rotate-12" />
            </div>

            {/* محتوى الهيرو */}
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs font-black mb-8 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                <span>{realSearchCount.toLocaleString()} {t.realSearch}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl text-white tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">{t.heroTitlePart1} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">{t.heroTitlePart2}</span></h1>
              <p className="text-blue-100 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">{t.heroDesc}</p>
              
              {/* نموذج البحث */}
              <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-[2.5rem] group-hover:bg-blue-400/30 transition-all duration-500"></div>
                <input type="text" placeholder={t.searchPlaceholder} className="w-full py-6 md:py-8 px-16 rounded-[2.5rem] text-slate-900 shadow-2xl text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all font-bold border-none relative z-10 placeholder:text-slate-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Search className={`absolute ${lang === 'ar' ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 text-slate-400 z-20`} size={28} />
                <button type="submit" disabled={isSearching} className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[2rem] font-black transition-all flex items-center gap-2 disabled:bg-slate-400 shadow-xl active:scale-95 z-20 text-sm md:text-base group-hover:shadow-blue-500/50`}>
                  {isSearching ? <span className="animate-pulse">{t.analyzing}</span> : <>{t.searchBtn} <Rocket size={18} /></>}
                </button>
              </form>
              
              {/* الكلمات الرائجة */}
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

          {/* 18.2 المحتوى الرئيسية */}
          <main className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
            {/* حالة التحميل */}
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

            {/* عرض النتائج */}
            {results && !isSearching && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 mb-32">
                {/* ملخص الذكاء الاصطناعي */}
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
                
                {/* النتائج في الجوال - أفقية مع سحب */}
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
                              {/* مؤشر مصدر البيانات */}
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

            {/* المحتوى الثابت (عندما لا توجد نتائج) */}
            {!results && !isSearching && (
              <>
                {/* كيف يعمل مقارن */}
                <section id="about" className="mb-32 scroll-mt-32">
                  <div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t.howItWorksTitle}</h2><p className="text-slate-500 font-bold text-xl">ثلاث خطوات بسيطة.. وتوفر فلوسك</p></div>
                  <div className="grid md:grid-cols-3 gap-8">{[{ icon: MousePointer2, title: t.step1Title, desc: t.step1Desc, color: 'blue' }, { icon: Cpu, title: t.step2Title, desc: t.step2Desc, color: 'indigo' }, { icon: Rocket, title: t.step3Title, desc: t.step3Desc, color: 'green' }].map((item, i) => (<div key={i} className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-all text-center group"><div className={`bg-${item.color}-50 text-${item.color}-600 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}><item.icon size={48} /></div><h3 className="text-2xl font-black mb-4 text-slate-900">{item.title}</h3><p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p></div>))}</div>
                </section>
                
                {/* كيف نربح */}
                <section id="how-we-earn" className="bg-slate-900 rounded-[3rem] p-10 md:p-24 text-white text-center shadow-2xl mb-32 scroll-mt-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div><div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">{t.earnTitle}</h2><p className="text-blue-100 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed mb-16 relative z-10 font-medium">{t.earnDesc}</p>
                    <div className="flex flex-wrap justify-center gap-6 relative z-10 font-black"><div className="bg-white/10 px-10 py-6 rounded-[2rem] backdrop-blur-md border border-white/10 flex items-center gap-3 hover:bg-white/20 transition-colors"><CheckCircle size={24} className="text-green-400" /> {t.neutrality}</div><div className="bg-white/10 px-10 py-6 rounded-[2rem] backdrop-blur-md border border-white/10 flex items-center gap-3 hover:bg-white/20 transition-colors"><CheckCircle size={24} className="text-green-400" /> {t.noExtraCost}</div></div>
                </section>
                
                {/* لماذا تثق فينا */}
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
      {/* 19. لوحة الإدارة (Admin View) */}
      {/* ============================ */}
      {view === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 py-32 animate-in fade-in">
          {!isAdminAuthenticated ? (
            // 19.1 واجهة تسجيل دخول المدير
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
            // 19.2 لوحة التحكم الرئيسية
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
              
              {/* تبطيقات الإدارة */}
              <div className="mb-8">
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
                  <button 
                    onClick={() => setActiveTab('campaigns')} 
                    className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'campaigns' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <MailCheck size={16} /> {t.emailCampaigns}
                  </button>
                  <button 
                    onClick={() => setActiveTab('subscribers')} 
                    className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'subscribers' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Users2 size={16} /> {t.subscribersList}
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')} 
                    className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'settings' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Settings size={16} /> الإعدادات
                  </button>
                </div>
              </div>

              {/* ==================== */}
              {/* 19.3 قسم الحملات الإيميلية */}
              {/* ==================== */}
              {activeTab === 'campaigns' && (
                <div className="space-y-8">
                  {/* إحصائيات المشتركين */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-blue-800 font-bold text-sm mb-1">{t.totalSubscribers}</h3>
                          <p className="text-3xl font-black text-blue-900">{subscribersList.length}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <Users2 className="text-blue-600" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-green-800 font-bold text-sm mb-1">{t.activeSubscribers}</h3>
                          <p className="text-3xl font-black text-green-900">{subscribersList.filter(s => s.status !== 'inactive').length}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl">
                          <ChartBar className="text-green-600" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-purple-800 font-bold text-sm mb-1">الحملات النشطة</h3>
                          <p className="text-3xl font-black text-purple-900">{emailCampaigns.filter(c => c.status === 'scheduled' || c.status === 'draft').length}</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <BellRing className="text-purple-600" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* إنشاء حملة جديدة */}
                  <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-[2rem] p-8">
                    <h3 className="font-black text-slate-900 border-b pb-4 mb-6 flex items-center gap-2">
                      <Plus className="text-blue-600" />
                      {t.createNewCampaign}
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-bold text-slate-700 mb-2 block">{t.campaignName}</label>
                          <input 
                            type="text" 
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="w-full p-4 rounded-xl bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                            placeholder="مثال: عرض خاص على الهواتف الذكية"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-bold text-slate-700 mb-2 block">{t.campaignSubject}</label>
                          <input 
                            type="text" 
                            value={campaignSubject}
                            onChange={(e) => setCampaignSubject(e.target.value)}
                            className="w-full p-4 rounded-xl bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                            placeholder="عرض خاص لا تفوته! خصم 20% على الهواتف"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">{t.targetAudience}</label>
                        <div className="flex gap-4 mb-4">
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="targetAudience" 
                              value="all" 
                              checked={targetAudience === 'all'}
                              onChange={(e) => setTargetAudience(e.target.value)}
                              className="text-blue-600"
                            />
                            <span>{t.allSubscribers} ({subscribersList.length})</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="targetAudience" 
                              value="filtered" 
                              checked={targetAudience === 'filtered'}
                              onChange={(e) => setTargetAudience(e.target.value)}
                              className="text-blue-600"
                            />
                            <span>{t.filterByInterests}</span>
                          </label>
                        </div>
                        
                        {targetAudience === 'filtered' && (
                          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <label className="text-sm font-bold text-slate-700 mb-2 block">{t.interestsPlaceholder}</label>
                            <div className="flex gap-2 mb-3">
                              <input 
                                type="text" 
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                                className="flex-1 p-3 rounded-lg border border-blue-200"
                                placeholder="اكتب اهتماماً واضغط Enter"
                              />
                              <button 
                                onClick={addInterest}
                                className="bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                              >
                                إضافة
                              </button>
                            </div>
                            
                            {targetInterests.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {targetInterests.map((interest, index) => (
                                  <div key={index} className="bg-white px-3 py-2 rounded-lg border border-blue-200 flex items-center gap-2">
                                    <span className="text-sm font-bold text-blue-700">{interest}</span>
                                    <button 
                                      onClick={() => removeInterest(index)}
                                      className="text-red-400 hover:text-red-600"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-3 text-sm text-blue-600 font-bold">
                              سيتم إرسال الحملة إلى: {calculateTargetCount()} مشترك
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">{t.campaignContent}</label>
                        <textarea 
                          value={campaignContent}
                          onChange={(e) => setCampaignContent(e.target.value)}
                          rows={8}
                          className="w-full p-4 rounded-xl bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                          placeholder="اكتب محتوى الرسالة هنا... يمكنك استخدام HTML للتنسيق"
                        />
                        <div className="text-xs text-slate-500 mt-2">
                          يمكنك استخدام: {"{{name}}"} لاسم المشترك، {"{{interests}}"} لاهتماماته
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-bold text-slate-700 mb-2 block">{t.scheduleSend}</label>
                          <div className="flex gap-4 mb-4">
                            <label className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                name="sendOption" 
                                value="now" 
                                checked={campaignStatus === 'draft'}
                                onChange={() => setCampaignStatus('draft')}
                                className="text-blue-600"
                              />
                              <span>{t.sendNow}</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                name="sendOption" 
                                value="later" 
                                checked={campaignStatus === 'scheduled'}
                                onChange={() => setCampaignStatus('scheduled')}
                                className="text-blue-600"
                              />
                              <span>{t.sendLater}</span>
                            </label>
                          </div>
                          
                          {campaignStatus === 'scheduled' && (
                            <div className="grid grid-cols-2 gap-3">
                              <input 
                                type="date" 
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                className="p-3 rounded-lg border border-slate-300"
                              />
                              <input 
                                type="time" 
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                className="p-3 rounded-lg border border-slate-300"
                              />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-end">
                          <button 
                            onClick={handleCreateCampaign}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                          >
                            {campaignStatus === 'scheduled' ? t.scheduleSend : t.createCampaign}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* قائمة الحملات */}
                  <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8">
                    <h3 className="font-black text-slate-900 border-b pb-4 mb-6">الحملات السابقة والجدولة</h3>
                    
                    {emailCampaigns.length === 0 ? (
                      <div className="text-center py-12 text-slate-400 font-bold">لا توجد حملات بعد</div>
                    ) : (
                      <div className="space-y-4">
                        {emailCampaigns.map((campaign) => (
                          <div key={campaign.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-black text-lg text-slate-900 mb-1">{campaign.name}</h4>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${campaign.status === 'sent' ? 'bg-green-100 text-green-700' : campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {campaign.status === 'sent' ? t.sent : campaign.status === 'scheduled' ? t.scheduled : t.draft}
                                  </span>
                                  <span className="text-slate-500">الموضوع: {campaign.subject}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {campaign.status === 'draft' && (
                                  <button 
                                    onClick={() => handleSendCampaign(campaign.id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700"
                                  >
                                    {t.sendNow}
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleDeleteCampaign(campaign.id)}
                                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200"
                                >
                                  {t.deleteCampaign}
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="bg-slate-50 p-3 rounded-lg">
                                <div className="text-slate-500 font-bold mb-1">{t.sentTo}</div>
                                <div className="font-black text-slate-900">{campaign.targetCount || 0}</div>
                              </div>
                              <div className="bg-slate-50 p-3 rounded-lg">
                                <div className="text-slate-500 font-bold mb-1">تاريخ الإنشاء</div>
                                <div className="font-black text-slate-900">
                                  {new Date(campaign.createdAt).toLocaleDateString('ar-SA')}
                                </div>
                              </div>
                              {campaign.scheduledFor && (
                                <div className="bg-slate-50 p-3 rounded-lg">
                                  <div className="text-slate-500 font-bold mb-1">مجدول للإرسال</div>
                                  <div className="font-black text-slate-900">
                                    {new Date(campaign.scheduledFor).toLocaleDateString('ar-SA')}
                                  </div>
                                </div>
                              )}
                              {campaign.sentAt && (
                                <div className="bg-slate-50 p-3 rounded-lg">
                                  <div className="text-slate-500 font-bold mb-1">تاريخ الإرسال</div>
                                  <div className="font-black text-slate-900">
                                    {new Date(campaign.sentAt).toLocaleDateString('ar-SA')}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {campaign.targetInterests && campaign.targetInterests.length > 0 && (
                              <div className="mt-4">
                                <div className="text-slate-500 text-sm font-bold mb-2">الاهتمامات المستهدفة:</div>
                                <div className="flex flex-wrap gap-2">
                                  {campaign.targetInterests.map((interest, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ==================== */}
              {/* 19.4 قسم المشتركين */}
              {/* ==================== */}
              {activeTab === 'subscribers' && (
                <div className="space-y-8">
                  {/* إحصائيات المشتركين */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-blue-800 font-bold text-sm mb-1">إجمالي المشتركين</h3>
                          <p className="text-3xl font-black text-blue-900">{subscribersList.length}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <Users2 className="text-blue-600" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-green-800 font-bold text-sm mb-1">نشطين</h3>
                          <p className="text-3xl font-black text-green-900">{subscribersList.filter(s => s.status !== 'inactive').length}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl">
                          <Activity className="text-green-600" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-purple-800 font-bold text-sm mb-1">اهتمامات شائعة</h3>
                          <p className="text-3xl font-black text-purple-900">
                            {(() => {
                              const allInterests = subscribersList.flatMap(s => s.interests || []);
                              const interestCount = {};
                              allInterests.forEach(interest => {
                                interestCount[interest] = (interestCount[interest] || 0) + 1;
                              });
                              const sorted = Object.keys(interestCount).sort((a, b) => interestCount[b] - interestCount[a]);
                              return sorted.slice(0, 3).join(', ');
                            })()}
                          </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <Target className="text-purple-600" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-orange-800 font-bold text-sm mb-1">زيادة الشهر</h3>
                          <p className="text-3xl font-black text-orange-900">
                            {(() => {
                              const thisMonth = new Date().toISOString().slice(0, 7);
                              const monthSubs = subscribersList.filter(s => {
                                const subDate = s.joined_at ? new Date(s.joined_at).toISOString().slice(0, 7) : '';
                                return subDate === thisMonth;
                              }).length;
                              return `+${monthSubs}`;
                            })()}
                          </p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-xl">
                          <TrendingUp className="text-orange-600" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* أدوات المشتركين */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <h3 className="font-black text-lg text-slate-900">{t.subscribersList}</h3>
                      <div className="flex gap-3">
                        <button 
                          onClick={handleExportSubscribers}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <FileText size={16} /> {t.exportSubscribers}
                        </button>
                        <div className="relative">
                          <input 
                            type="email"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                            placeholder="بريد تجريبي"
                            className="p-2 rounded-lg border border-slate-300 text-sm"
                          />
                          <button 
                            onClick={handleSendTestEmail}
                            className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* فلترة المشتركين */}
                    <div className="mb-6">
                      <input 
                        type="text" 
                        value={marketingFilter}
                        onChange={(e) => setMarketingFilter(e.target.value)}
                        placeholder="فلترة حسب الاهتمامات (مثال: آيفون, لابتوب)"
                        className="w-full p-3 rounded-xl border border-slate-300"
                      />
                    </div>
                    
                    {/* قائمة المشتركين */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="text-right p-4 text-sm font-bold text-slate-700">{t.email}</th>
                            <th className="text-right p-4 text-sm font-bold text-slate-700">{t.subscribedDate}</th>
                            <th className="text-right p-4 text-sm font-bold text-slate-700">{t.lastActivity}</th>
                            <th className="text-right p-4 text-sm font-bold text-slate-700">{t.interests}</th>
                            <th className="text-right p-4 text-sm font-bold text-slate-700">{t.status}</th>
                            <th className="text-right p-4 text-sm font-bold text-slate-700">إجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSubscribers.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="text-center p-8 text-slate-400">
                                لا توجد نتائج مطابقة للفلتر
                              </td>
                            </tr>
                          ) : (
                            filteredSubscribers.map((subscriber) => (
                              <tr key={subscriber.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4 text-sm font-bold text-slate-900">{subscriber.email}</td>
                                <td className="p-4 text-sm text-slate-600">
                                  {subscriber.joined_at ? new Date(subscriber.joined_at).toLocaleDateString('ar-SA') : 'غير معروف'}
                                </td>
                                <td className="p-4 text-sm text-slate-600">
                                  {subscriber.last_search ? new Date(subscriber.last_search).toLocaleDateString('ar-SA') : 'لا يوجد'}
                                </td>
                                <td className="p-4">
                                  <div className="flex flex-wrap gap-1">
                                    {subscriber.interests?.slice(0, 3).map((interest, idx) => (
                                      <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                        {interest}
                                      </span>
                                    ))}
                                    {subscriber.interests?.length > 3 && (
                                      <span className="text-slate-400 text-xs">+{subscriber.interests.length - 3}</span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${subscriber.status === 'inactive' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {subscriber.status === 'inactive' ? t.inactive : t.active}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <button 
                                    onClick={() => handleUnsubscribe(subscriber.id)}
                                    className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200 transition-colors"
                                  >
                                    إلغاء الاشتراك
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4 text-sm text-slate-500 text-center">
                      عرض {filteredSubscribers.length} من أصل {subscribersList.length} مشترك
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== */}
              {/* 19.5 قسم الإعدادات العامة */}
              {/* ==================== */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  
                  {/* إعدادات الذكاء الاصطناعي */}
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

                  {/* إعدادات البريد الإلكتروني */}
                  <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-[2rem] p-8">
                    <h3 className="font-black text-green-900 border-b border-green-200 pb-4 mb-6 flex items-center gap-2">
                      <Mail className="text-green-600" />
                      إعدادات البريد الإلكتروني
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">SMTP Server</label>
                        <input 
                          type="text" 
                          value={adminConfig.emailSettings?.smtpServer || ''}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            emailSettings: {
                              ...adminConfig.emailSettings,
                              smtpServer: e.target.value
                            }
                          })}
                          className="w-full p-3 rounded-lg border border-green-200"
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">SMTP Port</label>
                        <input 
                          type="number" 
                          value={adminConfig.emailSettings?.smtpPort || 587}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            emailSettings: {
                              ...adminConfig.emailSettings,
                              smtpPort: parseInt(e.target.value)
                            }
                          })}
                          className="w-full p-3 rounded-lg border border-green-200"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">SMTP Username</label>
                        <input 
                          type="text" 
                          value={adminConfig.emailSettings?.smtpUsername || ''}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            emailSettings: {
                              ...adminConfig.emailSettings,
                              smtpUsername: e.target.value
                            }
                          })}
                          className="w-full p-3 rounded-lg border border-green-200"
                          placeholder="your-email@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">SMTP Password</label>
                        <input 
                          type="password" 
                          value={adminConfig.emailSettings?.smtpPassword || ''}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            emailSettings: {
                              ...adminConfig.emailSettings,
                              smtpPassword: e.target.value
                            }
                          })}
                          className="w-full p-3 rounded-lg border border-green-200"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">اسم المرسل</label>
                        <input 
                          type="text" 
                          value={adminConfig.emailSettings?.fromName || ''}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            emailSettings: {
                              ...adminConfig.emailSettings,
                              fromName: e.target.value
                            }
                          })}
                          className="w-full p-3 rounded-lg border border-green-200"
                          placeholder="مقارن"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block">بريد المرسل</label>
                        <input 
                          type="email" 
                          value={adminConfig.emailSettings?.fromEmail || ''}
                          onChange={(e) => setAdminConfig({
                            ...adminConfig,
                            emailSettings: {
                              ...adminConfig.emailSettings,
                              fromEmail: e.target.value
                            }
                          })}
                          className="w-full p-3 rounded-lg border border-green-200"
                          placeholder="noreply@moqaren.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* باقي الإعدادات */}
                  <div className="mb-12">
                    <div className="grid md:grid-cols-2 gap-10 mb-12">
                      <div className="space-y-6"><h3 className="font-black text-blue-900 border-b pb-2">بيانات التواصل</h3><div className="space-y-2"><label className="text-xs font-bold text-slate-400">الواتساب</label><input type="text" value={adminConfig.whatsappNumber} onChange={(e) => setAdminConfig({...adminConfig, whatsappNumber: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div><div className="space-y-2"><label className="text-xs font-bold text-slate-400">الإيميل</label><input type="email" value={adminConfig.supportEmail} onChange={(e) => setAdminConfig({...adminConfig, supportEmail: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div><div className="space-y-2"><label className="text-xs font-bold text-slate-400">تويتر</label><input type="text" value={adminConfig.twitterLink} onChange={(e) => setAdminConfig({...adminConfig, twitterLink: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div><div className="space-y-2"><label className="text-xs font-bold text-slate-400">إنستقرام</label><input type="text" value={adminConfig.instagramLink} onChange={(e) => setAdminConfig({...adminConfig, instagramLink: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 font-bold border" /></div></div>
                      <div className="space-y-6"><h3 className="font-black text-purple-600 border-b pb-2">العروض الخاصة</h3><div className="max-h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar">{adminConfig.exclusiveOffers?.map((offer, index) => (<div key={index} className="bg-purple-50 p-3 rounded-xl text-xs relative group"><button onClick={() => handleDeleteOffer(index)} className="absolute top-2 left-2 text-red-400 hover:text-red-600"><X size={14} /></button><p className="font-black text-purple-900">كلمة البحث: {offer.keyword}</p><p className="text-slate-600 truncate">{offer.message}</p></div>))}</div><div className="bg-purple-50 p-4 rounded-2xl border border-purple-100"><h4 className="font-bold text-purple-700 text-sm mb-3">إضافة عرض ذكي</h4><input type="text" placeholder="كلمة البحث" className="w-full p-2 mb-2 rounded-lg border text-xs font-bold" value={newOfferKeyword} onChange={(e) => setNewOfferKeyword(e.target.value)} /><input type="text" placeholder="رسالة العرض" className="w-full p-2 mb-2 rounded-lg border text-xs font-bold" value={newOfferMessage} onChange={(e) => setNewOfferMessage(e.target.value)} /><input type="text" placeholder="رابط العرض" className="w-full p-2 mb-2 rounded-lg border text-xs font-bold text-left" dir="ltr" value={newOfferLink} onChange={(e) => setNewOfferLink(e.target.value)} /><button onClick={handleAddOffer} className="w-full bg-purple-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-purple-700 flex items-center justify-center gap-2"><Plus size={16} /> إضافة عرض</button></div></div>
                    </div>

                    {/* إدارة الكلمات الرائجة */}
                    <div className="mb-12 bg-orange-50 border border-orange-100 rounded-[2rem] p-8"><h3 className="font-black text-orange-900 border-b border-orange-200 pb-4 mb-6 flex items-center gap-2"><Flame className="text-orange-600" />إدارة الكلمات الرائجة (تظهر في الرئيسية)</h3><div className="space-y-4"><div className="flex flex-wrap gap-2 mb-4">{adminConfig.trendingKeywords?.map((kw, idx) => (<div key={idx} className="bg-white text-orange-800 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm border border-orange-100">{kw}<button onClick={() => handleDeleteTrendingKeyword(idx)} className="text-orange-300 hover:text-red-500 transition-colors"><X size={14} /></button></div>))}</div><div className="flex gap-2"><input type="text" placeholder="أضف كلمة جديدة" className="flex-1 p-4 rounded-xl text-sm font-bold border-none shadow-sm" value={newTrendingKeyword} onChange={(e) => setNewTrendingKeyword(e.target.value)} /><button onClick={handleAddTrendingKeyword} className="bg-orange-600 text-white px-6 rounded-xl font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-200"><Plus size={20} /></button></div></div></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================ */}
      {/* 20. التذييل (Footer) */}
      {/* ============================ */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-32 rounded-t-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-white mb-6"><div className="bg-blue-600 p-2 rounded-xl"><Brain size={24} /></div><span className="text-3xl font-black tracking-tighter">مقارن</span></div>
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

      {/* ============================ */}
      {/* 21. الأنماط المخصصة (CSS-in-JS) */}
      {/* ============================ */}
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
