package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
)

func getFollowingHandler(w http.ResponseWriter, r *http.Request) {
	//following取得ロジック
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var queryParams = r.URL.Query()
	UserID := queryParams["uid"][0]
	users, err := dao.GetFollowing(UserID) //dbから持ってくる
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
