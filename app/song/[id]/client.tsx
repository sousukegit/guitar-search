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
      <header className="relative">

        
        <Button
          className="top-4 left-4 text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          {t.songDetails.back}
        </Button>
      </header>
      <main>
        <div className=" w-full flex justify-center items-center">
          <img
             src={`https://i.ytimg.com/vi/${song.youtube_music_id}/sddefault.jpg`}
            alt={song.title}
            className="w-full  mx-10"
          />
        </div>
      </main>
      {/* 以前のJSXの残りの部分をここに移動 */}
      {/* ... */}
    </div>
  )
} 