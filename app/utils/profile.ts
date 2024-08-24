export const userProfileMenuItems = [
  {
    label: 'Profile',
    to: useI18nLink('/profile'),
    icon: 'i-heroicons-user'
  },
  {
    label: 'Security',
    to: useI18nLink('/profile/security'),
    icon: 'i-heroicons-lock-closed'
  },
  {
    label: 'Logout',
    to: useI18nLink('/auth/logout'),
    icon: 'i-heroicons-arrow-left-on-rectangle'
  },
]