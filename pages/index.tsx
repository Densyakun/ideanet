import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from "react";
import { useForm } from "react-hook-form";
import { PostList, PostListData } from '../components/post/PostList'
import { Alert, Button, Card, Container, Form, Navbar, Stack } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import clientPromise from '../lib/mongodb'

type Inputs = {
  text: string
}

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
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ideanet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>Ideanet</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container-sm py-3">
        {isConnected ? (
          <>
            <p>IdeaNetは、社会活動の効率化のために、誰でも匿名で情報を共有できる、スレッド形式の電子掲示板です。</p>

            <p>まずは、あなたのやりたいこと（目標）を投稿してみましょう。</p>

            <h5>投稿する</h5>

            <Card bg="dark" text="white" className="mb-2">
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <fieldset>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        as="textarea"
                        placeholder="ここにアイデアを書く"
                        isInvalid={!!errors.text}
                        rows={2}
                        {...register("text", { required: true, maxLength: 255 })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.text?.type === 'maxLength' && "テキストは 255 文字以下で入力してください。"}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      <i className="bi bi-plus"></i>
                      投稿する
                    </Button>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>

            <PostList posts={posts} />
          </>
        ) : (
          <Alert variant="danger" className="mb-0">
            Server is NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </Alert>
        )}
      </div>
    </>
  )
}
