package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/WR2233/Hackathon/Backend/dao"
)

func getAReplyHandler(w http.ResponseWriter, r *http.Request) {
	//reply取得ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// リクエストからreplyIDを取得// リクエストURLからクエリ文字列を取得
	var queryParams = r.URL.Query()
	replyID, err := strconv.Atoi(queryParams["rid"][0])

	reply, err := dao.GetAReply(replyID) //dbから持ってくる
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reply)
}
