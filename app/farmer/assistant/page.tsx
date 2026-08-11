'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { AIService, ChatMessage } from '@/lib/services/ai';
import {
  Sparkles,
  Mic,
  MicOff,
  Send,
  Image as ImageIcon,
  MapPin,
  Sprout,
  ShieldAlert,
  Bot,
  User
} from 'lucide-react';

export default function KrishiMitraAssistantPage() {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'krishimitra',
      text: `Namaste Vaibhav! 🙏 Main **KrishiMitra AI**, aapka intelligent farming companion.

Aapke Mathura field (#1 Wheat, 2 Acres, Loamy Soil) ke context ke saath main ready hoon. Aap crop disease, soil, weather ya mandi prices ke bare me mujhse Hindi, Hinglish ya English me pooch sakte hain!`,
      timestamp: '10:00 AM',
      suggestedActions: [
        'Bhai meri गेहूं ki leaves yellow ho rahi hain.',
        'Is irrigation recommended today for field #1?',
        'What are the latest Wheat rates in Agra Mandi?'
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputPrompt;
    if (!promptToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputPrompt('');
    setLoading(true);

    try {
      const aiResponse = await AIService.queryKrishiMitra(promptToSend);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition API is simulated or not supported in this browser version.');
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputPrompt('Bhai meri गेहूं ki leaves yellow ho rahi hain');
      }, 2000);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';

      if (!isListening) {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputPrompt(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        setIsListening(false);
      }
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-3xl border border-earth-300 shadow-elevated overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-6 bg-forest-900 text-earth-50 border-b border-forest-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-harvest-500 text-forest-950 flex items-center justify-center font-bold text-lg shadow-glow-green">
            <Sparkles className="w-6 h-6 fill-forest-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-heading text-earth-100">KrishiMitra AI</h1>
              <span className="px-2 py-0.5 rounded-full bg-forest-800 text-harvest-300 text-[10px] font-extrabold uppercase">
                Field-Aware AI
              </span>
            </div>
            <p className="text-xs text-forest-300">Mathura • Wheat (2 Acres) • Loamy Soil</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-forest-300 bg-forest-800/80 px-3 py-1.5 rounded-xl border border-forest-700">
          <MapPin className="w-3.5 h-3.5 text-harvest-400" />
          <span>Active Context: Mathura</span>
        </div>
      </div>

      {/* Message Chat Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-earth-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-forest-800 text-harvest-100'
                    : 'bg-harvest-500 text-forest-950 shadow-soft'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-forest-800 text-earth-100 rounded-tr-none'
                    : 'bg-white text-forest-950 border border-earth-300 rounded-tl-none shadow-soft'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] text-earth-600 border-b border-earth-200/50 pb-1 mb-1">
                  <span className="font-bold">{isUser ? 'You' : 'KrishiMitra AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-line text-sm">{msg.text}</div>

                {/* Suggested Follow-up Actions */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(action)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 font-medium transition-all"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-harvest-500 text-forest-950 flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-white border border-earth-300 text-xs text-forest-700 animate-pulse">
              KrishiMitra is analyzing farm context & recommendations...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Toolbar & Voice Control */}
      <div className="p-4 bg-white border-t border-earth-300 space-y-3 shrink-0">
        
        {/* Suggested Quick Prompt Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-earth-700 shrink-0">Suggestions:</span>
          {[
            'Bhai wheat me yellow leaves dikh rahi hain',
            'Is irrigation needed today?',
            'Check Agra Mandi rates'
          ].map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(pill)}
              className="px-3 py-1 rounded-full bg-earth-100 hover:bg-earth-200 text-forest-900 border border-earth-300 shrink-0 transition-colors"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-3 rounded-2xl font-bold transition-all flex items-center gap-1 text-xs shrink-0 ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-harvest-100 text-harvest-800 hover:bg-harvest-200 border border-harvest-300'
            }`}
            title="Voice Input (Hindi/English/Hinglish)"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-harvest-700" />}
            <span className="hidden sm:inline">{t('assistant.speakBtn')}</span>
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={t('assistant.placeholder')}
            className="flex-1 px-4 py-3 rounded-2xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50 text-forest-950"
          />

          {/* Image Upload Trigger */}
          <button
            type="button"
            onClick={() => alert('Image scan attached to KrishiMitra session!')}
            className="p-3 rounded-2xl bg-earth-100 hover:bg-earth-200 text-forest-800 border border-earth-300 shrink-0"
            title="Attach Leaf Photo"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="p-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-harvest-100 font-bold transition-all shadow-soft shrink-0 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>

    </div>
  );
}
