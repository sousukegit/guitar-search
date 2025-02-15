
export type Artist = {
    artist_id: number;
    created_at: string;
    english_name: string;
    japanese_name: string;
    kana_name: string | null;
  };
  
  export type Song = {
    song_id:number,
    title:string,
    youtube_music_id:string,
    duration:number,
    release_date:Date,
    artist:Artist,
    soro:Soro[]
  }
  
  export type Soro = {
    soro_id:number,
    is_guitar_soro:boolean,
    start_time:number,
    end_time:number,

    
  }
  