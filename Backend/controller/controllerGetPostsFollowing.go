package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
)

func getPostsFollowingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	keys, ok := r.URL.Query()["uid"]
	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'uid' is missing")
	}
	userid := keys[0]
	posts, err := dao.GetPostsFollowing(userid) //dbから持ってくる
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}
