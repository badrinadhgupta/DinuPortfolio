import './App.css'
import { Card, TestimonialsModal } from './components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Dinu from './assets/Dinu_bw.jpeg'
import InstagramIcon from './assets/insta.png'
import LinkedInIcon from './assets/linkedin.png'
import EmailIcon from './assets/email.png'
import Vegetables from './assets/vegetables_colorful.jpg'
import YinYangIcon from './assets/yy.svg'


function App() {
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false)
  return (
    <div className='h-screen flex flex-col bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden'>

      <Card className='mx-6 mt-4 mb-3 flex-shrink-0 text-center bg-white shadow-lg font-quintessential p-5 hover:shadow-xl transition-all duration-300' animationType='fadeIn'>
        <h1 className='text-5xl md:text-6xl text-gray-900 tracking-wider font-light'>
          Dinika Gowda
        </h1>
      </Card>

      <div className='flex flex-row flex-1 px-6 pb-4 gap-5 overflow-hidden'>

        <div className='flex flex-col flex-[5] gap-5 min-h-0'>
          <div className='flex flex-[3] gap-5 min-h-0'>
            <Card className='flex-[2] bg-white shadow-lg p-8 hover:shadow-xl transition-all duration-300 overflow-hidden' animationType='fadeIn'>
              <div className='h-full flex flex-col'>
                <div className='text-right'>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    style={{ display: 'inline-block' }}
                    className='opacity-80 hover:opacity-100 transition-opacity duration-300'
                  >
                    <img src={YinYangIcon} alt="Yin Yang" className='w-12 h-12' />
                  </motion.span>
                </div>
                
                <div className='flex-1 flex flex-col justify-end'>
                  <h2 className='text-3xl md:text-4xl lg:text-5xl text-gray-900 font-quintessential leading-snug'>
                    Making the world a little better, healthier, and happier.
                  </h2>
                  <p className='text-2xl md:text-3xl text-emerald-600 font-quintessential mt-4 italic'>
                    One day at a time.
                  </p>
                </div>
              </div>
            </Card>
            <Card className='flex-[1] p-0 bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300' animationType='hero'>
              <img src={Dinu} alt="Dinu Face" className='w-full h-full object-cover' />
            </Card>
          </div>
          
          <div className='flex flex-[2] gap-5 min-h-0'>
            <Card className='flex-1 bg-gradient-to-br from-white to-gray-50/50 shadow-lg p-8 hover:shadow-xl transition-all duration-300 overflow-hidden relative' animationType='fadeIn'>
              <div className='absolute top-0 right-0 w-24 h-24 bg-emerald-100/20 rounded-full -mr-12 -mt-12'></div>
              <div className='flex flex-col h-full relative'>
                <div className='flex items-center mb-6'>
                  <h3 className='text-2xl text-gray-900 font-roboto-condensed font-bold'>About Me</h3>
                  <div className='ml-3 h-px bg-gradient-to-r from-emerald-400 to-transparent flex-1'></div>
                </div>
                <div className='space-y-4 flex-grow'>
                  <p className='text-base text-gray-700 font-roboto-condensed leading-relaxed'>
                    I'm <span className='font-bold text-emerald-600'>Dinika</span>, a passionate nutritionist holding a Master's degree in Nutrition and Dietetics. My journey is fueled by a deep love for food science and a strong drive to explore research in the ever-evolving world of food and nutrition.
                  </p>
                  <p className='text-base text-gray-700 font-roboto-condensed leading-relaxed'>
                    I am especially fascinated by the powerful connection between <span className='font-semibold text-gray-900'>gut health</span> and <span className='font-semibold text-gray-900'>immunity</span>, and how the gut lays the foundation for overall vitality. I believe that nutrition isn't about rigid rules, but about creating a personal connection that nourishes your mind, body, and soul.
                  </p>
                </div>
              </div>
            </Card>
            <Card 
              className='flex-1 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg p-8 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden' 
              animationType='fadeIn'
              onClick={() => setIsTestimonialsOpen(true)}
            >
              <div className='flex flex-col h-full justify-between'>
                <div className='flex justify-end'>
                  <span className='text-3xl text-white/90 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300'>↗</span>
                </div>
                <div className='flex justify-start'>
                  <h3 className='text-3xl md:text-4xl font-quintessential text-white tracking-wide'>Testimonials</h3>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className='flex flex-col flex-[2] gap-5'>
          <Card className='flex-[4] bg-white shadow-lg p-0 hover:shadow-xl transition-all duration-300 overflow-hidden' animationType='fadeIn'>
            <div className='flex flex-col h-full'>
              <div className='relative h-48 flex-shrink-0 overflow-hidden'>
                <img src={Vegetables} alt="Vegetables" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90'></div>
                <div className='absolute bottom-0 left-0 right-0 p-7 pb-4'>
                  <h3 className='text-2xl font-roboto-condensed font-bold text-gray-900 drop-shadow-sm'>My Focus Areas</h3>
                </div>
              </div>
              <div className='flex-1 flex flex-col px-7 pb-7 pt-3 overflow-hidden'>
                <div className='flex-1 flex flex-col justify-center space-y-2'>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className='text-gray-900 font-quintessential text-2xl opacity-80 hover:opacity-100 hover:text-emerald-600 transition-all duration-300 cursor-pointer py-3'
                  >
                    Holistic Wellness
                  </motion.div>
                  <div className='border-t border-gray-200'></div>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className='text-gray-900 font-quintessential text-2xl opacity-80 hover:opacity-100 hover:text-emerald-600 transition-all duration-300 cursor-pointer py-3'
                  >
                    Gut Health
                  </motion.div>
                  <div className='border-t border-gray-200'></div>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className='text-gray-900 font-quintessential text-2xl opacity-80 hover:opacity-100 hover:text-emerald-600 transition-all duration-300 cursor-pointer py-3'
                  >
                    Mindful Eating
                  </motion.div>
                  <div className='border-t border-gray-200'></div>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className='text-gray-900 font-quintessential text-2xl opacity-80 hover:opacity-100 hover:text-emerald-600 transition-all duration-300 cursor-pointer py-3'
                  >
                    Balanced Nutrition
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
          <Card className='flex-shrink-0 bg-white shadow-lg p-5 hover:shadow-xl transition-all duration-300' animationType='fadeIn'>
            <div className='flex h-full justify-center items-center'>
              <div className='flex flex-row space-x-8'>
                <motion.a 
                  href="https://www.instagram.com/dinika.gowda/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className='p-3 bg-gray-50 rounded-full hover:bg-emerald-50 transition-all duration-300'
                >
                  <img src={InstagramIcon} alt="Instagram" className='w-10 h-10' />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/dinika-gowda-a4938a59/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className='p-3 bg-gray-50 rounded-full hover:bg-emerald-50 transition-all duration-300'
                >
                  <img src={LinkedInIcon} alt="LinkedIn" className='w-10 h-10' />
                </motion.a>
                <motion.a 
                  href="mailto:gopinath.dinks@gmail.com"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className='p-3 bg-gray-50 rounded-full hover:bg-emerald-50 transition-all duration-300'
                >
                  <img src={EmailIcon} alt="Email" className='w-10 h-10' />
                </motion.a>
              </div>
            </div>
          </Card>
        </div>

      </div>

      <TestimonialsModal 
        isOpen={isTestimonialsOpen} 
        onClose={() => setIsTestimonialsOpen(false)} 
      />
    </div>
  )
}

export default App
