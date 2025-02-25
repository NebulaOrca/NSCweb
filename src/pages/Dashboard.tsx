import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft, Code2, Bot, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ScraperData, WaBotData } from '../types';
import { useScrapers } from '../hooks/useScrapers';
import { useWaBots } from '../hooks/useWaBots';

type FormType = 'scraper' | 'wabot';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { scrapers, addScraper } = useScrapers();
  const { waBots, addWaBot } = useWaBots();
  const [activeForm, setActiveForm] = useState<FormType>('scraper');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [scraperFormData, setScraperFormData] = useState<ScraperData>({
    title: '',
    description: '',
    creator: '',
    code: '',
    creatorUrl: '',
  });

  const [waBotFormData, setWaBotFormData] = useState<WaBotData>({
    name: '',
    description: '',
    creator: '',
    imageUrl: '',
    buttonType: 'download',
    buttonUrl: '',
  });

  const handleScraperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await addScraper(scraperFormData);
      
      if (success) {
        toast.success('Scraper added successfully!');
        setScraperFormData({
          title: '',
          description: '',
          creator: '',
          code: '',
          creatorUrl: '',
        });
      } else {
        toast.error('Failed to add scraper');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWaBotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await addWaBot(waBotFormData);
      
      if (success) {
        toast.success('WhatsApp Bot added successfully!');
        setWaBotFormData({
          name: '',
          description: '',
          creator: '',
          imageUrl: '',
          buttonType: 'download',
          buttonUrl: '',
        });
      } else {
        toast.error('Failed to add WhatsApp Bot');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2F3136] to-[#36393F]">
      {/* Navbar */}
      <nav className="bg-[#2F3136] border-b border-gray-700 p-4 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
              <button
                onClick={() => navigate('/')}
                className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://pomf2.lain.la/f/b4k5if9w.png"
                  alt="SCode Logo"
                  className="w-8 h-8"
                />
                <Code2 className="text-[#5865F2]" size={24} />
              </div>
              <button
                onClick={handleLogout}
                className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors sm:hidden"
              >
                <LogOut size={20} />
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="hidden sm:flex text-white items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Form Type Selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setActiveForm('scraper')}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeForm === 'scraper'
                  ? 'bg-[#5865F2] text-white shadow-lg'
                  : 'bg-[#40444B] text-gray-300 hover:text-white hover:bg-[#36393F]'
              }`}
            >
              <Code2 size={20} />
              <span className="hidden sm:inline">Add Scraper</span>
              <span className="sm:hidden">Scraper</span>
            </button>
            <button
              onClick={() => setActiveForm('wabot')}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeForm === 'wabot'
                  ? 'bg-[#5865F2] text-white shadow-lg'
                  : 'bg-[#40444B] text-gray-300 hover:text-white hover:bg-[#36393F]'
              }`}
            >
              <Bot size={20} />
              <span className="hidden sm:inline">Add WA Bot</span>
              <span className="sm:hidden">WA Bot</span>
            </button>
          </div>

          {/* Form Section */}
          <div className="bg-[#2F3136] p-6 sm:p-8 rounded-xl border border-gray-700 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              {activeForm === 'scraper' ? <Code2 size={24} /> : <Bot size={24} />}
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {activeForm === 'scraper' ? 'Add New Scraper' : 'Add New WhatsApp Bot'}
              </h2>
            </div>

            {activeForm === 'scraper' ? (
              <form onSubmit={handleScraperSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Title</label>
                    <input
                      type="text"
                      value={scraperFormData.title}
                      onChange={(e) => setScraperFormData({ ...scraperFormData, title: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Creator Name</label>
                    <input
                      type="text"
                      value={scraperFormData.creator}
                      onChange={(e) => setScraperFormData({ ...scraperFormData, creator: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Description</label>
                  <textarea
                    value={scraperFormData.description}
                    onChange={(e) => setScraperFormData({ ...scraperFormData, description: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] h-32 border border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Code</label>
                  <textarea
                    value={scraperFormData.code}
                    onChange={(e) => setScraperFormData({ ...scraperFormData, code: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] h-64 font-mono border border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Creator URL</label>
                  <input
                    type="url"
                    value={scraperFormData.creatorUrl}
                    onChange={(e) => setScraperFormData({ ...scraperFormData, creatorUrl: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:bg-[#4752C4]/50 text-white py-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Scraper...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Add Scraper</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleWaBotSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Bot Name</label>
                    <input
                      type="text"
                      value={waBotFormData.name}
                      onChange={(e) => setWaBotFormData({ ...waBotFormData, name: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Creator Name</label>
                    <input
                      type="text"
                      value={waBotFormData.creator}
                      onChange={(e) => setWaBotFormData({ ...waBotFormData, creator: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Description</label>
                  <textarea
                    value={waBotFormData.description}
                    onChange={(e) => setWaBotFormData({ ...waBotFormData, description: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] h-32 border border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Image URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={waBotFormData.imageUrl}
                      onChange={(e) => setWaBotFormData({ ...waBotFormData, imageUrl: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <AlertCircle size={20} />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">Use a direct image URL (e.g., https://example.com/image.jpg)</p>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Button Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border border-gray-700 transition-all duration-300"
                      style={{
                        backgroundColor: waBotFormData.buttonType === 'download' ? '#5865F2' : '#40444B',
                      }}
                    >
                      <input
                        type="radio"
                        value="download"
                        checked={waBotFormData.buttonType === 'download'}
                        onChange={(e) => setWaBotFormData({ ...waBotFormData, buttonType: 'download' })}
                        className="sr-only"
                      />
                      <span className="text-white font-medium">Download</span>
                    </label>
                    <label className="flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border border-gray-700 transition-all duration-300"
                      style={{
                        backgroundColor: waBotFormData.buttonType === 'buy' ? '#5865F2' : '#40444B',
                      }}
                    >
                      <input
                        type="radio"
                        value="buy"
                        checked={waBotFormData.buttonType === 'buy'}
                        onChange={(e) => setWaBotFormData({ ...waBotFormData, buttonType: 'buy' })}
                        className="sr-only"
                      />
                      <span className="text-white font-medium">Buy</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Button URL</label>
                  <input
                    type="url"
                    value={waBotFormData.buttonUrl}
                    onChange={(e) => setWaBotFormData({ ...waBotFormData, buttonUrl: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:bg-[#4752C4]/50 text-white py-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding WhatsApp Bot...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Add WhatsApp Bot</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};