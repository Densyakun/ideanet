import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Card, Container, FloatingLabel, Form, Navbar, Stack } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import ScrollShadows from '../components/ScrollShadows'

const Home: NextPage = () => {
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
                <Form>
                  <fieldset>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <FloatingLabel controlId="floatingTextarea2" label="テキスト" className="text-body">
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          rows={3}
                        />
                      </FloatingLabel>
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
              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Text>
                    目標を達成する
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Text>
                    社会活動の効率化
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Text>
                    （手段）リソース（経営資源）を共有するWebアプリの開発
                  </Card.Text>
                </Card.Body>
              </Card>
            </Stack>
          </main>
        </ScrollShadows>
      </div>
    </>
  )
}

export default Home
