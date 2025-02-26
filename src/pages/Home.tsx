import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Code2, Bot, Instagram, MessageCircle, Send, Sparkles, Star, Zap } from 'lucide-react';
import { ScraperCard } from '../components/ScraperCard';
import { WaBotCard } from '../components/WaBotCard';
import { LoadingCard } from '../components/LoadingCard';
import { useScrapers } from '../hooks/useScrapers';
import { useWaBots } from '../hooks/useWaBots';

type ContentType = 'scraper' | 'wabot';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { scrapers, loading: loadingScrapers } = useScrapers();
  const { waBots, loading: loadingBots } = useWaBots();
  const [activeContent, setActiveContent] = useState<ContentType>('scraper');

  const renderLoadingCards = () => {
    return Array(6).fill(null).map((_, index) => (
      <LoadingCard key={index} />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F3136] to-[#36393F]">
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative container mx-auto flex flex-col items-center text-center z-10">
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <div className="relative">
              <img
                src="https://pomf2.lain.la/f/b4k5if9w.png"
                alt="SCode Logo"
                className="w-16 h-16 rounded-xl"
              />
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400" size={20} />
            </div>
            <Code2 className="text-[#5865F2]" size={48} />
          </div>
          
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#5865F2] to-[#7289DA]">
              SCode
            </h1>
            <Star className="absolute -top-4 -right-4 text-yellow-400 animate-pulse hidden md:block" size={24} />
          </div>
          
          <div className="relative max-w-2xl mb-12">
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Discover and share powerful web scraping solutions and WhatsApp bots. Join our community of developers.
            </p>
            <Zap className="absolute -right-8 top-0 text-[#5865F2] animate-bounce hidden md:block" size={24} />
            
            {/* Social Media Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://instagram.com/prime_mugiwara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/6282375310984"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://t.me/prime_mugiwara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#0088cc] rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/login')}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Nebula-Team
          </button>
        </div>
      </div>

      {/* Content Type Selector */}
      <div className="bg-[#2F3136] border-b border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 w-full">
            <button
              onClick={() => setActiveContent('Code')}
              className={`flex items-center justify-center gap-2 px-4 py-4 font-semibold transition-colors ${
                activeContent === 'Code'
                  ? 'text-[#5865F2] border-b-2 border-[#5865F2] bg-[#36393F]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Code2 size={20} />
              <span>Code</span>
            </button>
            <button
              onClick={() => setActiveContent('Script')}
              className={`flex items-center justify-center gap-2 px-4 py-4 font-semibold transition-colors ${
                activeContent === 'Script'
                  ? 'text-[#5865F2] border-b-2 border-[#5865F2] bg-[#36393F]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Bot size={20} />
              <span>Script</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#2F3136]/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            {activeContent === 'scraper' ? 'Featured Scrapers' : 'Featured WhatsApp Bots'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeContent === 'scraper'
              ? (loadingScrapers ? renderLoadingCards() : scrapers.map((scraper, index) => (
                  <ScraperCard key={index} scraper={scraper} />
                )))
              : (loadingBots ? renderLoadingCards() : waBots.map((bot, index) => (
                  <WaBotCard key={index} bot={bot} />
                )))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2F3136] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src="https://pomf2.lain.la/f/b4k5if9w.png"
                alt="SCode Logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold">SCode</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/NebulaOrca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github size={24} />
                <span>NebulaOrca</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
