import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify/unstyled';
import { buildApiUrl } from '../lib/api';

const Newsletter = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(buildApiUrl('/api/newsletter/subscribe'), formData);
      if (res.data.success) {
        toast.success(res.data.message || 'You have been subscribed successfully.');
        setFormData({ name: '', email: '' });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'We could not complete your subscription right now.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 w-full py-16 px-6 md:px-16">
      <div className="bg-white rounded-2xl shadow-lg h-full p-10 flex flex-col items-center justify-between gap-10">
        <div className="text-left">
          <h2 className="text-3xl text-center font-semibold text-blue hover:text-blue-800 transition-colors">
            Join Our Newsletter
          </h2>
          <p className="mt-3 text-gray-600 text-center max-w-md">
            Stay updated with the latest insights, industry trends, and expert
            guidance from Renny Strips delivered straight to your inbox.
          </p>
        </div>

        <form className="flex flex-col md:flex-row items-center gap-4 w-full justify-center" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full md:w-56 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full md:w-64 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-blue text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap disabled:bg-gray-400"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
