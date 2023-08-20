import React, { useState } from 'react'
import line from '../../Assets/Line 70.png';
import bg from '../../Assets/b1.png';
import b1 from '../../Assets/bg.png'
function Faq() {
    const faqData = [
        {
          question: 'How does URL shortening work?',
          answer: 'URL shortening works by taking a long URL and creating a shorter, condensed version that redirects to the original URL. When a user clicks on the shortened link, they are redirected to the intended destination.',
        },
        {
          question: 'Is it necessary to create an account to use the URL shortening service?',
          answer: 'Yes It is necessary to sign up and Login to your account to use the service',
        },
        {
            question: 'Are the shortened links permanent? Will they expire?',
            answer: 'They expire depending on your pricing plan',
          },
          {
            question: 'Are there any limitations on the number of URLs I can shorten?',
            answer: 'Yes, there are limitations depending on your pricing plan',
          },
          {
            question: 'Can I customize the shortened URLs to reflect my brand or content?',
            answer: 'It cannot be customize to reflect any brand',
          },
          {
            question: 'Can I track the performance of my shortened URLs?',
            answer: 'No, You cannot track the performance of shortened URLs',
          },
          {
              question: 'How secure is the URL shortening service? Are the shortened links protected against spam or malicious activity?',
              answer: 'It is secured and protected against spam',
            },
            {
              question: 'What is an QR code and what can it do?',
              answer: 'A QR code (short for Quick Response code) is an array of black and white squares or pixels set in a grid that stores data for a machine to read. A smartphone or camera can quickly process the information contained in a QR code specific arrangement of pixels, making it a convenient way to store and access data.',
            },
      ];
    
      // State to track the currently active (open) FAQ item
      const [activeItem, setActiveItem] = useState(null);
    
      // Function to toggle the display of the answer when a question is clicked
      const handleItemClick = (index:any) => {
        if (index === activeItem) {
          // If the clicked item is already active, close it
          setActiveItem(null);
        } else {
          // Otherwise, open the clicked item
          setActiveItem(index);
        }
      };
  return (
    <div id='faq-section'>
        <section className='py-5 relative '>
            
<div className='absolute  top-0 '>
  <img src={b1} className='h-3/6 w-4/6 ' alt='background'/>
</div>

<div className='absolute  bottom-0 right-0 '>
  <img src={bg} className='h-72 w-64 filter brightness-20' alt='background'/>
</div>

            <div className='flex text-center justify-center my-5'>
            <img src={line} className='h-8' alt='line-icon'/> 
                <h1 className='text-3xl px-2 font-bold'>
                    FAQs
                </h1>
            </div>
            <div className="container w-4/6 mx-auto px-4 py-12">
     
      <div>
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-300 m-4 py-4 mb-4 cursor-pointer"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => handleItemClick(index)}
            >
              <h2 className="text-lg font-semibold">{item.question}</h2>
              <svg
                className={`h-6 w-6 ${activeItem === index ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {activeItem === index ? (
                  // Minus icon when the answer is shown
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                ) : (
                  // Plus icon when the answer is hidden
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                )}
              </svg>
            </div>
            {activeItem === index && (
              <p className="text-gray-600 mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
        </section>
    </div>
  )
}

export default Faq