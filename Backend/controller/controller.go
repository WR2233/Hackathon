package controller

import (
	"net/http"
)

func Handler() {
	http.HandleFunc("/register", enableCors(registerHandler))
	http.HandleFunc("/login", enableCors(loginHandler))
	http.HandleFunc("/getposts", enableCors(getPostHandler))
	http.HandleFunc("/createpost", enableCors(createPostHandler))
	http.HandleFunc("/updatepost/{id}", enableCors(updatePostHandler))
	http.HandleFunc("/deletepost/{id}", enableCors(deletePostHandler))
	http.HandleFunc("/getpost/{id}", enableCors(getAPostHandler))

}
