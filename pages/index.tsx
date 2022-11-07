import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { PostList, PostListData } from '../components/post/PostList'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import clientPromise from '../lib/mongodb'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Noto Sans JP"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

export const getServerSideProps = async () => {
  const allPosts: PostListData = [
    {
      _id: "0",
      text: "目標を達成する"
    },
    {
      _id: "1",
      text: "社会活動の効率化"
    },
    {
      _id: "2",
      text: "（手段）リソース（経営資源）を共有するWebアプリの開発"
    }
  ]

  try {
    await clientPromise

    return {
      props: {
        posts: allPosts,
        isConnected: true,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        posts: allPosts,
        isConnected: false,
      },
    }
  }
}

export default function Page({ posts, isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ideanet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component="main" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">
              Ideanet
            </Typography>

            {isConnected ? (
              <>
                <Typography variant="body1">
                  IdeaNetは、社会活動の効率化のために、誰でも匿名で情報を共有できる、スレッド形式の電子掲示板です。
                </Typography>

                <Typography variant="body1">
                  まずは、あなたのやりたいこと（目標）を投稿してみましょう。
                </Typography>

                <PostList posts={posts} />
              </>
            ) : (
              <Alert severity="error">
                Server is NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                for instructions.
              </Alert>
            )}
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  )
}
