export interface GetChapterRequest {
  ranobeId: string;
  chapterNumber: string;
}

export interface ChapterResponce {
  id: number;
  chapterNumber: number;
  chapterName: string;
  chapterText: string;
  isLast: boolean;
  updatedAt: string;
  ranobe: ChapterRanobeResponce;
}

interface ChapterRanobeResponce {
  id: string;
  name: string;
  image: string;
}
