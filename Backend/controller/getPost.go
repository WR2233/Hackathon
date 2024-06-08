package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
)

func getPostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿取得ロジック
	posts, err := db.GetPosts() //dbから持ってくる
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}
