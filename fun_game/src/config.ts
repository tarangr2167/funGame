/**
 * Easy personalization — update these values to customize the apology site.
 */
export const apologyConfig = {
  herName: 'Vaishnavi',

  /** Put your photo at `public/our-photo.jpg` (or change this path). */
  photoPath: '/our-photo.jpg',

  /** Optional: put a soft track at `public/soft-music.mp3` */
  musicPath: '/soft-music.mp3',

  opening: {
    greeting: 'Hey Vaishnavi ❤️',
    subtitle: 'I have something important to say...',
  },

  apologyLines: [
    'Vaishnavi ❤️',
    'I am really sorry.',
    'I never wanted to hurt you or make you feel bad.',
    'You mean so much to me, and I promise I will always try to understand you better, care for you more, and never intentionally hurt you.',
  ],

  promises: [
    'I promise I would never do that again ❤️',
    'I will always respect your feelings.',
    'I would never question your character or speak anything bad about it.',
    'I would never even think something bad about your character.',
    'I will try my best to make you smile.',
    'Your happiness matters to me.',
  ],

  love: {
    title: 'Vaishnavi ❤️',
    headline: 'I Love You ❤️',
    lines: ['And deep inside I know...', 'You love me too ❤️'],
    photoCaption: 'We should click photos more often ❤️',
  },

  forgivenessTeases: [
    'Nope 😜',
    "You can't stay mad forever ❤️",
    'Try again 😂',
    'I know you forgive me 🥺',
  ],

  celebration: {
    title: 'Love you Vaishnavi! ❤️',
    subtitle: 'I promise to keep making you smile ❤️',
  },
} as const

export type ApologyStep =
  | 'opening'
  | 'apology'
  | 'promise'
  | 'love'
  | 'forgiveness'
  | 'celebration'
