import React, { useEffect } from 'react'
import styles from './ScrollShadows.module.css'

export default function ScrollShadows({ children }) {
  useEffect(() => {
    const contents = document.querySelectorAll('.scroll-shadows-content')

    contents.forEach(function (content) {
      const shadowTop = content.parentElement.querySelector('.' + styles.scrollShadowsTop),
        shadowBottom = content.parentElement.querySelector('.' + styles.scrollShadowsBottom),
        shadowLeft = content.parentElement.querySelector('.' + styles.scrollShadowsLeft),
        shadowRight = content.parentElement.querySelector('.' + styles.scrollShadowsRight)

      function updateScrollShadows() {
        shadowTop.style.opacity = Math.abs(content.scrollTop) ? "1" : "0"
        shadowBottom.style.opacity = 0 < Math.abs(content.scrollHeight - content.clientHeight - content.scrollTop) ? "1" : "0"
        shadowLeft.style.opacity = Math.abs(content.scrollLeft) ? "1" : "0"
        shadowRight.style.opacity = 0 < Math.abs(content.scrollWidth - content.clientWidth - content.scrollLeft) ? "1" : "0"
      }
      content.addEventListener('scroll', () => updateScrollShadows())

      const resizeObserver = new ResizeObserver(() => updateScrollShadows())
      resizeObserver.observe(content)
      updateScrollShadows()
    })
  })

  return (
    <div className="d-flex position-relative overflow-auto">
      <div className={styles.scrollShadowsTop}></div>
      <div className={styles.scrollShadowsBottom}></div>
      <div className={styles.scrollShadowsLeft}></div>
      <div className={styles.scrollShadowsRight}></div>
      <div className="flex-fill scroll-shadows-content overflow-auto">
        {children}
      </div>
    </div>
  )
}