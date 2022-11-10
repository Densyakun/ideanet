import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { PostItem } from './PostItem'

type Inputs = {
  text: { label: string; value: string };
}

export const Post = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const onSubmit = handleSubmit(data => console.log(data))

  return <Stack
    spacing={1}
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={onSubmit}
  >
    <PostItem>
      <Controller
        name="text"
        control={control}
        render={({ field }) => <TextField
          {...field}
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
    <Button variant="contained" type="submit">
      <i className='bi bi-plus'></i>
      投稿する
    </Button>
  </Stack>
}