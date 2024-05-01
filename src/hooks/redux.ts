import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/stores'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector = useSelector<RootState>
