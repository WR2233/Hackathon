package controller

import (
	"fmt"
	"net/http"
	"os"
)

func Handler () {
	http.Handlefunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/posts", getPostHandler)
	http.HandleFunc("/posts", createPostHandler)
	http.HandleFunc("/posts/{id}", updatePostHandler)
    http.HandleFunc("/posts/{id}", deletePostHandler)

    log.Fatal(http.ListenAndServe(":8000", r))
}