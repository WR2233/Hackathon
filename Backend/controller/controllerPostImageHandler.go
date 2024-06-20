package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
)

// ImagePost はリクエストボディの構造を表します。
type ImagePost struct {
	URL string `json:"url"`
	UID string `json:"uid"`
}

// postImageHandler は画像のURLをデータベースに保存するためのHTTPハンドラです。
func postImageHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// POST メソッドのみを許可
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var image ImagePost

	// リクエストボディから JSON をデコードして image 変数に格納
	if err := json.NewDecoder(r.Body).Decode(&image); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		log.Println("Failed to decode request body:", err)
		return
	}

	// 画像のURLとユーザーIDをデータベースに保存
	err := dao.PostImage(image.URL, image.UID)
	if err != nil {
		// エラーが発生した場合、エラーレスポンスを返す
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "Failed to post image"}`))
		return
	}

	// 投稿が正常に作成された場合、成功レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Post image successfully"}`))
}
