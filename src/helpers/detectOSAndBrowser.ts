const detectOSAndBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  let platform = 'unknown';
  let browser = 'unknown';

  // Определение браузера
  if (userAgent.includes('firefox')) {
    // Пример UA: "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    browser = 'Mozilla Firefox';
  } else if (userAgent.includes('samsungbrowser')) {
    // Пример UA: "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F ...) SamsungBrowser/9.4 ..."
    browser = 'Samsung Internet';
  } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
    // Пример UA: "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) ... OPR/90.0.4480.54"
    browser = 'Opera';
  } else if (userAgent.includes('yabrowser')) {
    // Пример UA: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... YaBrowser/24.1.0.0 ..."
    browser = 'YaBrowser';
  } else if (userAgent.includes('edge') && !userAgent.includes('edg')) {
    // Пример UA: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Edge/16.16299"
    browser = 'Microsoft Edge (Legacy)';
  } else if (userAgent.includes('edg')) {
    // Пример UA: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Edg/104.0.1293.70"
    browser = 'Microsoft Edge (Chromium)';
  } else if (userAgent.includes('chrome')) {
    // Пример UA: "Mozilla/5.0 (X11; Linux x86_64) ... Chrome/104.0.0.0 Safari/537.36"
    browser = 'Google Chrome or Chromium';
  } else if (userAgent.includes('safari')) {
    // Пример UA: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) ... Safari/604.1"
    browser = 'Apple Safari';
  }

  // Определение операционной системы
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    platform = 'iOS';
  } else if (userAgent.includes('mac')) {
    platform = 'Mac OS';
  } else if (userAgent.includes('win')) {
    platform = 'Windows';
  } else if (userAgent.includes('android')) {
    platform = 'Android';
  } else if (userAgent.includes('linux')) {
    platform = 'Linux';
  }

  return { platform, browser };
};

export default detectOSAndBrowser;
