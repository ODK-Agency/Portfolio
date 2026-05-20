import {
  ArrowUpRight,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
} from 'lucide-react'

import { profile } from '#/config/profile'

const optionalSocialLinks = profile.whatsappUrl
  ? [
      {
        label: 'WhatsApp',
        href: profile.whatsappUrl,
        icon: MessageCircle,
      },
    ]
  : []

export const socialLinks = [
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedinUrl,
    icon: Linkedin,
  },
  ...optionalSocialLinks,
  {
    label: 'X / Twitter',
    href: profile.xUrl,
    icon: Twitter,
  },
] as const

export function SocialLinks({
  className = '',
  compact = false,
  includeEmail = true,
}: {
  className?: string
  compact?: boolean
  includeEmail?: boolean
}) {
  const links = includeEmail
    ? socialLinks
    : socialLinks.filter((link) => link.label !== 'Email')

  return (
    <div className={['flex flex-wrap gap-3', className].join(' ')}>
      {links.map((social) => {
        const Icon = social.icon
        const external = !social.href.startsWith('mailto:')

        return (
          <a
            key={social.label}
            href={social.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={[
              'group inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]',
              compact ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm',
            ].join(' ')}
          >
            <Icon size={compact ? 15 : 16} aria-hidden="true" />
            <span>{social.label}</span>
            {!compact ? (
              <ArrowUpRight
                className="opacity-45 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                size={14}
                aria-hidden="true"
              />
            ) : null}
          </a>
        )
      })}
    </div>
  )
}
