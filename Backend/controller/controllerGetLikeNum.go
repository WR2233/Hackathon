package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
)

func getLikeNumHandler(w http.ResponseWriter, r *http.Request) {
	//LikeNum取得ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// リクエストURLから投稿IDを取得
	var queryParams = r.URL.Query()
	if len(queryParams["pid"]) > 0 {
		postID := queryParams["pid"][0]
		Num, err := dao.GetLikeNum(postID, true)

		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Num)
	} else if len(queryParams["rid"]) > 0 {
		replyID := queryParams["rid"][0]
		Num, err := dao.GetLikeNum(replyID, false)

		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Num)
	}
}
