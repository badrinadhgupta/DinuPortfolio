import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import testimonialsData from '../testimonials.json'

interface TestimonialsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TestimonialsModal = ({ isOpen, onClose }: TestimonialsModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<number | null>(null)
  const testimonials = testimonialsData.testimonials
  const [isDragging, setIsDragging] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && isOpen && !isDragging) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000) // Change testimonial every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, isOpen, isDragging, testimonials.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false)
    const swipeThreshold = 50
    const swipeVelocity = info.velocity.x
    
    if (info.offset.x > swipeThreshold || swipeVelocity > 500) {
      handlePrevious()
    } else if (info.offset.x < -swipeThreshold || swipeVelocity < -500) {
      handleNext()
    }
  }

  if (!isOpen) return null

  // Calculate positions for visible cards with smoother transitions
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const totalCards = testimonials.length
    
    // Handle wrapping for infinite carousel
    let adjustedDiff = diff
    if (diff > totalCards / 2) adjustedDiff -= totalCards
    if (diff < -totalCards / 2) adjustedDiff += totalCards
    
    // Smoother positioning
    const cardWidth = 320
    const xOffset = adjustedDiff * cardWidth
    
    // More gradual scale changes
    let scale = 1 - Math.abs(adjustedDiff) * 0.08
    scale = Math.max(0.75, Math.min(1, scale))
    
    // Smoother opacity transitions
    let opacity = 1
    if (Math.abs(adjustedDiff) > 2) {
      opacity = 0
    } else if (Math.abs(adjustedDiff) === 2) {
      opacity = 0.5
    } else if (Math.abs(adjustedDiff) === 1) {
      opacity = 0.8
    }
    
    // Better z-index management
    const zIndex = 10 - Math.abs(adjustedDiff)
    
    // Add slight rotation for depth
    const rotateY = adjustedDiff * -5
    
    return {
      x: xOffset,
      scale,
      opacity,
      zIndex,
      rotateY,
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-black/75 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1], // Custom bezier curve for smooth animation
            }}
            className="relative w-full max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute -top-14 right-0 text-white/80 hover:text-white transition-colors z-20"
              aria-label="Close testimonials"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center text-3xl md:text-4xl font-quintessential text-white mb-12"
            >
              What People Say
            </motion.h2>

            {/* Carousel container with perspective */}
            <div className="relative h-[400px] overflow-visible" style={{ perspective: 1200 }}>
              <div className="absolute inset-0 flex items-center justify-center">
                {testimonials.map((testimonial, index) => {
                  const style = getCardStyle(index)
                  const isActive = index === currentIndex
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute w-[300px] cursor-grab active:cursor-grabbing will-change-transform"
                      animate={style}
                      transition={{
                        x: {
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          mass: 0.8,
                        },
                        scale: {
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                        opacity: {
                          duration: 0.3,
                          ease: "easeOut",
                        },
                        rotateY: {
                          duration: 0.4,
                          ease: "easeOut",
                        },
                      }}
                      drag={isActive ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.15}
                      dragTransition={{ 
                        bounceStiffness: 300, 
                        bounceDamping: 20,
                        power: 0.2,
                        timeConstant: 200
                      }}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={handleDragEnd}
                      whileHover={isActive ? { scale: 1.03, transition: { duration: 0.2 } } : {}}
                      whileTap={isActive ? { scale: 0.98 } : {}}
                      onClick={() => {
                        if (!isActive && !isDragging) {
                          setIsAutoPlaying(false)
                          setCurrentIndex(index)
                        }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div 
                        className={`bg-white rounded-2xl shadow-2xl p-6 h-[350px] flex flex-col transform-gpu ${
                          isActive ? 'ring-4 ring-emerald-500/50' : ''
                        }`}
                        animate={{
                          boxShadow: isActive 
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
                            : "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Rating stars */}
                        <div className="flex mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.svg 
                              key={i} 
                              className="w-4 h-4 text-yellow-400 fill-current" 
                              viewBox="0 0 20 20"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </motion.svg>
                          ))}
                        </div>

                        {/* Testimonial text */}
                        <blockquote className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                          <p className="text-sm text-gray-700 leading-relaxed italic">
                            "{testimonial.testimonial}"
                          </p>
                        </blockquote>

                        {/* Author info */}
                        <div className="border-t pt-4">
                          <p className="text-base font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.occupation}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(testimonial.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center items-center mt-12 space-x-4"
            >
              <motion.button
                onClick={handlePrevious}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-all duration-200"
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>

              {/* Dots indicator */}
              <div className="flex space-x-2 px-4">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setCurrentIndex(index)
                    }}
                    className={`transition-all duration-300 ease-out ${
                      index === currentIndex 
                        ? 'w-8 h-2 bg-emerald-400' 
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    } rounded-full`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-all duration-200"
                aria-label="Next testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Auto-play indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-center"
            >
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-xs text-white/50 hover:text-white/70 transition-all duration-200"
              >
                {isAutoPlaying ? '⏸ Pause' : '▶ Play'} auto-scroll
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 