package controller

import (
	"net/http"
)

func createPostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿作成ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte("Get posts Endpoints"))
}
