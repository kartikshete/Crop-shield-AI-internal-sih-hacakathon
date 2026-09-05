import React, { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceInput = ({ onSpeechResult, placeholder = "Speak symptoms (e.g. 'पानांवर तपकिरी गोल ठिपके आहेत')" }) => {
  const { lang } = useLanguage();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleListen = () => {
    if (listening) {
      setListening(false);
    } else {
      setListening(true);
      // Simulate vernacular voice transcription
      setTimeout(() => {
        const sampleSpoken = lang === 'mr' 
          ? "पानांवर तपकिरी गोलाकार डाग पडले आहेत आणि खालील पाने पिवळी पडत आहेत."
          : lang === 'hi'
          ? "पत्तियों पर भूरे गोल धब्बे हैं और निचली पत्तियां पीली पड़ रही हैं।"
          : "Brown concentric spots observed on middle leaves with yellow margins.";
        setTranscript(sampleSpoken);
        setListening(false);
        if (onSpeechResult) onSpeechResult(sampleSpoken);
      }, 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-xs">
      <button
        type="button"
        onClick={toggleListen}
        className={`p-3 rounded-xl transition-all ${
          listening
            ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-500/30'
            : 'bg-agri-50 text-agri-700 hover:bg-agri-100'
        }`}
        title={listening ? "Listening..." : "Click to speak"}
      >
        {listening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      <div className="flex-1 px-2">
        {listening ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span>Listening in {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}... Speak now</span>
          </div>
        ) : transcript ? (
          <p className="text-xs font-medium text-slate-800 line-clamp-1 italic">
            "{transcript}"
          </p>
        ) : (
          <p className="text-xs text-slate-400">
            {placeholder}
          </p>
        )}
      </div>

      {transcript && (
        <button
          type="button"
          onClick={() => {
            const utterance = new SpeechSynthesisUtterance(transcript);
            window.speechSynthesis?.speak(utterance);
          }}
          className="p-2 text-slate-400 hover:text-agri-600 transition-colors"
          title="Play back audio"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default VoiceInput;
