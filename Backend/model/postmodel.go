package model

type Post struct {
	PostID      int    `json:"PostID"`
	Content     string `json:"Content"`
	PostedAt    string `json:"PostedAt"`
	UserID      string `json:"UserID"`
	Edited      bool   `json:"Edited"`
	DeletedPost bool   `json:"Deleted"`
	UserName    string `json:"UserName"`
	DeletedUser bool   `json:"DeletedUser"`
}

type Reply struct {
	ReplyID      int    `json:"ReplyID"`
	Content      string `json:"Content"`
	PostedAt     string `json:"PostedAt"`
	PostedByID   string `json:"PostedByID"`
	PostedToID   int    `json:"PostedToID"`
	Edited       int    `json:"Edited"`
	DeletedReply int    `json:"DeletedReply"`
	UserName     string `json:"UserName"`
	DeletedUser  bool   `json:"DeletedUser"`
	IsToPost     bool   `json:"IsToPost"`
}

type PostPre struct {
	Content string `json:"Content"`
	UserID  string `json:"UserID"`
}

type ReplyPre struct {
	PostReplyID int    `json:"PostReplyID"`
	Content     string `json:"Content"`
	UserID      string `json:"UserID"`
	IsToPost    bool   `json:"IsToPost"`
}
