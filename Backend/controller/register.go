package controller

import (
	"net/http"
)

func registerHandler(w http.ResponseWriter, r *http.Request) {
	//ユーザ登録関数
	w.Write([]byte("register Endpoint"))
}
