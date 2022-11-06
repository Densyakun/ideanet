import { useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'

type Inputs = {
  text: string
}

export default () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <>
      <h5>投稿する</h5>

      <Card bg='dark' text='white'>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <fieldset>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  as='textarea'
                  placeholder='ここにアイデアを書く'
                  isInvalid={!!errors.text}
                  rows={2}
                  {...register('text', { required: true, maxLength: 255 })}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.text?.type === 'maxLength' && 'テキストは 255 文字以下で入力してください。'}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant='primary' type='submit'>
                <i className='bi bi-plus'></i>
                投稿する
              </Button>
            </fieldset>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}