import React from 'react'
import { Star, BadgeCheck } from 'lucide-react'

const testimonials = [
    {
        name: 'Michael R.',
        address: 'Austin, Texas',
        testimonial: 'I really liked how simple this was. Instead of calling around to different insurance companies, I could just put in my info once and see all my home insurance options. Saved me so much time and hassle. The whole process was straightforward and I found exactly what I needed to protect my home.',
        rating: 5,
        verified: true,
        date: '5 days ago'
    },
    {
        name: 'Sarah J.',
        address: 'Portland, Oregon',
        testimonial: 'This was such a great experience. I ended up saving quite a bit on my home insurance and was able to keep all the coverage I wanted for my property. The people I talked to were really helpful and patient with all my questions about dwelling coverage and personal property protection. Plus I got to bundle everything together which made things even easier.',
        rating: 5,
        verified: true,
        date: '2 weeks ago'
    },
    {
        name: 'David K.',
        address: 'Charlotte, North Carolina',
        testimonial: 'Super easy to use and I found a better rate than what I had before for my home. The whole thing took maybe ten minutes from start to finish. I didn\'t have to jump through hoops or anything, just filled out the form and got matched with a home insurance policy that works for me. Really happy with how it turned out.',
        rating: 5,
        verified: true,
        date: '1 week ago'
    }
]

const Testimonials = () => {
    return (
        <div className='w-full py-16 bg-[#F7F7F7]'>
            <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#246a99] text-center mb-12'>
                    What Our Customers Say
                </h2>
                
                {/* Desktop Grid */}
                <div className='hidden lg:grid grid-cols-3 gap-8 w-full'>
                    {testimonials.map((testimonial, index) => (
                        <article key={index} className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col min-h-[280px]'>
                            <div className='flex items-center justify-between mb-3'>
                                <div className='flex gap-1'>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className='w-5 h-5 fill-amber-400 text-amber-400' />
                                    ))}
                                </div>
                                {testimonial.verified && (
                                    <BadgeCheck className='w-5 h-5 text-blue-500' />
                                )}
                            </div>
                            <blockquote className='text-gray-800 text-base leading-relaxed mb-6 flex-grow'>
                                &ldquo;{testimonial.testimonial}&rdquo;
                            </blockquote>
                            <footer className='text-sm mt-auto border-t border-gray-100 pt-4'>
                                <div className='flex items-start justify-between'>
                                    <div>
                                        <p className='font-semibold text-gray-900'>{testimonial.name}</p>
                                        <p className='text-gray-600'>{testimonial.address}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-xs text-gray-500'>{testimonial.date}</p>
                                        {testimonial.verified && (
                                            <p className='text-xs text-blue-600 font-medium mt-1'>Verified Customer</p>
                                        )}
                                    </div>
                                </div>
                            </footer>
                        </article>
                    ))}
                </div>

                {/* Mobile/Tablet Horizontal Scroll */}
                <div className='lg:hidden overflow-x-auto scrollbar-hide w-full'>
                    <div className='flex gap-6 pb-4' style={{ width: 'max-content' }}>
                        {testimonials.map((testimonial, index) => (
                            <article key={index} className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 min-w-[300px] max-w-[350px] flex-shrink-0 flex flex-col min-h-[280px]'>
                                <div className='flex items-center justify-between mb-3'>
                                    <div className='flex gap-1'>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className='w-5 h-5 fill-amber-400 text-amber-400' />
                                        ))}
                                    </div>
                                    {testimonial.verified && (
                                        <BadgeCheck className='w-5 h-5 text-blue-500' />
                                    )}
                                </div>
                                <blockquote className='text-gray-800 text-base leading-relaxed mb-6 flex-grow'>
                                    &ldquo;{testimonial.testimonial}&rdquo;
                                </blockquote>
                                <footer className='text-sm mt-auto border-t border-gray-100 pt-4'>
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <p className='font-semibold text-gray-900'>{testimonial.name}</p>
                                            <p className='text-gray-600'>{testimonial.address}</p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-xs text-gray-500'>{testimonial.date}</p>
                                            {testimonial.verified && (
                                                <p className='text-xs text-blue-600 font-medium mt-1'>Verified Customer</p>
                                            )}
                                        </div>
                                    </div>
                                </footer>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default React.memo(Testimonials)