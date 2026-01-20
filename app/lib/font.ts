import localFont from 'next/font/local'

export const iranSansDn = localFont({
  src: [
    {
      path: '../../public/fonts/iransansdn/iransansdn.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iransansdn/iransansdnbold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iransansdn',
})
