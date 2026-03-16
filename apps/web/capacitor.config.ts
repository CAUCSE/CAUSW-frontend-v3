import type { CapacitorConfig } from '@capacitor/cli';

type Env = 'local-dev' | 'local-prod' | 'dev' | 'prod';
type DeviceEnv = 'ios' | 'android';

const env: Env = (process.env.APP_ENV as Env) || 'local-dev'; // dev | prod | local
const deviceEnv: DeviceEnv = (process.env.DEVICE_ENV as DeviceEnv) || 'ios'; // ios | android
const isDevFlavor = env === 'dev' || env === 'local-dev';
// local-dev : 백엔드 서버(localhost:3000에서 연결된 백엔드 서버), 로컬 프론트엔드 서버, dev 앱 설정
// local-prod : 백엔드 서버(localhost:3000에서 연결된 백엔드 서버), 로컬 프론트엔드 서버, prod 앱 설정
// dev : 개발계 백엔드 서버, 배포된 프론트엔드 개발계 서버, dev 앱 설정
// prod : 운영계 백엔드 서버, 배포된 프론트엔드 운영계 서버, prod 앱 설정

const localIosUrl = 'http://localhost:3000';
const localAndroidUrl = 'http://10.0.2.2:3000';

const urlMapper: Record<
  Env,
  {
    appId: string;
    appName: string;
    ios: string;
    android: string;
    cleartext: boolean;
  }
> = {
  'local-dev': {
    appId: 'kr.co.causw.dev',
    appName: '크자회(CCSSAA)-개발계',
    ios: localIosUrl,
    android: localAndroidUrl,
    cleartext: true,
  },
  'local-prod': {
    appId: 'kr.co.causw',
    appName: '크자회(CCSSAA)',
    ios: localIosUrl,
    android: localAndroidUrl,
    cleartext: true,
  },
  dev: {
    appId: 'kr.co.causw.dev',
    appName: '크자회(CCSSAA)-개발계',
    ios: 'https://causw-v3-web-dev.vercel.app/',
    android: 'https://causw-v3-web-dev.vercel.app/',
    cleartext: false,
  },
  prod: {
    appId: 'kr.co.causw',
    appName: '크자회(CCSSAA)',
    ios: 'https://causw-v3-web.vercel.app/',
    android: 'https://causw-v3-web.vercel.app/',
    cleartext: false,
  },
};

const currentEnv = urlMapper[env];

const config: CapacitorConfig = {
  appId: currentEnv.appId,
  appName: currentEnv.appName,
  webDir: 'out',
  server: {
    url: currentEnv[deviceEnv],
    cleartext: currentEnv.cleartext,
  },
  ios: {
    contentInset: 'never',
    scrollEnabled: true,
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
  },
  android: {
    flavor: isDevFlavor ? 'dev' : 'prod',
  },
  plugins: {
    //260315 - CapacitorHttp 플러그인 활성화 (서버에서 rtk붙여주는 것 때문에 임시로활성화, 추후 로직 수정 후 제거 예정)
    CapacitorCookies: {
      enabled: false,
    },
    CapacitorHttp: {
      enabled: true,
    },
    //260315- 여기까지
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
