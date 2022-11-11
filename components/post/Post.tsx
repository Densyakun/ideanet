import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { PostItem } from './PostItem'

type Inputs = {
  text: string
}

export const Post = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<Inputs>()

  const onSubmit = async (data: Inputs) => {
    await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) return

        reset({ text: '' })
      })
  }

  return <Stack
    spacing={1}
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(onSubmit)}
  >
    <PostItem>
      <Controller
        name="text"
        control={control}
        render={({ field }) => <TextField
          {...field}
          disabled={isSubmitting}
          fullWidth
          error={!!errors.text}
          label="テキスト"
          placeholder="ここにアイデアを書く"
          multiline
          rows={2}
          helperText={errors.text?.type === 'required' && 'テキストを入力してください。' ||
            errors.text?.type === 'maxLength' && 'テキストは 255 文字以下で入力してください。'}
        />}
        rules={{ required: true, maxLength: 255 }}
      />
    </PostItem>
    <Button
      variant="contained"
      type="submit"
      disabled={isSubmitting}
    >
      <i className='bi bi-plus'></i>
      投稿する
    </Button>
  </Stack>
}