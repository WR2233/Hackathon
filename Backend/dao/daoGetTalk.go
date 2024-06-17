package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

func getTalk(replyID int) ([]interface{}, error) {
	db, err := GetDB()
	if err != nil {
		return nil, err
	}

	var conversation []interface{}

	// Fetch the original post or reply
	var reply model.Reply
	err = db.QueryRow("SELECT * FROM replies WHERE ReplyID = ?", replyID).Scan(&reply.ReplyID, &reply.Content, &reply.PostedAt, &reply.PostedByID, &reply.PostedToID, &reply.Edited, &reply.DeletedReply, &reply.UserName, &reply.DeletedUser, &reply.IsToPost)
	if err != nil {
		return nil, err
	}

	if reply.IsToPost {
		// If the reply is to a post, fetch the post
		var post model.Post
		err = db.QueryRow("SELECT * FROM posts WHERE PostID = ?", reply.PostedToID).Scan(&post.PostID, &post.Content, &post.PostedAt, &post.UserID, &post.Edited, &post.DeletedPost, &post.UserName, &post.DeletedUser)
		if err != nil {
			return nil, err
		}
		conversation = append(conversation, post)
	} else {
		// If the reply is to another reply, recursively fetch the conversation
		parentConversation, err := getTalk(reply.PostedToID)
		if err != nil {
			return nil, err
		}
		conversation = append(conversation, parentConversation...)
	}

	conversation = append(conversation, reply)

	// Fetch all replies to the original post or reply
	rows, err := db.Query("SELECT * FROM replies WHERE PostedToID = ?", replyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var r model.Reply
		err := rows.Scan(&r.ReplyID, &r.Content, &r.PostedAt, &r.PostedByID, &r.PostedToID, &r.Edited, &r.DeletedReply, &r.UserName, &r.DeletedUser, &r.IsToPost)
		if err != nil {
			return nil, err
		}
		conversation = append(conversation, r)
	}

	return conversation, nil
}
