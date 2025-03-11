// pages/api/test-connection.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    // テーブルがなくても実行可能な簡単なクエリ例：現在時刻を取得
    const result = await prisma.$queryRaw`SELECT NOW();`;
    return NextResponse.json({ message: '接続成功', now: result });
  } catch (error) {
    return NextResponse.json({ message: '接続エラー', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
