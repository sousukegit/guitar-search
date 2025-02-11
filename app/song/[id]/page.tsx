// このファイルはサーバーコンポーネントとして機能します
// "use client" ディレクティブを削除

import { songs } from '@/app/data/songs';
import { SongClient } from './client';

export async function generateStaticParams() {
  return songs.map((song) => ({
    id: song.id.toString(),
  }));
}

export default async function SongPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const song = songs.find(s => s.id === parseInt(id));
  
  if (!song) {
    return <div>Song not found</div>;
  }
  
  return <SongClient song={song} />
}