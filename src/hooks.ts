import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {RootState} from './Redux/redux-store';

type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<DispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector