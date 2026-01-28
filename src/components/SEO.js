import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, searchQuery }) => {
  const defaultTitle = "مقارن - محرك المقارنة الذكي الأول في السعودية";
  const defaultDesc = "قارن الأسعار بين المتاجر الإلكترونية في السعودية بذكاء. نوفر أفضل العروض والتوصيات المدعومة بالذكاء الاصطناعي.";
  
  const pageTitle = searchQuery ? `${searchQuery} - مقارنة الأسعار | مقارن` : title || defaultTitle;
  const pageDesc = searchQuery ? `أفضل سعر لـ ${searchQuery} في السعودية. قارن بين أمازون، نون، إكس سايت والمزيد.` : description || defaultDesc;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content="مقارنة أسعار, تسوق إلكتروني, سعودية, عروض, تخفيضات, مقارن, شراء ذكي" />
      
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content="https://moqaren.com/logo.png" />
      <meta property="og:url" content="https://moqaren.com" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ar_SA" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content="https://moqaren.com/logo.png" />
      
      <link rel="canonical" href="https://moqaren.com" />
    </Helmet>
  );
};

export default SEO;
Add SEO component
