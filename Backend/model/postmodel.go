package model

import "time"

type Post struct {
	post_id int
	content string
	//postedAt time.Time
	user_id int
	edited  int
	//deleted  int
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
