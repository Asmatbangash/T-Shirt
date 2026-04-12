import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function LazyImage({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  onLoad,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className={cn(
            'absolute inset-0 bg-muted animate-pulse',
            placeholderClassName
          )}
        />
      )}
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  )
}
