package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/WR2233/Hackathon/Backend/dao"
)

func getAPostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿取得ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	postID, err := strconv.Atoi(vars["id"])
	post, err := dao.GetPost(postID) //dbから持ってくる
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}
