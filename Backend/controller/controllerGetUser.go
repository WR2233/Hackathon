package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
)

func getUserHandler(w http.ResponseWriter, r *http.Request) {
	//userprofile取得ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// リクエストから投稿IDを取得// リクエストURLからクエリ文字列を取得
	var queryParams = r.URL.Query()
	userID := queryParams["uid"][0]

	user, err := dao.GetUser(userID) //dbから持ってくる
	if err != nil {
		log.Println(err, "Failed to get user")
		w.WriteHeader(http.StatusInternalServerError)
	}

	json.NewEncoder(w).Encode(user) //+posts
}
