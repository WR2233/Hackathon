
export interface Reply {
    ReplyID: number;
    Content: string;
    PostedAt: string;
    PostedByID: string;
    Edited: boolean;
    DeletedReply: boolean;
    UserName: string;
    DeletedUser: boolean;
    PostReplayID: number;
    IsToPost: boolean;
    Img: string
}

export interface Post{
	PostID :   number
	Content :    string
	PostedAt :   string 
	UserID    :  string 
	Edited     : boolean
	DeletedPost :boolean
	UserName    :string 
	DeletedUser :boolean 
    Img: string
}

export interface Profile {
    UserID: string;
    UserName: string;
    DeletedUser: boolean;
    Img: string
  }
