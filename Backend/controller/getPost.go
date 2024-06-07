package controller

import (
	"net/http"
)
func getPostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿取得ロジック
	w.Write([]byte("get post endpoint"))
}
