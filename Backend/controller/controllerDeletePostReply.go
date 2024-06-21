package controller

import (
	"encoding/json"
	"net/http"

	"github.com/WR2233/Hackathon/Backend/dao"
)

type reqDelete struct {
	PostReplyID int  `json:"PostReplyID"`
	IsPost      bool `json:"IsPost"`
}

func deletePostReplyHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var req reqDelete

	// リクエストボディをデコード
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "Invalid request payload"}`))
		return
	}

	// 投稿または返信を削除
	err := dao.DeletePostReply(req.PostReplyID, req.IsPost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Deleted successfully"}`))
}
