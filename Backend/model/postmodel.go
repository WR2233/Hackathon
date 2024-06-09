package model

import "time"

type Post struct {
	Post_id  int       `json:"id"`
	Content  string    `json:"content"`
	PostedAt time.Time `json:"postedAt"`
	User_id  int       `json:"userID"`
	Edited   bool      `json:"edited"`
	deleted  bool      `json:"deleted"`
}

type reply struct {
	reply_id    int
	content     string
	postedAt    time.Time
	postedBy_id int
	postedTo_id int
	edited      int
	deleted     int
}
