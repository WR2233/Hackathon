package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/gorilla/mux"
)

func getAPostHandler(w http.ResponseWriter, r *http.Request) {
	//投稿取得ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// リクエストから投稿IDを取得
	vars := mux.Vars(r)
	postID, err := strconv.Atoi(vars["id"])
	post, err := dao.GetAPost(postID) //dbから持ってくる
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}
