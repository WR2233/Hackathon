package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
	"net/http"
)

func getPostsByUserIDHandler(w http.ResponseWriter, r *http.Request) {
	var queryParams = r.URL.Query()
	userID := queryParams["uid"][0]

	var posts []model.Post
	posts, err := dao.GetPostsByUserID(userID)
	log.Println(posts)
	if err != nil {
		http.Error(w, "Failed to fetch posts", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)

}
