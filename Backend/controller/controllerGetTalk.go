package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"log"
	"net/http"
	"strconv"
)

func getTalkHandler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["replyID"]
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

	conversation, err := dao.getTalk(replyID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(conversation)
}
