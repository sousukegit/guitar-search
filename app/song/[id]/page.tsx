'use client';
import { useEffect, useState } from 'react';
// import { songs } from '@/app/data/songs';
import { usePathname } from 'next/navigation';
import { SongClient } from './client';


type Song = {
  song_id: number;
  title: string;
  artist: string;
  // 必要に応じて他のプロパティも追加してください
};

export default function SongPage() {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // URL 例: /song/1 から song_id を取得
  const pathname = usePathname();
  const songId = pathname.split('/').pop();

  useEffect(() => {
    if (!songId) return;
    
    const fetchSong = async () => {
      try {
        const res = await fetch(`/api/song/${songId}`);
        if (res.ok) {
          const data: Song = await res.json();
          setSong(data);
        } else {
          console.error('Song not found');
        }
      } catch (error) {
        console.error('Error fetching song:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [songId]);

  if (loading) return (<div className="min-h-screen bg-black text-white"><p>Loading...</p></div>);
  if (!song) return (<div className="min-h-screen bg-black text-white"><p>Song not found</p></div>);

  return (
    <div　className="min-h-screen bg-black text-white">
      <SongClient song={song} />
      {/* <h1>{song.title}</h1>
      <p>{song.artist}</p> */}
      {/* 他の表示項目を追加 */}
    </div>
  );
}