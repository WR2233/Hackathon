package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
	"net/http"
)

func createPostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿作成ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// POST メソッドのみを許可
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	// フォームから投稿データを取得
	// リクエストボディから投稿データを取得
	var postData model.PostPre

	if err := json.NewDecoder(r.Body).Decode(&postData); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		log.Println(postData)
		return
	}

	postID, err := dao.createPost(postData)
	if err != nil {
		// エラーが発生した場合、エラーレスポンスを返す
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "Failed to create post"}`))
		return
	}

	// 投稿が正常に作成された場合、新しく作成された投稿のIDを含む成功レスポンスを返す
	response := map[string]interface{}{
		"message": "Post created successfully",
		"postID":  postID,
	}

	// 投稿が正常に作成された場合、成功レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
