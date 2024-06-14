package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"net/http"
	"strconv"
)

// 指定されたPost IDに関連する返信を取得するハンドラー
func getRepliesByPostHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// クエリパラメータからPost IDを取得
	postIDStr := r.URL.Query().Get("pid")
	if postIDStr == "" {
		http.Error(w, "postID is required", http.StatusBadRequest)
		return
	}

	// postIDをintに変換
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		http.Error(w, "Invalid postID", http.StatusBadRequest)
		return
	}

	//データベースから持ってくる
	replies, err := dao.GetRepliesByPostID(postID)
	if err != nil {
		http.Error(w, "Failed to fetch replies", http.StatusInternalServerError)
		return
	}
	// JSONで返信を返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(replies); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
