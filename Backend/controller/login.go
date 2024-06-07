package controller

import (
	"net/http"
)
func loginHandler(w http.ResponseWriter, r *http.Request) {
	//ユーザーログインロジック
	w.Write([]byte("login endpoint"))
}
