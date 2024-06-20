package model

type User struct {
	UserName  string `json:"UserName"`
	UserID    string `json:"UserID"`
	Deleted   bool   `json:"Deleted"`
	Img       string `json:"Img"`
	CreatedAt string `json:"CreatedAt"`
}

type UserPre struct {
	UserName string `json:"UserName"`
	UserID   string `json:"UserID"`
}
