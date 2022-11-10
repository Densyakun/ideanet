import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
import Alert from '@mui/material/Alert'
import Pagination from '@mui/material/Pagination'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { PostItem } from './Post'
import { Data, itemsCount } from '../../pages/api/post'

const fetcher: Fetcher<Data, string> = (...args) => fetch(...args).then((res) => res.json())

const itemsPerPage = 10

export const PostList = () => {
  const router = useRouter()

  const [page, setPage] = useState(Math.max(1, Math.floor(parseInt(router.query.page as string) || 1)))

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    router.push(page === 1 ? {} : { query: { page: page } }, undefined, { scroll: false })
  }, [page])

  const { data, error } = useSWR(`/api/post?skip=${(page - 1) * itemsPerPage},take=${itemsPerPage}`, fetcher)

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h5" component="div">
          みんなの投稿
        </Typography>

        <Typography>
          {data && !!data.length && `${itemsPerPage * (page - 1) + 1}–${Math.min(itemsPerPage * page, itemsCount)} of `}
          {`${itemsCount} results`}
        </Typography>

        <Pagination
          page={page}
          count={Math.ceil(itemsCount / itemsPerPage)}
          color="primary"
          variant="outlined"
          shape="rounded"
          hidePrevButton
          hideNextButton
          onChange={handleChange}
        />

        {error &&
          <Alert severity="error">
            failed to load.
          </Alert>
        }

        {!error && !data && [...Array(itemsPerPage)].map(() =>
          <Skeleton variant="rounded" width="100%">
            <PostItem>
              Loading...
            </PostItem>
          </Skeleton>
        )}

        {data && data.map((post) =>
          <PostItem key={post._id}>
            {post.text}
          </PostItem>
        )}
      </Stack>
    </>
  )
}