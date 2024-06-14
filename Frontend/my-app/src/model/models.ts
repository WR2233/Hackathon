
export interface Reply {
    ReplyID: number;
    Content: string;
    PostedAt: string;
    UserID: string;
    Edited: boolean;
    DeletedReply: boolean;
    UserName: string;
    DeletedUser: boolean;
    PostReplayID: number;
    IsToPost: boolean;
    Children?: Reply[];
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
}

export interface UserProfile {
    UserID: string;
    UserName: string;
    DeletedUser: boolean;
    // 他のユーザープロフィール情報をここに追加
  }
