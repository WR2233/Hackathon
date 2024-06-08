package controller

import (
	"net/http"
)

func registerHandler(w http.ResponseWriter, r *http.Request) {
	//ユーザ登録関数
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte("register Endpoint"))
}
