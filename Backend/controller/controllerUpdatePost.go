package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
	"net/http"
)

func UpdatePostHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// POST メソッドのみを許可
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newPost model.UpdatePost
	if err := json.NewDecoder(r.Body).Decode(&newPost); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		log.Println(newPost, err)
		return
	}

	err := dao.UpdatePost(newPost)
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
	}

	// 投稿が正常に作成された場合、成功レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
