package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
	"strconv"
)

func getTalkHandler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["rid"]
	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'replyID' is missing")
		http.Error(w, "Url Param 'replyID' is missing", http.StatusBadRequest)
		return
	}

	replyID, err := strconv.Atoi(keys[0])
	if err != nil {
		log.Println("Invalid replyID:", keys[0])
		http.Error(w, "Invalid replyID", http.StatusBadRequest)
		return
	}

	log.Println("Fetching conversation for replyID:", replyID)
	conversation, err := dao.GetTalk(replyID, true)
	if err != nil {
		log.Println("Error fetching conversation:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(conversation); err != nil {
		log.Println("Error encoding JSON response:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		log.Println("Response successfully sent")
	}
}
