import type { CapacitorConfig } from '@capacitor/cli';
const env = process.env.APP_ENV; // dev | prod
const isDev = env === 'dev';
const config: CapacitorConfig = {
  appId: 'kr.co.causw', // 여기 값으로 Xcode Bundle ID가 자동 변경되진 않음(이미 만든 뒤라서)
  appName: '크자회(CCSSAA)', // 마찬가지
  webDir: 'out',
  server: {
    url: isDev
      ? 'https://causw-v3-web-dev.vercel.app/'
      : 'https://causw-v3-web.vercel.app/',
    cleartext: false,

    //local 테스트 시
    //url: 'http://localhost:3000/setting', //ios
    //url: 'http://10.0.2.2:3000', //android
    //cleartext: true,
  },
  ios: {
    contentInset: 'never',
    scrollEnabled: true,
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
  },
  plugins: {
    StatusBar: {
      style: 'LIGHT_CONTENT',
      backgroundColor: '#ffffff',
      overlaysWebView: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
