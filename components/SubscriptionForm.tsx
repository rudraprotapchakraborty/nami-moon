'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (response.status === 200) {
        setMessage('Subscription successful!');
        setEmail('');
      } else {
        setMessage('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4">
      <h4 className="text-white text-sm font-medium mb-3">Subscribe to our newsletter</h4>
      <form onSubmit={handleSubscribe} className="flex">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-l-full focus:outline-none focus:ring-1 focus:ring-custom-red-500 w-full"
          required
        />
        <motion.button
          type="submit"
          className="bg-custom-red-600 text-white px-4 py-2 rounded-r-full hover:bg-custom-red-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          aria-label="Subscribe"
        >
          {loading ? (
            <span className="animate-spin inline-block">↻</span>
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </motion.button>
      </form>
      {message && <p className="text-sm text-gray-400 mt-2">{message}</p>}
    </div>
  );
};

export default NewsletterSubscription;
