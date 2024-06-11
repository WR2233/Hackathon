package controller

import (
	"net/http"
)

func Handler() {
	http.HandleFunc("/getposts", enableCors(getPostsHandler))
	http.HandleFunc("/createpost", enableCors(createPostHandler))
	http.HandleFunc("/updatepost/{id}", enableCors(updatePostHandler))
	http.HandleFunc("/deletepost/{id}", enableCors(deletePostHandler))
	http.HandleFunc("/getpost", enableCors(getAPostHandler))
	http.HandleFunc("/createuser", enableCors(createUserHandler))
	http.HandleFunc("/getuser", enableCors(getUserHandler))
	http.HandleFunc("/follow", enableCors(followHandler))
}
