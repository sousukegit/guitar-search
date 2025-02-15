"use client"

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translations } from '@/app/i18n/translations';
import type { Song } from '@/app/type/type';

interface SongClientProps {
  song: Song;
}

export function SongClient({ song }: SongClientProps) {
  const router = useRouter();
  const t = translations['en'];

  return (
    <div className=" bg-black text-white">
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
        <div className="grid columns-1 gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold">{song.title}</h1>
          <h2 className=" text-2xl text-gray-400">{song.artist.japanese_name}</h2>
        </div>
        

        <div className="w-full max-w-2xl mx-auto my-6">
      {/* 楽曲全体のタイムライン */}
      <div className="relative h-10 bg-gray-200 border border-gray-300 rounded">
        {/* 間奏区間のハイライト表示 */}
        {song.soro.map((segment) => {
          const leftPercent = (segment.start_time / song.duration) * 100;
          const widthPercent = ((segment.end_time - segment.start_time) / song.duration) * 100;
          return (
            <div
              key={segment.soro_id}
              style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
              className={`absolute h-full rounded cursor-pointer border 
                ${segment.is_guitar_soro ? 'bg-blue-500 border-blue-700' : 'bg-green-500 border-green-700'}`}
              title={`${segment.is_guitar_soro ? 'Guitar' : 'Normal'}区間: ${segment.start_time.toFixed(
                2
              )}s - ${segment.end_time.toFixed(2)}s`}
            >
              <span className="absolute top-1/2 left-2 -translate-y-1/2 text-xs text-white">
                {segment.is_guitar_soro ? '🎸' : '🈚'}
              </span>
            </div>
          );
        })}
      </div>

      {/* タイムラインの下に開始/終了時刻の表示 */}
      <div className="flex justify-between text-sm mt-2">
        <span>0s</span>
        <span>{song.duration}s</span>
      </div>
      </div>


      </main>
      {/* 以前のJSXの残りの部分をここに移動 */}
      {/* ... */}
    </div>
  )
} 