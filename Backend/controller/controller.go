package controller

import (
	"net/http"
)

func Handler() {
	http.HandleFunc("/getposts", enableCors(getPostsHandler))
	http.HandleFunc("/createpost", enableCors(createPostHandler))
	http.HandleFunc("/updatepost/{id}", enableCors(updatePostHandler))      //未実装
	http.HandleFunc("/deletepostreply", enableCors(deletePostReplyHandler)) //未実装
	http.HandleFunc("/getpost", enableCors(getAPostHandler))
	http.HandleFunc("/createuser", enableCors(createUserHandler))
	http.HandleFunc("/getuser", enableCors(getUserHandler))
	http.HandleFunc("/getfollowers", enableCors(getFollowerHandler))
	http.HandleFunc("/getfollowing", enableCors(getFollowingHandler))
	http.HandleFunc("/getlikenum", enableCors(getLikeNumHandler))
	http.HandleFunc("/likedby", enableCors(ToggleLikeHandler))
	http.HandleFunc("/followedby", enableCors(ToggleFollowHandler))
	http.HandleFunc("/createreply", enableCors(createReplyHandler))
	http.HandleFunc("/getreply", enableCors(getAReplyHandler))
	http.HandleFunc("/getreplies", enableCors(getRepliesByPostHandler))
	http.HandleFunc("/gettalk", enableCors(getTalkHandler))
	http.HandleFunc("/deleteuser", enableCors(deleteUserHandler))
	http.HandleFunc("/updateuser", enableCors(updateUserHandler))
	http.HandleFunc("/postimage", enableCors(postImageHandler))
	http.HandleFunc("/likestatus", enableCors(getLikeStatusHandler))
	http.HandleFunc("/getpostsbyuserid", enableCors(getPostsByUserIDHandler))
}
