import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kr.co.causw',
  appName: '크자회(CCSSAA)',
  webDir: 'out',
  server: {
    //배포 시
    // url: 'https://www.causw.co.kr',
    // cleartext: false,

    //local 테스트 시
    url: 'http://localhost:3000/setting', //ios
    //url: 'http://10.0.2.2:3000', //android
    cleartext: true,
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
      overlaysWebView: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
