import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

type Inputs = {
  text: { label: string; value: string };
}

export const PostItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
}))

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