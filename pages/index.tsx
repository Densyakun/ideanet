import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Container, Navbar } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
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

      <div className="position-absolute w-100 h-100 d-flex flex-column mb-3 bg-dark text-light">
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand>Ideanet</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <button type="button" className="ms-auto btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#signinModal">Sign in</button>
              <button type="button" className="ms-2 btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#signupModal">Sign up</button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <ScrollShadows>
          <main className="container-xxl py-3">
            <div className="border border-secondary rounded p-3 d-flex flex-column"
              style={{ height: '12rem' }}>
              <div className='flex-grow-1 overflow-hidden mb-3'>
                あああ入力欄
              </div>

              <div className='md-3'>
                <Button variant="primary">Go somewhere</Button>
              </div>
            </div>
          </main>
        </ScrollShadows>
      </div>
    </>
  )
}

export default Home
