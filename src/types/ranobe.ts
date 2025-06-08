export interface RanobeTop {
  id: string;
  nameFirst: string;
  rating: number;
  image: string;
}
export interface Ranobe extends RanobeTop {
  description: string;
  status: string;
  tags: Tag[];
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface RanobeDetails extends Ranobe {
  nameSecond: string | null;
  nameThird: string | null;
  ratingCount: number;
  chapters: number;
  year: number;
  createdAt: string;
  country: Country;
  author: Author;
  translator: Translator;
}

interface Country {
  id: number;
  name: string;
}

interface Author {
  id: number;
  nameFirst: string;
}

interface Translator {
  id: number;
  name: string;
}
