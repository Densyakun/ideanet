import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { PostItem, Post } from './Post'

export type PostListData = {
  _id: string,
  text: string
}[]

export const PostList = ({ posts }: { posts: PostListData }) => {
  const postCards = posts.map((post) =>
    <PostItem key={post._id}>
      {post.text}
    </PostItem>
  )

  return (
    <>
      <Typography variant="h5" component="div">
        みんなの投稿
      </Typography>

      {posts && (
        <Stack spacing={1}>
          <Post />

          {postCards}
        </Stack>
      )}
    </>
  )
}