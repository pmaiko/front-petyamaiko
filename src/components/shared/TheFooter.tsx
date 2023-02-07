import '~/assets/styles/shared/TheFooter.scss'

import { ReactComponent as InstagramIcon } from '~/assets/svg/socials/instagram.svg'
import { ReactComponent as TelegramIcon } from '~/assets/svg/socials/telegram.svg'
import { ReactComponent as SkypeIcon } from '~/assets/svg/socials/skype.svg'

import { useStoreState } from '~/store'
import { useMemo, createElement } from 'react'

const icons = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  skype: SkypeIcon
}
const TheFooter = () => {
  const socials = Object.entries(useStoreState(state => state.global.globalData.socials) || {})
  const text = useStoreState(state => state.global.globalData.footer?.text) || ''
  const copyright = useStoreState(state => state.global.globalData.footer?.copyright) || ''

  const _socials = useMemo(() => {
    return socials.map(([key, value]) => {
      return {
        type: key,
        icon: icons[key as keyof typeof icons],
        link: value as string
      }
    })
  }, [socials])
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__socials'>
          <ul className='footer__socials-list'>
            {_socials.map((item, index) => (
              <li
                key={index}
                className='footer__socials-list-item'
              >
                <a
                  href={item.link}
                  target='_blank'
                  rel='noreferrer'
                  className='footer__social'
                >
                  <div className='footer__social-icon'>
                    {createElement(item.icon, {
                      className: 'footer__social-icon-svg'
                    })}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className='footer__text'>
          { text }
        </p>
        <p className='footer__copyright'>
          { copyright }
        </p>
      </div>
    </footer>
  )
}

export default TheFooter
