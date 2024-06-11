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
	ReplyID    int    `json:"ReplayID"`
	Content    string `json:"Content"`
	PostedAt   string `json:"PostedAt"`
	PostedByID int    `json:"PostedByID"`
	PostedToID int    `json:"PostedToID"`
	Edited     int    `json:"Edited"`
	Deleted    int    `json:"Deleted"`
}
