// modules/design/atomic-aui/src/lib/splash-screen/index.ts
//
// Public surface for the SplashScreen boot-overlay component (Root + Card/Hero/Footer/Progress/Status
// parts). The two-band design (2026-07-05): a light elevated Card of a consumer Hero image band + a
// transparent Footer strip (Progress + Status).
export {
  SplashScreen,
  SPLASH_SCREEN_VOCAB,
  SPLASH_SCREEN_CARD_VOCAB,
  SPLASH_SCREEN_SX_AXES,
  SPLASH_SCREEN_DEFAULT_SCALE,
  SPLASH_SCREEN_DEFAULT_MIN_VISIBLE_MS,
  SPLASH_SCREEN_EXIT_MS,
  useSplashScreenRecipe,
  useSplashScreenCardRecipe,
} from './splash-screen';
export type {
  SplashScreenProps,
  SplashScreenCardProps,
  SplashScreenProgressProps,
  SplashScreenStatusProps,
  SplashScreenAui,
  SplashScreenCardAui,
  SplashScreenColor,
  SplashScreenPaint,
  SplashScreenScale,
  SplashScreenProfile,
  SplashScreenShape,
  SplashScreenElevation,
} from './splash-screen';
