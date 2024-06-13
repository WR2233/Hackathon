package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
	"net/http"
)

func createReplyHandler(w http.ResponseWriter, r *http.Request) {
	//reply作成ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// POST メソッドのみを許可
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	// フォームからreplyデータを取得
	// リクエストボディからreplyデータを取得
	var replyData model.ReplyPre

	if err := json.NewDecoder(r.Body).Decode(&replyData); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		log.Println("Failed To decode ", replyData)
		return
	}

	replyID, err := dao.CreateReply(replyData)
	if err != nil {
		// エラーが発生した場合、エラーレスポンスを返す
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "Failed to create reply"}`))
		return
	}

	// replyが正常に作成された場合、新しく作成されたreplyのIDを含む成功レスポンスを返す
	response := map[string]interface{}{
		"message": "reply created successfully",
		"replyID": replyID,
	}

	// 投稿が正常に作成された場合、成功レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
