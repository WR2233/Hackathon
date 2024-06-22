package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
	"strconv"
)

func getPostsInfHandler(w http.ResponseWriter, r *http.Request) {
	//投稿取得ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var queryParams = r.URL.Query()
	page, err := strconv.Atoi(queryParams["page"][0])
	if err != nil {
		log.Println(err)
	}
	if page < 1 {
		page = 1
	}
	posts, err := dao.GetPostsInf(page) //dbから持ってくる
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}
