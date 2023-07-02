//  Хуки для обработки изменений в рег. форме и профиле  //
import { useState, ChangeEvent } from 'react';
import { TFormValues } from '../utils/types';

export const useForm = (inputData: TFormValues) => {

  const [data, setData] = useState<TFormValues>(inputData);

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  return { data, handleDataChange, setData };
}