package controller

import (
	"net/http"
)

func deletePostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿削除ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte("deletePost endpoint"))

}
