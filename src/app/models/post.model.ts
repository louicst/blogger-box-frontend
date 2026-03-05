export interface Category {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  category: Category;
}

/**
 * On utilise Omit pour retirer les champs gérés par le Backend.
 * On ajoute le champ 'categoryId' (UUID) pour correspondre au Record Java.
 */
export type CreatePostRequest = Omit<Post, 'id' | 'createdDate' | 'category'> & { 
  categoryId: string 
};