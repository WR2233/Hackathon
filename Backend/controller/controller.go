package controller

import (
	"net/http"
)

func Handler() {
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/getposts", getPostHandler)
	http.HandleFunc("/createpost", createPostHandler)
	http.HandleFunc("/updatepost/{id}", updatePostHandler)
	http.HandleFunc("/deletepost/{id}", deletePostHandler)

}
