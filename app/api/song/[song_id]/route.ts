
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { song_id: string } }
) {
  const { song_id } = params;
  
  // 数値の場合は変換してください
  const song = await prisma.song.findUnique({
    include: {
      artist: true,
      soro: true
    },
    where: { song_id: Number(song_id) },
  });

  if (!song) {
    return NextResponse.json({ error: 'Song not found' }, { status: 404 });
  }

  return NextResponse.json(song);
}