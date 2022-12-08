import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
import Alert from '@mui/material/Alert'
import Pagination from '@mui/material/Pagination'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { PostItem } from './PostItem'
import { Data, itemsCount } from '../../pages/api/posts'

const fetcher: Fetcher<Data, string> = (...args) => fetch(...args).then((res) => res.json())

const initPage = 1
const itemsPerPage = 10

export const PostList = () => {
  const router = useRouter()

  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage(Math.max(1, Math.floor(parseInt(router.query.page as string) || initPage)))
  }, [router.query.page])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    router.push(value === initPage ? {} : { query: { page: value } }, undefined, { scroll: false })
  }

  const { data, error } = useSWR(`/api/posts?skip=${(page - 1) * itemsPerPage},take=${itemsPerPage}`, fetcher)

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

        {!error && !data && [...Array(itemsPerPage)].map((value, index) =>
          <Skeleton key={index} variant="rounded" width="100%">
            <PostItem>
              Loading...
            </PostItem>
          </Skeleton>
        )}

        {data && (
          <>
            {!data.length &&
              <Alert severity="info">
                Your search did not match any documents.
              </Alert>
            }

            {data.map((post) =>
              <PostItem key={post._id}>
                {post.text}
              </PostItem>
            )}
          </>
        )}
      </Stack>
    </>
  )
}