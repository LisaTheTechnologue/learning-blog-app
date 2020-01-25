export class Vocab{
    id: number;
    french: string;
    english: string;
    note: string;
    vtype: Vtype;
    //vtype: string;
    category: Category;
    //category: string;    
    pronunciation: string;
    example: string;
    is_draft: boolean;
}
export class PostVocab{
    id: number;
    french: string;
    english: string;
    note: string;
    // vtype: Vtype;
    vtype: number;
    // category: Category;
    category: number;    
    pronunciation: string;
    example: string;
    is_draft: boolean;
}
export class Vtype{
    id: number;
    vtype_abrev: string;
    vtype_desc: string;
    vocabs: string;
    is_draft: boolean;
}
export class Category{
    id: number;
    category_abrev: string;
    category_desc: string;
    vocabs: string;
    is_draft: boolean;
}