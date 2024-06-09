package controller

import (
	"github.com/WR2233/Hackathon/Backend/dao"
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
	r.ParseForm()
	content := r.Form.Get("content")

	err := dao.createPost(content)
	if err != nil {
		// エラーが発生した場合、エラーレスポンスを返す
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "Failed to create post"}`))
		return
	}

	// 投稿が正常に作成された場合、成功レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Post created successfully"}`))

}
