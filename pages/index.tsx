import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Container, Form, Navbar, Stack } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import ScrollShadows from '../components/ScrollShadows'

type IndexPageData = {
  posts: {
    _id: string,
    text: string
  }[]
}

type Inputs = {
  text: string
}

export const getServerSideProps = async () => {
  const data: IndexPageData = {
    posts: [
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
  }

  return {
    props: {
      data,
    },
  }
}

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const postCards = data.posts.map((post) =>
    <Card key={post._id} bg="dark" text="white">
      <Card.Body>
        <Card.Text>
          {post.text}
        </Card.Text>
      </Card.Body>
    </Card>
  )

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

      <div className="position-absolute w-100 h-100 d-flex flex-column mb-3 bg-dark1 text-light">
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand>Ideanet</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <ScrollShadows>
          <main className="container-sm py-3">
            <p>IdeaNetは、社会活動の効率化のために、誰でも匿名で情報を共有できる、スレッド形式の電子掲示板です。</p>

            <p>まずは、あなたの目標を投稿してみましょう。</p>

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

            <h5>みんなの投稿</h5>

            <Stack gap={2}>
              {postCards}
            </Stack>
          </main>
        </ScrollShadows>
      </div>
    </>
  )
}
