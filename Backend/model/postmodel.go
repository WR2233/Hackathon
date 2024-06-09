package model

type Post struct {
	PostID   int    `json:"PostID"`
	Content  string `json:"Content"`
	PostedAt string `json:"PostedAt"`
	UserID   string `json:"UserID"`
	Edited   bool   `json:"Edited"`
	Deleted  bool   `json:"Deleted"`
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
