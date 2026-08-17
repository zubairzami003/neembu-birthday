import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Edit3, Heart, Calendar, User, UserCheck, Share2, Copy, CheckCircle2 } from 'lucide-react';
import { LetterData } from '../types';
import { generateSurpriseShareUrl } from '../utils/share';

interface EditNamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterData: LetterData;
  onSave: (data: LetterData) => void;
}

export const EditNamesModal: React.FC<EditNamesModalProps> = ({
  isOpen,
  onClose,
  letterData,
  onSave,
}) => {
  const [formData, setFormData] = useState<LetterData>(letterData);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleCopyShareLink = async () => {
    // First save the current form data so local state is updated
    onSave(formData);
    const shareUrl = generateSurpriseShareUrl(formData);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      // Fallback prompt if clipboard API is blocked
      window.prompt('নিচের লিংকটি কপি করে প্রিয়জনকে পাঠিয়ে দিন:', shareUrl);
    }
  };

  const handleResetDefault = () => {
    const defaultData: LetterData = {
      recipientName: 'মিসেস ডোরেমন',
      senderName: 'তোমার জাম্বু',
      date: '১৮ আগস্ট ২০২৬',
      message: `আজ ১৮ আগস্ট ২০২৬ — তোমার এই পরম আনন্দের জন্মদিনে জানাই হৃদয়ের গভীর থেকে অজস্র ভালোবাসা ও রক্তগোলাপের শুভকামনা! 🌹🎂

তোমার প্রতিটি দিন ভরে উঠুক নির্মল হাসি, অফুরন্ত আনন্দ আর অনাবিল শান্তিতে। পৃথিবীর সমস্ত সুন্দর মুহূর্ত আর ভালোবাসা যেন সবসময় তোমার ছায়া হয়ে থাকে।

জীবনের প্রতিটি পদক্ষেপে অনেক সফল হও, আর সবসময় এভাবেই মিষ্টি হাসিমুখে থেকো... 💖`,
    };
    setFormData(defaultData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#FAF6F0] rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#DDB892] text-[#3D342C] overflow-hidden relative max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DDB892]/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#EBE1D4] text-[#B85D43]">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#3D342C] font-cute">
                    নাম ও চিঠি কাস্টমাইজ করুন
                  </h3>
                  <p className="text-xs text-[#7F6F62]">
                    পরিবর্তন করে সংরক্ষণ করুন বা সরাসরি শেয়ার লিংক কপি করুন
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#7F6F62] hover:bg-[#EBE1D4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Share Link Banner Highlight */}
            <div className="mt-4 p-3.5 bg-gradient-to-r from-[#EAE2D6] to-[#F5ECE0] rounded-2xl border border-[#DDB892] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#58311B]">
                  <Share2 className="w-4 h-4 text-[#B85D43]" />
                  <span>প্রিয়জনের জন্য শেয়ার লিংক (এডিট বাটন ছাড়া)</span>
                </div>
                <p className="text-[11px] text-[#7F6F62] mt-0.5 leading-snug">
                  এই লিংকে তিনি শুধু সারপ্রাইজ উপভোগ করবেন, কোনো এডিট বাটন থাকবে না।
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap ${
                  copied
                    ? 'bg-[#606C38] text-white'
                    : 'bg-[#B85D43] hover:bg-[#A44A3F] text-[#FAF6F0] hover:scale-[1.02]'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>কপি হয়েছে! 🎉</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>সারপ্রাইজ লিংক কপি 🔗</span>
                  </>
                )}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 font-bengali-clear">
              {/* Recipient Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#58311B] mb-1">
                  <User className="w-3.5 h-3.5 text-[#B85D43]" />
                  কার জন্মদিন (যার জন্য সারপ্রাইজ / প্রাপকের নাম):
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientName: e.target.value })
                  }
                  required
                  placeholder="যেমন: মিসেস ডোরেমন / প্রিয় মানুষ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#DDB892] text-sm text-[#3D342C] focus:outline-none focus:ring-2 focus:ring-[#B85D43] font-bengali-clear"
                />
              </div>

              {/* Sender Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#58311B] mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#B85D43]" />
                  কে উইশ করছে (প্রেরকের নাম):
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) =>
                    setFormData({ ...formData, senderName: e.target.value })
                  }
                  required
                  placeholder="যেমন: তোমার জাম্বু / তোমার কিউট বিড়াল"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#DDB892] text-sm text-[#3D342C] focus:outline-none focus:ring-2 focus:ring-[#B85D43] font-bengali-clear"
                />
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#58311B] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#B85D43]" />
                  জন্মদিনের তারিখ:
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  placeholder="যেমন: ১৮ আগস্ট ২০২৬"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#DDB892] text-sm text-[#3D342C] focus:outline-none focus:ring-2 focus:ring-[#B85D43] font-bengali-clear"
                />
              </div>

              {/* Birthday Message in Letter */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#58311B] mb-1">
                  <Heart className="w-3.5 h-3.5 text-[#B85D43]" />
                  ভালোবাসার চিঠির বার্তা:
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  placeholder="এখানে আপনার মনের অনুভূতি ও জন্মদিনের চিঠি লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFAF5] border border-[#DDB892] text-sm text-[#3D342C] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#B85D43] font-bengali-clear"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#DDB892]/80">
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="text-xs text-[#7F6F62] hover:text-[#58311B] underline transition-colors"
                >
                  ডিফল্ট টেক্সট আনুন
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 rounded-xl bg-[#EAE2D6] text-[#58311B] text-xs font-bold hover:bg-[#E0D3C3] transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B85D43] to-[#9C6644] text-[#FAF6F0] text-xs font-bold flex items-center gap-1.5 shadow-md hover:from-[#A44A3F] hover:to-[#8B5637] transition-all"
                  >
                    <Check className="w-4 h-4" />
                    সংরক্ষণ করুন
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
