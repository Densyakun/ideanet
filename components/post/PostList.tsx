import React from 'react'
import { Card, Stack } from 'react-bootstrap'

export type PostListData = {
  _id: string,
  text: string
}[]

export const PostList = ({ posts }: { posts: PostListData }) => {
  const postCards = posts.map((post) =>
    <Card key={post._id} bg="dark" text="white">
      <Card.Body>
        <Card.Text>
          {post.text}
        </Card.Text>
      </Card.Body>
    </Card>
  )

  return (
    <>
      <h5>みんなの投稿</h5>

      <Stack gap={2}>
        {postCards}
      </Stack>
    </>
  )
}