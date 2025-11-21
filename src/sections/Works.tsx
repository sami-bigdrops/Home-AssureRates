import React from 'react'
import { Home, Network, Shield } from 'lucide-react'

// Move works data outside component to prevent recreation on each render
const works = [
    {
        icon: Home,
        title: 'Tell Us About Your Home',
        description: 'Tell us a little about yourself and your home so we can match you with the best insurance options.'
    },
    {
        icon: Network,
        title: 'Get Connected to Insurers',
        description: 'We will connect you to insurers in your area that you are already prequalified for so that you can compare options for protecting your home.'
    },
    {
        icon: Shield,
        title: 'Find the Best Rate',
        description: 'When you\'re ready, pick the coverage and price that is right for you and your home'
    }
]

const Works = () => {
    return (
        <div className='w-full py-16 bg-[#FFFFFF]'>
            <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-12'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#246a99] text-center mb-12'>
                    How It Works
                </h2>
                    <p className='text-lg text-gray-700 max-w-2xl mx-auto'>
                        We will connect you to insurers in your area that you are already prequalified for so that you can compare options for protecting your home.
                    </p>
                </div>
                
                {/* Responsive Grid - Column on mobile, Grid on desktop */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                    {works.map((work, index) => {
                        const IconComponent = work.icon
                        return (
                            <article key={index} className='bg-white rounded-xl p-8 shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md hover:border-blue-200 transition-all duration-300 group'>
                                <div className='mb-6 p-5 bg-blue-600 rounded-full shadow-lg group-hover:bg-blue-700 transition-colors duration-300'>
                                    <IconComponent className='w-8 h-8 text-white' />
                                </div>
                                <h3 className='text-xl font-bold text-[#1E3A8A] mb-4 leading-tight'>
                                    {work.title}
                                </h3>
                                <p className='text-gray-600 text-base leading-relaxed max-w-sm'>
                                    {work.description}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(Works)