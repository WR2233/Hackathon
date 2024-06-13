package controller

import (
	"net/http"
)

func Handler() {
	http.HandleFunc("/getposts", enableCors(getPostsHandler))
	http.HandleFunc("/createpost", enableCors(createPostHandler))
	http.HandleFunc("/updatepost/{id}", enableCors(updatePostHandler))
	http.HandleFunc("/deletepost/{id}", enableCors(deletePostHandler))
	http.HandleFunc("/getpost", enableCors(getAPostHandler))
	http.HandleFunc("/createuser", enableCors(createUserHandler))
	http.HandleFunc("/getuser", enableCors(getUserHandler))
	http.HandleFunc("/getfollowers", enableCors(getFollowerHandler))
	http.HandleFunc("/getfollowing", enableCors(getFollowingHandler))
	http.HandleFunc("/getlikenum", enableCors(getLikeNumHandler))
	http.HandleFunc("/likedby", enableCors(ToggleLikeHandler))
	http.HandleFunc("/followedby", enableCors(ToggleFollowHandler))
	http.HandleFunc("/createreply", enableCors(createReplyHandler))

}
