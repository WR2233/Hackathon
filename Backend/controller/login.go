package controller

import (
	"net/http"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	//ユーザーログインロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte("login endpoint"))
}
