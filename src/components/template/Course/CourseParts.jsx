import React from 'react'

export default function CourseParts() {
  return (
    <section className='mx-auto overflow-x-hidden mt-8 sm:mt-10'>
      <div className='container'>
        {/* <!-- Breadcrumb --> */}
        <div></div>

        {/* <!-- Course Lesson --> */}
        <div className='aspect-video mt-8 sm:mt-10 overflow-hidden rounded-xl'>
          <video src="https://tech.sabzlearn.ir/uploads/ce01010101it/next/Next001-intro.mp4?h=6Q8udC2_lp0jWI0xokhYzQ&t=1711118380" className='w-full m-auto overflow-hidden rounded-[20px]' controls></video>
        </div>

        <div className='grid grid-cols-12 gap-y-6 gap-x-5 lg:gap-x-7 mt-6 lg:mt-8 '>
          <div className='col-span-full order-last md:order-none md:col-span-7 xl:col-span-8'></div>

          {/* !<-- Side --> */}
          <aside className='col-span-full order-first md:order-none md:col-span-5 xl:col-span-4'></aside>
        </div>

      </div>
    </section>
  )
}
