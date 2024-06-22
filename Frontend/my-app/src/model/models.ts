
export interface Reply {
    ReplyID: number;
    Content: string;
    PostedAt: string;
    PostedByID: string;
    Edited: boolean;
    Deleted: boolean;
    UserName: string;
    DeletedUser: boolean;
    PostReplayID: number;
    IsToPost: boolean;
    Img: string
    Video: string
    ImgPost: string
    LikeNum?: number
}

export interface Post {
	PostID :   number
	Content :    string
	PostedAt :   string 
	UserID    :  string 
	Edited     : boolean
	Deleted :boolean
	UserName    :string 
	DeletedUser :boolean 
    Img: string
    Video : string
    ImgPost : string
    LikeNum?: number
}

export interface Profile {
    UserID: string;
    UserName: string;
    DeletedUser: boolean;
    Img: string
  }
