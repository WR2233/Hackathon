package db

func GetPosts() ([]string, error) {
	var posts []string
	rows, err := db.Query("SELECT post FROM posts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var post string
		err = rows.Scan(&post)
		if err != nil {
			return posts, err
		}
		posts = append(posts, post)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return posts, nil
}
