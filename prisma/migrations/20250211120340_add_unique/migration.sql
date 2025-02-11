/*
  Warnings:

  - A unique constraint covering the columns `[youtube_music_id]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_youtube_music_id_key" ON "Song"("youtube_music_id");
