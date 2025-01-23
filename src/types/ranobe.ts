export interface RanobeTop {
  id: number;
  name: string;
  rating: number;
  image: string;
}
export interface Ranobe extends RanobeTop {
  description: string;
  status: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}

// interface Country {
//   id: number;
//   name: string;
// }
