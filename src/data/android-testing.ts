// Recruitment for the Google Play closed test. Google requires at least 12 testers opted in for
// 14 continuous days before production access, so this call to action stays until Play is public.
// The form only collects interest; testers are admitted to the closed test manually.
export const androidTesting = {
  signupUrl: 'https://forms.gle/EK7fjtPZAryyHwhn6',
  title: 'Android players: help us launch on Google Play',
  description: 'Globulation 2 needs Android testers before it can be released on Google Play. Sign up with the Google account you use in Play, and we’ll add you to the closed test and email you the joining steps. Testers stay opted in for at least 14 days and tell us what works and what breaks.',
  label: 'Sign up to test on Android',
  shortLabel: 'Prefer Google Play? Join the Android closed test',
} as const;
