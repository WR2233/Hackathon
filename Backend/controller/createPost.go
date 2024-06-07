package controller

import (
	"net/http"
)
func createPostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿作成ロジック
	w.Write([]byte ("Get posts Endpoints"))
}
