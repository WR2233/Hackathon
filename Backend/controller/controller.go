package controller

import (
	"log"
	"net/http"

)

func Handler() {
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/posts", getPostHandler)
	http.HandleFunc("/posts", createPostHandler)
	http.HandleFunc("/posts/{id}", updatePostHandler)
	http.HandleFunc("/posts/{id}", deletePostHandler)

	log.Fatal(http.ListenAndServe(":8000", nil))
}
