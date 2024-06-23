package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
	"net/http"
)

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// POST メソッドのみを許可
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	//userID, userName取得
	var userData model.UserPre

	if err := json.NewDecoder(r.Body).Decode(&userData); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		log.Println(userData)
		return
	}
	err := dao.CreateUser(userData)
	if err != nil {
		// エラーが発生した場合、エラーレスポンスを返す
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "Failed to create user"}`))
		return
	}

	// 投稿が正常に作成された場合、成功レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "user created successfully"}`))

}
