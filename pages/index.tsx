import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import { Post } from '../components/post/Post'
import { PostList } from '../components/post/PostList'
import clientPromise from '../lib/mongodb'

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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await clientPromise

    return {
      props: {
        isConnected: true,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        isConnected: false,
      },
    }
  }
}

export default function Page({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

                <Post />

                <PostList />
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
