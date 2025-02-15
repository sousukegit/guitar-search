'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Guitar, Calendar, Music2, Menu, User, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { translations } from './i18n/translations';
// import { songs } from './data/songs';

type Artist = {
  artist_id: number;
  created_at: string;
  english_name: string;
  japanese_name: string;
  kana_name: string | null;
};

type Song = {
  song_id:number,
  title:string,
  youtube_music_id:string,
  duration:number,
  release_date:Date,
  artist:Artist,
  soro:Soro[]
}

type Soro = {
  soro_id:number,
  is_guitar_soro:boolean
  
}

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [fetchedSongs, setFetchedSongs] = useState<Song[]>([]);


  const t = translations[language];

  const filteredSongs:Song[] = fetchedSongs.filter(song => {
    const searchLower = searchTerm.toLowerCase();
    return song.title.toLowerCase().includes(searchLower) ||
           song.artist.japanese_name.toLowerCase().includes(searchLower)
  });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("/api/songs"); // ✅ クライアントからAPIエンドポイントを直接呼び出す
        if (!res.ok) throw new Error("Failed to fetch songs");
        const data = await res.json();
        setFetchedSongs(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <Menu className="h-6 w-6 text-gray-400 hover:text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 border-gray-800 text-white">
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-lg hover:text-purple-400 transition-colors">{t.menu.home}</a>
                <a href="#" className="text-lg hover:text-purple-400 transition-colors">{t.menu.favorites}</a>
                <a href="#" className="text-lg hover:text-purple-400 transition-colors">{t.menu.playlists}</a>
                <a href="#" className="text-lg hover:text-purple-400 transition-colors">{t.menu.settings}</a>
              </nav>
            </SheetContent>
          </Sheet>
          
          <div className="relative flex-1 max-w-xl mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Globe className="h-6 w-6 text-gray-400 hover:text-white" />
            </button>
            <User className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              {t.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredSongs.map((song) => (
              <Card
                key={song.song_id}
                className="bg-gray-900 border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => router.push(`/song/${song.song_id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={`https://i.ytimg.com/vi/${song.youtube_music_id}/sddefault.jpg`}
                      alt={song.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={song.soro.some((s) => s.is_guitar_soro) ? "default" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        <Guitar className="h-4 w-4" />
                        {song.soro.some((s) => s.is_guitar_soro) ? 'Guitar' : 'No Guitar'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-3">{song.title}</h2>
                    <div className="flex flex-col gap-2 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Music2 className="h-4 w-4" />
                        <span>{song.artist.japanese_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm">
                          Rock
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(song.release_date).getFullYear()}</span>
                        <span className="ml-auto">{Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
