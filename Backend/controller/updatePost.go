package controller

import (
	"net/http"
)

func updatePostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿編集ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte("update post endpoint"))
}
