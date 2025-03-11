import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding data...");

  // 🎵 Artist データ
  const artist1 = await prisma.artist.create({
    data: {
      english_name: "Fujii Kaze",
      japanese_name: "藤井風",
      kana_name: "フジイカゼ",
    },
  });

  const artist2 = await prisma.artist.create({
    data: {
      english_name: "Kenshi Yonezu",
      japanese_name: "米津玄師",
      kana_name: "ヨネズケンシ",
    },
  });

  console.log("✅ Artist data inserted!");

  // 🎶 Song データ
  const song1 = await prisma.song.create({
    data: {
      title: "さよーならまたいつか！- Sayonara",
      youtube_music_id: "aCcZrCKI9Ew",
      url: "https://music.youtube.com/watch?v=aCcZrCKI9Ew",
      duration: 201,
      artist_id: artist1.artist_id,
      release_date: new Date("2024-08-21"),
      is_separated: true,
    },
  });

  const song2 = await prisma.song.create({
    data: {
      title: "満ちてゆく",
      youtube_music_id: "MqHfdqK5VvI",
      url: "https://music.youtube.com/watch?v=MqHfdqK5VvI",
      duration: 311,
      artist_id: artist2.artist_id,
      release_date: new Date("2024-03-15"),
      is_separated: true,
    },
  });

  console.log("✅ Song data inserted!");

  // 🎸 Soro データ
  await prisma.soro.createMany({
    data: [
      {
        song_id: song1.song_id,
        start_time: 0,
        end_time: 7,
        is_guitar_soro: false,
        guitar_score: 4.5,
      },
      {
        song_id: song1.song_id,
        start_time: 89,
        end_time: 99,
        is_guitar_soro: true,
        guitar_score: 5.0,
      },
      {
        song_id: song2.song_id,
        start_time: 45.0,
        end_time: 75.0,
        is_guitar_soro: true,
        guitar_score: 5.0,
      },
      {
        song_id: song2.song_id,
        start_time: 100,
        end_time: 110,
        is_guitar_soro: true,
        guitar_score: 5.0,
      },
    ],
  });

  console.log("✅ Soro data inserted!");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
