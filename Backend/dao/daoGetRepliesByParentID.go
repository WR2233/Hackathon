package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

func getRepliesByParentID(parentID int, isToPost bool) ([]model.Reply, error) {
	var replies []model.Reply
	query := "SELECT * FROM replies WHERE PostReplayID = ? AND IsToPost = ?"
	rows, err := db.Query(query, parentID, isToPost)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var reply model.Reply
		err := rows.Scan(&reply.ReplyID, &reply.Content, &reply.PostedAt, &reply.PostedByID, &reply.Edited, &reply.DeletedReply, &reply.UserName, &reply.DeletedUser, &reply.PostedToID, &reply.IsToPost)
		if err != nil {
			return nil, err
		}
		replies = append(replies, reply)
	}
	return replies, nil
}
