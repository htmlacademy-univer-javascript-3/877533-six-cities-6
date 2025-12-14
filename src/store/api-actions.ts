/* eslint-disable no-empty */

import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { actions, Actions } from './actions';
import { AuthInfo, Comment, Offer, OfferExtended } from '../types';
import { AxiosInstance } from 'axios';
import { RootState } from '.';

export const fetchOffers =
  (): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (
      dispatch: ThunkDispatch<RootState, AxiosInstance, Actions>,
      _getState,
      api
    ) => {
      dispatch(actions.loadOffersRequest());
      try {
        const { data } = await api.get<Offer[]>('/offers');
        dispatch(actions.loadOffersSuccess(data));
      } catch {
        dispatch(actions.loadOffersError());
      }
    };

export const fetchOffer =
  (id: string): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (
      dispatch: ThunkDispatch<RootState, AxiosInstance, Actions>,
      _getState,
      api
    ) => {
      dispatch(actions.loadOfferRequest());

      try {
        const { data: offer } = await api.get<OfferExtended>(`/offers/${id}`);
        dispatch(actions.loadOfferSuccess(offer));

        const { data: nearby } = await api.get<Offer[]>(`/offers/${id}/nearby`);
        dispatch(actions.loadNearbyOffersSuccess(nearby));

        const { data: comments } = await api.get<Comment[]>(`/comments/${id}`);
        dispatch(actions.loadCommentsSuccess(comments));
      } catch (err) {
        dispatch(actions.loadOfferError());
      }
    };

export const fetchFavorites =
  (): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (
      dispatch: ThunkDispatch<RootState, AxiosInstance, Actions>,
      _getState,
      api
    ) => {
      dispatch(actions.loadFavoritesRequest());

      try {
        const { data } = await api.get<Offer[]>('/favorite');
        dispatch(actions.loadFavoritesSuccess(data));
      } catch (error) {
        dispatch(actions.loadFavoritesError());
        throw error;
      }
    };

export const toggleFavoriteOffer =
  (
    offerId: string,
    isFavorite: boolean
  ): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (dispatch, getState, api) => {
      const status = isFavorite ? 1 : 0;
      await api.post<Offer>(`/favorite/${offerId}/${status}`);

      const promises = [dispatch(fetchOffers()), dispatch(fetchFavorites())];

      const state = getState();
      if (state.offer.offer?.id === offerId) {
        promises.push(dispatch(fetchOffer(offerId)));
      }

      await Promise.all(promises);
    };

export const postComment =
  (
    offerId: string,
    comment: { comment: string; rating: number }
  ): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (dispatch, _getState, api) => {
      await api.post<Comment>(`/comments/${offerId}`, comment);
      const { data: comments } = await api.get<Comment[]>(`/comments/${offerId}`);
      dispatch(actions.loadCommentsSuccess(comments));
    };

export const checkAuth =
  (): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (
      dispatch: ThunkDispatch<RootState, AxiosInstance, Actions>,
      _getState,
      api
    ) => {
      try {
        const { data } = await api.get<AuthInfo>('/login');

        dispatch(actions.requireAuth('AUTH'));
        dispatch(actions.setAuthInfo(data));
      } catch (err) {
        dispatch(actions.requireAuth('NO_AUTH'));
        dispatch(actions.setAuthInfo(null));
        throw err;
      }
    };

export const login =
  (loginData: {
    email: string;
    password: string;
  }): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (dispatch, _getState, api) => {
      try {
        const { data } = await api.post<AuthInfo>('/login', loginData);

        localStorage.setItem('six-cities-token', data.token);

        dispatch(actions.requireAuth('AUTH'));
        dispatch(actions.setAuthInfo(data));
      } catch (err) {
        dispatch(actions.requireAuth('NO_AUTH'));
        dispatch(actions.setAuthInfo(null));
        throw err;
      }
    };

export const logout =
  (): ThunkAction<Promise<void>, RootState, AxiosInstance, Actions> =>
    async (
      dispatch: ThunkDispatch<RootState, AxiosInstance, Actions>,
      _getState,
      api: AxiosInstance
    ) => {
      try {
        await api.delete('/logout');
      } catch {}
      localStorage.removeItem('six-cities-token');

      dispatch(actions.requireAuth('NO_AUTH'));
      dispatch(actions.setAuthInfo(null));
    };
