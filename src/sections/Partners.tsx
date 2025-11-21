import React from 'react'
import Image from 'next/image'

// Move partner data outside component to prevent recreation on each render
const partner = [
    {
        name: 'Allstate',
        image: '/allstate.svg'
    },
    {
        name: 'Farmers Insurance',
        image: '/farmers-insurance.svg'
    },
    {
        name: 'Kin',
        image: '/kin.svg'
    },
    {
        name: 'Progressive',
        image: '/partner-4.svg'
    },
    {
        name: 'Liberty Mutual',
        image: '/liberty-mutual.svg'
    },
]

const Partners = () => {
  return (
    <div className='w-full py-0 pt-40 md:pt-20 pb-16 lg:pb-0 lg:pt-0 lg:py-16 min-h-content flex flex-col relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-lg font-base text-center'>We Partner With Top Providers</h2>
        </div>
        <div className='w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
            {partner.map((partner) => (
                <div key={partner.name} className='flex flex-col items-center justify-center'>
                    <Image 
                        src={partner.image} 
                        alt={partner.name} 
                        width={50} 
                        height={50} 
                        className='w-42 h-42 object-contain'
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default React.memo(Partners)