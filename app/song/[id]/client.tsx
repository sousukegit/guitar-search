"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Music2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translations } from '@/app/i18n/translations';
import type { Song } from '@/app/data/songs';

interface SongClientProps {
  song: Song;
}

export function SongClient({ song }: SongClientProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="h-[50vh] w-full relative">
          <img
            src={song.thumbnail}
            alt={song.title}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        
        <Button
          variant="secondary"
          className="absolute top-4 left-4 text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          {t.songDetails.back}
        </Button>
      </div>

      {/* 以前のJSXの残りの部分をここに移動 */}
      {/* ... */}
    </div>
  )
} 