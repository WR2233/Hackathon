package dao

import "github.com/WR2233/Hackathon/Backend/model"

func GetTalk(replyID int, firstCall bool) ([]interface{}, error) {
	db, err := GetDB()
	if err != nil {
		return nil, err
	}

	var conversation []interface{}

	// Fetch the original post or reply
	var reply model.Reply

	const query1 = "SELECT r.reply_id, r.content, r.postedAt, r.postedBy_id, r.postedTo_id, r.edited, r.deleted, u.username, u.deleted, r.IsToPost  FROM replies r JOIN users u ON r.postedBy_id = u.user_id WHERE r.reply_id= ?"
	err = db.QueryRow(query1, replyID).Scan(&reply.ReplyID, &reply.Content, &reply.PostedAt, &reply.PostedByID, &reply.PostedToID, &reply.Edited, &reply.DeletedReply, &reply.UserName, &reply.DeletedUser, &reply.IsToPost)
	if err != nil {
		return nil, err
	}

	if reply.IsToPost {
		// If the reply is to a post, fetch the post
		const query2 = "SELECT p.post_id, p.content, p.postedAt, p.user_id, p.edited, p.deleted, u.username, u.deleted FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id= ?"

		var post model.Post
		err = db.QueryRow(query2, reply.PostedToID).Scan(&post.PostID, &post.Content, &post.PostedAt, &post.UserID, &post.Edited, &post.DeletedPost, &post.UserName, &post.DeletedUser)
		if err != nil {
			return nil, err
		}
		conversation = append(conversation, post)
	} else {
		// If the reply is to another reply, recursively fetch the conversation
		parentConversation, err := GetTalk(reply.PostedToID, false)
		if err != nil {
			return nil, err
		}
		conversation = append(conversation, parentConversation...)
	}

	conversation = append(conversation, reply)
	if firstCall {
		// Fetch all replies to the original post or reply
		const query3 = "SELECT r.reply_id, r.content, r.postedAt, r.postedBy_id, r.postedTo_id, r.edited, r.deleted, u.username, u.deleted, r.IsToPost  FROM replies r JOIN users u ON r.postedBy_id = u.user_id WHERE (r.postedTo_id= ? AND r.IsToPost =false)"
		rows, err := db.Query(query3, replyID)
		if err != nil {
			return nil, err
		}

		for rows.Next() {
			var r model.Reply
			err := rows.Scan(&r.ReplyID, &r.Content, &r.PostedAt, &r.PostedByID, &r.PostedToID, &r.Edited, &r.DeletedReply, &r.UserName, &r.DeletedUser, &r.IsToPost)
			if err != nil {
				return nil, err
			}
			conversation = append(conversation, r)
		}

	}

	return conversation, nil
}
